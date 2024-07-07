import { Component } from 'react';
import style from './Loader.module.css';

export class Loader extends Component {
  render() {
    return <span className={style.loader}></span>;
  }
}
