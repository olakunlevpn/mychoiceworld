// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function ResetPassword() {
  const [email] = useState('user@example.com')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-8 py-10">
          {/* Logo */}
          <div className="flex justify-center">
            <img alt="myChoice" src="/logo-desktop-light.png" className="h-10 w-auto dark:hidden" />
            <img alt="myChoice" src="/logo-desktop-dark.png" className="hidden h-10 w-auto dark:block" />
          </div>

          {success ? (
            <div className="mt-8 flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-primary-600/10">
                <CheckCircleIcon className="size-8 text-primary-600" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                Password reset successful
              </h3>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Your password has been updated successfully. You can now sign in with your new password.
              </p>
              <Link
                to="/login"
                className="mt-8 flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
              >
                Sign in to your account
              </Link>
            </div>
          ) : (
            <>
              {/* Heading */}
              <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Set new password
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                {/* Email (read-only) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    disabled
                    className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* New password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    New password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  />
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="password-confirmation" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Confirm password
                  </label>
                  <input
                    id="password-confirmation"
                    name="password_confirmation"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirm new password"
                    className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                >
                  Reset Password
                </button>
              </form>

              {/* Back to sign in */}
              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-x-1.5 text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  <svg
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
