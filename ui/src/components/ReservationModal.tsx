// @ts-nocheck
import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import {
  XMarkIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

interface ReservationModalProps {
  open: boolean
  onClose: () => void
  product?: {
    name: string
    price: string
    store: string
    imageSrc: string
    slug: string
  }
}

export default function ReservationModal({ open, onClose, product }: ReservationModalProps) {
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleClose = () => {
    onClose()
    // Reset after animation completes
    setTimeout(() => {
      setSubmitted(false)
      setDate('')
      setNotes('')
    }, 300)
  }

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="relative w-full max-w-md transform rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800 transition duration-300 data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-md p-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <XMarkIcon className="size-5" />
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div className="border-b border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Reserve Item</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Secure this item at the store</p>
              </div>

              {/* Product preview */}
              {product && (
                <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-800 p-6">
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="size-16 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <MapPinIcon className="size-3 text-primary-600" />
                      {product.store}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-primary-600">{product.price}</p>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label htmlFor="reserve-date" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Pickup Date <span className="text-red-400">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      id="reserve-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reserve-notes" className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                    Notes <span className="text-gray-400 dark:text-gray-500">(optional)</span>
                  </label>
                  <textarea
                    id="reserve-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or sizing notes..."
                    className="mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  />
                </div>

                {/* Info notice */}
                <div className="rounded-lg bg-gray-100 dark:bg-white/5 p-3 text-xs text-gray-500 dark:text-gray-400">
                  Reservations are held for <span className="font-medium text-gray-900 dark:text-white">48 hours</span>. You'll receive a confirmation once the store approves.
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-md bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="p-8 text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircleIcon className="size-8 text-green-500" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Reservation Submitted!</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Your reservation is pending store approval. You'll be notified once confirmed.
              </p>

              <div className="mt-4 rounded-lg bg-gray-100 dark:bg-white/5 p-4 text-left">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Reservation Code</span>
                  <span className="font-mono font-semibold text-gray-900 dark:text-white">RSV-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span>
                </div>
                {date && (
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Pickup Date</span>
                    <span className="text-gray-900 dark:text-white">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  Continue Shopping
                </button>
                <Link
                  to="/reservations"
                  onClick={handleClose}
                  className="flex-1 rounded-md bg-primary-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
                >
                  View Reservations
                </Link>
              </div>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
