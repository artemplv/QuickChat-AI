import Form from "../Form/index.js";
import Button from "../Button/index.js";
import { template } from './template.js';

export const LoginForm = new Form({
  formId: 'signInForm',
  className: 'sign-form',
  mainContent: template,
  buttonOk: new Button({
    children: 'Авторизоваться',
    className: 'button_main',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    onClick: `navigate('/signup')`,
    children: `<a class="button-link">Нет аккаунта?</a>`,
    className: 'button_additional',
    htmlType: 'button',
  }).render(),
});

export default LoginForm;
