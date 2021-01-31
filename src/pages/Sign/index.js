import { Block } from "../../modules/block.js";
import { template } from './template.js';

export class SignPage extends Block {
  constructor(props) {
    super("div", props);
  }

componentDidMount() {
    // setTimeout(() => {
    //   this.setProps({
    //       name: "Login 3",
    //   });
    // }, 5000);
  }

  render() {
    return Handlebars.compile(template)({
      form: this.props.form.render(),
    });
  }
}
