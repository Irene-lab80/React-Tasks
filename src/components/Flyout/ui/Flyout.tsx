import { unselectAll } from '../../../redux/selectPeopleSlice';
import { useAppDispatch } from '../../../redux/store';
import style from './Flyout.module.css';

export const Flyout = ({
  itemsCount,
  onDownload,
}: {
  itemsCount: number;
  onDownload: () => void;
}): JSX.Element => {
  const dispath = useAppDispatch();

  return (
    <div className={style.wrapper}>
      <div className={style.inner}>
        <div>{itemsCount} items are selected</div>
        <button onClick={() => dispath(unselectAll())} type="button">
          Unselect all
        </button>
        <button type="button" onClick={onDownload}>
          Download
        </button>
      </div>
    </div>
  );
};
