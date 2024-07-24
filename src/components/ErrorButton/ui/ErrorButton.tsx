import './ErrorButton.css';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
}

export const ErrorButton = ({ title, ...props }: IProps) => {
  return (
    <button {...props} className="error-button">
      {title}
    </button>
  );
};
