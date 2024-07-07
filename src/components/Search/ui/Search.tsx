import { Component, ReactNode, SyntheticEvent } from 'react';
import style from './Search.module.css';
export class Search extends Component<
  { value: string; onChange: (e: SyntheticEvent) => void },
  unknown
> {
  render(): ReactNode {
    return (
      <label className={style.label}>
        <input
          className={style.input}
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <button className={style.button} type="submit">
          search
        </button>
      </label>
    );
  }
}
