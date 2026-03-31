import { Head, Link, usePage } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { ClipboardDocumentListIcon, HeartIcon, StarIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import type { Reservation, Product, ProductImage, SharedProps } from '@/types'

interface Props {
    stats: { active_reservations: number; total_reservations: number; wishlist_items: number; reviews_written: number }
    recentReservations: (Reservation & { product: Product & { primary_image?: ProductImage }; vendor: { store_name: string; slug: string } })[]
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    confirmed: 'bg-green-500/10 text-green-400',
    completed: 'bg-blue-500/10 text-blue-400',
    cancelled: 'bg-red-500/10 text-red-400',
    expired: 'bg-gray-500/10 text-gray-400',
    no_show: 'bg-orange-500/10 text-orange-400',
}

export default function Dashboard({ stats, recentReservations }: Props) {
    const { settings } = usePage().props as unknown as SharedProps

    return (
        <CustomerLayout>
            <Head title="Dashboard" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { label: 'Active Reservations', value: stats.active_reservations, icon: ClockIcon, href: '/customer/reservations' },
                        { label: 'Total Reservations', value: stats.total_reservations, icon: ClipboardDocumentListIcon, href: '/customer/reservations' },
                        { label: 'Wishlist Items', value: stats.wishlist_items, icon: HeartIcon, href: '/customer/wishlist' },
                        { label: 'Reviews Written', value: stats.reviews_written, icon: StarIcon, href: '/customer/reviews' },
                    ].map((stat) => (
                        <Link key={stat.label} href={stat.href} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 transition-shadow hover:shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-primary-600/10">
                                    <stat.icon className="size-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/profile" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        <UserCircleIcon className="size-4" />
                        Edit Profile
                    </Link>
                    <Link href="/customer/notifications" className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        Notifications
                    </Link>
                </div>

                {/* Recent Reservations */}
                <div className="mt-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reservations</h2>
                        <Link href="/customer/reservations" className="text-sm font-medium text-primary-600 hover:text-primary-500">View all</Link>
                    </div>
                    <div className="mt-4 space-y-3">
                        {recentReservations.length === 0 ? (
                            <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">No reservations yet. <Link href="/products" className="text-primary-600">Start exploring</Link></p>
                        ) : (
                            recentReservations.map((res) => (
                                <Link key={res.id} href={`/customer/reservations/${res.id}`} className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 transition-shadow hover:shadow-md">
                                    {res.product?.primary_image && (
                                        <img src={res.product.primary_image.url} alt={res.product.name} className="size-16 rounded-lg object-cover" />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{res.product?.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{res.vendor?.store_name} &middot; {res.reservation_code}</p>
                                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{format(new Date(res.reserved_at), 'MMM d, yyyy')}</p>
                                    </div>
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[res.status] || 'bg-gray-500/10 text-gray-400'}`}>{res.status}</span>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </CustomerLayout>
    )
}
