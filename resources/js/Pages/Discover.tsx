import { Head, Link, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { useLocation } from '@/contexts/LocationContext'
import { useState, useCallback, useEffect } from 'react'
import {
    Dialog, DialogBackdrop, DialogPanel,
    Disclosure, DisclosureButton, DisclosurePanel,
    Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/react'
import {
    XMarkIcon, FunnelIcon, MapPinIcon,
    ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline'
import ProductCard from '@/Components/ProductCard'
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
    wishlistedIds: number[]
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

export default function Discover({ products, categories, eventTypes, stylePreferences, genders, wishlistedIds: initialWishlistedIds = [], filters }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const { city, coordinates, isDetecting, detectLocation, openModal } = useLocation()
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(new Set(initialWishlistedIds))

    useEffect(() => {
        if (coordinates && products.data.length > 0 && products.data[0].distance_km == null) {
            router.reload({ data: { ...filters, lat: String(coordinates.lat), lng: String(coordinates.lng) }, only: ['products'] })
        }
    }, [coordinates])

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

    const activeFilterCount = Object.values(filters).filter(Boolean).length

    const filterSections = [
        { id: 'category', name: 'Category', options: categories.map(c => ({ value: c.slug, label: c.name })) },
        { id: 'event_type', name: 'Event Type', options: eventTypes.map(e => ({ value: String(e.id), label: e.name })) },
        { id: 'style_preference', name: 'Style', options: stylePreferences.map(s => ({ value: String(s.id), label: s.name })) },
        { id: 'gender', name: 'Gender', options: genders.map(g => ({ value: g.value, label: g.label })) },
    ]

    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Distance Slider */}
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Nearest</h3>
                    <span className="text-sm font-medium text-primary-600">{filters.max_distance || '25'} km</span>
                </div>
                <input
                    type="range"
                    min="1" max="100" step="1"
                    defaultValue={filters.max_distance || '25'}
                    onChange={(e) => applyFilter('max_distance', e.target.value)}
                    className="mt-2 w-full accent-primary-600"
                />
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                    <span>1 km</span><span>100 km</span>
                </div>
            </div>

            {/* Price Range */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Price Range</h3>
                <div className="mt-3 flex items-center gap-3">
                    <input
                        type="number"
                        name="min_price" id="filter-min-price" defaultValue={filters.min_price || ''}
                        onBlur={(e) => applyFilter('min_price', e.target.value)}
                        placeholder="0"
                        className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                    />
                    <span className="text-gray-400">—</span>
                    <input
                        type="number"
                        name="max_price" id="filter-max-price" defaultValue={filters.max_price || ''}
                        onBlur={(e) => applyFilter('max_price', e.target.value)}
                        placeholder="1000"
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

            {/* Size */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                    {sizeOptions.map((size) => (
                        <button key={size} type="button" onClick={() => applyFilter('size', filters.size === size ? '' : size)} className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${filters.size === size ? 'border-primary-600 bg-primary-600/10 text-primary-600' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400'}`}>
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Availability */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <label className="flex cursor-pointer items-center gap-3">
                    <input
                        type="checkbox"
                        checked={filters.availability === 'in_stock'}
                        onChange={(e) => applyFilter('availability', e.target.checked ? 'in_stock' : '')}
                        className="size-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-600"
                    />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">In Stock Only</span>
                </label>
            </div>

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

            <main className="overflow-x-hidden">
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
                            {Object.entries(filters).filter(([, v]) => v).map(([key, value]) => {
                                const labelMap: Record<string, string> = {
                                    category: 'Category',
                                    event_type: 'Event Type',
                                    style_preference: 'Style',
                                    gender: 'Gender',
                                    min_price: 'Min Price',
                                    max_price: 'Max Price',
                                    max_distance: 'Distance',
                                    size: 'Size',
                                    availability: 'Availability',
                                    color: 'Color',
                                    sort: 'Sort',
                                    search: 'Search',
                                }
                                const label = labelMap[key] || key

                                let displayValue = value
                                if (key === 'event_type') {
                                    displayValue = eventTypes.find(e => String(e.id) === value)?.name || value
                                } else if (key === 'style_preference') {
                                    displayValue = stylePreferences.find(s => String(s.id) === value)?.name || value
                                } else if (key === 'category') {
                                    displayValue = categories.find(c => c.slug === value)?.name || value
                                } else if (key === 'max_distance') {
                                    displayValue = `${value} km`
                                } else if (key === 'min_price' || key === 'max_price') {
                                    displayValue = `${settings.currency_symbol}${value}`
                                } else if (key === 'availability') {
                                    displayValue = 'In Stock'
                                }

                                return (
                                    <button key={key} type="button" onClick={() => applyFilter(key, '')} className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10">
                                        {label}: {displayValue}
                                        <XMarkIcon className="size-3.5" />
                                    </button>
                                )
                            })}
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
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-6">
                                        {products.data.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                wishlisted={wishlistedIds.has(product.id)}
                                                onWishlistToggle={(id) => {
                                                    setWishlistedIds((prev) => {
                                                        const next = new Set(prev)
                                                        if (next.has(id)) next.delete(id)
                                                        else next.add(id)
                                                        return next
                                                    })
                                                }}
                                            />
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
