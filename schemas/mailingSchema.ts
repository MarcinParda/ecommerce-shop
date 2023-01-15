import * as yup from 'yup';

export const mailingSchema = yup.object({
  email: yup
    .string()
    .email('Podany email jest nieprawidłowy')
    .required('To pole nie może być puste'),
});
