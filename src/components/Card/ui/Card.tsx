import { Component } from 'react';
import style from './Card.module.css';
import { IPerson } from '../../../utils/types';

export class Card extends Component<{ person: IPerson }, never> {
  render() {
    const person = this.props.person;
    return (
      <div className={style.card}>
        <h4 className={style.title}>{person.name}</h4>
        <div className={style.description}>
          <div className={style.item}>
            <span>dob:</span> {person.birth_year}
          </div>
          <div className={style.item}>
            <span>gender:</span> {person.gender}
          </div>
          <div className={style.item}>
            <span>height:</span> {person.height}
          </div>
          <div className={style.item}>
            <span>skin color:</span> {person.skin_color}
          </div>
          <div className={style.item}>
            <span>eye color:</span> {person.eye_color}
          </div>
          <div className={style.item}>
            <span>hair color:</span> {person.hair_color}
          </div>
        </div>
      </div>
    );
  }
}
