// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BellIcon,
  CalendarDaysIcon,
  XCircleIcon,
  StarIcon,
  EyeIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline'

const initialNotifications = [
  {
    id: 1,
    type: 'new_reservation',
    title: 'New Reservation Received',
    description: 'Sarah Mitchell reserved Elegant Evening Gown for pickup on Mar 15, 2026.',
    timestamp: '25 minutes ago',
    read: false,
    group: 'Today',
    link: '/vendor/reservations',
  },
  {
    id: 2,
    type: 'new_review',
    title: 'New Review Received',
    description: 'James Kowalski left a 5-star review on Classic Navy Suit. "Perfect tailoring and premium materials."',
    timestamp: '2 hours ago',
    read: false,
    group: 'Today',
    link: '/vendor/reviews',
  },
  {
    id: 3,
    type: 'view_milestone',
    title: 'Product View Milestone',
    description: 'Your product Silk Cocktail Dress has reached 500 views! It\'s trending in your area.',
    timestamp: '5 hours ago',
    read: false,
    group: 'Today',
    link: '/vendor/analytics',
  },
  {
    id: 4,
    type: 'reservation_cancelled',
    title: 'Reservation Cancelled',
    description: 'Daniel Park cancelled their reservation for Pearl Drop Earrings (RSV-2026-042).',
    timestamp: 'Yesterday at 4:30 PM',
    read: true,
    group: 'Yesterday',
    link: '/vendor/reservations',
  },
  {
    id: 5,
    type: 'payout_processed',
    title: 'Payout Processed',
    description: 'Your payout of $1,850.00 has been processed and will arrive in your account within 2-3 business days.',
    timestamp: 'Yesterday at 10:00 AM',
    read: true,
    group: 'Yesterday',
    link: '/vendor/analytics',
  },
  {
    id: 6,
    type: 'new_reservation',
    title: 'New Reservation Received',
    description: 'Emma Thompson reserved Cashmere Wrap Scarf for pickup on Mar 12, 2026.',
    timestamp: 'Yesterday at 9:15 AM',
    read: true,
    group: 'Yesterday',
    link: '/vendor/reservations',
  },
  {
    id: 7,
    type: 'new_review',
    title: 'New Review Received',
    description: 'Michael Chen left a 4-star review on Leather Weekend Bag. "Great quality leather bag with excellent stitching."',
    timestamp: 'Mar 11, 2026',
    read: true,
    group: 'Earlier',
    link: '/vendor/reviews',
  },
  {
    id: 8,
    type: 'view_milestone',
    title: 'Product View Milestone',
    description: 'Your store has reached 1,000 total profile views this month!',
    timestamp: 'Mar 9, 2026',
    read: true,
    group: 'Earlier',
    link: '/vendor/analytics',
  },
]

const notificationIcons = {
  new_reservation: { icon: CalendarDaysIcon, color: 'text-primary-600 bg-primary-600/10' },
  reservation_cancelled: { icon: XCircleIcon, color: 'text-red-400 bg-red-500/10' },
  new_review: { icon: StarIcon, color: 'text-yellow-400 bg-yellow-500/10' },
  view_milestone: { icon: EyeIcon, color: 'text-blue-400 bg-blue-500/10' },
  payout_processed: { icon: BanknotesIcon, color: 'text-green-400 bg-green-500/10' },
}

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    )
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const groups = ['Today', 'Yesterday', 'Earlier']
  const groupedNotifications = groups
    .map((group) => ({
      label: group,
      items: notifications.filter((n) => n.group === group),
    }))
    .filter((g) => g.items.length > 0)

  if (notifications.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-dark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-32">
            <BellIcon className="size-20 text-gray-600" />
            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">No notifications</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              We'll notify you when something important happens
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Notifications</h1>
              {unreadCount > 0 && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {groupedNotifications.map((group) => (
            <div key={group.label}>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {group.label}
              </h2>
              <div className="mt-3 space-y-2">
                {group.items.map((notification) => {
                  const config = notificationIcons[notification.type]
                  const Icon = config.icon
                  return (
                    <Link
                      key={notification.id}
                      to={notification.link}
                      className={`flex gap-4 rounded-lg p-4 transition-colors hover:bg-gray-100 dark:hover:bg-white/5 ${
                        !notification.read ? 'bg-white dark:bg-gray-900' : ''
                      }`}
                    >
                      {/* Icon */}
                      <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${config.color}`}>
                        <Icon className="size-5" />
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary-600" />
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {notification.description}
                        </p>
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{notification.timestamp}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
