import { Block } from "../../modules/block.js";
import { template } from './template';

export class Button extends Block {
  constructor(props: {}) {
    super("div", props);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
