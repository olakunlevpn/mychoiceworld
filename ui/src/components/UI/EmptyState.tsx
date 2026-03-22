// @ts-nocheck
import { Link } from 'react-router-dom'

interface EmptyStateProps {
  icon: React.ComponentType<any>
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  onAction?: () => void
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
        <Icon className="size-12 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">{description}</p>

      {actionLabel && actionHref && (
        <Link
          to={actionHref}
          className="mt-6 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-500"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && !actionHref && (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
