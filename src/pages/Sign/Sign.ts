import Handlebars from 'handlebars';
import Block from '../../modules/block';
import submitForm from '../../utils/submitForm';
import sessionStorageAuth from '../../utils/sessionStorageAuth';
import {
  validateInput,
  removeError,
} from '../../utils/validation';
import { navigate } from '../../router/navigate';

import AuthAPI from '../../api/auth';

import template from './template';

const authApi = new AuthAPI();

interface Props extends PlainObject {
  form?: InstanceType<typeof Block>;
}

export default class SignPage extends Block {
  public props: Props;

  constructor(props?: Props) {
    super('div', props);
  }

  async handleSubmitSignInForm(event: ClickEvent) {
    event.preventDefault();
    const data = submitForm('signInForm');

    if (data) {
      try {
        const response: any = await authApi.signin(data);
        if (response.status === 200) {
          sessionStorageAuth.login(response.data.accessToken, response.data.user.id);
          navigate('/chats');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async handleSubmitSignUpForm(event: ClickEvent) {
    event.preventDefault();
    const data = submitForm('signUpForm');

    if (data) {
      try {
        const response: any = await authApi.signup(data);
        if (response.status === 200) {
          sessionStorage.setItem('token', response.data.accessToken);
          navigate('/chats');
        }
      } catch (error) {
        console.error(error);
      }
    }
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

  componentDidRender() {
    this.addListeners();
  }

  render() {
    return Handlebars.compile(template)({
      form: this.props?.form?.render(),
    });
  }
}
