import { Block } from '../../modules/block.js';
import { Chats } from '../../components/Chats/index.js';
import { ChatFeed } from '../../components/ChatFeed/index.js';
import { template } from './template.js';
import { sampleChats } from './sampleChats.js';
import { render } from '../../utils/render.js';

export class ChatFeedPage extends Block {
  constructor(props) {
    super("div", {
      chats: new Chats({
        chatsList: props.chatsList,
      }),
      feed: new ChatFeed({
        chatName: 'Вадим',
      }),
    });
  }

componentDidMount() {
    // setTimeout(() => {
    //   this.setProps({
    //       name: "Login 3",
    //   });
    // }, 5000);
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
