/**
 * Управление формами
 */
function handleAvatarUpload() {
  const avatarInput = document.getElementById('avatar');
  const errorMsg = document.getElementsByClassName('modal-body__error-msg')[0];

  const files = avatarInput.files;

  if (files.length === 0) {
    errorMsg.style.display = 'block';
  } else {
    errorMsg.style.display = 'none';
    const fileNameElement = document.getElementsByClassName('file-name')[0];
    fileNameElement.innerText = files[0].name;

    const uploadControl = document.getElementsByClassName('upload-control')[0];
    uploadControl.hidden = true;
  }
}

function resetAvatarForm() {
  const avatarForm = document.getElementById('avatarForm');
  avatarForm.reset();

  const errorMsg = document.getElementsByClassName('modal-body__error-msg')[0];
  errorMsg.style.display = 'none';

  const fileNameElement = document.getElementsByClassName('file-name')[0];
  fileNameElement.innerText = '';

  const uploadControl = document.getElementsByClassName('upload-control')[0];
  uploadControl.hidden = false;
}

function submitAvatar() {
  const avatarInput = document.getElementById('avatar');
  const modal = document.getElementById('uploadAvatarModal');

  const files = avatarInput.files;

  if (files.length === 0) {
    const errorMsg = document.getElementsByClassName('modal-body__error-msg')[0];
    errorMsg.style.display = 'block';
  } else {
    console.log(files[0]);
    modal.style.display = 'none';
    resetAvatarForm();
  }
}
