
export function handleAvatarUpload(event: clickEvent): void {
  event.preventDefault();

  const avatarInput = <HTMLInputElement> document.getElementById('avatar');
  const errorMsg = <HTMLElement> document.getElementsByClassName('modal-body__error-msg')[0];

  const files = <FileList> avatarInput.files;

  if (files.length === 0) {
    errorMsg.style.display = 'block';
  } else {
    errorMsg.style.display = 'none';
    const fileNameElement = <HTMLElement> document.getElementsByClassName('file-name')[0];
    fileNameElement.innerText = files[0].name;

    const uploadControl = <HTMLElement> document.getElementsByClassName('upload-control')[0];
    uploadControl.hidden = true;
  }
}

export function resetAvatarForm(): void {
  const avatarForm = <HTMLFormElement> document.getElementById('avatarForm');
  avatarForm.reset();

  const errorMsg = <HTMLElement> document.getElementsByClassName('modal-body__error-msg')[0];
  errorMsg.style.display = 'none';

  const fileNameElement = <HTMLElement> document.getElementsByClassName('file-name')[0];
  fileNameElement.innerText = '';

  const uploadControl = <HTMLElement> document.getElementsByClassName('upload-control')[0];
  uploadControl.hidden = false;
}

export function submitAvatar(): FormData | undefined {

  const avatarInput = <HTMLInputElement> document.getElementById('avatar');
  const modal = <HTMLElement> document.getElementById('uploadAvatarModal');

  const files = <FileList> avatarInput.files;

  const avatarForm = <HTMLFormElement> document.getElementById('avatarForm');
  const data = new FormData(avatarForm);

  if (files.length === 0) {
    const errorMsg = <HTMLElement> document.getElementsByClassName('modal-body__error-msg')[0];
    errorMsg.style.display = 'block';
  } else {
    modal.style.display = 'none';
    return data;
  }
}
