import { Block } from '../../modules/block.js';
import { Chats } from '../../components/Chats/index.js';
import { ChatFeed } from '../../components/ChatFeed/index.js';
import { template } from './template.js';
import { sampleChats } from './sampleChats.js';
import { render } from '../../utils/render.js';
import handleModal from '../../utils/handleModals.js';

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

  render() {
    return Handlebars.compile(template)({
      chats: this.props.chats.render(),
      feed: this.props.feed.render(),
    });
  }
}

const chatFeedPage: any = new ChatFeedPage({ chatsList: sampleChats });

chatFeedPage.getContent().querySelector('.add-user-button').addEventListener('click', function(event: { preventDefault: () => void; }) {
  event.preventDefault();
  handleModal('add-user-modal');
});

chatFeedPage.getContent().querySelector('.delete-user-button').addEventListener('click', function(event: { preventDefault: () => void; }) {
  event.preventDefault();
  handleModal('remove-user-modal');
});

chatFeedPage.getContent().querySelector('.delete-chat-button').addEventListener('click', function(event: { preventDefault: () => void; }) {
  event.preventDefault();
  handleModal('delete-chat-modal');
});

render('.app', chatFeedPage);
