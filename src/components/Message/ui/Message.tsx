import { Component } from 'react';
import style from './Message.module.css';

export class Message extends Component<{ message: string }, never> {
  render() {
    const message = this.props.message;

    return (
      <div className={style.wrapper}>
        <h3>{message}</h3>
      </div>
    );
  }
}
