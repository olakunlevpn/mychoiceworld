// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BellIcon,
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  ChatBubbleLeftIcon,
  TagIcon,
} from '@heroicons/react/24/outline'

const initialNotifications = [
  {
    id: 1,
    type: 'reservation_confirmed',
    title: 'Reservation Confirmed',
    description: 'Your reservation RSV-2024-001 for Elegant Evening Gown has been confirmed by Luxe Boutique.',
    timestamp: '2 hours ago',
    read: false,
    group: 'Today',
    link: '/reservations/RSV-2024-001',
  },
  {
    id: 2,
    type: 'reservation_expiring',
    title: 'Reservation Expiring Soon',
    description: 'Your reservation RSV-2024-003 for Pearl Drop Earrings expires tomorrow. Pick it up before it expires.',
    timestamp: '4 hours ago',
    read: false,
    group: 'Today',
    link: '/reservations/RSV-2024-003',
  },
  {
    id: 3,
    type: 'new_product',
    title: 'New Arrival at Luxe Boutique',
    description: 'Luxe Boutique just added a new Silk Evening Wrap to their collection. Check it out!',
    timestamp: '6 hours ago',
    read: true,
    group: 'Today',
    link: '/discover',
  },
  {
    id: 4,
    type: 'reservation_confirmed',
    title: 'Reservation Confirmed',
    description: 'Your reservation RSV-2024-002 for Classic Navy Suit has been confirmed by The Gentleman\'s Store.',
    timestamp: 'Yesterday at 3:45 PM',
    read: true,
    group: 'Yesterday',
    link: '/reservations/RSV-2024-002',
  },
  {
    id: 5,
    type: 'review_reply',
    title: 'Vendor Replied to Your Review',
    description: 'Luxe Boutique replied to your review on Silk Cocktail Dress: "Thank you for your kind words!"',
    timestamp: 'Yesterday at 11:20 AM',
    read: false,
    group: 'Yesterday',
    link: '/reservations/RSV-2024-004',
  },
  {
    id: 6,
    type: 'promotion',
    title: '20% Off at Golden Hour Jewelry',
    description: 'Golden Hour Jewelry is offering 20% off all earrings this weekend. Don\'t miss out!',
    timestamp: 'Yesterday at 9:00 AM',
    read: true,
    group: 'Yesterday',
    link: '/discover',
  },
  {
    id: 7,
    type: 'new_product',
    title: 'New Products from Free Spirit Fashion',
    description: 'Free Spirit Fashion added 5 new bohemian-style items. Your style match score is 92%!',
    timestamp: 'Mar 11, 2026',
    read: true,
    group: 'Earlier',
    link: '/discover',
  },
  {
    id: 8,
    type: 'reservation_expiring',
    title: 'Reservation Completed',
    description: 'Your reservation RSV-2024-004 for Silk Cocktail Dress has been marked as completed. Leave a review!',
    timestamp: 'Mar 8, 2026',
    read: true,
    group: 'Earlier',
    link: '/reservations/RSV-2024-004',
  },
]

const notificationIcons = {
  reservation_confirmed: { icon: CheckCircleIcon, color: 'text-green-400 bg-green-500/10' },
  reservation_expiring: { icon: ClockIcon, color: 'text-yellow-400 bg-yellow-500/10' },
  new_product: { icon: SparklesIcon, color: 'text-primary-600 bg-primary-600/10' },
  review_reply: { icon: ChatBubbleLeftIcon, color: 'text-blue-400 bg-blue-500/10' },
  promotion: { icon: TagIcon, color: 'text-purple-400 bg-purple-500/10' },
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
            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">No notifications yet</h3>
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
