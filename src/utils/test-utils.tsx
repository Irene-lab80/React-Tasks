import { cleanup, render } from '@testing-library/react';
import { ReactElement } from 'react';

afterEach(() => {
  cleanup();
});

function CustomRender(ui: ReactElement, options = {}) {
  return render(ui, { wrapper: ({ children }) => children, ...options });
}

export * from '@testing-library/react';
export { default as useEvent } from '@testing-library/user-event';

export { CustomRender as render };
