import { SyntheticEvent, useEffect, useState } from 'react';
import { CardList, ErrorButton, Loader, Message, Search } from './components';

import style from './App.module.css';
import { IPerson } from './utils/types';
import { API_URL, getRequest } from './utils/utils';

type IState = {
  value: string;
  flag: boolean;
  data: IPerson[] | null;
  loading: boolean;
  error: boolean;
};

const App = () => {
  const [state, setState] = useState<IState>({
    value: '',
    flag: false,
    data: null,
    loading: false,
    error: false,
  });

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('search', state.value);
    fetchFilms(state.value);
  };

  const fetchFilms = async (value?: string) => {
    const searchValue = value?.trim();

    const url = searchValue
      ? `${API_URL}/people?search=${searchValue}`
      : `${API_URL}/people`;

    setState({ ...state, error: false });

    try {
      setState({ ...state, error: false, loading: true });
      const controller = new AbortController();
      const data = await getRequest(url, controller.signal);
      setState({ ...state, data: data?.results?.length ? data.results : null });
    } catch (error) {
      setState({ ...state, error: true, data: null });
    } finally {
      setState({ ...state, loading: false });
    }
  };

  const throwErrorHandler = () => {
    setState({ ...state, flag: true });
  };

  const onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setState({ ...state, value: target.value });
  };

  useEffect(() => {
    const search = localStorage.getItem('search');
    if (search) {
      setState({ ...state, value: search });
      fetchFilms(search);
    } else {
      fetchFilms();
    }
  }, []);

  useEffect(() => {
    if (state.flag) {
      throw new Error('Something went wrong!');
    }
  }, [state.flag]);

  const { value, error, loading, data: persons } = state;

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
        {!loading && !error && persons?.length && (
          <CardList persons={persons} />
        )}
        {!loading && !persons?.length && <Message>Not Found</Message>}
      </div>
    </div>
  );
};

export default App;
