import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { Error } from './ui/Error';

describe('Error', () => {
  test('Check that an appropriate message is displayed.', async () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>,
    );

    expect(screen.getByText('Oops! Something went wrong!')).toBeDefined();
  });
});
