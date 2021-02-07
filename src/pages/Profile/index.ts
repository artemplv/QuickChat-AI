import { Block } from '../../modules/block.js';
import { userDataForm } from '../../components/UserDataForm/index.js';
import { userPasswordForm } from '../../components/UserPasswordForm/index.js';
import { Button } from '../../components/Button/index.js';
import { render } from '../../utils/render.js';

import { template } from './template.js';

export class Profile extends Block {
  public props: any;
  constructor() {
    super("div", {
      goBackButton: new Button({
        className: 'image-button',
        htmlType: 'submit',
        children: `
          <a href="./chats.html"><img src="static/assets/images/send-message-icon.svg" alt="options" width="28" height="28" style="transform: rotate(180deg)" /></a>
        `,
      }),
      changeAvatarButton: new Button({
        className: 'change-avatar-button',
        htmlType: 'button',
        children: 'Поменять<br>аватар',
      }),
      changeDataButton: new Button({
        className: 'profile-data__additional-button',
        htmlType: 'button',
        children: 'Изменить данные',
      }),
      changePasswordButton: new Button({
        className: 'profile-data__additional-button',
        htmlType: 'button',
        children: 'Изменить пароль',
      }),
      logoutButton: new Button({
        className: 'profile-data__additional-button logout-button',
        htmlType: 'button',
        children: `<a class="button-link" href="./login.html">Выйти</a>`,
      }),
      changeDataForm: userDataForm,
      changePasswordForm: userPasswordForm,
    });
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

const profilePage = new Profile();

render(".app", profilePage);
