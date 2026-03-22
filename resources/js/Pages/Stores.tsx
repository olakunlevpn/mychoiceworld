import { Head, Link, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { StarIcon } from '@heroicons/react/24/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import type { Vendor, PaginatedResponse, SharedProps } from '@/types'

interface Props {
    vendors: PaginatedResponse<Vendor & { products_count: number }>
    filters: Record<string, string>
}

export default function Stores({ vendors, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.get('/stores', { ...filters, search }, { preserveState: true })
    }

    return (
        <PublicLayout>
            <Head title="Browse Stores" />

            <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                <div className="pb-6 pt-16 sm:pt-24">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Browse Stores</h1>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Discover boutiques and fashion stores near you</p>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search stores..."
                            className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                        />
                    </div>
                    <button type="submit" className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">Search</button>
                </form>

                {/* Grid */}
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {vendors.data.map((vendor) => (
                        <Link key={vendor.id} href={`/stores/${vendor.slug}`} className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 transition-shadow hover:shadow-lg">
                            <div className="flex items-center gap-4">
                                {vendor.logo ? (
                                    <img src={vendor.logo} alt={vendor.store_name} className="size-16 rounded-full object-cover" />
                                ) : (
                                    <div className="flex size-16 items-center justify-center rounded-full bg-primary-600/10 text-primary-600 text-xl font-bold">
                                        {vendor.store_name.charAt(0)}
                                    </div>
                                )}
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 truncate">{vendor.store_name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{vendor.city}</p>
                                </div>
                            </div>
                            {vendor.description && (
                                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{vendor.description}</p>
                            )}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <StarIcon className="size-4 text-yellow-400" />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">{vendor.rating_avg || '0.0'}</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">({vendor.rating_count})</span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{vendor.products_count} products</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {vendors.data.length === 0 && (
                    <div className="py-16 text-center">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No stores found</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Try a different search term.</p>
                    </div>
                )}

                {/* Pagination */}
                {vendors.last_page > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                        {vendors.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveState
                                preserveScroll
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
                            >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                        ))}
                    </div>
                )}
            </main>
        </PublicLayout>
    )
}
