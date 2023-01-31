import { MailingFormData } from 'interfaces';
import { Exercise1Page } from 'pages/exercises/week-10/exercise-1';
import { useState } from 'react';

export const NewsletterForm = () => {
  const [status, setStatus] = useState<'initial' | 'success' | 'error'>(
    'initial'
  );

  const onSubmit = async (data: MailingFormData) => {
    const response = await fetch('/api/mailing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setStatus('success');
    }
    if (!response.ok) {
      setStatus('error');
    }
  };

  return <Exercise1Page onSubmit={onSubmit} status={status} />;
};
