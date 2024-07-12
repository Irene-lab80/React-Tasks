import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async function (url: string) {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return [fetchData, { data, isError, isLoading }];
}
