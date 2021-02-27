import Form from "../Form/index.js";
import Button from "../Button/index.js";
import { template } from './template.js';

export const loginForm = new Form({
  formId: 'signInForm',
  className: 'sign-form',
  mainContent: template,
  buttonOk: new Button({
    children: 'Авторизоваться',
    className: 'form__main-button',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    onClick: `navigate('/signup')`,
    children: `<a class="button-link">Нет аккаунта?</a>`,
    className: 'form__additional-button',
    htmlType: 'button',
  }).render(),
});
