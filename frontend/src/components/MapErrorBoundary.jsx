import React from 'react';

class MapErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('MapErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-slate-900 text-rose-400 p-10 text-center border border-rose-500/20 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">Map Component Crashed</h2>
          <p className="text-slate-400 mb-6">{this.state.error?.message || 'Unknown React Error'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-rose-500 text-white rounded-xl font-bold"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default MapErrorBoundary;
