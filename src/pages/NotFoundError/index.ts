import Block from '../../modules/block.js';
import Button from "../../components/Button/index.js";

import { template } from './template.js';

export default class NotFoundError extends Block {
  public props: any
  constructor() {
    super('div', {
      button: new Button({
        className: 'form__additional-button',
        children: `<a class="button-link">Назад к чатам</a>`,
        onClick: `navigate('/chats')`,
      }),
    });
  }

  render() {
    return Handlebars.compile(template)({
      button: this.props.button.render(),
    });
  }
}
