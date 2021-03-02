import Block from '../../modules/block.js';
import Button from '../Button/index.js';
import { template } from './template.js';


interface Props extends PlainObject {
  chatsList?: ChatObject[];
}


export default class Chats extends Block {
  public props: Props;
  constructor(props?: Props) {
    super('div', props);
  }


  render() {
    return Handlebars.compile(template)({
      chatsList: this.props?.chatsList,
      createChatButton: new Button({
        className: 'button_additional create-chat',
        children: 'Новый чат',
        htmlType: 'button',
      }).render(),
      profileButton: new Button({
        className: 'profile-button',
        onClick: `navigate('/profile')`,
        children: `
          <div class="button-inner-container">
            <a class="button-link">Профиль</a>
            <img src="static/assets/images/arrow-right.svg" alt="arrow right" class="button-arrow-right-image" />
          </div>
        `,
      }).render(),
    });
  }
}
