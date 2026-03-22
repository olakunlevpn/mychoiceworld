// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowTopRightOnSquareIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const defaultHours = [
  { day: 'Monday', open: '09:00', close: '18:00', closed: false },
  { day: 'Tuesday', open: '09:00', close: '18:00', closed: false },
  { day: 'Wednesday', open: '09:00', close: '18:00', closed: false },
  { day: 'Thursday', open: '09:00', close: '18:00', closed: false },
  { day: 'Friday', open: '09:00', close: '18:00', closed: false },
  { day: 'Saturday', open: '10:00', close: '16:00', closed: false },
  { day: 'Sunday', open: '00:00', close: '00:00', closed: true },
]

const timeOptions = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
]

function formatTime(time: string) {
  const [hours] = time.split(':')
  const h = parseInt(hours, 10)
  const suffix = h >= 12 ? 'PM' : 'AM'
  const display = h === 0 ? 12 : h > 12 ? h - 12 : h
  return `${display}:00 ${suffix}`
}

const inputClasses =
  'mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600'

export default function StoreEditor() {
  const [storeInfo, setStoreInfo] = useState({
    name: 'Luxe Boutique',
    description:
      'Curated luxury fashion and accessories for the modern individual. We bring you the finest pieces from renowned designers.',
    phone: '+1 (555) 987-6543',
    whatsapp: '+1 (555) 987-6543',
    email: 'hello@luxeboutique.com',
  })

  const [location, setLocation] = useState({
    address: '123 Fashion Avenue',
    city: 'New York',
    state: 'New York',
    country: 'United States',
    postalCode: '10001',
  })

  const [hours, setHours] = useState(defaultHours)

  const updateHour = (index: number, field: string, value: string | boolean) => {
    setHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 pt-16 sm:pt-24">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Store Profile
            </h1>
            <Link
              to="/stores/luxe-boutique"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              <ArrowTopRightOnSquareIcon className="size-4" />
              Preview Store
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* Branding */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Branding</h2>
            <div className="mt-4 space-y-6">
              {/* Banner */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Banner Image</label>
                <div className="relative mt-1.5 h-48 w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
                  <img
                    src="https://picsum.photos/seed/banner/800/300"
                    alt="Store banner"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <PhotoIcon className="size-8" />
                      <span className="text-sm font-medium">Change Banner</span>
                    </div>
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                  Recommended: 1200 x 400px, JPG or PNG
                </p>
              </div>

              {/* Logo */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Store Logo</label>
                <div className="mt-1.5 flex items-center gap-4">
                  <div className="relative size-24 overflow-hidden rounded-full border-2 border-dashed border-gray-200 dark:border-gray-700">
                    <img
                      src="https://picsum.photos/seed/logo/200/200"
                      alt="Store logo"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                      <PhotoIcon className="size-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      Upload Logo
                    </button>
                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Square image, at least 200 x 200px</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Basic Information</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Store Name
                </label>
                <p className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">{storeInfo.name}</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Store name cannot be changed after approval.</p>
              </div>
              <div>
                <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Store Description
                </label>
                <textarea
                  id="storeDescription"
                  rows={4}
                  value={storeInfo.description}
                  onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="storePhone" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    id="storePhone"
                    type="tel"
                    value={storeInfo.phone}
                    onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="storeWhatsapp" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    WhatsApp Number
                  </label>
                  <input
                    id="storeWhatsapp"
                    type="tel"
                    value={storeInfo.whatsapp}
                    onChange={(e) => setStoreInfo({ ...storeInfo, whatsapp: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Email
                </label>
                <input
                  id="storeEmail"
                  type="email"
                  value={storeInfo.email}
                  onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Location</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="storeAddress" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Address
                </label>
                <input
                  id="storeAddress"
                  type="text"
                  value={location.address}
                  onChange={(e) => setLocation({ ...location, address: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="storeCity" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    City
                  </label>
                  <input
                    id="storeCity"
                    type="text"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="storeState" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    State / Province
                  </label>
                  <input
                    id="storeState"
                    type="text"
                    value={location.state}
                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="storeCountry" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Country
                  </label>
                  <input
                    id="storeCountry"
                    type="text"
                    value={location.country}
                    onChange={(e) => setLocation({ ...location, country: e.target.value })}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="storePostalCode" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Postal Code
                  </label>
                  <input
                    id="storePostalCode"
                    type="text"
                    value={location.postalCode}
                    onChange={(e) => setLocation({ ...location, postalCode: e.target.value })}
                    className={inputClasses}
                  />
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-2 flex h-48 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <p className="text-sm text-gray-400 dark:text-gray-500">Map will be displayed here</p>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Operating Hours</h2>
            <div className="mt-4 space-y-3">
              {hours.map((entry, index) => (
                <div
                  key={entry.day}
                  className="flex flex-col gap-3 rounded-lg bg-gray-100 dark:bg-white/5 p-4 sm:flex-row sm:items-center"
                >
                  <span className="w-28 shrink-0 text-sm font-medium text-gray-900 dark:text-white">{entry.day}</span>
                  <div className="flex flex-1 items-center gap-3">
                    <select
                      value={entry.open}
                      disabled={entry.closed}
                      onChange={(e) => updateHour(index, 'open', e.target.value)}
                      className={`${inputClasses} mt-0 ${entry.closed ? 'cursor-not-allowed opacity-40' : ''}`}
                    >
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {formatTime(t)}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-400 dark:text-gray-500">to</span>
                    <select
                      value={entry.close}
                      disabled={entry.closed}
                      onChange={(e) => updateHour(index, 'close', e.target.value)}
                      className={`${inputClasses} mt-0 ${entry.closed ? 'cursor-not-allowed opacity-40' : ''}`}
                    >
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {formatTime(t)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={entry.closed}
                      onClick={() => updateHour(index, 'closed', !entry.closed)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
                        entry.closed ? 'bg-red-500' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          entry.closed ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Closed</span>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="mt-4 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                Save Hours
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Save Profile
          </button>
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
