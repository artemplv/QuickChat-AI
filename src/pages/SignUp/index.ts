import { SignPage } from '../Sign/index.js';
import { registerForm } from "../../components/RegisterForm/index.js";
import { render } from '../../utils/render.js';
import { submitForm } from '../../utils/submitForm.js';
import {
  validateInput,
  removeError,
} from '../../utils/validation.js';

const registerPage: any = new SignPage({
  form: registerForm,
});

registerPage.getContent().querySelector('#signUpForm').addEventListener('submit', function(event: { preventDefault: () => void; }) {
  event.preventDefault();
  submitForm('signUpForm');
});

registerPage.getContent().querySelectorAll('input').forEach((element: HTMLInputElement) => {
  element.addEventListener('focus', () => {
    removeError(element);
  });
  
  element.addEventListener('blur', () => {
    validateInput(element);
  });
});

// app — это id дива в корне DOM
render('.app', registerPage);
