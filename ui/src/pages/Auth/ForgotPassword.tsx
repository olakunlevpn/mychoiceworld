// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
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

          {/* Heading */}
          <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Reset your password
          </h2>

          {submitted ? (
            /* Success message */
            <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark px-6 py-8 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-600/10">
                <svg
                  className="size-6 text-primary-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">Check your email</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                We've sent a password reset link to your email address.
              </p>
            </div>
          ) : (
            /* Form */
            <>
              <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          )}

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
        </div>
      </div>
    </div>
  )
}
