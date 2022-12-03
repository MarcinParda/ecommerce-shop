import * as yup from 'yup';

export const orderFormSchema = yup.object({
  email: yup
    .string()
    .email('Niepoprawny adres email')
    .required('To pole nie może być puste'),
});
