import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Make fallback optional
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by Error Boundary:", error, errorInfo);
    // You can also log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      // Use the provided fallback or a default message
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;