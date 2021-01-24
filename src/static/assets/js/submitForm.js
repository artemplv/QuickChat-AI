/**
 * Отправка формы
 * @param {string} formId
 */
function submitForm(formId) {
  const form = document.getElementById(formId);

  const formData = new FormData(form);
  const formFields = {};

  for (let [key, value] of formData) {
    formFields[key] = value;
  }

  console.log(formFields);

  form.reset();
}
