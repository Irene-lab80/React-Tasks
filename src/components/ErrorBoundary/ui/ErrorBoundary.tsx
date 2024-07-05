import React, { ErrorInfo } from 'react';
import { Error } from '../../Error/ui/Error';

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }

    return this.props.children;
  }
}
