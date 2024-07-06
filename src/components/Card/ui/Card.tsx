import { Component } from 'react';
import style from './Card.module.css';
import { IPerson } from '../../../utils/types';

export class Card extends Component<{ person: IPerson }, never> {
  render() {
    const person = this.props.person;
    return (
      <div className={style.card}>
        <h4>{person.name}</h4>
        <div>
          <div>dob: {person.birth_year}</div>
          <div>gender: {person.gender}</div>
          <div>height: {person.height}</div>
          <div>skin color: {person.skin_color}</div>
          <div>eye color: {person.eye_color}</div>
          <div>hair color: {person.hair_color}</div>
        </div>
      </div>
    );
  }
}
