// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClockIcon, XCircleIcon } from '@heroicons/react/24/outline'

const steps = [
  'Our team reviews your application and store details.',
  'You will receive an email notification once a decision is made.',
  'If approved, your vendor dashboard will be activated immediately.',
]

export default function Status() {
  const [status] = useState<'pending' | 'rejected'>('pending')

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="flex min-h-[60vh] items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-lg text-center">
          {status === 'pending' ? (
            <>
              {/* Pending Icon */}
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary-600/10">
                <ClockIcon className="size-10 text-primary-600" />
              </div>

              {/* Heading */}
              <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Application Under Review
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                Your vendor application is being reviewed by our team. This usually takes 1-2 business days.
              </p>

              {/* Store name */}
              <p className="mt-4 text-base font-medium text-gray-900 dark:text-white">
                Luxe Boutique
              </p>

              {/* Submission date */}
              <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
                Application submitted on March 10, 2026
              </p>

              {/* What happens next */}
              <div className="mt-8 rounded-xl bg-white dark:bg-gray-900 p-6 text-left">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">What happens next?</h2>
                <ol className="mt-4 space-y-3">
                  {steps.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-600/10 text-xs font-semibold text-primary-600">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Links */}
              <div className="mt-6 flex flex-col items-center gap-3">
                <Link
                  to="/support"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Contact Support
                </Link>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Rejected Icon */}
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-red-500/10">
                <XCircleIcon className="size-10 text-red-400" />
              </div>

              {/* Heading */}
              <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                Application Not Approved
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                Unfortunately, your vendor application was not approved at this time.
              </p>

              {/* Rejection Reason */}
              <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-left">
                <h3 className="text-sm font-semibold text-red-400">Reason</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  The business documentation provided could not be verified. Please ensure your business registration and tax identification documents are valid and resubmit your application.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col items-center gap-4">
                <Link
                  to="/vendor/register"
                  className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
                >
                  Resubmit Application
                </Link>
                <Link
                  to="/support"
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Contact Support
                </Link>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  Back to Home
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
