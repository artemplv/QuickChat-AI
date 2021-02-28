import Block from '../../modules/block.js';
import Button from '../../components/Button/index.js';

import { userDataForm } from '../../components/UserDataForm/index.js';
import { userPasswordForm } from '../../components/UserPasswordForm/index.js';

import {
  onChangeDetailsClick,
  onChangePasswordClick,
  cancelDetailsChange,
  cancelPasswordChange,
} from '../../utils/handleUserDataButtons.js';

import handleModal from '../../utils/handleModals.js';
import submitForm from '../../utils/submitForm.js';

import {
  validateInput,
  removeError,
} from '../../utils/validation.js';

import AuthAPI from '../../api/auth/index.js';
import UsersAPI from '../../api/users/index.js';

const authApi = new AuthAPI();
const usersApi = new UsersAPI();

import { template } from './template.js';


export default class Profile extends Block {
  public props: any;
  constructor(props: any) {
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
        children: `<a class="button-link">Выйти</a>`,
      }),
      changePasswordForm: userPasswordForm,
      props,
    });
  }

  handleAvatarModal(event: clickEvent) {
    event.preventDefault();
    handleModal('uploadAvatarModal');
  }

  async handleLogout(event: clickEvent) {
    event.preventDefault();
    await authApi.logout();
    navigate('/login');
  }

  async getData() {
    const response: any = await authApi.getUser();
    this.setProps({ userData: response.data || null });
  }

  handleSubmitDetails() {
    const self = this;

    return async function(event: clickEvent) {
      event.preventDefault();
      const data = submitForm('userDetails');

      if (data) {
        try {
          const response: any = await usersApi.changeProfile(data);
          if (response.status === 200) {
            self.getData();
          }
        } catch(error) {
          console.error(error);
        }
      }
    }
  }

  async handleSubmitPassword(event: clickEvent) {
    event.preventDefault();
    const data = submitForm('userPassword');

    if (data) {
      try {
        const response: any = await usersApi.changePassword(data);
        if (response.status === 200) {
          cancelPasswordChange({ preventDefault: () => {} });
        }
      } catch(error) {
        console.error(error);
      }
    }
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

    this.getContent().querySelector('#userDetails')?.addEventListener('submit', this.handleSubmitDetails());
    this.getContent().querySelector('#userPassword')?.addEventListener('submit', this.handleSubmitPassword);

    this.getContent().querySelector('.logout-button')?.addEventListener('click', this.handleLogout);
  }

  componentDidMount() {
    this.getData();
  }

  componentDidRender() {
    this.addListeners();
  }

  render() {
    return Handlebars.compile(template)({
      goBackButton: this.props.goBackButton.render(),
      changeAvatarButton: this.props.changeAvatarButton.render(),
      changeDataButton: this.props.changeDataButton.render(),
      changePasswordButton: this.props.changePasswordButton.render(),
      logoutButton: this.props.logoutButton.render(),
      changeDataForm: userDataForm(this.props.userData).render(),
      changePasswordForm: this.props.changePasswordForm.render(),
    });
  }
}
