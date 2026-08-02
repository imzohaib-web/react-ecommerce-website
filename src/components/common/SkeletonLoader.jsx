import { Skeleton } from '../ui/Skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col gap-3">
      <Skeleton className="w-full h-48 rounded-xl" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-10 w-full rounded-xl mt-auto" />
    </div>
  );
}

export function ProductsGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full py-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <Skeleton className="h-10 w-64 rounded-xl" />
      <ProductsGridSkeleton count={8} />
    </div>
  );
}
