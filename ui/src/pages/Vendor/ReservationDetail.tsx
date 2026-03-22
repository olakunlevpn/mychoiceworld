// @ts-nocheck
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XMarkIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserIcon,
  GlobeAltIcon,
  SparklesIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline'

const reservationData = {
  'RSV-2024-001': {
    code: 'RSV-2024-001',
    status: 'pending',
    source: 'Browse',
    customerNote: "I'd like to try this on before purchasing. Could you have it ready by noon?",
    customer: {
      name: 'Sarah Mitchell',
      initial: 'S',
      email: 'sarah.mitchell@email.com',
      phone: '+1 (555) 234-5678',
      memberSince: 'January 2025',
    },
    product: {
      name: 'Elegant Evening Gown',
      image: 'https://picsum.photos/seed/rsv1/600/600',
      price: '$289',
      variant: 'Size M, Black',
      quantity: 1,
    },
    createdAt: 'Mar 12, 2026 at 2:30 PM',
    pickupDate: 'Mar 15, 2026',
    expiresAt: 'Mar 17, 2026',
    timeline: [
      { step: 'Reserved', timestamp: 'Mar 12, 2026 at 2:30 PM', completed: true },
      { step: 'Confirmed', timestamp: null, completed: false },
      { step: 'Ready for Pickup', timestamp: null, completed: false },
      { step: 'Completed', timestamp: null, completed: false },
    ],
    vendorNote: '',
  },
  'RSV-2024-004': {
    code: 'RSV-2024-004',
    status: 'confirmed',
    source: 'AI Match',
    customerNote: 'This is a gift — would love gift wrapping if possible.',
    customer: {
      name: 'Daniel Park',
      initial: 'D',
      email: 'daniel.park@email.com',
      phone: '+1 (555) 876-5432',
      memberSince: 'March 2024',
    },
    product: {
      name: 'Silk Cocktail Dress',
      image: 'https://picsum.photos/seed/rsv4/600/600',
      price: '$320',
      variant: 'Size S, Red',
      quantity: 1,
    },
    createdAt: 'Mar 10, 2026 at 11:00 AM',
    pickupDate: 'Mar 14, 2026',
    expiresAt: 'Mar 16, 2026',
    timeline: [
      { step: 'Reserved', timestamp: 'Mar 10, 2026 at 11:00 AM', completed: true },
      { step: 'Confirmed', timestamp: 'Mar 10, 2026 at 11:45 AM', completed: true },
      { step: 'Ready for Pickup', timestamp: null, completed: false },
      { step: 'Completed', timestamp: null, completed: false },
    ],
    vendorNote: 'Customer requested gift wrapping.',
  },
  'RSV-2024-006': {
    code: 'RSV-2024-006',
    status: 'ready',
    source: 'AI Match',
    customerNote: '',
    customer: {
      name: 'Marcus Williams',
      initial: 'M',
      email: 'marcus.w@email.com',
      phone: '+1 (555) 345-6789',
      memberSince: 'June 2024',
    },
    product: {
      name: 'Minimalist Watch',
      image: 'https://picsum.photos/seed/rsv6/600/600',
      price: '$195',
      variant: 'Silver, Leather Strap',
      quantity: 1,
    },
    createdAt: 'Mar 8, 2026 at 9:15 AM',
    pickupDate: 'Mar 14, 2026',
    expiresAt: 'Mar 16, 2026',
    timeline: [
      { step: 'Reserved', timestamp: 'Mar 8, 2026 at 9:15 AM', completed: true },
      { step: 'Confirmed', timestamp: 'Mar 8, 2026 at 10:00 AM', completed: true },
      { step: 'Ready for Pickup', timestamp: 'Mar 13, 2026 at 4:30 PM', completed: true },
      { step: 'Completed', timestamp: null, completed: false },
    ],
    vendorNote: '',
  },
  'RSV-2024-008': {
    code: 'RSV-2024-008',
    status: 'completed',
    source: 'Browse',
    customerNote: '',
    customer: {
      name: 'Liam Foster',
      initial: 'L',
      email: 'liam.foster@email.com',
      phone: '+1 (555) 567-8901',
      memberSince: 'October 2024',
    },
    product: {
      name: 'Tailored Blazer',
      image: 'https://picsum.photos/seed/rsv8/600/600',
      price: '$375',
      variant: 'Size L, Charcoal',
      quantity: 1,
    },
    createdAt: 'Mar 1, 2026 at 3:00 PM',
    pickupDate: 'Mar 5, 2026',
    expiresAt: 'Mar 7, 2026',
    timeline: [
      { step: 'Reserved', timestamp: 'Mar 1, 2026 at 3:00 PM', completed: true },
      { step: 'Confirmed', timestamp: 'Mar 1, 2026 at 3:30 PM', completed: true },
      { step: 'Ready for Pickup', timestamp: 'Mar 4, 2026 at 10:00 AM', completed: true },
      { step: 'Completed', timestamp: 'Mar 5, 2026 at 2:15 PM', completed: true },
    ],
    vendorNote: 'Customer picked up on time. Very pleasant.',
  },
}

const statusStyles = {
  pending: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20',
  confirmed: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  ready: 'bg-green-500/10 text-green-400 ring-green-500/20',
  completed: 'bg-gray-500/10 text-gray-400 ring-gray-500/20',
  'no-show': 'bg-red-500/10 text-red-400 ring-red-500/20',
  cancelled: 'bg-red-500/10 text-red-400 ring-red-500/20',
}

const statusLabels = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  ready: 'Ready for Pickup',
  completed: 'Completed',
  'no-show': 'No-show',
  cancelled: 'Cancelled',
}

export default function ReservationDetail() {
  const { code } = useParams()
  const reservation = reservationData[code] || reservationData['RSV-2024-001']
  const [vendorNote, setVendorNote] = useState(reservation.vendorNote || '')

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          {/* Back link */}
          <Link
            to="/vendor/reservations"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Reservations
          </Link>

          {/* Header */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                {reservation.code}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Created {reservation.createdAt}
              </p>
            </div>
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset ${
                statusStyles[reservation.status]
              }`}
            >
              {statusLabels[reservation.status]}
            </span>
          </div>
        </div>

        {/* Customer info */}
        <div className="rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Customer Information</h2>
          <div className="mt-4 flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-600/20 text-lg font-semibold text-primary-600">
              {reservation.customer.initial}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">{reservation.customer.name}</h3>
              <div className="mt-2 space-y-1.5">
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="size-4 shrink-0 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{reservation.customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon className="size-4 shrink-0 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{reservation.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="size-4 shrink-0 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">Member since {reservation.customer.memberSince}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mt-4 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Product Details</h2>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <img
              src={reservation.product.image}
              alt={reservation.product.name}
              className="size-32 rounded-lg object-cover sm:size-40"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{reservation.product.name}</h3>
              <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">{reservation.product.variant}</p>
              <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">Qty: {reservation.product.quantity}</p>
              <p className="mt-3 text-xl font-bold text-gray-900 dark:text-white">{reservation.product.price}</p>
            </div>
          </div>
        </div>

        {/* Reservation details */}
        <div className="mt-4 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Reservation Details</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-gray-100 dark:bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <CalendarDaysIcon className="size-3.5" />
                Reservation Code
              </div>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{reservation.code}</p>
            </div>
            <div className="rounded-lg bg-gray-100 dark:bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <CalendarDaysIcon className="size-3.5" />
                Created Date
              </div>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{reservation.createdAt}</p>
            </div>
            <div className="rounded-lg bg-gray-100 dark:bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <ClockIcon className="size-3.5" />
                Pickup Date
              </div>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{reservation.pickupDate}</p>
            </div>
            <div className="rounded-lg bg-gray-100 dark:bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <ClockIcon className="size-3.5" />
                Expires
              </div>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{reservation.expiresAt}</p>
            </div>
            <div className="rounded-lg bg-gray-100 dark:bg-white/5 p-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                {reservation.source === 'AI Match' ? (
                  <SparklesIcon className="size-3.5" />
                ) : (
                  <GlobeAltIcon className="size-3.5" />
                )}
                Source
              </div>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{reservation.source}</p>
            </div>
          </div>
        </div>

        {/* Customer note */}
        {reservation.customerNote && (
          <div className="mt-4 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Customer Note</h2>
            <div className="mt-4 flex items-start gap-3">
              <ChatBubbleLeftEllipsisIcon className="size-5 shrink-0 text-gray-400 dark:text-gray-500" />
              <p className="text-sm text-gray-600 dark:text-gray-300">{reservation.customerNote}</p>
            </div>
          </div>
        )}

        {/* Timeline */}
        <div className="mt-4 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Reservation Timeline</h2>
          <div className="mt-6">
            <div className="space-y-0">
              {reservation.timeline.map((step, idx) => {
                const isLast = idx === reservation.timeline.length - 1
                return (
                  <div key={step.step} className="relative flex gap-4">
                    {/* Vertical line */}
                    {!isLast && (
                      <div
                        className={`absolute left-[11px] top-6 h-full w-0.5 ${
                          step.completed ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    )}

                    {/* Icon */}
                    <div className="relative z-10 shrink-0">
                      {step.completed ? (
                        <div className="flex size-6 items-center justify-center rounded-full bg-primary-600">
                          <CheckCircleIcon className="size-4 text-white" />
                        </div>
                      ) : (
                        <div className="flex size-6 items-center justify-center rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-dark">
                          <div className="size-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={`pb-8 ${isLast ? 'pb-0' : ''}`}>
                      <p className={`text-sm font-medium ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                        {step.step}
                      </p>
                      {step.timestamp && (
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{step.timestamp}</p>
                      )}
                      {!step.completed && !step.timestamp && (
                        <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-600">Pending</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Vendor note */}
        <div className="mt-4 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Internal Note</h2>
          <textarea
            rows={3}
            value={vendorNote}
            onChange={(e) => setVendorNote(e.target.value)}
            placeholder="Add a private note about this reservation..."
            className="mt-4 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
          <button
            type="button"
            className="mt-3 rounded-md bg-gray-100 dark:bg-white/5 px-5 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10"
          >
            Save Note
          </button>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {reservation.status === 'pending' && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                <CheckCircleIcon className="size-4" />
                Confirm Reservation
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-red-500/30 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10"
              >
                <XMarkIcon className="size-4" />
                Decline
              </button>
            </>
          )}
          {reservation.status === 'confirmed' && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
              >
                <CheckCircleIcon className="size-4" />
                Mark Ready for Pickup
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20"
              >
                <XMarkIcon className="size-4" />
                Cancel Reservation
              </button>
            </>
          )}
          {reservation.status === 'ready' && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                <CheckCircleIcon className="size-4" />
                Complete
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20"
              >
                <XMarkIcon className="size-4" />
                No-show
              </button>
            </>
          )}
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
