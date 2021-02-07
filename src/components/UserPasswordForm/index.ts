import { Form } from "../Form/index.js";
import { Button } from "../Button/index.js";
import { template } from './template.js';


export const userPasswordForm = new Form({
  formId: 'userPassword',
  className: 'profile-data__form',
  controlsWrapperClassName: 'profile-data__form-controls',
  mainContent: template,
  buttonOk: new Button({
    children: 'Сохранить',
    className: 'form__main-button',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    children: 'Отменить',
    className: 'form__additional-button',
    htmlType: 'button',
  }).render(),
});
