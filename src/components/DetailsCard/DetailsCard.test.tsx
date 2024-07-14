import { render, screen, waitFor } from '@testing-library/react';
import { App } from '../../App';
import userEvent from '@testing-library/user-event';

describe('Card', () => {
  test('Check that a loading indicator is displayed while fetching data', async () => {
    const user = userEvent.setup();

    render(<App />);
    const cards = screen.queryAllByTestId('card');

    await user.click(cards[0]);
    waitFor(() => expect(screen.getByText('loader')).toBeInTheDocument());
  });

  test('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const user = userEvent.setup();

    render(<App />);
    const cards = screen.queryAllByTestId('card');

    await user.click(cards[0]);

    waitFor(() =>
      expect(screen.getByText('name: Luke Skywalker')).toBeInTheDocument(),
    );
    waitFor(() => expect(screen.getByText('id: 1')).toBeInTheDocument());
  });

  test('Ensure that clicking the close button hides the component.', async () => {
    const user = userEvent.setup();

    render(<App />);
    const cards = screen.queryAllByTestId('card');

    await user.click(cards[0]);

    await user.click(screen.getByTestId('close-button'));
    waitFor(() =>
      expect(screen.getByTestId('details-card')).not.toBeInTheDocument(),
    );
  });
});
