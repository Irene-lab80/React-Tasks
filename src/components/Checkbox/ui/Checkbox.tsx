import { SyntheticEvent } from 'react';

interface IProps {
  handleChange: (e: SyntheticEvent) => void;
  isChecked: boolean;
  className?: string;
  label?: string;
}

export const Checkbox = ({
  handleChange,
  isChecked,
  className,
  label,
}: IProps): JSX.Element => {
  return (
    <div className={className}>
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      {label && <label htmlFor="check">{label}</label>}
    </div>
  );
};
