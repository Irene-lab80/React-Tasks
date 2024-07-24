import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

interface IContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<ThemeType>>;
}

type ThemeType = 'dark' | 'light';

export const ThemeContext = createContext(null as unknown as IContext);

const getInitialState = () => {
  const theme = localStorage.getItem('theme');
  return theme ? JSON.parse(theme) : 'light';
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(getInitialState);

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
