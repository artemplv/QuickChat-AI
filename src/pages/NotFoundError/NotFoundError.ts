import Block from '../../modules/block.js';
import Button from "../../components/Button/index.js";

import { template } from './template.js';

export default class NotFoundError extends Block {
  constructor() {
    super('div');
  }

  render() {
    return Handlebars.compile(template)({
      button: new Button({
        className: 'button_additional',
        children: `<a class="button-link">Назад к чатам</a>`,
        onClick: `navigate('/chats')`,
      }).render(),
    });
  }
}
