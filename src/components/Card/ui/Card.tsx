import { Component } from 'react';
import style from './Card.module.css';

export class Card extends Component<
  { name: string; description: string },
  never
> {
  render() {
    return (
      <div className={style.card}>
        <h4>{this.props.name}</h4>
        <p>{this.props.description}</p>
      </div>
    );
  }
}
