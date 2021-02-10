import { validateInput } from './validation.js';

/**
 * Отправка формы
 */
export function submitForm(formId: string): void {
  const form: any = document.getElementById(formId);

  let hasError: boolean = false;

  form.querySelectorAll('input').forEach((element: HTMLInputElement) => {
    try {
      validateInput(element);
    } catch {
      hasError = true;
    }
  });

  if (hasError) {
    return;
  }

  const formData: any = new FormData(form);
  const formFields: { [key: string]: string } = {};

  for (let [key, value] of formData) {
    formFields[key] = value;
  }

  console.log(formFields);

  form.reset();
}
