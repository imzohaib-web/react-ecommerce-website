import { useToast } from '../../context/ToastContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import './ToastContainer.css';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-item toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <CheckCircle2 size={18} />}
            {toast.type === 'info' && <Info size={18} />}
            {toast.type === 'error' && <AlertCircle size={18} />}
          </div>
          <div className="toast-message">{toast.message}</div>
          <button
            type="button"
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
