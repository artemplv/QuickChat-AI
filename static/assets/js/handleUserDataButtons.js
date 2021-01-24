/**
 * Управление формами
 */
function onChangeDetailsClick() {
  const detailsForm = document.getElementById('userDetails');

  const inputs = detailsForm.getElementsByTagName('input');

  for (const input of inputs) {
    input.disabled = false;
  }

  const controlButtons = document.getElementsByClassName('profile-data__control-buttons')[0];
  controlButtons.hidden = true;

  const formButtons = document.getElementsByClassName('profile-data__form-controls')[0];
  formButtons.hidden = false;
}

function cancelDetailsChange() {
  const detailsForm = document.getElementById('userDetails');

  detailsForm.reset();

  const inputs = detailsForm.getElementsByTagName('input');

  for (const input of inputs) {
    input.disabled = true;
  }

  const controlButtons = document.getElementsByClassName('profile-data__control-buttons')[0];
  controlButtons.hidden = false;

  const formButtons = document.getElementsByClassName('profile-data__form-controls')[0];
  formButtons.hidden = true;
}

function onChangePasswordClick() {
  const passwordForm = document.getElementById('userPassword');
  const detailsForm = document.getElementById('userDetails');
  const controlButtons = document.getElementsByClassName('profile-data__control-buttons')[0];

  detailsForm.hidden = true;
  passwordForm.hidden = false;
  controlButtons.hidden = true;
}

function cancelPasswordChange() {
  const passwordForm = document.getElementById('userPassword');
  const detailsForm = document.getElementById('userDetails');
  const controlButtons = document.getElementsByClassName('profile-data__control-buttons')[0];

  passwordForm.reset();
  passwordForm.hidden = true;
  detailsForm.hidden = false;
  controlButtons.hidden = false;
}
