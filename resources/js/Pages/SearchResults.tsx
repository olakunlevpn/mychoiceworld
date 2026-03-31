import { Head, Link, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { useLocation } from '@/contexts/LocationContext'
import { MagnifyingGlassIcon, BuildingStorefrontIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import { useState, useRef, useCallback, useEffect } from 'react'
import type { Product, ProductImage, Vendor, SharedProps } from '@/types'

interface Suggestion {
    type: 'product' | 'store'
    id: number
    name: string
    slug: string
    url: string
    image?: string
    subtitle?: string
}

interface Props {
    query: string
    products: (Product & { primary_image?: ProductImage; vendor?: { store_name: string; slug: string; city: string }; category?: { id: number; name: string } })[]
    vendors: Vendor[]
}

export default function SearchResults({ query, products, vendors }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const { coordinates } = useLocation()
    const [search, setSearch] = useState(query)
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [])

    const fetchSuggestions = useCallback((value: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (value.length < 2) { setSuggestions([]); setShowSuggestions(false); return }

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(`/search/suggest?q=${encodeURIComponent(value)}`)
                const data: Suggestion[] = await res.json()
                setSuggestions(data)
                setShowSuggestions(data.length > 0)
            } catch {
                setSuggestions([])
            }
        }, 250)
    }, [])

    const handleInputChange = (value: string) => {
        setSearch(value)
        fetchSuggestions(value)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setShowSuggestions(false)
        const params: Record<string, string> = { q: search }
        if (coordinates) { params.lat = String(coordinates.lat); params.lng = String(coordinates.lng) }
        router.get('/search', params)
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
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            placeholder="Search products, stores..."
                            autoFocus
                            autoComplete="off"
                            className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute left-0 right-0 z-20 mt-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl">
                                {suggestions.map((s) => (
                                    <Link
                                        key={`${s.type}-${s.id}`}
                                        href={s.url}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                                    >
                                        {s.image ? (
                                            <img src={s.image} alt={s.name} className="size-10 rounded-lg object-cover" />
                                        ) : (
                                            <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5">
                                                {s.type === 'store' ? <BuildingStorefrontIcon className="size-5 text-gray-400" /> : <MagnifyingGlassIcon className="size-5 text-gray-400" />}
                                            </div>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{s.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {s.type === 'store' ? 'Store' : 'Product'}{s.subtitle ? ` · ${s.subtitle}` : ''}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                <button
                                    type="submit"
                                    className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-primary-600 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                                >
                                    <MagnifyingGlassIcon className="size-4" />
                                    Search for "{search}"
                                </button>
                            </div>
                        )}
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
                                        <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <MapPinIcon className="size-3 shrink-0" />
                                            {vendor.distance_km != null ? `${Number(vendor.distance_km).toFixed(1)} km away` : vendor.city}
                                        </p>
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
                                <div key={product.id} className="group">
                                    <div className="relative overflow-hidden rounded-2xl">
                                        <Link href={`/products/${product.slug}`}>
                                            <img src={product.primary_image?.url || '/images/placeholder.jpg'} alt={product.name} className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                        </Link>
                                        {product.distance_km != null && (
                                            <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2 py-1 backdrop-blur-sm">
                                                <MapPinIcon className="size-3 text-primary-600" />
                                                <span className="text-xs font-medium text-white">{product.distance_km.toFixed(1)} km away</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <Link href={`/products/${product.slug}`}>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 truncate">{product.name}</h3>
                                        </Link>
                                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.vendor?.store_name}</p>
                                        <p className="mt-1 text-sm font-bold text-primary-600">{formatPrice(product.price)}</p>
                                    </div>
                                </div>
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
