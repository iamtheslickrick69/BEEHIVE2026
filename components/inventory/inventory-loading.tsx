export function InventoryLoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Toolbar Skeleton */}
      <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-between">
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        <div className="flex gap-4">
          <div className="h-10 w-40 bg-muted animate-pulse rounded" />
          <div className="h-10 w-20 bg-muted animate-pulse rounded" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="h-48 bg-muted animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
              <div className="h-5 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="flex justify-between items-center pt-3">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                <div className="h-6 w-20 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
