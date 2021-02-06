import { Block } from "../../modules/block";
import { template } from './template';

export class SignPage extends Block {
  public props: any;
  constructor(props: {}) {
    super("div", props);
  }

  render() {
    return Handlebars.compile(template)({
      form: this.props.form.render(),
    });
  }
}
