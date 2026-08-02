/**
 * ProgressBar component renders claimed percentage and stock status bar.
 */
export function ProgressBar({ claimedPercent, stockLeft, tag }) {
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-center text-[11px] font-bold">
        <span className="text-slate-500">
          Claimed: <strong className="text-slate-800">{claimedPercent}%</strong>
        </span>
        <span className="text-rose-600 font-extrabold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping inline-block" />
          {tag || (stockLeft ? `Only ${stockLeft} left` : 'Selling Fast')}
        </span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60 shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, claimedPercent))}%` }}
        />
      </div>
    </div>
  );
}
