import { render, screen } from '@testing-library/react';
import App from './App';

test('renders h2 from main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Time Table Generator/i);
  expect(linkElement).toBeInTheDocument();
});
