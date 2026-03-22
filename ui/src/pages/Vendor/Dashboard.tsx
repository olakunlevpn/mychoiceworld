// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDaysIcon,
  ClockIcon,
  ShoppingBagIcon,
  PlusIcon,
  ArrowTopRightOnSquareIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'

const pendingReservations = [
  {
    id: 1,
    code: 'RES-A3X9K2',
    customer: 'Sarah M.',
    product: 'Elegant Evening Gown',
    requestedDate: 'Mar 15, 2026',
    timeAgo: '12 minutes ago',
  },
  {
    id: 2,
    code: 'RES-B7Y4M1',
    customer: 'James K.',
    product: 'Classic Navy Suit',
    requestedDate: 'Mar 16, 2026',
    timeAgo: '1 hour ago',
  },
  {
    id: 3,
    code: 'RES-C2Z8P5',
    customer: 'Olivia R.',
    product: 'Pearl Drop Earrings',
    requestedDate: 'Mar 17, 2026',
    timeAgo: '3 hours ago',
  },
]

const recentActivity = [
  {
    id: 1,
    description: 'New reservation from Sarah M. for "Elegant Evening Gown"',
    timestamp: '12 minutes ago',
  },
  {
    id: 2,
    description: "Product 'Evening Gown' received a 5-star review",
    timestamp: '2 hours ago',
  },
  {
    id: 3,
    description: 'Reservation RSV-2024-003 was completed',
    timestamp: '5 hours ago',
  },
  {
    id: 4,
    description: 'James K. cancelled reservation RSV-2024-007',
    timestamp: 'Yesterday',
  },
  {
    id: 5,
    description: "Product 'Silk Cocktail Dress' was added to 14 wishlists",
    timestamp: 'Yesterday',
  },
]

export default function Dashboard() {
  const [decliningId, setDecliningId] = useState<number | null>(null)
  const [declineReason, setDeclineReason] = useState('')

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const handleDeclineClick = (id: number) => {
    setDecliningId(id)
    setDeclineReason('')
  }

  const handleCancelDecline = () => {
    setDecliningId(null)
    setDeclineReason('')
  }

  const handleSubmitDecline = (id: number) => {
    if (!declineReason.trim()) return
    // TODO: submit decline with reason
    setDecliningId(null)
    setDeclineReason('')
  }

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-6 pt-16 sm:pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Dashboard</h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Welcome back, Luxe Boutique</p>
          <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">{todayFormatted}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Products */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-green-500/10">
                <ShoppingBagIcon className="size-6 text-green-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  12 <span className="text-lg font-medium text-gray-400 dark:text-gray-500">/ 15</span>
                </p>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Total Products</p>
              </div>
            </div>
          </div>

          {/* Pending Reservations */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-yellow-500/10">
                <ClockIcon className="size-6 text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">3</p>
                  <span className="size-2 rounded-full bg-yellow-400" />
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Pending Reservations</p>
              </div>
            </div>
          </div>

          {/* Total Reservations */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary-600/10">
                <CalendarDaysIcon className="size-6 text-primary-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">156</p>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Total Reservations</p>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-full bg-yellow-500/10">
                <StarIcon className="size-6 text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">4.8</p>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`size-3.5 ${star <= 4 ? 'text-yellow-400' : 'text-yellow-400/40'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Rating (127 reviews)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Reservations */}
        <div className="mt-8">
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Reservations</h2>
              <Link
                to="/vendor/reservations"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                View All
              </Link>
            </div>

            <div className="mt-4 space-y-4">
              {pendingReservations.map((reservation) => (
                <div key={reservation.id}>
                  <div
                    className="flex flex-col gap-4 rounded-lg bg-gray-100 dark:bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-primary-600">{reservation.code}</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{reservation.customer}</p>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{reservation.product}</p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          Requested: {reservation.requestedDate}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-600">{reservation.timeAgo}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                      >
                        Confirm
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeclineClick(reservation.id)}
                        className="rounded-md border border-red-500/30 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10"
                      >
                        Decline
                      </button>
                    </div>
                  </div>

                  {decliningId === reservation.id && (
                    <div className="mt-2 rounded-lg bg-gray-100 dark:bg-white/5 p-4">
                      <label htmlFor={`decline-reason-${reservation.id}`} className="block text-sm font-medium text-gray-900 dark:text-white">
                        Reason for declining
                      </label>
                      <textarea
                        id={`decline-reason-${reservation.id}`}
                        rows={3}
                        required
                        value={declineReason}
                        onChange={(e) => setDeclineReason(e.target.value)}
                        placeholder="Please provide a reason for declining this reservation..."
                        className="mt-2 block w-full rounded-md border-0 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-primary-600"
                      />
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleSubmitDecline(reservation.id)}
                          disabled={!declineReason.trim()}
                          className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Submit Decline
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelDecline}
                          className="rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>

            <div className="mt-4 space-y-0">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="relative flex gap-4 py-3">
                  {/* Timeline line */}
                  {index < recentActivity.length - 1 && (
                    <div className="absolute left-[7px] top-7 h-full w-px bg-gray-200 dark:bg-gray-700" />
                  )}
                  {/* Timeline dot */}
                  <div className="relative mt-1.5 size-[15px] shrink-0">
                    <div className="size-[15px] rounded-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" />
                    <div className="absolute inset-[4px] rounded-full bg-primary-600" />
                  </div>
                  {/* Content */}
                  <div className="min-w-0">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/vendor/products/create"
            className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            <PlusIcon className="size-4" />
            Add New Product
          </Link>
          <Link
            to="/stores/luxe-boutique"
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <ArrowTopRightOnSquareIcon className="size-4" />
            View Store
          </Link>
          <Link
            to="/vendor/store"
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <BuildingStorefrontIcon className="size-4" />
            Edit Store
          </Link>
          <Link
            to="/vendor/analytics"
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            <ChartBarIcon className="size-4" />
            View Analytics
          </Link>
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
