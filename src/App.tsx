import { Component, SyntheticEvent } from 'react';
import { CardList, ErrorButton, Message } from './components';

import style from './App.module.css';
import { IPerson } from './utils/types';
import { API_URL } from './utils/utils';

type IState = {
  value: string;
  flag: boolean;
  data: IPerson[] | null;
  loading: boolean;
  error: boolean;
};

const getRequest = async (url: string, signal: AbortSignal) => {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }

  return response.json();
};

class App extends Component {
  state: IState = {
    value: '',
    flag: false,
    data: null,
    loading: false,
    error: false,
  };

  submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    this.fetchFilms(this.state.value);
  };

  fetchFilms = async (value?: string) => {
    const searchValue = value?.trim();

    const url = searchValue
      ? `${API_URL}/people?search=${searchValue}`
      : `${API_URL}/people`;

    this.setState({ error: false });

    try {
      this.setState({ error: false, loading: true });
      const controller = new AbortController();
      const data = await getRequest(url, controller.signal);
      this.setState({ data: data?.results?.length ? data.results : null });
    } catch (error) {
      this.setState({ error: true, data: null });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount(): void {
    const search = localStorage.getItem('search');
    if (search) {
      this.setState({ value: search });
    }

    this.fetchFilms();
  }

  componentDidUpdate(): void {
    if (this.state.flag) {
      throw new Error('Something went wrong!');
    }
  }

  throwErrorHandler = () => {
    this.setState({ flag: true });
  };

  onChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    this.setState({
      value: target.value,
    });
    localStorage.setItem('search', target.value);
  };

  render() {
    const { onChange, throwErrorHandler, submitHandler } = this;
    const { value, error, loading, data: persons } = this.state;

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
            <label className="label">
              <input value={value} onChange={onChange}></input>
              <button type="submit">search</button>
            </label>
          </form>
        </div>
        <div className={style.bottom_section}>
          {error && <Message message="error" />}
          {loading && <Message message="loading" />}
          {!loading && !error && persons?.length && (
            <CardList persons={persons} />
          )}
          {!loading && !persons?.length && <Message message="not found" />}
        </div>
      </div>
    );
  }
}
export default App;
