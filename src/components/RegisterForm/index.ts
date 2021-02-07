import { Form } from "../Form/index.js";
import { Button } from "../Button/index.js";
import { template } from './template.js';

export const registerForm = new Form({
  formId: 'signUpForm',
  className: 'sign-form',
  mainContent: template,
  buttonOk: new Button({
    children: 'Зарегистрироваться',
    className: 'form__main-button',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    children: `<a class="button-link" href="./login.html">Войти</a>`,
    className: 'form__additional-button',
    htmlType: 'button',
  }).render(),
});
