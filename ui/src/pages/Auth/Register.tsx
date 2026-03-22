// @ts-nocheck
import { Link, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/verify-email')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white dark:bg-gray-900 px-6 py-8 shadow-xl sm:px-10">
          <div className="flex justify-center">
            <Link to="/">
              <img alt="Logo" src="/logo-desktop-light.png" className="h-10 w-auto dark:hidden" />
              <img alt="Logo" src="/logo-desktop-dark.png" className="hidden h-10 w-auto dark:block" />
            </Link>
          </div>

          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="full-name" className="block text-sm/6 font-medium text-gray-600 dark:text-gray-300">
                Full name
              </label>
              <div className="mt-2">
                <input
                  id="full-name"
                  name="full-name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="John Doe"
                  className="block w-full rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-600 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className="block w-full rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-600 dark:text-gray-300">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password-confirmation" className="block text-sm/6 font-medium text-gray-600 dark:text-gray-300">
                Confirm password
              </label>
              <div className="mt-2">
                <input
                  id="password-confirmation"
                  name="password-confirmation"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  className="block w-full rounded-md bg-white dark:bg-gray-900 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-5 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 checked:border-primary-600 checked:bg-primary-600 indeterminate:border-primary-600 indeterminate:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:border-gray-300 dark:disabled:border-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:checked:bg-gray-100 dark:disabled:checked:bg-gray-800 forced-colors:appearance-auto"
                  />
                  <svg
                    fill="none"
                    viewBox="0 0 14 14"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:checked]:opacity-100"
                    />
                  </svg>
                </div>
              </div>
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 space-y-4 text-center text-sm">
            <p className="text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
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
