// @ts-nocheck
import { useState } from 'react'
import { EnvelopeIcon, KeyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function CustomerSettings() {
  const [email, setEmail] = useState('jane.cooper@example.com')
  const [newEmail, setNewEmail] = useState('')
  const [emailPassword, setEmailPassword] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [sessions] = useState([
    { device: 'Chrome on macOS', location: 'New York, US', lastActive: 'Now', current: true },
    { device: 'Safari on iPhone', location: 'New York, US', lastActive: '2 hours ago', current: false },
    { device: 'Chrome on Windows', location: 'Chicago, US', lastActive: '3 days ago', current: false },
  ])

  const inputClasses =
    'mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600'

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Account Settings</h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            Manage your email, password, and account security
          </p>
        </div>

        <div className="space-y-6">
          {/* Email Address */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <EnvelopeIcon className="size-5 text-primary-600" />
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Email Address</h2>
            </div>

            {!showEmailForm ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">{email}</p>
                  <p className="mt-0.5 text-xs text-green-500">Verified</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmailForm(true)}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentEmail" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Current Email
                  </label>
                  <input
                    id="currentEmail"
                    type="email"
                    value={email}
                    disabled
                    className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-4 py-2.5 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="newEmail" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    New Email Address
                  </label>
                  <input
                    id="newEmail"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter new email address"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="emailPassword" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Confirm Password
                  </label>
                  <input
                    id="emailPassword"
                    type="password"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    placeholder="Enter your password to confirm"
                    className={inputClasses}
                  />
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  A verification link will be sent to your new email address.
                </p>
                <div className="flex items-center gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmailForm(false)
                      setNewEmail('')
                      setEmailPassword('')
                    }}
                    className="rounded-md border border-gray-200 dark:border-gray-700 px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-primary-600 px-5 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                  >
                    Update Email
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <KeyIcon className="size-5 text-primary-600" />
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Change Password</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="Enter current password"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="Enter new password"
                  className={inputClasses}
                />
                <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                  Must be at least 8 characters with a mix of letters, numbers, and symbols.
                </p>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="Confirm new password"
                  className={inputClasses}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheckIcon className="size-5 text-primary-600" />
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Active Sessions</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              These are the devices currently logged into your account.
            </p>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {sessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device}</p>
                      {session.current && (
                        <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-500">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {session.location} &middot; {session.lastActive}
                    </p>
                  </div>
                  {!session.current && (
                    <button
                      type="button"
                      className="text-xs font-medium text-red-400 hover:text-red-300"
                    >
                      Revoke
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                className="text-sm font-medium text-red-400 hover:text-red-300"
              >
                Log out of all other sessions
              </button>
            </div>
          </div>
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
