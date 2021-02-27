import Form from "../Form/index.js";
import Button from "../Button/index.js";
import { template } from './template.js';

const sampleUser = {
  email: 'pochta@yandex.ru',
  login: 'ivanivanov',
  first_name: 'Иван',
  second_name: 'Иванов',
  display_name: 'Иван',
  phone: '+7 (909) 967 30 30',
};

const mainContent = Handlebars.compile(template)(sampleUser);

export const userDataForm = new Form({
  formId: 'userDetails',
  className: 'profile-data__form',
  controlsWrapperClassName: 'profile-data__form-controls',
  isControlsHidden: true,
  mainContent,
  buttonOk: new Button({
    children: 'Сохранить',
    className: 'form__main-button',
    htmlType: 'submit',
  }).render(),
  buttonCancel: new Button({
    children: 'Отменить',
    className: 'form__additional-button cancel-details-change-button',
    htmlType: 'button',
  }).render(),
});
