// import { render, screen } from '@testing-library/react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import { Card } from './Card';

const person = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'https://swapi.dev/api/planets/1/',
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  species: [],
  vehicles: [
    'https://swapi.dev/api/vehicles/14/',
    'https://swapi.dev/api/vehicles/30/',
  ],
  starships: [
    'https://swapi.dev/api/starships/12/',
    'https://swapi.dev/api/starships/22/',
  ],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

describe('Card', () => {
  it('renders headline', () => {
    render(<Card person={person} />);
    // Ensure that the card component renders the relevant card data;
    const title = screen.getByText('Luke Skywalker');
    expect(title).toBeInTheDocument();
    // Validate that clicking on a card opens a detailed card component;

    // Check that clicking triggers an additional API call to fetch detailed information.

    screen.debug();
  });
});
