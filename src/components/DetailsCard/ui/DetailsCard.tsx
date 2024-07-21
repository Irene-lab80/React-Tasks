import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { useContext, useRef, useState } from 'react';

import style from './DetailsCard.module.css';
import { LoaderNew } from '../../LoaderNew';
import { useGetPersonQuery } from '../../../redux/mainApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { Toggle } from '../../Toggle';
import '../../../index.css';
import { ThemeContext } from '../../../ThemeProvider';

export const DetailsCard = () => {
  const [isChecked, setisChecked] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const ref = useRef(null);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const { data: person, isLoading } = useGetPersonQuery(id ? +id : skipToken);

  return (
    <div className={style.outlet} data-theme={theme}>
      <div className={style.themeToggle}>
        <Toggle
          handleChange={() => {
            setisChecked((prev) => !prev);

            if (theme == 'light') {
              setTheme('dark');
            } else {
              setTheme('light');
            }
          }}
          isChecked={isChecked}
        />
      </div>
      <Outlet />
      <div
        data-testid="details-card"
        ref={ref}
        className={id ? style.info : style.infoHidden}
      >
        {isLoading && <LoaderNew />}
        <button
          className={style.closeButton}
          type="button"
          onClick={() => {
            searchParams.delete('details');
            navigate(pathname);
          }}
          data-testid="close-button"
        >
          x
        </button>

        {!isLoading && (
          <div className={style.description}>
            <div className={style.item}>
              <span>id:</span> {id}
            </div>
            <div className={style.item}>
              <span>name:</span> {person?.name}
            </div>
            <div className={style.item}>
              <span>dob:</span> {person?.birth_year}
            </div>
            <div className={style.item}>
              <span>gender:</span> {person?.gender}
            </div>
            <div className={style.item}>
              <span>height:</span> {person?.height}
            </div>
            <div className={style.item}>
              <span>skin color:</span> {person?.skin_color}
            </div>
            <div className={style.item}>
              <span>eye color:</span> {person?.eye_color}
            </div>
            <div className={style.item}>
              <span>hair color:</span> {person?.hair_color}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
