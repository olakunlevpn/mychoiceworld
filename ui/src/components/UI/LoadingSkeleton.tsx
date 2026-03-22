// @ts-nocheck

export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 rounded-lg bg-gray-100 dark:bg-gray-800 p-4 animate-pulse">
          <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/6 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/6 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonText({ width = 'w-full' }: { width?: string }) {
  return <div className={`h-4 rounded bg-gray-200 dark:bg-gray-800 animate-pulse ${width}`} />
}

export function SkeletonAvatar() {
  return <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
