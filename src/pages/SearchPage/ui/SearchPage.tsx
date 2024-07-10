import { SyntheticEvent, useEffect, useState } from 'react';

import { API_URL, getRequest } from '../../../utils/utils';
import {
  CardList,
  ErrorButton,
  Loader,
  Message,
  Search,
} from '../../../components';
import { IPerson } from '../../../utils/types';

import style from './SearchPage.module.css';

export const SearchPage = () => {
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [data, setData] = useState<IPerson[] | null>(null);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('search', value);
    fetchFilms(value);
  };

  const fetchFilms = async (value?: string) => {
    const searchValue = value?.trim();

    const url = searchValue
      ? `${API_URL}/people?search=${searchValue}`
      : `${API_URL}/people`;

    setError(false);

    try {
      setLoading(true);
      const controller = new AbortController();
      const data = await getRequest(url, controller.signal);
      setData(data?.results?.length ? data.results : null);
    } catch (error) {
      setData(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const throwErrorHandler = () => {
    setFlag(true);
  };

  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setValue(target.value);
  };

  useEffect(() => {
    const search = localStorage.getItem('search');
    if (search) {
      setValue(search);
      fetchFilms(search);
    } else {
      fetchFilms();
    }
  }, []);

  useEffect(() => {
    if (flag) {
      throw new Error('Something went wrong!');
    }
  }, [flag]);

  return (
    <div className={style.wrapper}>
      <div className={style.top_section}>
        <div className={style.error_button_wrapper}>
          <ErrorButton
            type="button"
            title="THOW ERROR"
            onClick={throwErrorHandler}
          />
        </div>

        <form onSubmit={submitHandler}>
          <Search onChange={onChange} value={value} />
        </form>
      </div>
      <div className={style.bottom_section}>
        {error && <Message>Error</Message>}
        {loading && (
          <Message>
            <Loader />
          </Message>
        )}
        {!loading && !error && data?.length && <CardList persons={data} />}
        {!loading && !data?.length && <Message>Not Found</Message>}
      </div>
    </div>
  );
};
