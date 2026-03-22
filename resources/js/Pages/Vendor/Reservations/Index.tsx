import { Head, Link, router } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import { format } from 'date-fns'
import type { Reservation, PaginatedResponse } from '@/types'

interface Props {
    reservations: PaginatedResponse<Reservation & { customer: { name: string; email: string; phone?: string }; product: { name: string }; variant?: { size?: string; color?: string } }>
    filters: { status?: string }
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400', confirmed: 'bg-green-500/10 text-green-400',
    completed: 'bg-blue-500/10 text-blue-400', cancelled: 'bg-red-500/10 text-red-400',
    expired: 'bg-gray-500/10 text-gray-400', no_show: 'bg-orange-500/10 text-orange-400',
}

const tabs = [
    { label: 'All', value: '' }, { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' }, { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' },
]

export default function VendorReservationsIndex({ reservations, filters }: Props) {
    const handleAction = (reservationId: number, action: string, reason?: string) => {
        router.put(`/vendor/reservations/${reservationId}/status`, { action, reason }, { preserveState: true, preserveScroll: true })
    }

    return (
        <VendorLayout>
            <Head title="Reservations" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reservations</h1>

            <div className="mt-6 flex gap-2 overflow-x-auto">
                {tabs.map((tab) => (
                    <button key={tab.value} type="button" onClick={() => router.get('/vendor/reservations', tab.value ? { status: tab.value } : {}, { preserveState: true })} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${(filters.status || '') === tab.value ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'}`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Code</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Customer</th>
                            <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase text-gray-500 sm:table-cell">Product</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                            <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900/50">
                        {reservations.data.length === 0 ? (
                            <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500">No reservations found</td></tr>
                        ) : (
                            reservations.data.map((res) => (
                                <tr key={res.id}>
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{res.reservation_code}</td>
                                    <td className="px-4 py-3">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{res.customer?.name}</span>
                                        {res.customer?.phone && (
                                            <div className="mt-1 flex gap-1.5">
                                                <a href={`tel:${res.customer.phone}`} className="rounded bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-primary-600 hover:bg-gray-200 dark:hover:bg-white/10">Call</a>
                                                <a href={`https://wa.me/${res.customer.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="rounded bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-green-500 hover:bg-gray-200 dark:hover:bg-white/10">WhatsApp</a>
                                            </div>
                                        )}
                                    </td>
                                    <td className="hidden px-4 py-3 text-sm text-gray-600 dark:text-gray-300 truncate max-w-[150px] sm:table-cell">{res.product?.name}</td>
                                    <td className="px-4 py-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusColors[res.status] || ''}`}>{res.status.replace('_', ' ')}</span></td>
                                    <td className="px-4 py-3 text-sm text-gray-500">{format(new Date(res.reserved_at), 'MMM d')}</td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {res.status === 'pending' && (
                                                <>
                                                    <button type="button" onClick={() => handleAction(res.id, 'confirm')} className="text-xs font-medium text-green-400 hover:text-green-300">Confirm</button>
                                                    <button type="button" onClick={() => { const reason = prompt('Decline reason:'); if (reason) handleAction(res.id, 'decline', reason) }} className="text-xs font-medium text-red-400 hover:text-red-300">Decline</button>
                                                </>
                                            )}
                                            {res.status === 'confirmed' && (
                                                <>
                                                    <button type="button" onClick={() => handleAction(res.id, 'complete')} className="text-xs font-medium text-blue-400 hover:text-blue-300">Complete</button>
                                                    <button type="button" onClick={() => handleAction(res.id, 'no_show')} className="text-xs font-medium text-orange-400 hover:text-orange-300">No Show</button>
                                                </>
                                            )}
                                            <Link href={`/vendor/reservations/${res.id}`} className="text-xs font-medium text-primary-600 hover:text-primary-500">View</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {reservations.last_page > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {reservations.links.map((link, i) => (
                        <Link key={i} href={link.url || '#'} preserveState preserveScroll className={`rounded-md px-3 py-2 text-sm font-medium ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300 cursor-not-allowed'}`} >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                    ))}
                </div>
            )}
        </VendorLayout>
    )
}
