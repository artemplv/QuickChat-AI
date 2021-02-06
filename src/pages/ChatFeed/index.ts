import { Block } from '../../modules/block';
import { Chats } from '../../components/Chats/index';
import { ChatFeed } from '../../components/ChatFeed/index';
import { template } from './template';
import { sampleChats } from './sampleChats';
import { render } from '../../utils/render';

export class ChatFeedPage extends Block {
  public props: any
  constructor(props: { chatsList: any[] }) {
    super("div", {
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

const chatFeedPage = new ChatFeedPage({ chatsList: sampleChats });

render(".app", chatFeedPage);
