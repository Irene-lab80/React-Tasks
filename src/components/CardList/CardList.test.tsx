import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { CardList } from './ui/CardList';
import { mockPersonsResponse } from './helpers';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('Card List:', () => {
  test('Verify that the component renders the specified number of cards.', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList onClick={() => null} persons={mockPersonsResponse} />
        </Provider>
      </MemoryRouter>,
    );
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockPersonsResponse.length);
  });

  test('Check that an appropriate message is displayed if no cards are present.', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CardList onClick={() => null} persons={[]} />
        </Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Nothing found')).toBeDefined();
  });
});
