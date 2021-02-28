import Block from '../../modules/block.js';
import Chats from '../../components/Chats/index.js';
import { template } from './template.js';


interface Props extends PlainObject {
  chatsList?: ChatObject[];
}

export default class ChatsPage extends Block {
  public props: Props;
  constructor(props?: Props) {
    super('div', {
      chats: new Chats({
        chatsList: props?.chatsList,
      }),
    });
  }

  render() {
    return Handlebars.compile(template)({
      chats: this.props.chats.render(),
    });
  }
}
