import Form from "../Form/index.js";
import Button from "../Button/index.js";
import { template } from './template.js';


export const UserDataForm = (userData: any = {}) => new Form({
  formId: 'userDetails',
  className: 'profile-data__form',
  controlsWrapperClassName: 'profile-data__form-controls',
  isControlsHidden: true,
  mainContent: Handlebars.compile(template)(userData),
  buttonOk: new Button({
    children: 'Сохранить',
    className: 'button_main',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    children: 'Отменить',
    className: 'button_additional cancel-details-change-button',
    htmlType: 'button',
  }).render(),
});

export default UserDataForm;
