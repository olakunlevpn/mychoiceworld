// @ts-nocheck
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from '../contexts/LocationContext'

export default function LocationModal() {
  const { city, setCity, isDetecting, detectLocation, isModalOpen, closeModal } = useLocation()
  const [inputValue, setInputValue] = useState(city)

  const handleOpen = () => {
    setInputValue(city)
  }

  const handleSave = () => {
    const trimmed = inputValue.trim()
    if (trimmed) {
      setCity(trimmed)
    }
    closeModal()
  }

  const handleDetect = () => {
    detectLocation()
    closeModal()
  }

  return (
    <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50" afterEnter={handleOpen}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 shadow-xl transition-all duration-300 data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <MapPinIcon className="size-5 text-primary-600" />
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Set Your Location</h3>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-md p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <XMarkIcon className="size-5" />
            </button>
          </div>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter your city to discover boutiques and outfits nearby.
          </p>

          <div className="mt-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="Enter city name"
              className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          <button
            type="button"
            onClick={handleDetect}
            disabled={isDetecting}
            className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50"
          >
            {isDetecting ? (
              <>
                <div className="size-4 animate-spin rounded-full border-2 border-gray-400 border-t-primary-600" />
                Detecting...
              </>
            ) : (
              <>
                <svg className="size-4 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Use my current location
              </>
            )}
          </button>

          <div className="mt-4 flex gap-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Save
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
