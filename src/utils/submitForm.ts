import { validateInput } from './validation';

// interface SignupData extends PlainObject {
//   first_name: string;
//   second_name: string;
//   login: string;
//   email: string;
//   password: string;
//   phone: string;
// }
//
// interface SignInData extends PlainObject {
//   login: string;
//   password: string;
// }

/**
 * Отправка формы
 */
export default function submitForm(formId: string): PlainObject | undefined {
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
  const formFields: PlainObject = {};

  for (let [key, value] of formData) {
    formFields[key] = value;
  }

  form.reset();
  return formFields;
}
