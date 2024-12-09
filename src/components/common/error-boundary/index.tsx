"use client";

import { RefreshCw } from "lucide-react";
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

  handleRefresh = () => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    const { hasError } = this.state;
    if (hasError) {
      const {
        errorMessage = "문제가 발생했습니다",
        description = "새로고침을 통해 다시 시도해 주세요.",
        className = "",
      } = this.props;

      return (
        <div
          className={`flex flex-col items-center justify-center p-16 text-center ${className}`}
        >
          <div className="mb-8 text-red-500">⚠️</div>
          <h3 className="mb-4 text-18-700">{errorMessage}</h3>
          <p className="mb-6 text-14-400 text-gray-600">{description}</p>
          <button
            type="button"
            onClick={this.handleRefresh}
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-14-600 text-white hover:bg-blue-600 active:bg-blue-700"
          >
            <RefreshCw size={16} />
            <span>새로고침</span>
          </button>
        </div>
      );
    }

    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
