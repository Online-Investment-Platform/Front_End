import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  errorMessage?: string;
  description?: string;
  className?: string;
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
    console.error("Error Boundary caught an error:", error, errorInfo); //eslint-disable-line
  }

  render(): ReactNode {
    const { hasError } = this.state;
    if (hasError) {
      const {
        errorMessage = "문제가 발생했습니다",
        description = "잠시 후 다시 시도해 주세요.",
        className = "",
      } = this.props;

      return (
        <div
          className={`flex flex-col items-center justify-center p-16 text-center ${className}`}
        >
          <div className="mb-8 text-red-500">⚠️</div>
          <h3 className="mb-4 text-18-700">{errorMessage}</h3>
          <p className="text-14-400 text-gray-600">{description}</p>
        </div>
      );
    }

    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
