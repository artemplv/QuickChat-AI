import { SignPage } from '../Sign/index';
import { loginForm } from '../../components/LoginForm/index.js';
import { render } from '../../utils/render';
import { submitForm } from '../../utils/submitForm.js';

const loginPage = new SignPage({
  form: loginForm,
});

loginPage.getContent().querySelector('#signInForm').addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm('signInForm');
});

loginPage.getContent().querySelectorAll('input').forEach((element) => {
    element.addEventListener('blur', () => {
      element.checkValidity();
    });
});
// app — это id дива в корне DOM
render(".app", loginPage);
