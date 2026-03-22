import { Head, Link, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import type { Product, ProductImage, Vendor, SharedProps } from '@/types'

interface Props {
    query: string
    products: (Product & { primary_image?: ProductImage; vendor?: { store_name: string; slug: string; city: string }; category?: { id: number; name: string } })[]
    vendors: Vendor[]
}

export default function SearchResults({ query, products, vendors }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const [search, setSearch] = useState(query)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.get('/search', { q: search })
    }

    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    return (
        <PublicLayout>
            <Head title={query ? `Search: ${query}` : 'Search'} />

            <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                <div className="pb-6 pt-16 sm:pt-24">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Search</h1>
                </div>

                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products, stores..." autoFocus className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600" />
                    </div>
                    <button type="submit" className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700">Search</button>
                </form>

                {query && (
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {products.length + vendors.length} results for "<span className="font-medium text-gray-900 dark:text-white">{query}</span>"
                    </p>
                )}

                {/* Vendors */}
                {vendors.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Stores</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {vendors.map((vendor) => (
                                <Link key={vendor.id} href={`/stores/${vendor.slug}`} className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 transition-shadow hover:shadow-lg">
                                    {vendor.logo ? (
                                        <img src={vendor.logo} alt={vendor.store_name} className="size-12 rounded-full object-cover" />
                                    ) : (
                                        <div className="flex size-12 items-center justify-center rounded-full bg-primary-600/10 text-primary-600 font-bold">{vendor.store_name.charAt(0)}</div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{vendor.store_name}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{vendor.city}</p>
                                        <div className="mt-1 flex items-center gap-1">
                                            <StarIcon className="size-3.5 text-yellow-400" />
                                            <span className="text-xs font-medium text-gray-900 dark:text-white">{vendor.rating_avg}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Products */}
                {products.length > 0 && (
                    <section className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Products</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
                                <Link key={product.id} href={`/products/${product.slug}`} className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 transition-shadow hover:shadow-lg">
                                    <div className="overflow-hidden">
                                        <img src={product.primary_image?.url || '/images/placeholder.jpg'} alt={product.name} className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                    </div>
                                    <div className="p-3">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 truncate">{product.name}</h3>
                                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.vendor?.store_name}</p>
                                        <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {query && products.length === 0 && vendors.length === 0 && (
                    <div className="py-16 text-center">
                        <MagnifyingGlassIcon className="mx-auto size-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No results found</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Try a different search term or browse our categories.</p>
                        <Link href="/products" className="mt-6 inline-flex items-center rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">Browse All Products</Link>
                    </div>
                )}
            </main>
        </PublicLayout>
    )
}
