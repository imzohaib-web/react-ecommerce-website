import { cn } from '../../utils/cn';

export function Badge({ children, variant = 'default', className = '', ...props }) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    primary: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
    accent: 'bg-orange-100 text-orange-800 border-orange-200',
    success: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    danger: 'bg-rose-100 text-rose-800 border-rose-200',
    dark: 'bg-slate-900 text-white border-slate-800'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
