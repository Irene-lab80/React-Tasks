// import { render, screen } from '@testing-library/react';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    const text = screen.getByText('App');
    expect(text).toBeInTheDocument();
    screen.debug();
    // check if App components renders headline
  });
});
