import { Head, Link, router, usePage } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { format } from 'date-fns'
import type { Reservation, Product, ProductImage, PaginatedResponse, SharedProps } from '@/types'

interface Props {
    reservations: PaginatedResponse<Reservation & { product: Product & { primary_image?: ProductImage }; vendor: { store_name: string; slug: string; phone?: string; address?: string }; variant?: { size?: string; color?: string } }>
    filters: { status?: string }
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    confirmed: 'bg-green-500/10 text-green-400',
    completed: 'bg-blue-500/10 text-blue-400',
    cancelled: 'bg-red-500/10 text-red-400',
    expired: 'bg-gray-500/10 text-gray-400',
    no_show: 'bg-orange-500/10 text-orange-400',
}

const tabs = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
]

export default function ReservationsIndex({ reservations, filters }: Props) {
    const { settings } = usePage().props as unknown as SharedProps

    return (
        <CustomerLayout>
            <Head title="My Reservations" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reservations</h1>

                {/* Tabs */}
                <div className="mt-6 flex gap-2 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button key={tab.value} type="button" onClick={() => router.get('/customer/reservations', tab.value ? { status: tab.value } : {}, { preserveState: true })} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${(filters.status || '') === tab.value ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* List */}
                <div className="mt-6 space-y-3">
                    {reservations.data.length === 0 ? (
                        <div className="py-16 text-center">
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">No reservations found</p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Start exploring products to make your first reservation.</p>
                            <Link href="/products" className="mt-6 inline-flex items-center rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">Browse Products</Link>
                        </div>
                    ) : (
                        reservations.data.map((res) => (
                            <Link key={res.id} href={`/customer/reservations/${res.id}`} className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 transition-shadow hover:shadow-md">
                                {res.product?.primary_image && (
                                    <img src={res.product.primary_image.url} alt={res.product.name} className="size-20 rounded-lg object-cover" />
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{res.product?.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{res.vendor?.store_name}</p>
                                    {res.variant && <p className="text-xs text-gray-400 dark:text-gray-500">{[res.variant.size, res.variant.color].filter(Boolean).join(' / ')}</p>}
                                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Code: {res.reservation_code} &middot; {format(new Date(res.reserved_at), 'MMM d, yyyy')}</p>
                                    {(res.status === 'pending' || res.status === 'confirmed') && (
                                        <div className="mt-2 flex gap-2" onClick={(e) => e.preventDefault()}>
                                            {res.vendor?.address && (
                                                <a href={`https://maps.google.com/?q=${encodeURIComponent(res.vendor.address)}`} target="_blank" rel="noopener noreferrer" className="rounded-md bg-primary-600 px-3 py-1 text-xs font-semibold text-white hover:bg-primary-700">Go to Store</a>
                                            )}
                                            {res.vendor?.phone && (
                                                <a href={`tel:${res.vendor.phone}`} className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">Call Store</a>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusColors[res.status] || ''}`}>{res.status.replace('_', ' ')}</span>
                            </Link>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {reservations.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        {reservations.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} preserveState preserveScroll className={`rounded-md px-3 py-2 text-sm font-medium ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`} >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                        ))}
                    </div>
                )}
            </div>
        </CustomerLayout>
    )
}
