// @ts-nocheck
import { Link } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

interface Breadcrumb {
  name: string
  href: string
}

interface PageHeaderProps {
  title: string
  description?: string
  actions?: React.ReactNode
  breadcrumbs?: Breadcrumb[]
}

export default function PageHeader({ title, description, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          {breadcrumbs.map((crumb, index) => (
            <span key={crumb.href} className="flex items-center gap-1">
              {index > 0 && <ChevronRightIcon className="size-3.5 text-gray-400 dark:text-gray-600" />}
              <Link to={crumb.href} className="hover:text-gray-900 dark:hover:text-white">
                {crumb.name}
              </Link>
            </span>
          ))}
        </nav>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {description && <p className="mt-1 text-base text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  )
}
