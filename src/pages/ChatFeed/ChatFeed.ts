import Block from '../../modules/block.js';
import Chats from '../../components/Chats/index.js';
import ChatFeed from '../../components/ChatFeed/index.js';
import { template } from './template.js';
import handleModal from '../../utils/handleModals.js';
import submitForm from '../../utils/submitForm.js';

import {
  validateInput,
  removeError,
} from '../../utils/validation.js';

import ChatsAPI from '../../api/chats/index.js';
import UsersAPI from '../../api/users/index.js';

const chatsApi = new ChatsAPI();
const usersApi = new UsersAPI();


interface Props extends PlainObject {
  chatsList?: ChatObject[];
}

export default class ChatFeedPage extends Block {
  public props: Props;
  // private _chatId: number | undefined;
  // private _chatTitle: string | undefined;
  constructor(props?: Props) {
    super('div', props);

    // this._chatId = Number(this.props?.chatId);
    // this._chatTitle = this.props?.chatTitle;
  }

  handleAddUserModal(event: clickEvent) {
    event.preventDefault();
    handleModal('add-user-modal');
  }

  handleDeleteUserModal(event: clickEvent) {
    event.preventDefault();
    handleModal('remove-user-modal');
  }

  handleDeleteChatModal(event: clickEvent) {
    event.preventDefault();
    handleModal('delete-chat-modal');
  }

  async getChats() {
    const response: any = await chatsApi.getChats();
    this.setProps({ chatsList: response.data || null });
  }

  handleAddUser() {
    const self = this;

    return async function(event: clickEvent) {
      event.preventDefault();
      const data = submitForm('addUser');

      if (data) {
        try {
          const usersResponse: any = await usersApi.getUsersByLogin(data);
          if (usersResponse?.data && usersResponse.data[0]?.id) {
            await chatsApi.addUsers({ users: [usersResponse.data[0].id], chatId: Number(self.props?.chatId) });
          }
        } catch(error) {
          console.error(error);
        }
      }
    }
  }

  handleRemoveUser() {
    const self = this;

    return async function(event: clickEvent) {
      event.preventDefault();
      const data = submitForm('removeUser');

      if (data) {
        try {
          const usersResponse: any = await chatsApi.getChatUsers(self.props?.chatId);
          if (usersResponse?.data && usersResponse.data[0]) {
            const userToDelete = usersResponse.data.find((user: PlainObject) => user.login === data.login);
            if (userToDelete) {
              await chatsApi.deleteUsers({ users: [userToDelete.id], chatId: Number(self.props?.chatId) });
            }
          }
        } catch(error) {
          console.error(error);
        }
      }
    }
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
  }

  componentDidRender() {
    console.log('render');
    this.addListeners();
    if (!this.props?.chatTitle && this.props?.chatId && this.props?.chatsList && this.props.chatsList.length > 0) {
      console.log('searching');
      const currentChat = this.props.chatsList.find((chat: ChatObject) => chat.id === Number(this.props.chatId));
      this.setProps({ chatTitle: currentChat?.title || 'Unknown' });
    }
  }

  componentDidMount() {
    this.getChats();
    console.log(this.props?.chatId);
  }

  render() {
    return Handlebars.compile(template)({
      chats: new Chats({
        chatsList: this.props?.chatsList,
      }).render(),
      feed: new ChatFeed({
        chatName: this.props?.chatTitle,
      }).render(),
    });
  }
}
