import { Dispatch, SetStateAction, createContext, useState } from 'react';

type TData = string | null;

type TContext = {
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
  data: TData;
  setData: Dispatch<SetStateAction<TData>>;
};

type TContextProviderProps = {
  children: React.ReactNode;
};

export const MenuContext = createContext(null as unknown as TContext);

const ContextProvider = ({ children }: TContextProviderProps) => {
  const [isHidden, setIsHidden] = useState(true);
  const [data, setData] = useState<TData>(null);

  return (
    <MenuContext.Provider value={{ isHidden, setIsHidden, data, setData }}>
      {children}
    </MenuContext.Provider>
  );
};

export default ContextProvider;
