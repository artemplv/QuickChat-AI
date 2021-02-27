import { Block } from '../../modules/block.js';
import { userDataForm } from '../../components/UserDataForm/index.js';
import { userPasswordForm } from '../../components/UserPasswordForm/index.js';
import { Button } from '../../components/Button/index.js';
import {
  onChangeDetailsClick,
  onChangePasswordClick,
  cancelDetailsChange,
  cancelPasswordChange,
} from '../../utils/handleUserDataButtons.js';
import handleModal from '../../utils/handleModals.js';
import { submitForm } from '../../utils/submitForm.js';
import {
  validateInput,
  removeError,
} from '../../utils/validation.js';

import { template } from './template.js';

interface clickEvent {
  preventDefault: () => void;
}

export class Profile extends Block {
  public props: any;
  constructor() {
    super('div', {
      goBackButton: new Button({
        className: 'image-button',
        htmlType: 'submit',
        onClick: `navigate('/chats')`,
        children: `
          <img src="static/assets/images/send-message-icon.svg" alt="options" width="28" height="28" style="transform: rotate(180deg)" />
        `,
      }),
      changeAvatarButton: new Button({
        className: 'change-avatar-button',
        htmlType: 'button',
        children: 'Поменять<br>аватар',
      }),
      changeDataButton: new Button({
        className: 'profile-data__additional-button change-data-intention-button',
        htmlType: 'button',
        children: 'Изменить данные',
      }),
      changePasswordButton: new Button({
        className: 'profile-data__additional-button change-password-intention-button',
        htmlType: 'button',
        children: 'Изменить пароль',
      }),
      logoutButton: new Button({
        className: 'profile-data__additional-button logout-button',
        htmlType: 'button',
        onClick: `navigate('/login')`,
        children: `<a class="button-link">Выйти</a>`,
      }),
      changeDataForm: userDataForm,
      changePasswordForm: userPasswordForm,
    });
  }

  handleAvatarModal(event: clickEvent) {
    event.preventDefault();
    handleModal('uploadAvatarModal');
  }

  handleSubmitDetails(event: clickEvent) {
    event.preventDefault();
    submitForm('userDetails');
  }

  handleSubmitPassword(event: clickEvent) {
    event.preventDefault();
    submitForm('userPassword');
  }

  addListeners() {
    this.getContent().querySelector('.change-data-intention-button')?.addEventListener('click', onChangeDetailsClick);
    this.getContent().querySelector('.change-password-intention-button')?.addEventListener('click', onChangePasswordClick);
    this.getContent().querySelector('.cancel-details-change-button')?.addEventListener('click', cancelDetailsChange);
    this.getContent().querySelector('.cancel-password-change-button')?.addEventListener('click', cancelPasswordChange);
    this.getContent().querySelector('.change-avatar-button')?.addEventListener('click', this.handleAvatarModal);

    this.getContent().querySelectorAll('input').forEach((element: HTMLInputElement) => {
      element.addEventListener('focus', () => {
        removeError(element);
      });
      element.addEventListener('blur', () => {
        validateInput(element);
      });
    });

    this.getContent().querySelector('#userDetails')?.addEventListener('submit', this.handleSubmitDetails);
    this.getContent().querySelector('#userPassword')?.addEventListener('submit', this.handleSubmitPassword);
  }

  componentDidMount() {
    this.addListeners();
  }

  render() {
    return Handlebars.compile(template)({
      goBackButton: this.props.goBackButton.render(),
      changeAvatarButton: this.props.changeAvatarButton.render(),
      changeDataButton: this.props.changeDataButton.render(),
      changePasswordButton: this.props.changePasswordButton.render(),
      logoutButton: this.props.logoutButton.render(),
      changeDataForm: this.props.changeDataForm.render(),
      changePasswordForm: this.props.changePasswordForm.render(),
    });
  }
}
