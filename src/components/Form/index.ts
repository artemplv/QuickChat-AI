import Block from "../../modules/block.js";
import { template } from './template.js';

export default class Form extends Block {
  public props: any;
  constructor(props: {}) {
    super('div', props);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
