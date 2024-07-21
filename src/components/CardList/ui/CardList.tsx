import style from './CardList.module.css';
import { Card } from '../../Card/ui/Card';
import { IPerson } from '../../../utils/types';
import { useSearchParams } from 'react-router-dom';

export const CardList = ({
  persons,
  // onClick,
}: {
  persons: IPerson[];
  onClick: (url: string) => void;
}) => {
  const [, setSearchParams] = useSearchParams();

  if (!persons?.length) {
    return <div>Nothing found</div>;
  } else
    return (
      <div className={style.list}>
        {persons.map((person) => (
          <Card
            onClick={() => {
              const id = person.url.split('/').reverse()[1];
              setSearchParams({ details: id });
            }}
            key={person.url}
            person={person}
          />
        ))}
      </div>
    );
};
