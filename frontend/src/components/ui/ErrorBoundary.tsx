import React, { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div 
            className="max-w-md w-full p-8 rounded-3xl shadow-xl text-center relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(145deg, #f8f9fa 0%, #e9ecef 50%, #f8f9fa 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.9), inset 0 -2px 4px rgba(0,0,0,0.15), 0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            {/* Metallic reflection overlay */}
            <div 
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.3) 100%)'
              }}
            ></div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Something went wrong</h2>
              <p className="text-gray-600 font-light mb-6">
                We encountered an unexpected error. Please refresh the page to continue.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 text-sm font-medium text-white rounded-2xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(145deg, #F4C430 0%, #e6b800 50%, #F4C430 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                {/* Metallic reflection overlay */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.1) 100%)'
                  }}
                ></div>
                <span className="relative z-10">Refresh Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
