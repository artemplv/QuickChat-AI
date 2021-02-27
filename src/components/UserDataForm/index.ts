import Block from '../../modules/block.js';
import Button from '../Button/index.js';
import { template } from './template.js';

// const sampleUser = {
//   email: 'pochta@yandex.ru',
//   login: 'ivanivanov',
//   first_name: 'Иван',
//   second_name: 'Иванов',
//   display_name: 'Иван',
//   phone: '+7 (909) 967 30 30',
// };

// const mainContent = Handlebars.compile(template)(sampleUser);

export default class UserDataForm extends Block {
  public props: any;
  constructor(props: any) {
    super('div', {
      formId: 'userDetails',
      className: 'profile-data__form',
      controlsWrapperClassName: 'profile-data__form-controls',
      isControlsHidden: true,
      buttonOk: new Button({
        children: 'Сохранить',
        className: 'form__main-button',
        htmlType: 'submit',
      }),
      buttonCancel: new Button({
        children: 'Отменить',
        className: 'form__additional-button cancel-details-change-button',
        htmlType: 'button',
      }),
      userData: props?.userData || {},
    });
  }

  render() {
    return Handlebars.compile(template)({
      formId: this.props.formId,
      className: this.props.className,
      controlsWrapperClassName: this.props.controlsWrapperClassName,
      isControlsHidden: this.props.isControlsHidden,
      buttonOk: this.props.buttonOk.render(),
      buttonCancel: this.props.buttonCancel.render(),
      ...this.props.userData,
    });
  }
}
