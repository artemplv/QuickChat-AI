/* eslint-disable func-names */
import Handlebars from 'handlebars';
import Block from '../../modules/block';
import Chats from '../../components/Chats';
import ChatFeed from '../../components/ChatFeed';
import template from './template';

import handleModal from '../../utils/handleModals';
import submitForm from '../../utils/submitForm';

import {
  validateInput,
  removeError,
} from '../../utils/validation';

import ChatsAPI from '../../api/chats';
import UsersAPI from '../../api/users';
import AuthAPI from '../../api/auth';
import WebSocketService from '../../modules/socket/socket-service';

import config from '../../config/config';

import {
  resetChatUnreadMsgsCount,
  rearrangeChatsList,
} from './helpers';

const authApi = new AuthAPI();
const chatsApi = new ChatsAPI();
const usersApi = new UsersAPI();

const host = config.serverHost;
const socketHost = `${config.socketHost}/ws/chat`;

export default class ChatsPage extends Block {
  public props: Props;

  private _state: PlainObject;

  private _socket: WebSocketService | null;

  constructor(props?: Props) {
    super('div', props);

    this._state = {};
    this._socket = null;
  }

  componentDidRender() {
    this.addListeners();
  }

  componentDidMount() {
    this.getChats();
    this.addSocketConnection();
  }

  componentDidUpdate() {
    if (this._state.chatId !== this.props.chatId) {
      this._state.chatId = this.props.chatId;

      if (this._state.chatId) {
        this.getChat();
        this._socket?.send({
          chatId: this._state.chatId,
          content: '0',
          type: 'get old',
        });
      }
    }

    return true;
  }

  // api calls
  async addSocketConnection() {
    const userResponse: any = await authApi.getUser();
    const userId = userResponse?.data?.id;

    if (userId) {
      const self = this;
      this._socket = new WebSocketService(socketHost);

      this._socket.subscribe('open', () => {
        self._socket?.send({
          chatId: self.props.chatId,
          content: '0',
          type: 'get old',
        });
      });

      this._socket.subscribe('message', (event: any) => {
        const dataRaw = event?.data;
        const data = JSON.parse(dataRaw);

        if (data && data.chatId === self.props.chatId) {
          if (data.type === 'old messages') {
            self.setProps({
              messages: data.data,
            });

            if (Array.isArray(data.data) && data.data.length > 0) {
              self._socket?.send({
                chatId: data.chatId,
                content: '0',
                type: 'read all',
              });

              if (self.props.chatsList) {
                resetChatUnreadMsgsCount(self, data.chatId);
              }
            }
          } else if (data.type === 'new message') {
            self._socket?.send({
              chatId: data.chatId,
              content: data.data.id,
              type: 'read',
            });

            // eslint-disable-next-line max-len
            const messagesToSet = Array.isArray(self.props?.messages) ? [data.data, ...self.props.messages] : [data.data];
            self.setProps({
              messages: messagesToSet,
            });
          }
        }

        if (data?.type === 'new message' && self.props.chatsList) {
          rearrangeChatsList(self, data);
        }
      });
    }

    this.setProps({ userId });
  }

  async getChats() {
    const response: any = await chatsApi.getChats();
    this.setProps({ chatsList: response.data || null });
  }

  async getChat() {
    const response: any = await chatsApi.getChat(this._state.chatId);

    this.setProps({ chatTitle: response?.data?.name || 'Unknown' });

    const chatUsers = response?.data?.users;

    if (Array.isArray(chatUsers)) {
      const membersPrepared = chatUsers.map((user: PlainObject) => {
        const userAvatar = user.avatar;
        if (userAvatar) {
          return {
            ...user,
            avatar: `${host}${userAvatar}`,
          };
        }
        return user;
      });

      this.setProps({ chatMembers: membersPrepared });
    }
  }
  //

  // modal handlers
  handleNewChatModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('create-chat-modal');
  }

  handleAddUserModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('add-user-modal');
  }

  handleDeleteUserModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('remove-user-modal');
  }

  handleDeleteChatModal(event: ClickEvent) {
    event.preventDefault();
    handleModal('delete-chat-modal');
  }
  //

  // event handlers
  handleCreateChat() {
    const self = this;

    return async function (event: ClickEvent) {
      event.preventDefault();
      const data = submitForm('newChat');

      if (data) {
        try {
          const response: any = await chatsApi.createChat(data);
          if (response.status === 201) {
            self.getChats();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  }

  handleAddUser() {
    const self = this;

    return async function (event: ClickEvent) {
      event.preventDefault();
      const data = submitForm('addUser');

      if (data && self.props?.chatId) {
        try {
          const usersResponse: any = await usersApi.getUsersByLogin(data);
          if (usersResponse?.data && usersResponse.data[0]?.id) {
            await chatsApi.addUsers(self.props.chatId, [usersResponse.data[0].id]);
            self.getChat();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  }

  handleRemoveUser() {
    const self = this;

    return async function (event: ClickEvent) {
      event.preventDefault();
      const data = submitForm('removeUser');

      if (data && self.props?.chatId) {
        try {
          const users = self.props?.chatMembers;
          if (users && users[0]) {
            const userToDelete = users.find((user: PlainObject) => user.username === data.username);
            if (userToDelete) {
              await chatsApi.deleteUsers(self.props.chatId, [userToDelete.id]);
              self.getChat();
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
  }

  handleSendMessage() {
    const self = this;

    return async function (event: ClickEvent | SubmitEvent) {
      event.preventDefault();
      const data = submitForm('messageForm');

      setTimeout(() => {
        const messageTextareaElem = self.getContent().querySelector('#messageTextArea') as HTMLTextAreaElement;
        messageTextareaElem?.focus();
      }, 200);

      if (data?.message) {
        self._socket?.send({
          chatId: self.props?.chatId,
          content: data.message,
          type: 'message',
        });
      }
    };
  }

  submitMessageOnEnter(event: KeyboardEvent) {
    const target = event.target as HTMLTextAreaElement;
    if (event.key === 'Enter' && !event.shiftKey && target.form) {
      target.form.dispatchEvent(new Event('submit', { cancelable: true }));
      event.preventDefault();
    }
  }
  //

  addListeners() {
    this.getContent().querySelector('.create-chat')?.addEventListener('click', this.handleNewChatModal);
    this.getContent().querySelector('.add-user-button')?.addEventListener('click', this.handleAddUserModal);
    this.getContent().querySelector('.delete-user-button')?.addEventListener('click', this.handleDeleteUserModal);
    this.getContent().querySelector('.delete-chat-button')?.addEventListener('click', this.handleDeleteChatModal);
    this.getContent().querySelector('#messageTextArea')?.addEventListener('keypress', this.submitMessageOnEnter);

    this.getContent().querySelectorAll('.modal-wrapper input').forEach((element: HTMLInputElement) => {
      element.addEventListener('focus', () => {
        removeError(element);
      });
      element.addEventListener('blur', () => {
        validateInput(element);
      });
    });

    this.getContent().querySelector('#newChat')?.addEventListener('submit', this.handleCreateChat());
    this.getContent().querySelector('#addUser')?.addEventListener('submit', this.handleAddUser());
    this.getContent().querySelector('#removeUser')?.addEventListener('submit', this.handleRemoveUser());
    this.getContent().querySelector('#messageForm')?.addEventListener('submit', this.handleSendMessage());
  }

  render() {
    return Handlebars.compile(template)({
      selectedChatId: this.props?.chatId,
      chats: new Chats({
        chatsList: this.props?.chatsList,
        selectedChatId: this.props?.chatId,
      }).render(),
      feed: new ChatFeed({
        chatId: this.props?.chatId,
        chatName: this.props?.chatTitle,
        chatMembers: this.props?.chatMembers,
        messages: this.props?.messages,
      }).render(),
    });
  }
}

interface Props extends PlainObject {
  chatId?: string;
  chatsList?: ChatObject[];
}
