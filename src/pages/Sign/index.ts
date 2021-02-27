import { Block } from "../../modules/block.js";
import { template } from './template.js';
import { submitForm } from '../../utils/submitForm.js';
import {
  validateInput,
  removeError,
} from '../../utils/validation.js';

interface clickEvent {
  preventDefault: () => void;
}

export class SignPage extends Block {
  public props: any;
  constructor(props: {}) {
    super('div', props);
  }

  handleSubmitSignInForm(event: clickEvent) {
    event.preventDefault();
    submitForm('signInForm');
  }

  handleSubmitSignUpForm(event: clickEvent) {
    event.preventDefault();
    submitForm('signUpForm');
  }

  addListeners() {
    this.getContent().querySelector('#signInForm')?.addEventListener('submit', this.handleSubmitSignInForm);
    this.getContent().querySelector('#signUpForm')?.addEventListener('submit', this.handleSubmitSignUpForm);

    this.getContent().querySelectorAll('input').forEach((element: HTMLInputElement) => {
      element.addEventListener('focus', () => {
        removeError(element);
      });

      element.addEventListener('blur', () => {
        validateInput(element);
      });
    });
  }

  componentDidMount() {
    this.addListeners();
  }

  render() {
    return Handlebars.compile(template)({
      form: this.props.form.render(),
    });
  }
}
