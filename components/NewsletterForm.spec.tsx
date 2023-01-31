import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Exercise1Page } from 'pages/exercises/week-10/exercise-1';

describe('Home', () => {
  it('shows success message when subscription was successful', async () => {
    const onSubmit = jest.fn();
    render(<Exercise1Page onSubmit={onSubmit} status={'success'} />);

    const successMessage = screen.queryByText('Dziękujemy za zapisanie się!');

    expect(successMessage).not.toBeNull();
  });
});
