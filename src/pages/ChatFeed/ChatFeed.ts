import Block from '../../modules/block.js';
import Chats from '../../components/Chats/index.js';
import ChatFeed from '../../components/ChatFeed/index.js';
import { template } from './template.js';
import handleModal from '../../utils/handleModals.js';

interface Props extends PlainObject {
  chatsList?: ChatObject[];
}

export default class ChatFeedPage extends Block {
  public props: Props;
  constructor(props?: Props) {
    super('div', props);
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

  addListeners() {
    this.getContent().querySelector('.add-user-button')?.addEventListener('click', this.handleAddUserModal);
    this.getContent().querySelector('.delete-user-button')?.addEventListener('click', this.handleDeleteUserModal);
    this.getContent().querySelector('.delete-chat-button')?.addEventListener('click', this.handleDeleteChatModal);
  }

  componentDidRender() {
    this.addListeners();
  }

  render() {
    return Handlebars.compile(template)({
      chats: new Chats({
        chatsList: this.props?.chatsList,
      }).render(),
      feed: new ChatFeed({
        chatName: this.props?.chatId,
      }).render(),
    });
  }
}
