import { Checkbox } from '../../Checkbox';

interface IProps {
  handleChange: () => void;
  isChecked: boolean;
  label: string;
}

export const Toggle = ({ handleChange, isChecked }: IProps): JSX.Element => {
  return (
    <Checkbox
      handleChange={handleChange}
      isChecked={isChecked}
      label={isChecked ? 'Dark' : 'Light'}
    />
  );
};
