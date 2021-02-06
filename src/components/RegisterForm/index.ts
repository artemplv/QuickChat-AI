import { Form } from "../Form/index";
import { Button } from "../Button/index";
import { template } from './template';

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
