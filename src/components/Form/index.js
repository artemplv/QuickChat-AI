import { Block } from "../../modules/block.js";
import { template } from './template.js';

export class Form extends Block {
  constructor(props) {
    super("div", props);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
