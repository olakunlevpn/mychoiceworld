import { Head, Link } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import { ShoppingBagIcon, ClipboardDocumentListIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import type { Reservation } from '@/types'

interface Props {
    stats: { total_products: number; active_products: number; pending_reservations: number; total_reservations: number; rating_avg: number; rating_count: number }
    recentReservations: (Reservation & { customer: { name: string; email: string }; product: { name: string } })[]
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    confirmed: 'bg-green-500/10 text-green-400',
    completed: 'bg-blue-500/10 text-blue-400',
    cancelled: 'bg-red-500/10 text-red-400',
}

export default function VendorDashboard({ stats, recentReservations }: Props) {
    return (
        <VendorLayout>
            <Head title="Vendor Dashboard" />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                    { label: 'Active Products', value: stats.active_products, icon: ShoppingBagIcon, color: 'text-primary-600' },
                    { label: 'Pending Reservations', value: stats.pending_reservations, icon: ClockIcon, color: 'text-yellow-400' },
                    { label: 'Total Reservations', value: stats.total_reservations, icon: ClipboardDocumentListIcon, color: 'text-blue-400' },
                    { label: 'Average Rating', value: stats.rating_avg || '0.0', icon: StarIcon, color: 'text-yellow-400', subtitle: `${stats.rating_count} reviews` },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5">
                                <stat.icon className={`size-5 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                                {stat.subtitle && <p className="text-[10px] text-gray-400 dark:text-gray-500">{stat.subtitle}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Reservations */}
            <div className="mt-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Reservations</h2>
                    <Link href="/vendor/reservations" className="text-sm font-medium text-primary-600 hover:text-primary-500">View all</Link>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Code</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Product</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900/50">
                            {recentReservations.length === 0 ? (
                                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">No reservations yet</td></tr>
                            ) : (
                                recentReservations.map((res) => (
                                    <tr key={res.id}>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{res.reservation_code}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{res.customer?.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 truncate max-w-[200px]">{res.product?.name}</td>
                                        <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusColors[res.status] || 'bg-gray-500/10 text-gray-400'}`}>{res.status}</span></td>
                                        <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{format(new Date(res.reserved_at), 'MMM d')}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/vendor/products/create" className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700">Add Product</Link>
                <Link href="/vendor/store" className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">Edit Store</Link>
                <Link href="/vendor/analytics" className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">View Analytics</Link>
            </div>
        </VendorLayout>
    )
}
