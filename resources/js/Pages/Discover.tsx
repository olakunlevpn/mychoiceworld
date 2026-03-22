import { Head, Link, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { useLocation } from '@/contexts/LocationContext'
import { useState, useCallback } from 'react'
import {
    Dialog, DialogBackdrop, DialogPanel,
    Disclosure, DisclosureButton, DisclosurePanel,
    Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/react'
import {
    XMarkIcon, FunnelIcon, MapPinIcon, HeartIcon,
    ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import type { Product, Category, EventType, StylePreference, PaginatedResponse, SharedProps } from '@/types'

interface GenderOption {
    value: string
    label: string
}

interface Props {
    products: PaginatedResponse<Product & { primary_image?: { url: string }; vendor?: { store_name: string; slug: string; city: string } }>
    categories: Category[]
    eventTypes: EventType[]
    stylePreferences: StylePreference[]
    genders: GenderOption[]
    filters: Record<string, string>
}

const sortOptions = [
    { name: 'Relevance', value: '' },
    { name: 'Nearest', value: 'distance' },
    { name: 'Price: Low to High', value: 'price_asc' },
    { name: 'Price: High to Low', value: 'price_desc' },
    { name: 'Popular', value: 'popular' },
    { name: 'Newest', value: 'newest' },
]

export default function Discover({ products, categories, eventTypes, stylePreferences, genders, filters }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const { city, coordinates, isDetecting, detectLocation, openModal } = useLocation()
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(new Set())

    const applyFilter = useCallback((key: string, value: string) => {
        const params: Record<string, string> = { ...filters, [key]: value }
        if (!value) delete params[key]
        // Include coordinates for distance sorting
        if (coordinates) {
            params.lat = String(coordinates.lat)
            params.lng = String(coordinates.lng)
        }
        router.get('/products', params, { preserveState: true, preserveScroll: true })
    }, [filters, coordinates])

    const clearFilters = useCallback(() => {
        const params: Record<string, string> = {}
        if (coordinates) {
            params.lat = String(coordinates.lat)
            params.lng = String(coordinates.lng)
        }
        router.get('/products', params, { preserveState: true })
    }, [coordinates])

    const toggleWishlist = (id: number) => {
        setWishlistedIds((prev) => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
        router.post('/customer/wishlist/toggle', { product_id: id }, { preserveState: true, preserveScroll: true })
    }

    const activeFilterCount = Object.values(filters).filter(Boolean).length

    const filterSections = [
        { id: 'category', name: 'Category', options: categories.map(c => ({ value: c.slug, label: c.name })) },
        { id: 'event_type', name: 'Event Type', options: eventTypes.map(e => ({ value: String(e.id), label: e.name })) },
        { id: 'style_preference', name: 'Style', options: stylePreferences.map(s => ({ value: String(s.id), label: s.name })) },
        { id: 'gender', name: 'Gender', options: genders.map(g => ({ value: g.value, label: g.label })) },
    ]

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Price Range */}
            <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Price Range</h3>
                <div className="mt-3 flex items-center gap-3">
                    <input
                        type="number"
                        name="min_price" id="filter-min-price" defaultValue={filters.min_price || ''}
                        onBlur={(e) => applyFilter('min_price', e.target.value)}
                        placeholder="Min"
                        className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                        type="number"
                        name="max_price" id="filter-max-price" defaultValue={filters.max_price || ''}
                        onBlur={(e) => applyFilter('max_price', e.target.value)}
                        placeholder="Max"
                        className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                    />
                </div>
            </div>

            {filterSections.map((section) => (
                <Disclosure key={section.id} defaultOpen={section.id === 'category' || section.id === 'event_type'}>
                    {({ open }) => (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <DisclosureButton className="flex w-full items-center justify-between text-sm">
                                <span className="font-semibold text-gray-900 dark:text-white">{section.name}</span>
                                {open ? <ChevronUpIcon className="size-4 text-gray-500" /> : <ChevronDownIcon className="size-4 text-gray-500" />}
                            </DisclosureButton>
                            <DisclosurePanel className="pt-3 space-y-2">
                                {section.options.map((option) => (
                                    <label key={option.value} className="flex cursor-pointer items-center gap-3">
                                        <input
                                            type="radio"
                                            name={section.id}
                                            checked={filters[section.id] === option.value}
                                            onChange={() => applyFilter(section.id, filters[section.id] === option.value ? '' : option.value)}
                                            className="size-4 border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-600"
                                        />
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{option.label}</span>
                                    </label>
                                ))}
                            </DisclosurePanel>
                        </div>
                    )}
                </Disclosure>
            ))}

            {activeFilterCount > 0 && (
                <button type="button" onClick={clearFilters} className="w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5">
                    Clear all filters
                </button>
            )}
        </div>
    )

    return (
        <PublicLayout>
            <Head title="Discover" />

            {/* Mobile filter dialog */}
            <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop transition className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-[closed]:opacity-0" />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel transition className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-gray-50 dark:bg-dark px-4 py-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
                            <button type="button" onClick={() => setMobileFiltersOpen(false)} className="-mr-2 rounded-md p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <XMarkIcon className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6"><FilterContent /></div>
                    </DialogPanel>
                </div>
            </Dialog>

            <main>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Page header */}
                    <div className="pb-6 pt-16 sm:pt-24">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Discover</h1>
                        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Explore fashion from local boutiques near you</p>
                    </div>

                    {/* Location bar */}
                    <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-4 py-3">
                        <MapPinIcon className="size-5 shrink-0 text-primary-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                            Outfits near: <span className="font-medium text-gray-900 dark:text-white">{city}</span>
                        </span>
                        <div className="ml-auto flex items-center gap-3">
                            <button type="button" onClick={detectLocation} disabled={isDetecting} className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50">
                                {isDetecting ? 'Detecting...' : 'Use my location'}
                            </button>
                            <span className="text-gray-300 dark:text-gray-600">|</span>
                            <button type="button" onClick={openModal} className="text-sm font-medium text-primary-600 hover:text-primary-500">Change</button>
                        </div>
                    </div>

                    {/* Sort + filter bar */}
                    <div className="mt-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="flex items-center gap-4">
                            <Menu as="div" className="relative">
                                <MenuButton className="group inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Sort
                                    <ChevronDownIcon className="-mr-1 ml-1 size-5 text-gray-500" />
                                </MenuButton>
                                <MenuItems transition className="absolute left-0 z-10 mt-2 w-44 origin-top-left rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.value}>
                                                <button type="button" onClick={() => applyFilter('sort', option.value)} className={`block w-full px-4 py-2 text-left text-sm ${filters.sort === option.value ? 'bg-gray-100 dark:bg-white/5 font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                                    {option.name}
                                                </button>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>
                            <span className="text-sm text-gray-400 dark:text-gray-500">{products.total} results</span>
                        </div>
                        <button type="button" onClick={() => setMobileFiltersOpen(true)} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white lg:hidden">
                            <FunnelIcon className="size-5" />
                            Filters
                            {activeFilterCount > 0 && <span className="rounded-full bg-primary-600 px-1.5 py-0.5 text-xs font-semibold text-white">{activeFilterCount}</span>}
                        </button>
                    </div>

                    {/* Active filter pills */}
                    {activeFilterCount > 0 && (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {Object.entries(filters).filter(([, v]) => v).map(([key, value]) => (
                                <button key={key} type="button" onClick={() => applyFilter(key, '')} className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">
                                    {key}: {value}
                                    <XMarkIcon className="size-3.5" />
                                </button>
                            ))}
                            <button type="button" onClick={clearFilters} className="text-xs font-medium text-primary-600 hover:text-primary-500">Clear all</button>
                        </div>
                    )}

                    {/* Main content */}
                    <div className="mt-6 pb-24 lg:grid lg:grid-cols-[240px_1fr] lg:gap-x-8">
                        {/* Desktop sidebar */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Filters</h2>
                                    {activeFilterCount > 0 && <span className="rounded-full bg-primary-600/20 px-2 py-0.5 text-xs font-medium text-primary-600">{activeFilterCount}</span>}
                                </div>
                                <div className="mt-4"><FilterContent /></div>
                            </div>
                        </aside>

                        {/* Product grid */}
                        <div>
                            {products.data.length === 0 ? (
                                <div className="flex flex-col items-center py-16 text-center">
                                    <div className="flex size-20 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
                                        <MagnifyingGlassIcon className="size-10 text-gray-400" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No outfits found</h3>
                                    <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters to find more outfits.</p>
                                    <button type="button" onClick={clearFilters} className="mt-6 flex items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
                                        <AdjustmentsHorizontalIcon className="size-4" />
                                        Clear filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                        {products.data.map((product) => (
                                            <div key={product.id} className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 transition-shadow hover:shadow-lg">
                                                <div className="relative overflow-hidden">
                                                    <Link href={`/products/${product.slug}`}>
                                                        <img
                                                            src={product.primary_image?.url || '/images/placeholder.jpg'}
                                                            alt={product.name}
                                                            className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                            loading="lazy"
                                                        />
                                                    </Link>
                                                    {(product as any).distance_km != null && (
                                                        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2 py-1 backdrop-blur-sm">
                                                            <MapPinIcon className="size-3 text-primary-600" />
                                                            <span className="text-xs font-medium text-white">{((product as any).distance_km as number).toFixed(1)} km</span>
                                                        </div>
                                                    )}
                                                    <button type="button" onClick={() => toggleWishlist(product.id)} className="absolute right-2 top-2 rounded-full bg-dark/60 p-1.5 backdrop-blur-sm transition-colors hover:bg-dark/80">
                                                        {wishlistedIds.has(product.id) ? <HeartSolidIcon className="size-4 text-red-500" /> : <HeartIcon className="size-4 text-white" />}
                                                    </button>
                                                    <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                                                        <Link href={`/products/${product.slug}`} className="block w-full rounded-md bg-primary-600 px-3 py-2 text-center text-xs font-semibold text-white shadow-lg hover:bg-primary-700">
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <Link href={`/products/${product.slug}`}>
                                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors truncate">{product.name}</h3>
                                                    </Link>
                                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.vendor?.store_name}</p>
                                                    <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{settings.currency_symbol}{(product.price / 100).toFixed(0)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {products.last_page > 1 && (
                                        <div className="mt-12 flex items-center justify-center gap-2">
                                            {products.links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || '#'}
                                                    preserveState
                                                    preserveScroll
                                                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                                        link.active
                                                            ? 'bg-primary-600 text-white'
                                                            : link.url
                                                                ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                                                                : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                                    }`}
                                                >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </PublicLayout>
    )
}
