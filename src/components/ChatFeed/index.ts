import { Block } from '../../modules/block.js';
import { Button } from '../Button/index.js';
import { Form } from "../Form/index.js";

import { template } from './template.js';

export class ChatFeed extends Block {
  public props: any;

  constructor(props: { chatName: string }) {
    super("div", {
      chatName: props.chatName,
      chatOptionsDropdownButton: new Button({
        className: 'image-button dropdown-button',
        children: `<img src="static/assets/images/options-button.svg" alt="options" width="25" height="25" />`,
      }),
      addUserButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/add-icon.svg" class="image-inside-button" alt="add user" width="22" height="22" />
          Добавить пользователя
        `,
      }),
      deleteUserButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/remove-icon.svg" class="image-inside-button" alt="remove user" width="22" height="22" />
          Удалить пользователя
        `,
      }),
      deleteChatButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/remove-icon.svg" class="image-inside-button" alt="remove user" width="22" height="22" />
          Удалить чат
        `,
      }),
      messageOptionsButton: new Button({
        className: 'image-button dropdown-button',
        children: `<img src="static/assets/images/attachments.svg" alt="add attachments" width="32" height="32" />`,
      }),
      addMediaButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/media-icon.svg" class="image-inside-button" alt="add media" width="22" height="22" />
          Фото или Видео
        `,
      }),
      addFileButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/file-icon.svg" class="image-inside-button" alt="add file" width="22" height="22" />
          Файл
        `,
      }),
      addLocationButton: new Button({
        className: 'button-with-image-and-text',
        children: `
          <img src="static/assets/images/location-icon.svg" class="image-inside-button" alt="add location" width="22" height="22" />
          Локация
        `,
      }),
      newMessageForm: new Form({
        formId: 'messageForm',
        className: 'message-form',
        mainContent: `<textarea class="message-textarea" name="message" placeholder="Сообщение" required></textarea>`,
        buttonOk: new Button({
          children: `<img src="static/assets/images/send-message-icon.svg" alt="options" width="28" height="28" />`,
          className: 'image-button',
          htmlType: 'submit',
        }).render(),
      }),
    });
  }

  render() {
    return Handlebars.compile(template)({
      chatName: this.props.chatName,
      chatOptionsDropdownButton: this.props.chatOptionsDropdownButton.render(),
      addUserButton: this.props.addUserButton.render(),
      deleteUserButton: this.props.deleteUserButton.render(),
      deleteChatButton: this.props.deleteChatButton.render(),
      messageOptionsButton: this.props.messageOptionsButton.render(),
      addMediaButton: this.props.addMediaButton.render(),
      addFileButton: this.props.addFileButton.render(),
      addLocationButton: this.props.addLocationButton.render(),
      newMessageForm: this.props.newMessageForm.render(),
    });
  }
}
