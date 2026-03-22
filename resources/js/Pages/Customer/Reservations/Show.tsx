import { Head, Link, router, useForm, usePage } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { MapPinIcon, PhoneIcon, StarIcon as StarOutline } from '@heroicons/react/24/outline'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import { useState } from 'react'
import type { Reservation, Product, ProductImage, SharedProps } from '@/types'

interface Props {
    reservation: Reservation & {
        product: Product & { primary_image?: ProductImage }
        vendor: { id: number; store_name: string; slug: string; phone?: string; whatsapp?: string; email?: string; address: string; city: string }
        variant?: { size?: string; color?: string; color_hex?: string; sku?: string }
        review?: { id: number; rating: number; comment: string }
    }
}

const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    confirmed: 'bg-green-500/10 text-green-400 border-green-500/20',
    completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
    expired: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
    no_show: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

function ReviewForm({ reservationId, productId, vendorId }: { reservationId: number; productId: number; vendorId: number }) {
    const { data, setData, post, processing, errors } = useForm({
        rating: 0, comment: '', reservation_id: reservationId, product_id: productId, vendor_id: vendorId,
    })
    const [hoverRating, setHoverRating] = useState(0)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (data.rating === 0) return
        post('/customer/reviews', { preserveScroll: true })
    }

    return (
        <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Write a Review</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Share your experience with this store</p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Rating</label>
                    <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} type="button" onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setData('rating', star)} className="p-0.5">
                                {(hoverRating || data.rating) >= star ? (
                                    <StarSolid className="size-8 text-primary-600" />
                                ) : (
                                    <StarOutline className="size-8 text-gray-400 dark:text-gray-600" />
                                )}
                            </button>
                        ))}
                    </div>
                    {errors.rating && <p className="mt-1 text-xs text-red-400">{errors.rating}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Comment</label>
                    <textarea value={data.comment} onChange={(e) => setData('comment', e.target.value)} rows={4} required placeholder="Tell us about your experience..." className="mt-1.5 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600" />
                    {errors.comment && <p className="mt-1 text-xs text-red-400">{errors.comment}</p>}
                </div>
                <button type="submit" disabled={processing || data.rating === 0} className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                    {processing ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    )
}

export default function ReservationShow({ reservation: res }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const [cancelling, setCancelling] = useState(false)

    const handleCancel = () => {
        if (!confirm('Are you sure you want to cancel this reservation?')) return
        setCancelling(true)
        router.put(`/customer/reservations/${res.id}/cancel`, {}, { onFinish: () => setCancelling(false) })
    }

    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    const reviewForm = useForm({ rating: 0, comment: '', reservation_id: res.id, product_id: res.product_id, vendor_id: res.vendor_id })

    return (
        <CustomerLayout>
            <Head title={`Reservation ${res.reservation_code}`} />
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Link href="/customer/reservations" className="text-sm text-primary-600 hover:text-primary-500">&larr; Back to reservations</Link>
                        <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{res.reservation_code}</h1>
                    </div>
                    <span className={`rounded-full border px-3 py-1.5 text-sm font-semibold capitalize ${statusColors[res.status] || ''}`}>{res.status.replace('_', ' ')}</span>
                </div>

                {/* Product */}
                <div className="mt-6 flex gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                    {res.product?.primary_image && (
                        <img src={res.product.primary_image.url} alt={res.product.name} className="size-24 rounded-lg object-cover" />
                    )}
                    <div className="min-w-0 flex-1">
                        <Link href={`/products/${res.product?.slug}`} className="text-base font-semibold text-gray-900 dark:text-white hover:text-primary-600">{res.product?.name}</Link>
                        {res.variant && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{[res.variant.size, res.variant.color].filter(Boolean).join(' / ')}</p>}
                        <p className="mt-1 text-lg font-bold text-primary-600">{formatPrice(res.product?.price || 0)}</p>
                    </div>
                </div>

                {/* Details */}
                <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Details</h2>
                    <dl className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="flex justify-between py-3"><dt className="text-sm text-gray-500 dark:text-gray-400">Reserved</dt><dd className="text-sm font-medium text-gray-900 dark:text-white">{format(new Date(res.reserved_at), 'MMM d, yyyy h:mm a')}</dd></div>
                        {res.expires_at && <div className="flex justify-between py-3"><dt className="text-sm text-gray-500 dark:text-gray-400">Expires</dt><dd className="text-sm font-medium text-gray-900 dark:text-white">{format(new Date(res.expires_at), 'MMM d, yyyy h:mm a')}</dd></div>}
                        {res.confirmed_at && <div className="flex justify-between py-3"><dt className="text-sm text-gray-500 dark:text-gray-400">Confirmed</dt><dd className="text-sm font-medium text-gray-900 dark:text-white">{format(new Date(res.confirmed_at), 'MMM d, yyyy')}</dd></div>}
                        {res.completed_at && <div className="flex justify-between py-3"><dt className="text-sm text-gray-500 dark:text-gray-400">Completed</dt><dd className="text-sm font-medium text-gray-900 dark:text-white">{format(new Date(res.completed_at), 'MMM d, yyyy')}</dd></div>}
                        {res.customer_note && <div className="flex justify-between py-3"><dt className="text-sm text-gray-500 dark:text-gray-400">Your Note</dt><dd className="text-sm text-gray-900 dark:text-white">{res.customer_note}</dd></div>}
                        {res.cancellation_reason && <div className="flex justify-between py-3"><dt className="text-sm text-gray-500 dark:text-gray-400">Cancel Reason</dt><dd className="text-sm text-red-400">{res.cancellation_reason}</dd></div>}
                    </dl>
                </div>

                {/* Store */}
                <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Store</h2>
                    <div className="mt-3">
                        <Link href={`/stores/${res.vendor.slug}`} className="text-sm font-semibold text-primary-600 hover:text-primary-500">{res.vendor.store_name}</Link>
                        <div className="mt-2 flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <MapPinIcon className="mt-0.5 size-4 shrink-0" />
                            <span>{res.vendor.address}, {res.vendor.city}</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                            {res.vendor.address && <a href={`https://maps.google.com/?q=${encodeURIComponent(res.vendor.address)}`} target="_blank" rel="noopener noreferrer" className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">Get Directions</a>}
                            {res.vendor.phone && <a href={`tel:${res.vendor.phone}`} className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">Call</a>}
                            {res.vendor.whatsapp && <a href={`https://wa.me/${res.vendor.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">WhatsApp</a>}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                {(res.status === 'pending' || res.status === 'confirmed') && (
                    <div className="mt-6">
                        <button type="button" onClick={handleCancel} disabled={cancelling} className="w-full rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20 disabled:opacity-50">
                            {cancelling ? 'Cancelling...' : 'Cancel Reservation'}
                        </button>
                    </div>
                )}

                {/* Review Form — shown when completed and no review yet */}
                {res.status === 'completed' && !res.review && <ReviewForm reservationId={res.id} productId={res.product_id} vendorId={res.vendor_id} />}

                {/* Existing Review */}
                {res.review && (
                    <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Your Review</h2>
                        <div className="mt-3 flex items-center gap-0.5">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <StarSolid key={i} className={`size-5 ${res.review!.rating > i ? 'text-primary-600' : 'text-gray-600'}`} />
                            ))}
                        </div>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{res.review.comment}</p>
                    </div>
                )}
            </div>
        </CustomerLayout>
    )
}
