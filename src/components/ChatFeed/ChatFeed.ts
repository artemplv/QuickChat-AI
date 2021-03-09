import Block from '../../modules/block.js';
import Button from '../Button/index.js';
import Form from "../Form/index.js";

import { template } from './template.js';

export default class ChatFeed extends Block {
  public props: PlainObject;

  constructor(props?: PlainObject) {
    super('div', props);
  }

  render() {
    return Handlebars.compile(template)({
      chatName: this.props?.chatName,
      avatarUrl: this.props?.avatar,
      chatMembers: this.props?.chatMembers,
      loggedUserId: this.props?.loggedUserId,
      messages: this.props?.messages,

      chatMembersDropdownButton: new Button({
        className: 'button_additional dropdown-button',
        children: 'Участники чата',
      }).render(),
      chatOptionsDropdownButton: new Button({
        className: 'dropdown-button',
        children: `<img src="static/assets/images/options-button.svg" alt="options" width="25" height="25" />`,
      }).render(),
      addUserButton: new Button({
        className: 'button-with-image-and-text add-user-button',
        children: `
          <img src="static/assets/images/add-icon.svg" class="image-inside-button" alt="add user" width="22" height="22" />
          Добавить пользователя
        `,
      }).render(),
      deleteUserButton: new Button({
        className: 'button-with-image-and-text delete-user-button',
        children: `
          <img src="static/assets/images/remove-icon.svg" class="image-inside-button" alt="remove user" width="22" height="22" />
          Удалить пользователя
        `,
      }).render(),
      deleteChatButton: new Button({
        className: 'button-with-image-and-text delete-chat-button',
        children: `
          <img src="static/assets/images/remove-icon.svg" class="image-inside-button" alt="remove user" width="22" height="22" />
          Удалить чат
        `,
      }).render(),
      messageOptionsButton: new Button({
        className: 'dropdown-button',
        children: `<img src="static/assets/images/attachments.svg" alt="add attachments" width="32" height="32" />`,
      }).render(),
      addMediaButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/media-icon.svg" class="image-inside-button" alt="add media" width="22" height="22" />
          Фото или Видео
        `,
      }).render(),
      addFileButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/file-icon.svg" class="image-inside-button" alt="add file" width="22" height="22" />
          Файл
        `,
      }).render(),
      addLocationButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/location-icon.svg" class="image-inside-button" alt="add location" width="22" height="22" />
          Локация
        `,
      }).render(),
      newMessageForm: new Form({
        formId: 'messageForm',
        className: 'message-form',
        mainContent: `<textarea class="message-textarea" name="message" placeholder="Сообщение" required></textarea>`,
        buttonOk: new Button({
          children: `<img src="static/assets/images/send-message-icon.svg" alt="options" width="28" height="28" />`,
          htmlType: 'submit',
        }).render(),
      }).render(),
    });
  }
}
