import { Component, ReactNode } from 'react';
import style from './Message.module.css';

export class Message extends Component<{ children: ReactNode }, never> {
  render() {
    const children = this.props.children;

    return <div className={style.wrapper}>{children}</div>;
  }
}
