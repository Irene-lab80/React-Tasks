import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';

import { API_URL, getRequest } from '../../../utils/utils';

import style from './DetailsCard.module.css';
import { IPerson } from '../../../utils/types';
import { LoaderNew } from '../../LoaderNew';

export const DetailsCard = () => {
  const [, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IPerson | null>(null);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');
  const ref = useRef(null);
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const fetchFilms = async () => {
    const url = `${API_URL}/people/${id}`;

    setError(false);

    try {
      setLoading(true);
      const data = await getRequest(url);
      console.log('data', data);
      setData(data);
    } catch (error) {
      setData(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFilms();
    }
  }, [id]);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent | FocusEvent) => {
      const target = event.target as Node;

      console.log('target', target);
      if (!target || !target.isConnected) {
        return;
      }

      const isOutside =
        ref.current && !(ref.current as HTMLElement)?.contains(target);

      console.log('isOutside', isOutside);
      console.log('ref.current', ref.current);

      if (isOutside) {
        // setIsHidden(true);
      }
    };

    document.addEventListener('click', handleClick);

    () => {
      return document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={style.outlet}>
      <Outlet />
      <div
        data-testid="details-card"
        ref={ref}
        className={id ? style.info : style.infoHidden}
      >
        {loading && <LoaderNew />}
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

        <div className={style.details}>
          <div>id : {`${id}`}</div>
          <div>name: {data?.name}</div>
          <div>birth year: {data?.birth_year}</div>
        </div>
      </div>
    </div>
  );
};
