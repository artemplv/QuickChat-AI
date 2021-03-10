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

const authApi = new AuthAPI();
const chatsApi = new ChatsAPI();
const usersApi = new UsersAPI();

const host = 'https://ya-praktikum.tech';
const socketHost = 'wss://ya-praktikum.tech/ws/chats';

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

  async getChatUsers() {
    const usersResponse: any = await chatsApi.getChatUsers(this.props?.chatId);
    if (Array.isArray(usersResponse?.data)) {
      const membersPrepared = usersResponse.data.map((user: PlainObject) => {
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
    const tokenResponse: any = await chatsApi.getChatToken(this.props?.chatId);

    const userId = userResponse?.data?.id;
    const token = tokenResponse?.data?.token;

    if (userId && token) {
      const self = this;
      this._socket = new WebSocketService(socketHost, userId, this.props?.chatId, token);

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
            this.setProps({
              messages: [{
                content: data?.content,
                user_id: data?.userId,
              }, ...this.props?.messages],
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
            await chatsApi.addUsers(
              {
                users: [usersResponse.data[0].id],
                chatId: Number(self.props?.chatId),
              },
            );
            self.getChatUsers();
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
            const userToDelete = users.find((user: PlainObject) => user.login === data.login);
            if (userToDelete) {
              await chatsApi.deleteUsers(
                {
                  users: [userToDelete.id],
                  chatId: Number(self.props?.chatId),
                },
              );
              self.getChatUsers();
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

    return async function (event: ClickEvent) {
      event.preventDefault();
      const data = submitForm('messageForm');

      if (data?.message) {
        self._socket?.send({
          content: data.message,
          type: 'message',
        });
      }
    };
  }

  addListeners() {
    this.getContent().querySelector('.add-user-button')?.addEventListener('click', this.handleAddUserModal);
    this.getContent().querySelector('.delete-user-button')?.addEventListener('click', this.handleDeleteUserModal);
    this.getContent().querySelector('.delete-chat-button')?.addEventListener('click', this.handleDeleteChatModal);

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
    if (
      !this.props?.chatTitle && this.props?.chatId
      && this.props?.chatsList && this.props.chatsList.length > 0
    ) {
      const currentChat = this.props.chatsList.find(
        (chat: ChatObject) => chat.id === Number(this.props.chatId),
      );
      this.setProps({ chatTitle: currentChat?.title || 'Unknown' });
    }
  }

  componentDidMount() {
    this.getChats();
    this.getChatUsers();
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
        loggedUserId: this.props?.userId,
        messages: this.props?.messages,
      }).render(),
    });
  }
}
