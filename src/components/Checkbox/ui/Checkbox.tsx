interface IProps {
  handleChange: () => void;
  isChecked: boolean;
  className?: string;
  label: string;
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
      <label htmlFor="check">{label}</label>
    </div>
  );
};
