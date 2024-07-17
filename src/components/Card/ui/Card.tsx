import style from './Card.module.css';
import { IPerson } from '../../../utils/types';

export const Card = ({
  person,
  onClick,
}: {
  person: IPerson;
  onClick: () => void;
}) => {
  return (
    <div className={style.card} onClick={onClick} data-testid="card">
      <h4 className={style.title}>{person.name}</h4>
    </div>
  );
};
