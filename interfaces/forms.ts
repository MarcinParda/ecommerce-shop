export interface FormValues {
  firstName: string;
  email: string;
  headline: string;
  name: string;
  content: string;
  rating?: number;
}

export interface OrderFormValues {
  email: string;
}

export interface CreateReviewFormData {
  headline: string;
  name: string;
  email: string;
  content: string;
  rating?: number;
}

export interface MailingFormData {
  email: string;
}
