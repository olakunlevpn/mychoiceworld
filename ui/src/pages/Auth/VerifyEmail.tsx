// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function VerifyEmail() {
  const [resent, setResent] = useState(false)

  const handleResend = () => {
    setResent(true)
    setTimeout(() => setResent(false), 5000)
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

          {/* Icon */}
          <div className="mt-8 flex justify-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary-600/10">
              <EnvelopeIcon className="size-8 text-primary-600" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Verify your email
          </h2>

          <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
            We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
          </p>

          {/* Email hint */}
          <div className="mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-dark px-4 py-3 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sent to <span className="font-medium text-gray-900 dark:text-white">user@example.com</span>
            </p>
          </div>

          {/* Resend */}
          <div className="mt-6 text-center">
            {resent ? (
              <div className="inline-flex items-center gap-2 text-sm text-primary-600">
                <CheckCircleIcon className="size-4" />
                Verification link resent!
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Didn't receive the email?{' '}
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Resend verification link
                </button>
              </p>
            )}
          </div>

          {/* Tips */}
          <div className="mt-8 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Can't find the email?
            </h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                Check your spam or junk folder
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                Make sure you entered the correct email
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gray-300 dark:bg-gray-600" />
                Wait a few minutes and try again
              </li>
            </ul>
          </div>

          {/* Back to sign in */}
          <div className="mt-8 text-center">
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
