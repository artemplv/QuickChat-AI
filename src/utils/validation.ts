interface regexpsObject {
  [key: string]: string;
}

const inputsRegexp: regexpsObject = {
  email: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
  phone: `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`,
  first_name: `^[A-Za-zА-Яа-яЁё ,.'-]+$`,
  last_name: `^[A-Za-zА-Яа-яЁё ,.'-]+$`,
  second_name: `^[A-Za-zА-Яа-яЁё ,.'-]+$`,
};

const makeError = (element: HTMLInputElement, text: string): void => {
  const error: any = document.createElement('div');
  error.className = 'input-error-message';
  error.innerText = text;

  if (element?.parentElement) {
    element.parentElement.insertBefore(error, element.nextSibling);

    element.classList.add('invaid-input');
  }
}

const removeError = (element: HTMLInputElement): void => {
  const oldError: any = element?.parentElement?.querySelector('.input-error-message');
  if (oldError) {
    oldError.remove();
    element.classList.remove('invaid-input');
  }
}

export function validateInput(inputElement: HTMLInputElement) {
  removeError(inputElement);

  if (!inputElement.value || inputElement.value === ' ') {
    makeError(inputElement, 'Поле не должно быть пустым');
    throw Error('Input field should not be empty');
  }

  const inputName: string = inputElement.name;

  if (inputsRegexp[inputName]) {
    const regexp = new RegExp(inputsRegexp[inputName], 'u');
    if (!regexp.test(inputElement.value)) {
      makeError(inputElement, 'Неверный формат данных');
      throw Error('Invalid input field value');
    }
  }

  if (inputName === 'password_repeat') {
    const newPasswordField: HTMLInputElement | null = inputElement?.closest('form')?.querySelector('#newPassword')
      || inputElement?.closest('form')?.querySelector('#password')
      || null;
    if (newPasswordField && inputElement.value !== newPasswordField.value) {
      makeError(inputElement, 'Пароли не совпадают');
      throw Error('Passwords are not the same');
    }
  }
}
