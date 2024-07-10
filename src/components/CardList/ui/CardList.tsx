import style from './CardList.module.css';
import { Card } from '../../Card/ui/Card';
import { IPerson } from '../../../utils/types';

export const CardList = ({ persons }: { persons: IPerson[] }) => {
  return (
    <div className={style.list}>
      {persons.map((person) => (
        <Card key={person.url} person={person}></Card>
      ))}
    </div>
  );
};
