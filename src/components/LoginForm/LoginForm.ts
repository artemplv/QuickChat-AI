import Form from "../Form";
import Button from "../Button";
import { template } from './template';

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
