import { Form } from "../Form/index";
import { Button } from "../Button/index";
import { template } from './template';

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
    children: `<a class="button-link" href="./signup.html">Нет аккаунта?</a>`,
    className: 'form__additional-button',
    htmlType: 'button',
  }).render(),
});
