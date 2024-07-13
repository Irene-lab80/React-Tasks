import { SyntheticEvent, useContext, useEffect, useState } from 'react';

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

import { useParams } from 'react-router-dom';

import style from './SearchPage.module.css';
import { MenuContext } from '../../../provider';

export const SearchPage = () => {
  const params = useParams();
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [data, setData] = useState<IPerson[] | null>(null);
  const [totalCount, setTotalCount] = useState(null);

  const [currentPage, setCurrentPage] = useState(
    params.page ? +params?.page : 1,
  );

  const [totalPageCount, setTotalPageCount] = useState<number | null>(null);

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('search', value);
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
      const controller = new AbortController();
      const data = await getRequest(url, controller.signal);
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

  useEffect(() => {
    const search = localStorage.getItem('search');
    if (search) {
      setValue(search);
      fetchFilms(search);
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

  const {
    isHidden,
    setIsHidden,
    setData: setDataContext,
  } = useContext(MenuContext);

  const handleClickCard = (url: string) => {
    console.log('url', url);
    setIsHidden(false);
    setDataContext(url);
    console.log('first');
    console.log('isHidden', isHidden);
  };

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
