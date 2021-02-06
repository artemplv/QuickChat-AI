import { Block } from "../../modules/block";
import { template } from './template.js';

export class Form extends Block {
  public props: any;
  constructor(props: {}) {
    super("div", props);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
