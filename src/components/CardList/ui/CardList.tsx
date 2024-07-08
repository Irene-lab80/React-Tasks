import { Component } from 'react';
import style from './CardList.module.css';
import { Card } from '../../Card/ui/Card';
import { IPerson } from '../../../utils/types';

export class CardList extends Component<{ persons: IPerson[] }, never> {
  render() {
    return (
      <div className={style.list}>
        {this.props.persons.map((person) => (
          <Card key={person.url} person={person}></Card>
        ))}
      </div>
    );
  }
}
