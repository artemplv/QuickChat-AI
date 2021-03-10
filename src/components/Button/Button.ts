import Handlebars from 'handlebars';
import Block from "../../modules/block";
import { template } from './template';

export default class Button extends Block {
  constructor(props: {}) {
    super('div', props);
  }

  render() {
    return Handlebars.compile(template)(this.props);
  }
}
