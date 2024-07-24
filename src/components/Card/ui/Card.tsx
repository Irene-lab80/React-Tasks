import style from './Card.module.css';
import { IPerson } from '../../../utils/types';
import { Checkbox } from '../../Checkbox';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { setSelectedValue } from '../../../redux/selectPeopleSlice';

export const Card = ({
  person,
  onClick,
}: {
  person: IPerson;
  onClick: () => void;
}) => {
  const dispath = useAppDispatch();
  const { selectedEntities } = useAppSelector((state) => state.selectPeople);

  return (
    <div className={style.card} onClick={onClick} data-testid="card">
      <div className={style.headerWrapper}>
        <Checkbox
          handleChange={(e) => {
            e.stopPropagation();
            dispath(setSelectedValue({ entity: person }));
          }}
          isChecked={selectedEntities
            ?.map((el: IPerson) => el.name)
            ?.includes(person.name)}
        />
        <h4 className={style.title}>{person.name}</h4>
      </div>
    </div>
  );
};
