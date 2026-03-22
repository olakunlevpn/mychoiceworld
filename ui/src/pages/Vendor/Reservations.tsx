// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Pagination from '../../components/Pagination'

const reservations = {
  pending: [
    {
      id: 1,
      code: 'RSV-2024-001',
      customer: { name: 'Sarah Mitchell', initial: 'S' },
      product: {
        name: 'Elegant Evening Gown',
        image: 'https://picsum.photos/seed/rsv1/400/400',
      },
      reservedAt: 'Mar 12, 2026',
      pickupDate: 'Mar 15, 2026',
      status: 'pending',
    },
    {
      id: 2,
      code: 'RSV-2024-002',
      customer: { name: 'James Kowalski', initial: 'J' },
      product: {
        name: 'Classic Navy Suit',
        image: 'https://picsum.photos/seed/rsv2/400/400',
      },
      reservedAt: 'Mar 11, 2026',
      pickupDate: 'Mar 16, 2026',
      status: 'pending',
    },
    {
      id: 3,
      code: 'RSV-2024-003',
      customer: { name: 'Olivia Reyes', initial: 'O' },
      product: {
        name: 'Pearl Drop Earrings',
        image: 'https://picsum.photos/seed/rsv3/400/400',
      },
      reservedAt: 'Mar 13, 2026',
      pickupDate: 'Mar 17, 2026',
      status: 'pending',
    },
    {
      id: 11,
      code: 'RSV-2024-011',
      customer: { name: 'Grace Lee', initial: 'G' },
      product: {
        name: 'Floral Midi Skirt',
        image: 'https://picsum.photos/seed/rsv11/400/400',
      },
      reservedAt: 'Mar 13, 2026',
      pickupDate: 'Mar 18, 2026',
      status: 'pending',
    },
    {
      id: 12,
      code: 'RSV-2024-012',
      customer: { name: 'Henry Adams', initial: 'H' },
      product: {
        name: 'Wool Overcoat',
        image: 'https://picsum.photos/seed/rsv12/400/400',
      },
      reservedAt: 'Mar 12, 2026',
      pickupDate: 'Mar 18, 2026',
      status: 'pending',
    },
    {
      id: 13,
      code: 'RSV-2024-013',
      customer: { name: 'Isabella Cruz', initial: 'I' },
      product: {
        name: 'Beaded Clutch Purse',
        image: 'https://picsum.photos/seed/rsv13/400/400',
      },
      reservedAt: 'Mar 14, 2026',
      pickupDate: 'Mar 19, 2026',
      status: 'pending',
    },
    {
      id: 14,
      code: 'RSV-2024-014',
      customer: { name: 'Ryan Brooks', initial: 'R' },
      product: {
        name: 'Linen Summer Shirt',
        image: 'https://picsum.photos/seed/rsv14/400/400',
      },
      reservedAt: 'Mar 14, 2026',
      pickupDate: 'Mar 20, 2026',
      status: 'pending',
    },
  ],
  confirmed: [
    {
      id: 4,
      code: 'RSV-2024-004',
      customer: { name: 'Daniel Park', initial: 'D' },
      product: {
        name: 'Silk Cocktail Dress',
        image: 'https://picsum.photos/seed/rsv4/400/400',
      },
      reservedAt: 'Mar 10, 2026',
      pickupDate: 'Mar 14, 2026',
      status: 'confirmed',
    },
    {
      id: 5,
      code: 'RSV-2024-005',
      customer: { name: 'Emily Chen', initial: 'E' },
      product: {
        name: 'Leather Crossbody Bag',
        image: 'https://picsum.photos/seed/rsv5/400/400',
      },
      reservedAt: 'Mar 9, 2026',
      pickupDate: 'Mar 14, 2026',
      status: 'confirmed',
    },
    {
      id: 15,
      code: 'RSV-2024-015',
      customer: { name: 'Charlotte Wood', initial: 'C' },
      product: {
        name: 'Velvet Wrap Dress',
        image: 'https://picsum.photos/seed/rsv15/400/400',
      },
      reservedAt: 'Mar 10, 2026',
      pickupDate: 'Mar 15, 2026',
      status: 'confirmed',
    },
    {
      id: 16,
      code: 'RSV-2024-016',
      customer: { name: 'Ethan Morris', initial: 'E' },
      product: {
        name: 'Slim Fit Chinos',
        image: 'https://picsum.photos/seed/rsv16/400/400',
      },
      reservedAt: 'Mar 11, 2026',
      pickupDate: 'Mar 15, 2026',
      status: 'confirmed',
    },
    {
      id: 17,
      code: 'RSV-2024-017',
      customer: { name: 'Mia Rivera', initial: 'M' },
      product: {
        name: 'Statement Earrings',
        image: 'https://picsum.photos/seed/rsv17/400/400',
      },
      reservedAt: 'Mar 11, 2026',
      pickupDate: 'Mar 16, 2026',
      status: 'confirmed',
    },
    {
      id: 18,
      code: 'RSV-2024-018',
      customer: { name: 'Alexander Scott', initial: 'A' },
      product: {
        name: 'Oxford Dress Shoes',
        image: 'https://picsum.photos/seed/rsv18/400/400',
      },
      reservedAt: 'Mar 12, 2026',
      pickupDate: 'Mar 16, 2026',
      status: 'confirmed',
    },
  ],
  today: [
    {
      id: 6,
      code: 'RSV-2024-006',
      customer: { name: 'Marcus Williams', initial: 'M' },
      product: {
        name: 'Minimalist Watch',
        image: 'https://picsum.photos/seed/rsv6/400/400',
      },
      reservedAt: 'Mar 8, 2026',
      pickupDate: 'Mar 14, 2026',
      status: 'ready',
    },
    {
      id: 7,
      code: 'RSV-2024-007',
      customer: { name: 'Ava Thompson', initial: 'A' },
      product: {
        name: 'Cashmere Scarf',
        image: 'https://picsum.photos/seed/rsv7/400/400',
      },
      reservedAt: 'Mar 7, 2026',
      pickupDate: 'Mar 14, 2026',
      status: 'ready',
    },
    {
      id: 19,
      code: 'RSV-2024-019',
      customer: { name: 'Lucas Hall', initial: 'L' },
      product: {
        name: 'Denim Jacket',
        image: 'https://picsum.photos/seed/rsv19/400/400',
      },
      reservedAt: 'Mar 9, 2026',
      pickupDate: 'Mar 14, 2026',
      status: 'ready',
    },
    {
      id: 20,
      code: 'RSV-2024-020',
      customer: { name: 'Zoe Martinez', initial: 'Z' },
      product: {
        name: 'Silk Blouse',
        image: 'https://picsum.photos/seed/rsv20/400/400',
      },
      reservedAt: 'Mar 10, 2026',
      pickupDate: 'Mar 14, 2026',
      status: 'ready',
    },
    {
      id: 21,
      code: 'RSV-2024-021',
      customer: { name: 'Benjamin Taylor', initial: 'B' },
      product: {
        name: 'Canvas Sneakers',
        image: 'https://picsum.photos/seed/rsv21/400/400',
      },
      reservedAt: 'Mar 10, 2026',
      pickupDate: 'Mar 14, 2026',
      status: 'ready',
    },
    {
      id: 22,
      code: 'RSV-2024-022',
      customer: { name: 'Chloe Anderson', initial: 'C' },
      product: {
        name: 'Pleated Maxi Dress',
        image: 'https://picsum.photos/seed/rsv22/400/400',
      },
      reservedAt: 'Mar 11, 2026',
      pickupDate: 'Mar 14, 2026',
      status: 'ready',
    },
  ],
  history: [
    {
      id: 8,
      code: 'RSV-2024-008',
      customer: { name: 'Liam Foster', initial: 'L' },
      product: {
        name: 'Tailored Blazer',
        image: 'https://picsum.photos/seed/rsv8/400/400',
      },
      reservedAt: 'Mar 1, 2026',
      pickupDate: 'Mar 5, 2026',
      status: 'completed',
    },
    {
      id: 9,
      code: 'RSV-2024-009',
      customer: { name: 'Sophia Nguyen', initial: 'S' },
      product: {
        name: 'Gold Chain Necklace',
        image: 'https://picsum.photos/seed/rsv9/400/400',
      },
      reservedAt: 'Feb 25, 2026',
      pickupDate: 'Mar 1, 2026',
      status: 'no-show',
    },
    {
      id: 10,
      code: 'RSV-2024-010',
      customer: { name: 'Noah Patel', initial: 'N' },
      product: {
        name: 'Suede Chelsea Boots',
        image: 'https://picsum.photos/seed/rsv10/400/400',
      },
      reservedAt: 'Feb 20, 2026',
      pickupDate: 'Feb 24, 2026',
      status: 'cancelled',
    },
    {
      id: 23,
      code: 'RSV-2024-023',
      customer: { name: 'Harper Wilson', initial: 'H' },
      product: {
        name: 'Knit Cardigan',
        image: 'https://picsum.photos/seed/rsv23/400/400',
      },
      reservedAt: 'Feb 18, 2026',
      pickupDate: 'Feb 22, 2026',
      status: 'completed',
    },
    {
      id: 24,
      code: 'RSV-2024-024',
      customer: { name: 'Jack Robinson', initial: 'J' },
      product: {
        name: 'Striped Polo Shirt',
        image: 'https://picsum.photos/seed/rsv24/400/400',
      },
      reservedAt: 'Feb 15, 2026',
      pickupDate: 'Feb 19, 2026',
      status: 'completed',
    },
    {
      id: 25,
      code: 'RSV-2024-025',
      customer: { name: 'Ella Davis', initial: 'E' },
      product: {
        name: 'Embroidered Tote Bag',
        image: 'https://picsum.photos/seed/rsv25/400/400',
      },
      reservedAt: 'Feb 12, 2026',
      pickupDate: 'Feb 16, 2026',
      status: 'no-show',
    },
    {
      id: 26,
      code: 'RSV-2024-026',
      customer: { name: 'William Clark', initial: 'W' },
      product: {
        name: 'Leather Belt',
        image: 'https://picsum.photos/seed/rsv26/400/400',
      },
      reservedAt: 'Feb 10, 2026',
      pickupDate: 'Feb 14, 2026',
      status: 'completed',
    },
  ],
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
  ready: 'Ready',
  completed: 'Completed',
  'no-show': 'No-show',
  cancelled: 'Cancelled',
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <ClipboardDocumentListIcon className="size-16 text-gray-400 dark:text-gray-600" />
      <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}

function ReservationRow({
  reservation,
  tab,
  decliningId,
  declineReason,
  onDeclineClick,
  onDeclineReasonChange,
  onDeclineSubmit,
  onDeclineCancel,
}: {
  reservation: any
  tab: string
  decliningId: number | null
  declineReason: string
  onDeclineClick: (id: number) => void
  onDeclineReasonChange: (value: string) => void
  onDeclineSubmit: () => void
  onDeclineCancel: () => void
}) {
  const isDeclining = decliningId === reservation.id

  return (
    <div className="rounded-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Product image */}
        <Link to={`/vendor/reservations/${reservation.code}`} className="shrink-0">
          <img
            src={reservation.product.image}
            alt={reservation.product.name}
            className="size-20 rounded-lg object-cover sm:size-24"
          />
        </Link>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                to={`/vendor/reservations/${reservation.code}`}
                className="text-xs font-medium text-primary-600 hover:text-primary-500"
              >
                {reservation.code}
              </Link>
              <Link to={`/vendor/reservations/${reservation.code}`}>
                <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors">
                  {reservation.product.name}
                </h3>
              </Link>

              {/* Customer */}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary-600/20 text-xs font-semibold text-primary-600">
                  {reservation.customer.initial}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{reservation.customer.name}</span>
              </div>

              {/* Dates */}
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                  <CalendarDaysIcon className="size-3.5" />
                  Reserved: {reservation.reservedAt}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                  <ClockIcon className="size-3.5" />
                  Pickup: {reservation.pickupDate}
                </span>
              </div>
            </div>

            {/* Status badge */}
            <span
              className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                statusStyles[reservation.status]
              }`}
            >
              {statusLabels[reservation.status]}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {tab === 'pending' && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-700"
                >
                  <CheckCircleIcon className="size-3.5" />
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => onDeclineClick(reservation.id)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-red-500/30 px-4 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                >
                  <XMarkIcon className="size-3.5" />
                  Decline
                </button>
              </>
            )}
            {tab === 'confirmed' && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-700"
                >
                  <CheckCircleIcon className="size-3.5" />
                  Mark Ready
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                >
                  <XMarkIcon className="size-3.5" />
                  Cancel
                </button>
              </>
            )}
            {tab === 'today' && (
              <>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-700"
                >
                  <CheckCircleIcon className="size-3.5" />
                  Complete
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md bg-red-500/10 px-4 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20"
                >
                  <XMarkIcon className="size-3.5" />
                  No-show
                </button>
              </>
            )}
            {tab === 'history' && (
              <Link
                to={`/vendor/reservations/${reservation.code}`}
                className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 dark:bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
              >
                <EyeIcon className="size-3.5" />
                View Details
              </Link>
            )}
          </div>

          {/* Decline reason inline form */}
          {tab === 'pending' && isDeclining && (
            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                Reason for declining
              </label>
              <textarea
                rows={3}
                required
                value={declineReason}
                onChange={(e) => onDeclineReasonChange(e.target.value)}
                placeholder="Please provide a reason for declining this reservation..."
                className="mt-2 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
              />
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={onDeclineSubmit}
                  disabled={!declineReason.trim()}
                  className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Decline
                </button>
                <button
                  type="button"
                  onClick={onDeclineCancel}
                  className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 dark:bg-white/5 px-4 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Reservations() {
  const [search, setSearch] = useState('')
  const [decliningId, setDecliningId] = useState<number | null>(null)
  const [declineReason, setDeclineReason] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const filterReservations = (items: typeof reservations.pending) => {
    if (!search.trim()) return items
    const term = search.toLowerCase()
    return items.filter(
      (r) =>
        r.code.toLowerCase().includes(term) ||
        r.customer.name.toLowerCase().includes(term)
    )
  }

  const paginateItems = (items: typeof reservations.pending) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return items.slice(startIndex, startIndex + itemsPerPage)
  }

  const filteredPending = filterReservations(reservations.pending)
  const filteredConfirmed = filterReservations(reservations.confirmed)
  const filteredToday = filterReservations(reservations.today)
  const filteredHistory = filterReservations(reservations.history)

  const tabs = [
    { name: 'Pending', key: 'pending', count: reservations.pending.length },
    { name: 'Confirmed', key: 'confirmed', count: reservations.confirmed.length },
    { name: "Today's Pickups", key: 'today', count: reservations.today.length },
    { name: 'History', key: 'history', count: reservations.history.length },
  ]

  const handleDeclineClick = (id: number) => {
    setDecliningId(id)
    setDeclineReason('')
  }

  const handleDeclineSubmit = () => {
    // TODO: Submit decline with reason to API
    setDecliningId(null)
    setDeclineReason('')
  }

  const handleDeclineCancel = () => {
    setDecliningId(null)
    setDeclineReason('')
  }

  const declineProps = {
    decliningId,
    declineReason,
    onDeclineClick: handleDeclineClick,
    onDeclineReasonChange: setDeclineReason,
    onDeclineSubmit: handleDeclineSubmit,
    onDeclineCancel: handleDeclineCancel,
  }

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-6 pt-16 sm:pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Reservations</h1>
          <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">{todayFormatted}</p>
        </div>

        <TabGroup onChange={() => setCurrentPage(1)}>
          <TabList className="flex gap-1 rounded-lg bg-gray-100 dark:bg-white/5 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.key}
                className="flex-1 rounded-md px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors focus:outline-none data-[selected]:bg-primary-600 data-[selected]:text-white data-[hover]:text-gray-900 dark:data-[hover]:text-white"
              >
                {tab.name}
                {tab.count > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 px-2 py-0.5 text-xs data-[selected]:bg-white/20">
                    {tab.count}
                  </span>
                )}
              </Tab>
            ))}
          </TabList>

          {/* Search filter */}
          <div className="relative mt-4">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
              placeholder="Search by code or customer name..."
              className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>

          <TabPanels className="mt-6">
            {/* Pending */}
            <TabPanel>
              {filteredPending.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {paginateItems(filteredPending).map((reservation) => (
                      <ReservationRow key={reservation.id} reservation={reservation} tab="pending" {...declineProps} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalItems={filteredPending.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </>
              ) : (
                <EmptyState
                  title="No pending reservations"
                  description="There are no reservations waiting for your confirmation."
                />
              )}
            </TabPanel>

            {/* Confirmed */}
            <TabPanel>
              {filteredConfirmed.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {paginateItems(filteredConfirmed).map((reservation) => (
                      <ReservationRow key={reservation.id} reservation={reservation} tab="confirmed" {...declineProps} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalItems={filteredConfirmed.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </>
              ) : (
                <EmptyState
                  title="No confirmed reservations"
                  description="There are no confirmed reservations at the moment."
                />
              )}
            </TabPanel>

            {/* Today's Pickups */}
            <TabPanel>
              {filteredToday.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {paginateItems(filteredToday).map((reservation) => (
                      <ReservationRow key={reservation.id} reservation={reservation} tab="today" {...declineProps} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalItems={filteredToday.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </>
              ) : (
                <EmptyState
                  title="No pickups today"
                  description="There are no scheduled pickups for today."
                />
              )}
            </TabPanel>

            {/* History */}
            <TabPanel>
              {filteredHistory.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {paginateItems(filteredHistory).map((reservation) => (
                      <ReservationRow key={reservation.id} reservation={reservation} tab="history" {...declineProps} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Pagination
                      currentPage={currentPage}
                      totalItems={filteredHistory.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </>
              ) : (
                <EmptyState
                  title="No reservation history"
                  description="Your completed and past reservations will appear here."
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
