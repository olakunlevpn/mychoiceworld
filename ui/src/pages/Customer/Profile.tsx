// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CameraIcon } from '@heroicons/react/24/outline'

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Jane Cooper',
    email: 'jane.cooper@example.com',
    phone: '+1 (555) 123-4567',
  })

  const [location, setLocation] = useState({
    address: '456 Oak Street',
    city: 'New York',
    state: 'New York',
    country: 'United States',
  })

  const [notifications, setNotifications] = useState({
    reservationUpdates: true,
    promotions: false,
    newArrivals: true,
  })

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">My Profile</h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Avatar & Name */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="relative">
                <img
                  src="https://picsum.photos/seed/avatar/200/200"
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
                  className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
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
                  disabled
                  className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-4 py-2.5 text-sm text-gray-400 dark:text-gray-500 cursor-not-allowed"
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
                  className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
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

          {/* Location */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Location</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={location.address}
                  onChange={(e) => setLocation({ ...location, address: e.target.value })}
                  className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    State / Province
                  </label>
                  <input
                    id="state"
                    type="text"
                    value={location.state}
                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                    className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  value={location.country}
                  onChange={(e) => setLocation({ ...location, country: e.target.value })}
                  className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
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

          {/* Account Settings Link */}
          <Link
            to="/settings"
            className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-900 p-6 group transition-colors hover:ring-1 hover:ring-primary-600"
          >
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">Account Settings</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Change your email, password, and manage active sessions</p>
            </div>
            <svg className="size-5 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>

          {/* Notification Preferences */}
          <div className="rounded-lg bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Reservation Updates</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about reservation status changes</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.reservationUpdates}
                  onClick={() => setNotifications({ ...notifications, reservationUpdates: !notifications.reservationUpdates })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    notifications.reservationUpdates ? 'bg-primary-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.reservationUpdates ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Promotions</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Receive promotional offers and discounts</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.promotions}
                  onClick={() => setNotifications({ ...notifications, promotions: !notifications.promotions })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    notifications.promotions ? 'bg-primary-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.promotions ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">New Arrivals Near Me</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when new products are available nearby</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={notifications.newArrivals}
                  onClick={() => setNotifications({ ...notifications, newArrivals: !notifications.newArrivals })}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    notifications.newArrivals ? 'bg-primary-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications.newArrivals ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
