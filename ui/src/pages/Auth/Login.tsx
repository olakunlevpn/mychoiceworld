// @ts-nocheck
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/vendor')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8 sm:px-10">
          <div className="flex justify-center">
            <img alt="Logo" src="/logo-desktop-light.png" className="h-10 w-auto dark:hidden" />
            <img alt="Logo" src="/logo-desktop-dark.png" className="hidden h-10 w-auto dark:block" />
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:ring-primary-600 focus:outline-none sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:ring-primary-600 focus:outline-none sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-primary-600 focus:ring-primary-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                Register
              </Link>
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Are you a store owner?{' '}
              <Link to="/vendor/register" className="font-medium text-primary-600 hover:text-primary-500">
                Register as vendor
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
