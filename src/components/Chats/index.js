import { Block } from '../../modules/block.js';
import { Button } from '../Button/index.js';
import { template } from './template.js';

export class Chats extends Block {
  constructor(props) {
    super("div", {
      chatsList: props.chatsList,
      profileButton: new Button({
        className: 'profile-button',
        children: `
          <div class="button-inner-container">
            <a class="button-link" href="./profile.html">Профиль</a>
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
