/**
 * Отправка формы
 */
export function submitForm(formId: string): void {
  const form: any = document.getElementById(formId);

  const formData: FormData = new FormData(form);
  const formFields: { [key: string]: string } = {};

  for (let [key, value] of formData) {
    formFields[key] = value;
  }

  console.log(formFields);

  form.reset();
}
