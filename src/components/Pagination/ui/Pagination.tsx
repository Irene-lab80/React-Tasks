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

  const handleNextPage = () => {
    if (!totalPageCount || currentPage > totalPageCount) return;
    navigate(`/${currentPage + 1}`);
  };

  const handlePrevPage = () => {
    if (!totalPageCount || currentPage < 1) return;
    navigate(`/${currentPage - 1}`);
  };

  return (
    <div>
      {totalPageCount && (
        <div className={style.pagination}>
          <button
            disabled={currentPage === 1}
            className={style.button}
            type="button"
            onClick={handlePrevPage}
            data-testid="prev"
          >
            prev
          </button>
          <div>{currentPage}</div>/{totalCount && <div>{totalPageCount}</div>}
          <button
            disabled={currentPage === totalPageCount}
            className={style.button}
            type="button"
            onClick={handleNextPage}
            data-testid="next"
          >
            next
          </button>
        </div>
      )}
    </div>
  );
};
