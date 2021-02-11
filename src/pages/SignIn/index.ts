import { SignPage } from '../Sign/index.js';
import { loginForm } from '../../components/LoginForm/index.js';
import { render } from '../../utils/render.js';
import { submitForm } from '../../utils/submitForm.js';
import {
  validateInput,
  removeError,
} from '../../utils/validation.js';

const loginPage: any = new SignPage({
  form: loginForm,
});

loginPage.getContent().querySelector('#signInForm').addEventListener('submit', function(event: { preventDefault: () => void; }) {
  event.preventDefault();
  submitForm('signInForm');
});

loginPage.getContent().querySelectorAll('input').forEach((element: HTMLInputElement) => {
  element.addEventListener('focus', () => {
    removeError(element);
  });

  element.addEventListener('blur', () => {
    validateInput(element);
  });
});

render('.app', loginPage);
