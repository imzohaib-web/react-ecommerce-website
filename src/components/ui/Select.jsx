import { cn } from '../../utils/cn';

export function Select({ className = '', children, ...props }) {
  return (
    <select
      className={cn(
        'px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
