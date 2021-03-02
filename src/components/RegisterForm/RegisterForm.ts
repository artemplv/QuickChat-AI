import Form from "../Form/index.js";
import Button from "../Button/index.js";
import { template } from './template.js';

export const RegisterForm = new Form({
  formId: 'signUpForm',
  className: 'sign-form',
  mainContent: template,
  buttonOk: new Button({
    children: 'Зарегистрироваться',
    className: 'button_main',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    onClick: `navigate('/login')`,
    children: `<a class="button-link">Войти</a>`,
    className: 'button_additional',
    htmlType: 'button',
  }).render(),
});

export default RegisterForm;
