// @ts-nocheck
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="bg-gray-50 dark:bg-dark relative overflow-hidden">
      {/* Decorative dot grid background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      <div className="relative flex min-h-[70vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">

          {/* Decorative 404 */}
          <p className="text-8xl font-bold text-primary-600 opacity-20 select-none leading-none" aria-hidden="true">
            404
          </p>

          {/* Main heading */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mt-4 text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors w-full sm:w-auto"
            >
              Go Home
            </Link>
            <Link
              to="/discover"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:border-gray-500 transition-colors w-full sm:w-auto"
            >
              Discover Products
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
