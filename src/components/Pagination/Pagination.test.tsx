import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../../App';

describe('MainComponent', async () => {
  it('the component updates URL query parameter when page changes', async () => {
    render(<App />);
    screen.debug();
    const loadingText = await screen.findByTestId('loader');
    expect(loadingText).toBeInTheDocument();
    const button = await screen.findByTestId('next');
    fireEvent.click(button);
    expect(window.location.pathname).toBe('/2');
  });
});
