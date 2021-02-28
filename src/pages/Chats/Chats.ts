import Block from '../../modules/block.js';
import Chats from '../../components/Chats/index.js';
import { template } from './template.js';

interface Props extends PlainObject {
  chatsList?: ChatObject[];
}


export default class ChatsPage extends Block {
  public props: Props;
  constructor(props?: Props) {
    super('div', props);
  }

  render() {
    return Handlebars.compile(template)({
      chats: new Chats({
        chatsList: this.props?.chatsList,
      }).render(),
    });
  }
}
