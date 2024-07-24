import { IPerson } from './types';
export const API_URL = 'https://swapi.dev/api';

export const getRequest = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
};

export function downloadJSONAsCSV(jsonData: IPerson[]) {
  // Convert JSON data to CSV
  const csvData = jsonToCsv(jsonData);
  // Create a CSV file and allow the user to download it
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.csv';
  document.body.appendChild(a);
  a.click();
}

function jsonToCsv(jsonData: IPerson[]) {
  let csv = '';
  // Get the headers
  const headers = Object.keys(jsonData[0]);
  csv += headers.join(',') + '\n';
  // Add the data
  jsonData.forEach((row) => {
    const data = headers
      .map((header) => JSON.stringify(row[header as keyof IPerson]))
      .join(','); // Add JSON.stringify statement
    csv += data + '\n';
  });
  return csv;
}
