import { SyntheticEvent } from 'react';

import style from './Search.module.css';

export const Search = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: SyntheticEvent) => void;
}) => {
  return (
    <label className={style.label}>
      <input className={style.input} value={value} onChange={onChange} />
      <button className={style.button} type="submit">
        search
      </button>
    </label>
  );
};
