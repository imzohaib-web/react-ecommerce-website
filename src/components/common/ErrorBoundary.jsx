import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught Error in React Component Tree:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-950 rounded-3xl p-8 border border-slate-800 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto ring-8 ring-rose-500/10">
              <AlertOctagon size={36} />
            </div>

            <h2 className="text-2xl font-extrabold text-white">Something Went Wrong</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              An unexpected application error occurred. Don't worry, your cart and preferences are safe.
            </p>

            {this.state.error && (
              <pre className="text-[11px] font-mono bg-slate-900 text-rose-300 p-3 rounded-xl overflow-x-auto text-left border border-slate-800">
                {this.state.error.toString()}
              </pre>
            )}

            <Button onClick={this.handleReset} variant="primary" className="w-full">
              <RotateCcw size={16} /> Reload Application
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
