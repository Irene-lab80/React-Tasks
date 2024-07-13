import { Outlet } from 'react-router-dom';

import { useContext, useEffect, useRef } from 'react';
import { MenuContext } from '../../../provider';

import style from './MainLayout.module.css';

export const MainLayout = () => {
  const { isHidden, setIsHidden, data } = useContext(MenuContext);

  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent | FocusEvent) => {
      const target = event.target as Node;

      if (!target || !target.isConnected) {
        return;
      }
      // console.log('ref.current', ref.current);
      // console.log('target', target);
      const isOutside =
        ref.current && !(ref.current as HTMLElement)?.contains(target);
      // console.log('isOutside', isOutside);
      if (isOutside && !isHidden) {
        setIsHidden(true);
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
      <div ref={ref} className={!isHidden ? style.info : style.infoHidden}>
        <button
          className={style.closeButton}
          type="button"
          onClick={() => setIsHidden(true)}
        >
          x
        </button>
        {data}
      </div>
    </div>
  );
};
