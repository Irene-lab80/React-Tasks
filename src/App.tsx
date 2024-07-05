import { Component, SyntheticEvent } from 'react';
import { Card, ErrorButton } from './components';

import style from './App.module.css';
import { IPerson, IResponse } from './utils/types';
import { API_URL } from './utils/utils';

type IState = {
  value: string;
  flag: boolean;
  data: IPerson[] | null;
};

export class App extends Component<never, IState> {
  state: IState = {
    value: '',
    flag: false,
    data: null,
  };

  submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  componentDidMount(): void {
    const search = localStorage.getItem('search');
    if (search) {
      this.setState({ value: search });
    }

    const fetchFilms = async () => {
      const res = await fetch(`${API_URL}/people`);
      const data: IResponse = await res.json();
      this.setState({ data: data?.results });
    };

    fetchFilms();
  }

  componentDidUpdate(
    prevProps: Readonly<object>,
    prevState: Readonly<{ value: string }>,
    snapshot?: unknown,
  ): void {
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    console.log('snapshot', snapshot);

    if (this.state.flag) {
      throw new Error('Something went wrong!');
    }
  }

  // componentWillUpdate(
  //   nextProps: Readonly<{}>,
  //   nextState: Readonly<{ value: string }>,
  //   nextContext: any,
  // ): void {
  //   console.log('first', nextProps);
  //   console.log('nextState', nextState);
  //   console.log('nextContext', nextContext);
  //   localStorage.setItem('search', nextState.value);
  // }

  getSnapshotBeforeUpdate(
    prevProps: Readonly<object>,
    prevState: Readonly<object>,
  ) {
    console.log('prevProps', prevProps);
    console.log('prevState', prevState);
    return prevState;
  }

  throwErrorHandler = () => {
    this.setState({ flag: true });
    console.log('first');
  };

  render() {
    if (this.state.data === null) return <div>loading</div>;
    const data = this.state.data;

    return (
      <div className={style.wrapper}>
        <div className={style.top_section}>
          <div className={style.error_button_wrapper}>
            <ErrorButton
              type="button"
              title="THOW ERROR"
              onClick={this.throwErrorHandler}
            />
          </div>

          <form onSubmit={(e) => this.submitHandler(e)}>
            <label htmlFor="" className="label">
              <input
                type="search"
                value={this.state.value}
                onChange={(e) =>
                  this.setState({
                    value: e.target.value,
                  })
                }
              ></input>
              <button type="submit">search</button>
            </label>
          </form>
        </div>
        <div className={style.bottom_section}>
          {data.map((person) => (
            <Card name={person.name} description={'person'} />
          ))}
        </div>
      </div>
    );
  }
}
// function App() {
//   const [value, setValue] = useState('');

//   const submitHandler = (e: SyntheticEvent) => {
//     e.preventDefault();
//   };

//   useEffect(() => {
//     const search = localStorage.getItem('search');
//     if (search) {
//       setValue(search);
//     }
//   }, []);

//   useEffect(() => {
//    localStorage.setItem('search', value);
//   }, [value]);

//   return (
//     <div className="wrapper">
//       <div className="top-section">
//         <form onSubmit={(e) => submitHandler(e)} action="">
//           <label htmlFor="" className="label">
//             <input
//               type="search"
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//             ></input>
//             <button type="submit">search</button>
//           </label>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default App;
