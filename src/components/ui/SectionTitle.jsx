import { Badge } from './Badge';

export function SectionTitle({ badgeText, title, description, children, className = '' }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 ${className}`}>
      <div>
        {badgeText && (
          <Badge variant="primary" className="mb-2 uppercase tracking-wider text-[11px]">
            {badgeText}
          </Badge>
        )}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
        {description && <p className="text-sm text-slate-500 mt-1 max-w-xl">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
