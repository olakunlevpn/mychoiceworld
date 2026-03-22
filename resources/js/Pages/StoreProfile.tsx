import { Head, Link, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { MapPinIcon, PhoneIcon, ClockIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { StarIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'
import type { Product, ProductImage, Review, PaginatedResponse, SharedProps } from '@/types'

interface VendorDetail {
    id: number; store_name: string; slug: string; logo?: string; banner?: string
    description?: string; phone?: string; whatsapp?: string; email?: string
    address: string; city: string; state: string; country: string
    operating_hours?: { day: string; open: string; close: string; closed: boolean }[]
    rating_avg: number; rating_count: number; is_featured?: boolean
}

interface Props {
    vendor: VendorDetail
    products: PaginatedResponse<Product & { primary_image?: ProductImage; category?: { id: number; name: string } }>
    reviews: (Review & { customer?: { id: number; name: string; avatar?: string } })[]
    ratingSummary: { average: number; count: number }
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function StoreProfile({ vendor, products, reviews, ratingSummary }: Props) {
    const { settings } = usePage().props as unknown as SharedProps

    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    return (
        <PublicLayout>
            <Head title={vendor.store_name} />

            {/* Banner + Store Header */}
            <div className="relative bg-gray-900">
                {/* Banner image or gradient */}
                <div className="h-48 w-full overflow-hidden sm:h-64 lg:h-80">
                    {vendor.banner ? (
                        <img src={vendor.banner} alt={`${vendor.store_name} banner`} className="size-full object-cover" />
                    ) : (
                        <div className="size-full bg-gradient-to-br from-primary-800 via-primary-600 to-primary-700" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                </div>

                {/* Store info overlay — always on dark bg */}
                <div className="relative pb-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="-mt-16 flex items-end gap-x-5 sm:-mt-20">
                            {vendor.logo ? (
                                <img src={vendor.logo} alt={vendor.store_name} className="size-24 rounded-full border-4 border-gray-900 bg-white object-cover shadow-xl sm:size-32" />
                            ) : (
                                <div className="flex size-24 items-center justify-center rounded-full border-4 border-gray-900 bg-primary-600 text-3xl font-bold text-white shadow-xl sm:size-32">
                                    {vendor.store_name.charAt(0)}
                                </div>
                            )}
                            <div className="flex min-w-0 flex-1 flex-col gap-y-2 pb-1 sm:flex-row sm:items-end sm:justify-between sm:pb-2">
                                <div>
                                    <div className="flex items-center gap-x-3">
                                        <h1 className="text-2xl font-bold text-white sm:text-3xl">{vendor.store_name}</h1>
                                        {vendor.is_featured && (
                                            <span className="inline-flex items-center gap-x-1 rounded-full bg-primary-600/30 px-2.5 py-1 text-xs font-semibold text-primary-400">
                                                <CheckBadgeIcon className="size-3.5" />
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                                        <div className="flex items-center gap-x-1">
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <StarIcon key={i} className={cn('size-4 shrink-0', vendor.rating_avg > i ? 'text-yellow-400' : 'text-gray-600')} />
                                            ))}
                                            <span className="text-sm font-medium text-white">{vendor.rating_avg}</span>
                                            <span className="text-sm text-gray-400">({vendor.rating_count} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-x-1 text-sm text-gray-400">
                                            <MapPinIcon className="size-4 text-primary-400" />
                                            <span>{vendor.city}, {vendor.state}</span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Info bar */}
            <div className="mt-6 border-y border-gray-200 dark:border-gray-700">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
                        <div className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <MapPinIcon className="size-5 shrink-0 text-gray-500" />
                            <span className="truncate">{vendor.address}</span>
                        </div>
                        {vendor.phone && (
                            <>
                                <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-700 sm:block" />
                                <a href={`tel:${vendor.phone}`} className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    <PhoneIcon className="size-5 shrink-0 text-gray-500" />
                                    <span>{vendor.phone}</span>
                                </a>
                            </>
                        )}
                        {vendor.whatsapp && (
                            <>
                                <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-700 sm:block" />
                                <a href={`https://wa.me/${vendor.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    <ChatBubbleLeftRightIcon className="size-5 shrink-0 text-gray-500" />
                                    <span>WhatsApp</span>
                                </a>
                            </>
                        )}
                        <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-700 sm:block" />
                        <a href={`https://maps.google.com/?q=${encodeURIComponent(vendor.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-gray-200 dark:hover:bg-white/10">
                            Get Directions
                        </a>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
                <TabGroup>
                    <TabList className="flex border-b border-gray-200 dark:border-gray-700">
                        {[`Products (${products.total})`, `Reviews (${ratingSummary.count})`, 'About'].map((tab) => (
                            <Tab key={tab} className="border-b-2 border-transparent px-6 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400 transition-colors focus:outline-none data-[selected]:border-primary-600 data-[selected]:text-primary-600">
                                {tab}
                            </Tab>
                        ))}
                    </TabList>

                    <TabPanels className="mt-8">
                        {/* Products */}
                        <TabPanel>
                            {products.data.length > 0 ? (
                                <>
                                <div className="mb-6 flex items-center justify-between">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{products.total} products</span>
                                    <div className="flex gap-2">
                                        {[{ label: 'Newest', value: '' }, { label: 'Price: Low', value: 'price_asc' }, { label: 'Price: High', value: 'price_desc' }, { label: 'Popular', value: 'popular' }].map((opt) => (
                                            <button key={opt.value} type="button" onClick={() => router.get(`/stores/${vendor.slug}`, opt.value ? { sort: opt.value } : {}, { preserveState: true, preserveScroll: true })} className="rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-primary-600 hover:text-primary-600 transition-colors">{opt.label}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                                    {products.data.map((product) => (
                                        <Link key={product.id} href={`/products/${product.slug}`} className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 transition-shadow hover:shadow-lg">
                                            <div className="relative overflow-hidden">
                                                <img src={product.primary_image?.url || '/images/placeholder.jpg'} alt={product.name} className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 truncate">{product.name}</h3>
                                                {product.category && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.category.name}</p>}
                                                <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
                                                <div className="mt-3 block w-full rounded-md bg-primary-600 py-2 text-center text-sm font-semibold text-white group-hover:bg-primary-700">
                                                    Reserve
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                </>
                            ) : (
                                <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">No products yet.</p>
                            )}
                        </TabPanel>

                        {/* Reviews */}
                        <TabPanel>
                            {/* Rating summary */}
                            <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 sm:flex sm:items-center sm:gap-x-10">
                                <div className="flex flex-col items-center sm:shrink-0">
                                    <span className="text-5xl font-bold text-gray-900 dark:text-white">{ratingSummary.average}</span>
                                    <div className="mt-2 flex items-center">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <StarIcon key={i} className={cn('size-5 shrink-0', ratingSummary.average > i ? 'text-primary-600' : 'text-gray-600')} />
                                        ))}
                                    </div>
                                    <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">{ratingSummary.count} reviews</span>
                                </div>
                            </div>

                            {/* Reviews list */}
                            <div className="mt-8 space-y-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-x-3">
                                                <div className="flex size-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                                                    {review.customer?.name?.charAt(0) || '?'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.customer?.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {format(new Date(review.created_at), 'MMMM d, yyyy')}
                                                        {(review as any).product?.name && <> &middot; <Link href={`/products/${(review as any).product.slug}`} className="text-primary-600 hover:text-primary-500">{(review as any).product.name}</Link></>}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((i) => (
                                                    <StarIcon key={i} className={cn('size-4 shrink-0', review.rating > i ? 'text-primary-600' : 'text-gray-600')} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{review.comment}</p>
                                        {review.vendor_reply && (
                                            <div className="mt-4 rounded-md border-l-2 border-l-primary-600 bg-gray-100 dark:bg-white/5 px-4 py-3">
                                                <p className="text-xs font-semibold text-primary-600">Store Reply</p>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{review.vendor_reply}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {reviews.length === 0 && (
                                    <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">No reviews yet.</p>
                                )}
                            </div>
                        </TabPanel>

                        {/* About */}
                        <TabPanel>
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About {vendor.store_name}</h3>
                                    {vendor.description ? (
                                        <div className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(vendor.description) }} />
                                    ) : (
                                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No description provided.</p>
                                    )}

                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact</h3>
                                        <dl className="mt-4 space-y-4">
                                            <div className="flex items-start gap-x-3">
                                                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-primary-600" />
                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                                                    <dd className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{vendor.address}, {vendor.city}, {vendor.state}, {vendor.country}</dd>
                                                </div>
                                            </div>
                                            {vendor.phone && (
                                                <div className="flex items-start gap-x-3">
                                                    <PhoneIcon className="mt-0.5 size-5 shrink-0 text-primary-600" />
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                                                        <dd className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{vendor.phone}</dd>
                                                    </div>
                                                </div>
                                            )}
                                            {vendor.email && (
                                                <div className="flex items-start gap-x-3">
                                                    <ChatBubbleLeftRightIcon className="mt-0.5 size-5 shrink-0 text-primary-600" />
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                                                        <dd className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{vendor.email}</dd>
                                                    </div>
                                                </div>
                                            )}
                                        </dl>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {vendor.operating_hours && vendor.operating_hours.length > 0 && (
                                        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Operating Hours</h3>
                                            <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                                <table className="w-full">
                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                        {vendor.operating_hours.map((item, index) => (
                                                            <tr key={item.day} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-100 dark:bg-white/5'}>
                                                                <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white capitalize">{item.day}</td>
                                                                <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300">
                                                                    {item.closed ? 'Closed' : `${item.open} - ${item.close}`}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
                                        <div className="mt-4 flex h-64 items-center justify-center overflow-hidden rounded-lg bg-gray-50 dark:bg-white/5">
                                            <div className="flex flex-col items-center text-center">
                                                <MapPinIcon className="size-10 text-primary-600" />
                                                <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">{vendor.store_name}</p>
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{vendor.address}</p>
                                                <a href={`https://maps.google.com/?q=${encodeURIComponent(vendor.address)}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">
                                                    Open in Google Maps
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        </PublicLayout>
    )
}
