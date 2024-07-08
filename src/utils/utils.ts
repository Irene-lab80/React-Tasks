export const API_URL = 'https://swapi.dev/api';

export const getRequest = async (url: string, signal: AbortSignal) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
};
