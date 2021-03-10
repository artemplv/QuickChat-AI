import Form from "../Form";
import Button from "../Button";
import { template } from './template';

export const UserPasswordForm = new Form({
  formId: 'userPassword',
  className: 'profile-data__form',
  controlsWrapperClassName: 'profile-data__form-controls',
  isHidden: true,
  mainContent: template,
  buttonOk: new Button({
    children: 'Сохранить',
    className: 'button_main',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    children: 'Отменить',
    className: 'button_additional cancel-password-change-button',
    htmlType: 'button',
  }).render(),
});

export default UserPasswordForm;
