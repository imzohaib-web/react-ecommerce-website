import { useToast } from '../../context/ToastContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none" aria-live="polite">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-xl border text-sm font-semibold transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-slate-900 text-white border-slate-800 ring-1 ring-emerald-500/50'
                : isError
                ? 'bg-rose-950 text-rose-100 border-rose-800'
                : 'bg-slate-900 text-slate-100 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {isSuccess && <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />}
              {isError && <AlertCircle size={18} className="text-rose-400 flex-shrink-0" />}
              {!isSuccess && !isError && <Info size={18} className="text-sky-400 flex-shrink-0" />}
              <span className="truncate">{toast.message}</span>
            </div>

            <button
              type="button"
              className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
