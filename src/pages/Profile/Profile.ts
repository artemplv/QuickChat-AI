import Handlebars from 'handlebars';
import Block from '../../modules/block';
import Button from '../../components/Button';
import { navigate } from '../../router/navigate';

import UserDataForm from '../../components/UserDataForm';
import UserPasswordForm from '../../components/UserPasswordForm';

import {
  onChangeDetailsClick,
  onChangePasswordClick,
  cancelDetailsChange,
  cancelPasswordChange,
} from '../../utils/handleUserDataButtons';

import {
  handleAvatarUpload,
  resetAvatarForm,
  submitAvatar,
} from '../../utils/handleAvatar';

import handleModal from '../../utils/handleModals';
import submitForm from '../../utils/submitForm';

import {
  validateInput,
  removeError,
} from '../../utils/validation';

import AuthAPI from '../../api/auth';
import UsersAPI from '../../api/users';

const authApi = new AuthAPI();
const usersApi = new UsersAPI();

const host = 'https://ya-praktikum.tech';

import { template } from './template';


export default class Profile extends Block {
  public props: any;
  constructor(props: any) {
    super('div', {
      goBackButton: new Button({
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

  handleSubmitAvatar() {
    const self = this;

    return async function(event: clickEvent) {
      event.preventDefault();
      const data = submitAvatar();

      if (data) {
        try {
          const response: any = await usersApi.changeAvatar(data);
          if (response.status === 200) {
            self.getData();
            resetAvatarForm();
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

    this.getContent().querySelector('.avatar-upload-input')?.addEventListener('change', handleAvatarUpload);
    this.getContent().querySelector('#avatarForm')?.addEventListener('submit', this.handleSubmitAvatar());

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
      changeDataForm: UserDataForm(this.props.userData).render(),
      changePasswordForm: UserPasswordForm.render(),
      avatarUrl: this.props.userData?.avatar ? `${host}${this.props.userData.avatar}` : '../images/media-icon-grey.svg',
    });
  }
}
