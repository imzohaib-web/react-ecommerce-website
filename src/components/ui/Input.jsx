import { cn } from '../../utils/cn';

export function Input({ className = '', error = false, ...props }) {
  return (
    <input
      className={cn(
        'w-full px-4 py-2.5 bg-white border rounded-xl text-slate-900 placeholder-slate-400 text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400',
        error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 hover:border-slate-300',
        className
      )}
      {...props}
    />
  );
}
