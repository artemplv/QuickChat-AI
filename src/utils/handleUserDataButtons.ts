/**
 * Управление кнопками для изменений в профиле
 */
export function onChangeDetailsClick(): void {
  const detailsForm = <HTMLFormElement> document.getElementById('userDetails');

  const inputs: HTMLCollectionOf<HTMLInputElement> = detailsForm.getElementsByTagName('input');

  for (const input of inputs as any) {
    input.disabled = false;
  }

  const controlButtons = <HTMLElement> document.getElementsByClassName('profile-data__control-buttons')[0];
  controlButtons.hidden = true;

  const formButtons = <HTMLElement> document.getElementsByClassName('profile-data__form-controls')[0];
  formButtons.hidden = false;
}

export function cancelDetailsChange(): void {
  const detailsForm = <HTMLFormElement> document.getElementById('userDetails');

  detailsForm.reset();

  const inputs: HTMLCollectionOf<HTMLInputElement> = detailsForm.getElementsByTagName('input');

  for (const input of inputs as any) {
    input.disabled = true;
  }

  const controlButtons = <HTMLElement> document.getElementsByClassName('profile-data__control-buttons')[0];
  controlButtons.hidden = false;

  const formButtons = <HTMLElement> document.getElementsByClassName('profile-data__form-controls')[0];
  formButtons.hidden = true;
}

export function onChangePasswordClick(): void {
  const passwordForm = <HTMLFormElement> document.getElementById('userPassword');
  const detailsForm = <HTMLFormElement> document.getElementById('userDetails');
  const controlButtons = <HTMLElement> document.getElementsByClassName('profile-data__control-buttons')[0];

  detailsForm.hidden = true;
  passwordForm.hidden = false;
  controlButtons.hidden = true;
}

export function cancelPasswordChange() {
  const passwordForm = <HTMLFormElement> document.getElementById('userPassword');
  const detailsForm = <HTMLFormElement> document.getElementById('userDetails');
  const controlButtons = <HTMLElement> document.getElementsByClassName('profile-data__control-buttons')[0];

  passwordForm.reset();
  passwordForm.hidden = true;
  detailsForm.hidden = false;
  controlButtons.hidden = false;
}
