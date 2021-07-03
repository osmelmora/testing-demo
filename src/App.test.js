import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText('Name');
  userEvent.type(nameInput, 'Osmel');

  userEvent.click(screen.getByText('Add'));

  expect(await screen.findByText(/osmel/i)).toBeInTheDocument();
});
