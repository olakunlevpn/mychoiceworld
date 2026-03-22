// @ts-nocheck
import { Link } from 'react-router-dom'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {
  ClockIcon,
  MapPinIcon,
  XMarkIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'

const reservations = {
  active: [
    {
      id: 1,
      code: 'RSV-2024-001',
      product: {
        name: 'Elegant Evening Gown',
        image: 'https://picsum.photos/seed/rsv1/400/400',
        price: '$289',
        variant: 'Size M, Black',
      },
      store: 'Luxe Boutique',
      status: 'active',
      expiresIn: '2 days',
      reservedAt: 'Mar 12, 2026',
    },
    {
      id: 2,
      code: 'RSV-2024-002',
      product: {
        name: 'Classic Navy Suit',
        image: 'https://picsum.photos/seed/rsv2/400/400',
        price: '$450',
        variant: 'Size L, Navy Blue',
      },
      store: "The Gentleman's Store",
      status: 'active',
      expiresIn: '5 days',
      reservedAt: 'Mar 11, 2026',
    },
    {
      id: 3,
      code: 'RSV-2024-003',
      product: {
        name: 'Pearl Drop Earrings',
        image: 'https://picsum.photos/seed/rsv3/400/400',
        price: '$85',
        variant: 'Gold Setting',
      },
      store: 'Golden Hour Jewelry',
      status: 'active',
      expiresIn: '1 day',
      reservedAt: 'Mar 13, 2026',
    },
  ],
  completed: [
    {
      id: 4,
      code: 'RSV-2024-004',
      product: {
        name: 'Silk Cocktail Dress',
        image: 'https://picsum.photos/seed/rsv4/400/400',
        price: '$320',
        variant: 'Size S, Red',
      },
      store: 'Luxe Boutique',
      status: 'completed',
      completedAt: 'Mar 8, 2026',
      reservedAt: 'Mar 5, 2026',
    },
    {
      id: 5,
      code: 'RSV-2024-005',
      product: {
        name: 'Leather Crossbody Bag',
        image: 'https://picsum.photos/seed/rsv5/400/400',
        price: '$120',
        variant: 'Brown',
      },
      store: 'Artisan Leather Co.',
      status: 'completed',
      completedAt: 'Mar 2, 2026',
      reservedAt: 'Feb 28, 2026',
    },
  ],
  cancelled: [
    {
      id: 6,
      code: 'RSV-2024-006',
      product: {
        name: 'Minimalist Watch',
        image: 'https://picsum.photos/seed/rsv6/400/400',
        price: '$195',
        variant: 'Silver, Leather Strap',
      },
      store: 'TimeKeeper',
      status: 'cancelled',
      cancelledAt: 'Mar 1, 2026',
      reservedAt: 'Feb 27, 2026',
    },
  ],
}

const statusStyles = {
  active: 'bg-green-500/10 text-green-400 ring-green-500/20',
  completed: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-400 ring-red-500/20',
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <ClipboardDocumentListIcon className="size-16 text-gray-600" />
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      <Link
        to="/discover"
        className="mt-6 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Discover Products
      </Link>
    </div>
  )
}

function ReservationCard({ reservation }: { reservation: typeof reservations.active[0] }) {
  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Product image */}
        <Link to={`/reservations/${reservation.code}`} className="shrink-0">
          <img
            src={reservation.product.image}
            alt={reservation.product.name}
            className="size-24 rounded-lg object-cover sm:size-28"
          />
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                to={`/reservations/${reservation.code}`}
                className="text-xs font-medium text-primary-600 hover:text-primary-500"
              >
                {reservation.code}
              </Link>
              <Link to={`/reservations/${reservation.code}`}>
                <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  {reservation.product.name}
                </h3>
              </Link>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{reservation.store}</p>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{reservation.product.variant}</p>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                statusStyles[reservation.status]
              }`}
            >
              {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{reservation.product.price}</p>
            {reservation.status === 'active' && reservation.expiresIn && (
              <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
                <ClockIcon className="size-3.5" />
                Expires in {reservation.expiresIn}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {reservation.status === 'active' && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                >
                  <MapPinIcon className="size-3.5" />
                  Get Directions
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-500/20"
                >
                  <XMarkIcon className="size-3.5" />
                  Cancel
                </button>
              </>
            )}
            {reservation.status === 'completed' && (
              <>
                <Link
                  to={`/reservations/${reservation.code}`}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary-600/10 px-3 py-1.5 text-xs font-medium text-primary-600 hover:bg-primary-600/20"
                >
                  <PencilSquareIcon className="size-3.5" />
                  Write Review
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                >
                  <ArrowPathIcon className="size-3.5" />
                  Reserve Again
                </button>
              </>
            )}
            {reservation.status === 'cancelled' && (
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
              >
                <ArrowPathIcon className="size-3.5" />
                Reserve Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Reservations() {
  const tabs = [
    { name: 'Active', count: reservations.active.length },
    { name: 'Completed', count: reservations.completed.length },
    { name: 'Cancelled', count: reservations.cancelled.length },
  ]

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">My Reservations</h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            Track and manage your product reservations
          </p>
        </div>

        <TabGroup>
          <TabList className="flex gap-1 rounded-lg bg-gray-100 dark:bg-white/5 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className="flex-1 rounded-md px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors focus:outline-none data-[selected]:bg-primary-600 data-[selected]:text-white data-[hover]:text-gray-900 dark:data-[hover]:text-white"
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 px-2 py-0.5 text-xs data-[selected]:bg-white/20">
                    {tab.count}
                  </span>
                )}
              </Tab>
            ))}
          </TabList>

          <TabPanels className="mt-6">
            {/* Active */}
            <TabPanel>
              {reservations.active.length > 0 ? (
                <div className="space-y-4">
                  {reservations.active.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No active reservations"
                  description="You don't have any active reservations at the moment."
                />
              )}
            </TabPanel>

            {/* Completed */}
            <TabPanel>
              {reservations.completed.length > 0 ? (
                <div className="space-y-4">
                  {reservations.completed.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No completed reservations"
                  description="You haven't completed any reservations yet."
                />
              )}
            </TabPanel>

            {/* Cancelled */}
            <TabPanel>
              {reservations.cancelled.length > 0 ? (
                <div className="space-y-4">
                  {reservations.cancelled.map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No cancelled reservations"
                  description="You don't have any cancelled reservations."
                />
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <div className="pb-24" />
      </div>
    </div>
  )
}
