import { Head, Link, router, usePage } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { StarIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import type { Review, PaginatedResponse, SharedProps } from '@/types'

interface Props {
    reviews: PaginatedResponse<Review & { vendor?: { store_name: string; slug: string }; reservation?: { reservation_code: string } }>
}

export default function CustomerReviews({ reviews }: Props) {
    return (
        <CustomerLayout>
            <Head title="My Reviews" />
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reviews</h1>

                {reviews.data.length === 0 ? (
                    <div className="py-16 text-center">
                        <StarIcon className="mx-auto size-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No reviews yet</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Complete a reservation to leave a review.</p>
                    </div>
                ) : (
                    <div className="mt-6 space-y-4">
                        {reviews.data.map((review) => (
                            <div key={review.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Link href={`/stores/${review.vendor?.slug}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600">{review.vendor?.store_name}</Link>
                                        {review.reservation && <p className="text-xs text-gray-500 dark:text-gray-400">Reservation: {review.reservation.reservation_code}</p>}
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <StarIcon key={i} className={`size-4 ${review.rating > i ? 'text-primary-600' : 'text-gray-600'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                                <div className="mt-2 flex items-center gap-3">
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{format(new Date(review.created_at), 'MMM d, yyyy')}</p>
                                    {!review.vendor_reply && (
                                        <>
                                            <button type="button" onClick={() => { const newComment = prompt('Edit your review:', review.comment); if (newComment) router.put(`/customer/reviews/${review.id}`, { comment: newComment, rating: review.rating }, { preserveScroll: true }) }} className="text-xs font-medium text-primary-600 hover:text-primary-500">Edit</button>
                                            <button type="button" onClick={() => { if (confirm('Delete this review?')) router.delete(`/customer/reviews/${review.id}`, { preserveScroll: true }) }} className="text-xs font-medium text-red-400 hover:text-red-300">Delete</button>
                                        </>
                                    )}
                                </div>
                                {review.vendor_reply && (
                                    <div className="mt-3 rounded-md border-l-2 border-l-primary-600 bg-gray-100 dark:bg-white/5 px-4 py-3">
                                        <p className="text-xs font-semibold text-primary-600">Store Reply</p>
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{review.vendor_reply}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {reviews.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        {reviews.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} preserveState preserveScroll className={`rounded-md px-3 py-2 text-sm font-medium ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300 cursor-not-allowed'}`} >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                        ))}
                    </div>
                )}
            </div>
        </CustomerLayout>
    )
}
