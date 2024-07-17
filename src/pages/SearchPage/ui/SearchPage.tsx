import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import {
  CardList,
  ErrorButton,
  LoaderNew,
  Message,
  Pagination,
  Search,
} from '../../../components';

import style from './SearchPage.module.css';
import {
  useGetPeopleQuery,
  useLazyGetPeopleQuery,
} from '../../../redux/mainApi';

export const SearchPage = () => {
  const params = useParams();
  const [, setSearchParams] = useSearchParams();
  const [flag, setFlag] = useState(false);
  const [value, setValue] = useState('');
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [storedSearchQuery, setStoredSearchQuery] = useLocalStorage(
    'search',
    '',
  );

  const [currentPage, setCurrentPage] = useState(
    params.page ? +params?.page : 1,
  );

  const [totalPageCount, setTotalPageCount] = useState<number | null>(null);

  const {
    data: people,
    isLoading,
    isFetching,
    isError,
  } = useGetPeopleQuery({ page: currentPage, search: storedSearchQuery });

  const [getPeople] = useLazyGetPeopleQuery();

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setStoredSearchQuery(value);
    getPeople({ page: currentPage, search: value });
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
    }
  }, [currentPage, storedSearchQuery]);

  useEffect(() => {
    if (flag) {
      throw new Error('Something went wrong!');
    }
  }, [flag]);

  useEffect(() => {
    setCurrentPage(params.page ? +params?.page : 1);
  }, [params.page]);

  useEffect(() => {
    if (people?.count) {
      setTotalCount(people?.count);
      setTotalPageCount(Math.floor(people?.count / 10));
    }
  }, [people]);

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
        {isError && <Message>Error</Message>}
        {(isLoading || isFetching) && <LoaderNew />}
        {!isLoading && !isError && people?.results?.length && (
          <CardList onClick={handleClickCard} persons={people?.results} />
        )}
        {!isLoading && !people?.results?.length && <Message>Not Found</Message>}
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        totalPageCount={totalPageCount}
      />
    </div>
  );
};
