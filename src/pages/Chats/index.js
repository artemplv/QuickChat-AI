import { Block } from '../../modules/block.js';
import { Chats } from '../../components/Chats/index.js';
import { template } from './template.js';
import { sampleChats } from './sampleChats.js';
import { render } from '../../utils/render.js';

export class ChatsPage extends Block {
  constructor(props) {
    super("div", {
      chats: new Chats({
        chatsList: props.chatsList,
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
    });
  }
}

const chatsPage = new ChatsPage({ chatsList: sampleChats });

render(".app", chatsPage);
