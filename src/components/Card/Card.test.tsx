import { render, screen, waitFor } from '@testing-library/react';
import { Card } from './ui/Card';
import { mockPersonsResponse } from '../CardList/helpers';
import createFetchMock from 'vitest-fetch-mock';
import { App } from '../../App';
import userEvent from '@testing-library/user-event';

const mockPerson = mockPersonsResponse[0];

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Card', () => {
  test('Card component should renders the relevant card data', () => {
    render(<Card person={mockPerson} onClick={() => null} />);
    const title = screen.getByText('Luke Skywalker');
    expect(title).toBeInTheDocument();
  });

  test('Validate that clicking on a card opens a detailed card component.', async () => {
    render(<App />);
    fetchMock.mockResponse(JSON.stringify(mockPersonsResponse));
    const cards = await screen.queryAllByTestId('card');
    const card = cards[0];
    await userEvent.click(card);
    await waitFor(() => screen.queryByTestId('details-card'));
    expect(screen.getByTestId('details-card')).toBeInTheDocument();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    vi.spyOn(global, 'fetch');
    render(<App />);

    const cards = screen.queryAllByTestId('card');
    const card = cards[0];
    await userEvent.click(card);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        'https://swapi.dev/api/people/?page=1',
      );
    });
  });
});
