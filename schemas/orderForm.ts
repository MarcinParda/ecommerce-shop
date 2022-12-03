import * as yup from 'yup';

export const orderFormSchema = yup.object({
  firstName: yup
    .string()
    .required('To pole nie może być puste')
    .min(3, 'Imię musi być dłuższe niż 3 znaki'),
});
