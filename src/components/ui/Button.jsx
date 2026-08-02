import { cn } from '../../utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2';

  const variants = {
    primary: 'bg-amber-400 text-slate-950 hover:bg-amber-500 shadow-amber-400/20',
    secondary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20',
    accent: 'bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20',
    outline: 'border-2 border-slate-300 bg-white text-slate-800 hover:border-slate-900 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 shadow-none hover:shadow-none hover:translate-y-0',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-rose-500/20'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : null}
      {children}
    </button>
  );
}
