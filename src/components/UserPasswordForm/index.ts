import { Form } from "../Form/index";
import { Button } from "../Button/index";
import { template } from './template';


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
