import { Head, Link, router } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import { format } from 'date-fns'
import type { Reservation } from '@/types'

interface Props {
    reservation: Reservation & {
        customer: { id: number; name: string; email: string; phone?: string }
        product: { id: number; name: string; price: number }
        variant?: { size?: string; color?: string; sku?: string }
    }
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
    completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function VendorReservationShow({ reservation: res }: Props) {
    const handleAction = (action: string, reason?: string) => {
        router.put(`/vendor/reservations/${res.id}/status`, { action, reason }, { preserveScroll: true })
    }

    return (
        <VendorLayout>
            <Head title={`Reservation ${res.reservation_code}`} />
            <div className="mx-auto max-w-3xl">
                <Link href="/vendor/reservations" className="text-sm text-primary-600 hover:text-primary-500">&larr; Back</Link>
                <div className="mt-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{res.reservation_code}</h1>
                    <span className={`rounded-full border px-3 py-1.5 text-sm font-semibold capitalize ${statusColors[res.status] || 'bg-gray-500/10 text-gray-400'}`}>{res.status.replace('_', ' ')}</span>
                </div>

                <div className="mt-6 space-y-6">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Customer</h2>
                        <dl className="mt-3 space-y-2">
                            <div className="flex justify-between"><dt className="text-sm text-gray-500">Name</dt><dd className="text-sm text-gray-900 dark:text-white">{res.customer.name}</dd></div>
                            <div className="flex justify-between"><dt className="text-sm text-gray-500">Email</dt><dd className="text-sm text-gray-900 dark:text-white">{res.customer.email}</dd></div>
                            {res.customer.phone && <div className="flex justify-between"><dt className="text-sm text-gray-500">Phone</dt><dd className="text-sm text-gray-900 dark:text-white">{res.customer.phone}</dd></div>}
                        </dl>
                    </div>

                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Product</h2>
                        <dl className="mt-3 space-y-2">
                            <div className="flex justify-between"><dt className="text-sm text-gray-500">Product</dt><dd className="text-sm text-gray-900 dark:text-white">{res.product.name}</dd></div>
                            {res.variant && <div className="flex justify-between"><dt className="text-sm text-gray-500">Variant</dt><dd className="text-sm text-gray-900 dark:text-white">{[res.variant.size, res.variant.color].filter(Boolean).join(' / ')}</dd></div>}
                            <div className="flex justify-between"><dt className="text-sm text-gray-500">Reserved</dt><dd className="text-sm text-gray-900 dark:text-white">{format(new Date(res.reserved_at), 'MMM d, yyyy h:mm a')}</dd></div>
                            {res.customer_note && <div className="flex justify-between"><dt className="text-sm text-gray-500">Customer Note</dt><dd className="text-sm text-gray-900 dark:text-white">{res.customer_note}</dd></div>}
                        </dl>
                    </div>

                    {/* Actions */}
                    {res.status === 'pending' && (
                        <div className="flex gap-3">
                            <button type="button" onClick={() => handleAction('confirm')} className="flex-1 rounded-md bg-green-600 py-2.5 text-sm font-semibold text-white hover:bg-green-700">Confirm</button>
                            <button type="button" onClick={() => { const reason = prompt('Decline reason:'); if (reason) handleAction('decline', reason) }} className="flex-1 rounded-md bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Decline</button>
                        </div>
                    )}
                    {res.status === 'confirmed' && (
                        <div className="flex gap-3">
                            <button type="button" onClick={() => handleAction('complete')} className="flex-1 rounded-md bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Mark Complete</button>
                            <button type="button" onClick={() => handleAction('no_show')} className="flex-1 rounded-md bg-orange-600 py-2.5 text-sm font-semibold text-white hover:bg-orange-700">Mark No Show</button>
                        </div>
                    )}
                </div>
            </div>
        </VendorLayout>
    )
}
