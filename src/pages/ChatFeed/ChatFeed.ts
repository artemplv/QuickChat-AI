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

const authApi = new AuthAPI();
const chatsApi = new ChatsAPI();
const usersApi = new UsersAPI();

const host = config.serverHost;
const socketHost = `${config.socketHost}/ws/chat`;

interface Props extends PlainObject {
  chatsList?: ChatObject[];
}

export default class ChatFeedPage extends Block {
  public props: Props;

  private _socket: WebSocketService | null;

  constructor(props?: Props) {
    super('div', props);

    this._socket = null;
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

  async getChats() {
    const response: any = await chatsApi.getChats();
    this.setProps({ chatsList: response.data || null });
  }

  async getChat() {
    const response: any = await chatsApi.getChat(this.props?.chatId);

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

  async addSocketConnection() {
    const userResponse: any = await authApi.getUser();

    const userId = userResponse?.data?.id;

    if (userId) {
      const self = this;
      this._socket = new WebSocketService(socketHost, this.props?.chatId);

      this._socket.subscribe('open', () => {
        self._socket?.send({
          content: '0',
          type: 'get old',
        });
      });

      this._socket.subscribe('message', (event: any) => {
        const dataRaw = event?.data;
        const data = JSON.parse(dataRaw);

        if (data) {
          if (Array.isArray(data)) {
            this.setProps({
              messages: data,
            });
          } else {
          // eslint-disable-next-line max-len
            const messagesToSet = Array.isArray(this.props?.messages) ? [data, ...this.props.messages] : [data];
            this.setProps({
              messages: messagesToSet,
            });
          }
        }
      });
    }

    this.setProps({ userId });
  }

  handleAddUser() {
    const self = this;

    return async function (event: ClickEvent) {
      event.preventDefault();
      const data = submitForm('addUser');

      if (data) {
        try {
          const usersResponse: any = await usersApi.getUsersByLogin(data);
          if (usersResponse?.data && usersResponse.data[0]?.id) {
            await chatsApi.addUsers(self.props?.chatId, [usersResponse.data[0].id]);
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

      if (data) {
        try {
          const users = self.props?.chatMembers;
          if (users && users[0]) {
            const userToDelete = users.find((user: PlainObject) => user.username === data.username);
            if (userToDelete) {
              await chatsApi.deleteUsers(self.props?.chatId, [userToDelete.id]);
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

  addListeners() {
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

    this.getContent().querySelector('#addUser')?.addEventListener('submit', this.handleAddUser());
    this.getContent().querySelector('#removeUser')?.addEventListener('submit', this.handleRemoveUser());
    this.getContent().querySelector('#messageForm')?.addEventListener('submit', this.handleSendMessage());
  }

  componentDidRender() {
    this.addListeners();
  }

  componentDidMount() {
    this.getChats();
    this.getChat();
    this.addSocketConnection();
  }

  render() {
    return Handlebars.compile(template)({
      chats: new Chats({
        chatsList: this.props?.chatsList,
      }).render(),
      feed: new ChatFeed({
        chatName: this.props?.chatTitle,
        chatMembers: this.props?.chatMembers,
        loggedUserId: this.props?.chatId,
        messages: this.props?.messages,
      }).render(),
    });
  }
}
