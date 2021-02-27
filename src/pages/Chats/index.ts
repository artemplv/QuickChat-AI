import Block from '../../modules/block.js';
import Chats from '../../components/Chats/index.js';
import { template } from './template.js';

export default class ChatsPage extends Block {
  public props: any
  constructor(props: { chatsList: any[] }) {
    super('div', {
      chats: new Chats({
        chatsList: props.chatsList,
      }),
    });
  }

  render() {
    return Handlebars.compile(template)({
      chats: this.props.chats.render(),
    });
  }
}
