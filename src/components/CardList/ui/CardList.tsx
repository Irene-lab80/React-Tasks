import style from './CardList.module.css';
import { Card } from '../../Card/ui/Card';
import { IPerson } from '../../../utils/types';

export const CardList = ({
  persons,
  onClick,
}: {
  persons: IPerson[];
  onClick: (url: string) => void;
}) => {
  console.log(persons);
  return (
    <div className={style.list}>
      {persons.map((person) => (
        <Card
          onClick={() => onClick(person.url)}
          key={person.url}
          person={person}
        ></Card>
      ))}
    </div>
  );
};
