import { SignPage } from '../Sign/index.js';
import { loginForm } from '../../components/LoginForm/index.js';
import { render } from '../../utils/render.js';
import { submitForm } from '../../utils/submitForm.js';

const loginPage: any = new SignPage({
  form: loginForm,
});

loginPage.getContent().querySelector('#signInForm').addEventListener('submit', function(event: { preventDefault: () => void; }) {
  event.preventDefault();
  submitForm('signInForm');
});

loginPage.getContent().querySelectorAll('input').forEach((element: HTMLElement) => {
    element.addEventListener('blur', () => {
      // element.checkValidity();
    });
});
// app — это id дива в корне DOM
render(".app", loginPage);
