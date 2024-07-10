import { ReactNode } from 'react';
import style from './Message.module.css';

export const Message = ({ children }: { children: ReactNode }) => {
  return <div className={style.wrapper}>{children}</div>;
};
