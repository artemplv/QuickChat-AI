import Handlebars from 'handlebars';
import Block from '../../modules/block';
import Chats from '../../components/Chats';
import { template } from './template';

import handleModal from '../../utils/handleModals';
import submitForm from '../../utils/submitForm';

import {
  validateInput,
  removeError,
} from '../../utils/validation';

import ChatsAPI from '../../api/chats';

const chatsApi = new ChatsAPI();

interface Props extends PlainObject {
  chatsList?: ChatObject[];
}


export default class ChatsPage extends Block {
  public props: Props;
  constructor(props?: Props) {
    super('div', props);
  }

  handleNewChatModal(event: clickEvent) {
    event.preventDefault();
    handleModal('create-chat-modal');
  }

  handleCreateChat() {
    const self = this;

    return async function(event: clickEvent) {
      event.preventDefault();
      const data = submitForm('newChat');

      if (data) {
        try {
          const response: any = await chatsApi.createChat(data);
          if (response.status === 200) {
            self.getChats();
          }
        } catch(error) {
          console.error(error);
        }
      }
    }
  }

  async getChats() {
    const response: any = await chatsApi.getChats();
    this.setProps({ chatsList: response.data || null });
  }

  addListeners() {
    this.getContent().querySelector('.create-chat')?.addEventListener('click', this.handleNewChatModal);

    this.getContent().querySelectorAll('.modal-wrapper input').forEach((element: HTMLInputElement) => {
      element.addEventListener('focus', () => {
        removeError(element);
      });
      element.addEventListener('blur', () => {
        validateInput(element);
      });
    });

    this.getContent().querySelector('#newChat')?.addEventListener('submit', this.handleCreateChat());
  }

  componentDidRender() {
    this.addListeners();
  }

  componentDidMount() {
    this.getChats();
  }

  render() {
    return Handlebars.compile(template)({
      chats: new Chats({
        chatsList: this.props?.chatsList,
      }).render(),
    });
  }
}
