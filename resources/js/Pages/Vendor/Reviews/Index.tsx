import { Head, Link, router, useForm } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import { StarIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import { useState } from 'react'
import type { Review, PaginatedResponse } from '@/types'

interface Props {
    reviews: PaginatedResponse<Review & { customer?: { id: number; name: string; avatar?: string } }>
    ratingSummary: { average: number; count: number }
    filters: { rating?: string }
}

function cn(...classes: (string | boolean | undefined)[]) { return classes.filter(Boolean).join(' ') }

export default function VendorReviewsIndex({ reviews, ratingSummary, filters }: Props) {
    const [replyingTo, setReplyingTo] = useState<number | null>(null)
    const replyForm = useForm({ reply: '' })

    const submitReply = (reviewId: number) => {
        replyForm.post(`/vendor/reviews/${reviewId}/reply`, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => { setReplyingTo(null); replyForm.reset() },
        })
    }

    return (
        <VendorLayout>
            <Head title="Reviews" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews</h1>

            {/* Summary */}
            <div className="mt-6 flex items-center gap-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{ratingSummary.average}</p>
                    <div className="mt-1 flex items-center justify-center">
                        {[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className={cn('size-4', ratingSummary.average > i ? 'text-primary-600' : 'text-gray-600')} />)}
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{ratingSummary.count} reviews</p>
                </div>
                <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <button key={star} type="button" onClick={() => router.get('/vendor/reviews', filters.rating === String(star) ? {} : { rating: star }, { preserveState: true })} className={`rounded-full px-3 py-1 text-xs font-medium border ${filters.rating === String(star) ? 'border-primary-600 bg-primary-600/10 text-primary-600' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}>
                            {star} ★
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews list */}
            <div className="mt-6 space-y-4">
                {reviews.data.length === 0 ? (
                    <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">No reviews yet.</p>
                ) : (
                    reviews.data.map((review) => (
                        <div key={review.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                                        {review.customer?.name?.charAt(0) || '?'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.customer?.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{format(new Date(review.created_at), 'MMM d, yyyy')}</p>
                                    </div>
                                </div>
                                <div className="flex">{[0, 1, 2, 3, 4].map((i) => <StarIcon key={i} className={cn('size-4', review.rating > i ? 'text-primary-600' : 'text-gray-600')} />)}</div>
                            </div>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>

                            {review.vendor_reply ? (
                                <div className="mt-4 rounded-md border-l-2 border-l-primary-600 bg-gray-100 dark:bg-white/5 px-4 py-3">
                                    <p className="text-xs font-semibold text-primary-600">Your Reply</p>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{review.vendor_reply}</p>
                                </div>
                            ) : replyingTo === review.id ? (
                                <div className="mt-4">
                                    <textarea value={replyForm.data.reply} onChange={(e) => replyForm.setData('reply', e.target.value)} rows={3} placeholder="Write your reply..." className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600" />
                                    <div className="mt-2 flex gap-2">
                                        <button type="button" onClick={() => submitReply(review.id)} disabled={replyForm.processing} className="rounded-md bg-primary-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-primary-700 disabled:opacity-50">Send Reply</button>
                                        <button type="button" onClick={() => setReplyingTo(null)} className="rounded-md border border-gray-200 dark:border-gray-700 px-4 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <button type="button" onClick={() => setReplyingTo(review.id)} className="mt-3 text-xs font-medium text-primary-600 hover:text-primary-500">Reply to this review</button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {reviews.last_page > 1 && (
                <div className="mt-6 flex items-center justify-center gap-2">
                    {reviews.links.map((link, i) => (
                        <Link key={i} href={link.url || '#'} preserveState preserveScroll className={`rounded-md px-3 py-2 text-sm font-medium ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300 cursor-not-allowed'}`} >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                    ))}
                </div>
            )}
        </VendorLayout>
    )
}
