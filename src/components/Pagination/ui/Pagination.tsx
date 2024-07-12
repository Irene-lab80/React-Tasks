import { useNavigate } from 'react-router-dom';
import style from './Pagination.module.css';

export const Pagination = ({
  totalPageCount,
  currentPage,
  totalCount,
}: {
  totalPageCount: number | null;
  currentPage: number;
  totalCount: number | null;
}): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div>
      {totalPageCount && (
        <div className={style.pagination}>
          <button
            disabled={currentPage === 1}
            className={style.button}
            type="button"
            onClick={() => {
              if (currentPage > 1) {
                navigate(`/${currentPage - 1}`);
              } else return;
            }}
          >
            prev
          </button>
          <div>{currentPage}</div>/{totalCount && <div>{totalPageCount}</div>}
          <button
            disabled={currentPage === totalPageCount}
            className={style.button}
            type="button"
            onClick={() => {
              if (currentPage < totalPageCount) {
                navigate(`/${currentPage + 1}`);
              } else return;
            }}
          >
            next
          </button>
        </div>
      )}
    </div>
  );
};
