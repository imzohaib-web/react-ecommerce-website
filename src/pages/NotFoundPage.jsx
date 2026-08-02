import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-slate-200 shadow-xl max-w-md w-full space-y-4">
        <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-2">
          <AlertTriangle size={40} />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">404 - Page Not Found</h1>
        <p className="text-sm text-slate-500">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all text-sm hover:scale-105"
        >
          <ArrowLeft size={16} /> Return to Storefront
        </Link>
      </div>
    </div>
  );
}
