import Handlebars from 'handlebars';

import Block from "../../modules/block";
import { template } from './template';

export default class Form extends Block {
  public props: any;
  constructor(props: {}) {
    super('div', props);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
