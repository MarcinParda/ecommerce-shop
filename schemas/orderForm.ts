import * as yup from 'yup';

export const orderFormSchema = yup.object({
  email: yup
    .string()
    .email('Niepoprawny adres email')
    .required('To pole nie może być puste'),
});

export const createReviewFormSchema = yup.object({
  headline: yup
    .string()
    .required('To pole nie może być puste')
    .min(3, 'Tytuł recenzji musi mieć przynajmniej 3 znaki'),
  name: yup
    .string()
    .required('To pole nie może być puste')
    .min(3, 'Imię musi mieć przynajmniej 3 znaki'),
  email: yup
    .string()
    .email('Niepoprawny adres email')
    .required('To pole nie może być puste'),
  content: yup
    .string()
    .required('To pole nie może być puste')
    .min(3, 'Treść recenzji musi mieć przynajmniej 3 znaki'),
});
