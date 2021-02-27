import { Block } from '../../modules/block.js';
import { Chats } from '../../components/Chats/index.js';
import { ChatFeed } from '../../components/ChatFeed/index.js';
import { template } from './template.js';
// import { sampleChats } from './sampleChats.js';
// import { render } from '../../utils/render.js';
import handleModal from '../../utils/handleModals.js';

interface clickEvent {
  preventDefault: () => void;
}

export class ChatFeedPage extends Block {
  public props: any
  constructor(props: { chatsList: any[] }) {
    super('div', {
      chats: new Chats({
        chatsList: props.chatsList,
      }),
      feed: new ChatFeed({
        chatName: 'Вадим',
      }),
    });
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

  componentDidMount() {
    this.addListeners();
  }

  render() {
    return Handlebars.compile(template)({
      chats: this.props.chats.render(),
      feed: this.props.feed.render(),
    });
  }
}
