import React from 'react';
import { Error } from '../../Error/ui/Error';

const logError = (error: string) =>
  console.warn(
    `%c Unfortunately, an error has occured! ${error} `,
    'background: #222; color: #bada55',
  );

export interface StateType {
  hasError: boolean;
}

export interface PropsType {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    logError(error.toString());
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}
