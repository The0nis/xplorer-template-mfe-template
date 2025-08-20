import React, { Component, ReactNode, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by Error Boundary:", error, errorInfo);
    // Optionally log error to a service
  }

  handleRetry = () => {
    window.location.reload(); // Reload the page to try loading again
  };

  handleBack = () => {
    window.history.back(); // Navigate back in history
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            {/* Error Icon */}
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m2 4v.01M12 4a8 8 0 100 16 8 8 0 000-16z"
              />
            </svg>

            {/* Error Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Oops! Something went wrong.
            </h2>

            {/* Error Message */}
            <p className="text-gray-600 mb-4">
              We encountered an issue while loading the application. Please try
              again.
            </p>


            {/* Go Back Button */}
            <button
              onClick={this.handleBack}
              className="bg-[#6278ff] text-white px-4 py-2 rounded-md hover:bg-[#5268f7] transition-all duration-200 mr-1"
            >
              Go Back
            </button>
            {/* Retry Button */}
            <button
              onClick={this.handleRetry}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-200 ml-1"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
