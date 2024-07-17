import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { CardList } from './ui/CardList';
import { mockPersonsResponse } from './helpers';
import { MemoryRouter } from 'react-router-dom';

describe('Card List:', () => {
  test('Verify that the component renders the specified number of cards.', async () => {
    render(
      <MemoryRouter>
        <CardList onClick={() => null} persons={mockPersonsResponse} />
      </MemoryRouter>,
    );
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockPersonsResponse.length);
  });

  test('Check that an appropriate message is displayed if no cards are present.', async () => {
    render(
      <MemoryRouter>
        <CardList onClick={() => null} persons={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByText('Nothing found')).toBeDefined();
  });
});
