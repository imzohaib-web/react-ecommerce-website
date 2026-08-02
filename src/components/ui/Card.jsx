import { cn } from '../../utils/cn';

export function Card({ children, className = '', hoverable = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 transition-all duration-300',
        hoverable && 'hover:shadow-xl hover:-translate-y-1 hover:border-slate-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
