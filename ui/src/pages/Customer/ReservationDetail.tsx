// @ts-nocheck
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
  ArrowLeftIcon,
  StarIcon as StarIconOutline,
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

const reservationData = {
  'RSV-2024-001': {
    code: 'RSV-2024-001',
    status: 'active',
    product: {
      name: 'Elegant Evening Gown',
      image: 'https://picsum.photos/seed/rsv1/600/600',
      price: '$289',
      variant: 'Size M, Black',
      description: 'A stunning evening gown perfect for formal events and galas.',
    },
    store: {
      name: 'Luxe Boutique',
      address: '123 Fashion Avenue, Downtown, New York, NY 10001',
      phone: '+1 (555) 234-5678',
    },
    timeline: [
      { step: 'Reserved', timestamp: 'Mar 12, 2026 at 2:30 PM', completed: true },
      { step: 'Confirmed', timestamp: 'Mar 12, 2026 at 3:15 PM', completed: true },
      { step: 'Ready for Pickup', timestamp: null, completed: false },
      { step: 'Completed', timestamp: null, completed: false },
    ],
    expiresIn: '2 days',
    reservedAt: 'Mar 12, 2026',
  },
  'RSV-2024-004': {
    code: 'RSV-2024-004',
    status: 'completed',
    product: {
      name: 'Silk Cocktail Dress',
      image: 'https://picsum.photos/seed/rsv4/600/600',
      price: '$320',
      variant: 'Size S, Red',
      description: 'An exquisite silk cocktail dress with a flattering silhouette.',
    },
    store: {
      name: 'Luxe Boutique',
      address: '123 Fashion Avenue, Downtown, New York, NY 10001',
      phone: '+1 (555) 234-5678',
    },
    timeline: [
      { step: 'Reserved', timestamp: 'Mar 5, 2026 at 10:00 AM', completed: true },
      { step: 'Confirmed', timestamp: 'Mar 5, 2026 at 10:45 AM', completed: true },
      { step: 'Ready for Pickup', timestamp: 'Mar 7, 2026 at 9:00 AM', completed: true },
      { step: 'Completed', timestamp: 'Mar 8, 2026 at 11:30 AM', completed: true },
    ],
    reservedAt: 'Mar 5, 2026',
  },
}

const statusStyles = {
  active: 'bg-green-500/10 text-green-400 ring-green-500/20',
  completed: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-400 ring-red-500/20',
}

export default function ReservationDetail() {
  const { code } = useParams()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  const reservation = reservationData[code] || reservationData['RSV-2024-001']

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          {/* Back link */}
          <Link
            to="/reservations"
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
                Reserved on {reservation.reservedAt}
              </p>
            </div>
            <span
              className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset ${
                statusStyles[reservation.status]
              }`}
            >
              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
            </span>
          </div>

          {reservation.status === 'active' && reservation.expiresIn && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-yellow-500/10 px-4 py-3">
              <ClockIcon className="size-5 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-400">
                Expires in {reservation.expiresIn}
              </span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Product Details</h2>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row">
            <img
              src={reservation.product.image}
              alt={reservation.product.name}
              className="size-32 rounded-lg object-cover sm:size-40"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{reservation.product.name}</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{reservation.product.description}</p>
              <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">{reservation.product.variant}</p>
              <p className="mt-3 text-xl font-bold text-gray-900 dark:text-white">{reservation.product.price}</p>
            </div>
          </div>
        </div>

        {/* Store info */}
        <div className="mt-4 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Store Information</h2>
          <div className="mt-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{reservation.store.name}</h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-start gap-2">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{reservation.store.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="size-4 shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{reservation.store.phone}</span>
              </div>
            </div>
            <button
              type="button"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-gray-100 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10"
            >
              <MapPinIcon className="size-4 text-primary-600" />
              Get Directions
            </button>
          </div>
        </div>

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
                        <div className="flex size-6 items-center justify-center rounded-full border-2 border-gray-600 bg-gray-50 dark:bg-dark">
                          <div className="size-2 rounded-full bg-gray-600" />
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
                        <p className="mt-0.5 text-xs text-gray-600">Pending</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {reservation.status === 'active' && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-gray-100 dark:bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10"
              >
                <MapPinIcon className="size-4 text-primary-600" />
                Get Directions
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-red-500/10 px-5 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/20"
              >
                <XMarkIcon className="size-4" />
                Cancel Reservation
              </button>
            </>
          )}
        </div>

        {/* Review form (completed only) */}
        {reservation.status === 'completed' && (
          <div className="mt-6 rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Leave a Review</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Share your experience with this product</p>

            {/* Star rating */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Rating</label>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = star <= (hoveredRating || rating)
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-0.5"
                    >
                      {filled ? (
                        <StarIconSolid className="size-7 text-yellow-400" />
                      ) : (
                        <StarIconOutline className="size-7 text-gray-600 hover:text-yellow-400" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Review text */}
            <div className="mt-4">
              <label htmlFor="review" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Your Review
              </label>
              <textarea
                id="review"
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us about your experience..."
                className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
            </div>

            <button
              type="button"
              className="mt-4 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Submit Review
            </button>
          </div>
        )}

        <div className="pb-24" />
      </div>
    </div>
  )
}
