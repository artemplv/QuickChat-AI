import Block from '../../modules/block.js';
import Button from '../Button/index.js';
import { template } from './template.js';

interface Props extends PlainObject {
  chatsList?: ChatObject[];
}


export default class Chats extends Block {
  public props: Props;
  constructor(props?: Props) {
    super('div', {
      chatsList: props?.chatsList,
      profileButton: new Button({
        className: 'profile-button',
        onClick: `navigate('/profile')`,
        children: `
          <div class="button-inner-container">
            <a class="button-link">Профиль</a>
            <img src="static/assets/images/arrow-right.svg" alt="arrow right" class="button-arrow-right-image" />
          </div>
        `,
      }),
    });
  }

  render() {
    return Handlebars.compile(template)({
      chatsList: this.props.chatsList,
      profileButton: this.props.profileButton.render(),
    });
  }
}
