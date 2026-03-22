// @ts-nocheck
import { useState } from 'react'
import { CameraIcon } from '@heroicons/react/24/outline'

export default function Settings() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'John Doe',
    email: 'john@luxeboutique.com',
    phone: '+1 (555) 234-5678',
  })

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  const [notifications, setNotifications] = useState({
    reservationAlerts: true,
    reviewAlerts: true,
    promotions: false,
    weeklyReport: true,
  })

  const inputClasses =
    'mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600'

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Account Settings</h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            Manage your personal account details and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Avatar */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <img
                  src="https://picsum.photos/seed/vendoravatar/200/200"
                  alt="Profile avatar"
                  className="size-24 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700"
                >
                  <CameraIcon className="size-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{personalInfo.fullName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{personalInfo.email}</p>
                <button
                  type="button"
                  className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Personal Information</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Change Password</h2>
            <div className="mt-4 space-y-4">
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

          {/* Notification Preferences */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
            <div className="mt-4 space-y-4">
              {[
                { key: 'reservationAlerts', label: 'Reservation Alerts', desc: 'Get notified when customers make or update reservations' },
                { key: 'reviewAlerts', label: 'Review Alerts', desc: 'Get notified when customers leave new reviews' },
                { key: 'promotions', label: 'Promotions & Tips', desc: 'Receive tips on growing your store and platform updates' },
                { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive a weekly summary of your store performance' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={notifications[item.key]}
                    onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      notifications[item.key] ? 'bg-primary-600' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
