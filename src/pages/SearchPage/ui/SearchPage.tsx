import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { API_URL, getRequest } from '../../../utils/utils';
import {
  CardList,
  ErrorButton,
  LoaderNew,
  Message,
  Pagination,
  Search,
} from '../../../components';
import { IPerson } from '../../../utils/types';

import style from './SearchPage.module.css';

export const SearchPage = () => {
  const params = useParams();
  const [, setSearchParams] = useSearchParams();
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [data, setData] = useState<IPerson[] | null>(null);
  const [totalCount, setTotalCount] = useState(null);
  const [storedSearchQuery, setStoredSearchQuery] = useLocalStorage(
    'search',
    '',
  );

  const [currentPage, setCurrentPage] = useState(
    params.page ? +params?.page : 1,
  );

  const [totalPageCount, setTotalPageCount] = useState<number | null>(null);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setStoredSearchQuery(value);
    fetchFilms(value);
  };

  const fetchFilms = async (value?: string) => {
    const searchValue = value?.trim();

    const url = searchValue
      ? `${API_URL}/people?search=${searchValue}&page=${currentPage}`
      : `${API_URL}/people/?page=${currentPage}`;

    setError(false);

    try {
      setLoading(true);
      const data = await getRequest(url);
      setData(data?.results?.length ? data.results : null);
      setTotalCount(data.count);
      const totalPageCount = Math.ceil(data.count / 10);
      setTotalPageCount(totalPageCount);
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

  const handleClickCard = (url: string) => {
    const id = url.split('/').reverse()[1];

    setSearchParams({ details: id });
  };

  useEffect(() => {
    if (storedSearchQuery) {
      setValue(storedSearchQuery);
      fetchFilms(storedSearchQuery);
    } else {
      fetchFilms();
    }
  }, [currentPage]);

  useEffect(() => {
    if (flag) {
      throw new Error('Something went wrong!');
    }
  }, [flag]);

  useEffect(() => {
    setCurrentPage(params.page ? +params?.page : 1);
  }, [params.page]);

  return (
    <div className={style.wrapper}>
      <div className={style.top_section}>
        <div className={style.error_button_wrapper}>
          <ErrorButton
            type="button"
            title="THROW ERROR"
            onClick={throwErrorHandler}
          />
        </div>

        <form onSubmit={submitHandler}>
          <Search onChange={onChange} value={value} />
        </form>
      </div>
      <div className={style.bottom_section}>
        {error && <Message>Error</Message>}
        {loading && <LoaderNew />}
        {!loading && !error && data?.length && (
          <CardList onClick={handleClickCard} persons={data} />
        )}
        {!loading && !data?.length && <Message>Not Found</Message>}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        totalPageCount={totalPageCount}
      />
    </div>
  );
};
