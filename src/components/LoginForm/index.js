import { Form } from "../Form/index.js";
import { Button } from "../Button/index.js";
import { mainContent } from './mainContent.js';

export const loginForm = new Form({
  formId: 'signInForm',
  className: 'sign-form',
  mainContent,
  buttonOk: new Button({
    children: 'Авторизоваться',
    className: 'form__main-button',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    children: `<a class="button-link" href="./signup.html">Нет аккаунта?</a>`,
    className: 'form__additional-button',
    htmlType: 'button',
  }).render(),
});
