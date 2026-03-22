// @ts-nocheck
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  XMarkIcon,
  FunnelIcon,
  MapPinIcon,
  HeartIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import ReservationModal from '../components/ReservationModal'
import { useLocation } from '../contexts/LocationContext'

const sortOptions = [
  { name: 'Relevance', value: 'relevance' },
  { name: 'Nearest', value: 'distance' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Popular', value: 'popular' },
  { name: 'Newest', value: 'newest' },
]

const filterSections = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'dresses', label: 'Dresses' },
      { value: 'suits', label: 'Suits' },
      { value: 'accessories', label: 'Accessories' },
      { value: 'shoes', label: 'Shoes' },
      { value: 'bags', label: 'Bags' },
      { value: 'jewelry', label: 'Jewelry' },
    ],
  },
  {
    id: 'event',
    name: 'Event Type',
    options: [
      { value: 'wedding', label: 'Wedding' },
      { value: 'party', label: 'Party' },
      { value: 'office', label: 'Office' },
      { value: 'casual', label: 'Casual' },
      { value: 'formal', label: 'Formal' },
      { value: 'date-night', label: 'Date Night' },
    ],
  },
  {
    id: 'style',
    name: 'Style',
    options: [
      { value: 'classic', label: 'Classic' },
      { value: 'modern', label: 'Modern' },
      { value: 'bohemian', label: 'Bohemian' },
      { value: 'streetwear', label: 'Streetwear' },
      { value: 'vintage', label: 'Vintage' },
      { value: 'minimalist', label: 'Minimalist' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: 'xxl', label: 'XXL' },
    ],
  },
  {
    id: 'availability',
    name: 'Availability',
    options: [
      { value: 'in_stock', label: 'In stock now' },
    ],
  },
  {
    id: 'gender',
    name: 'Gender',
    options: [
      { value: 'women', label: 'Women' },
      { value: 'men', label: 'Men' },
      { value: 'unisex', label: 'Unisex' },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'black', label: 'Black', hex: '#000000' },
      { value: 'white', label: 'White', hex: '#FFFFFF' },
      { value: 'red', label: 'Red', hex: '#EF4444' },
      { value: 'blue', label: 'Blue', hex: '#3B82F6' },
      { value: 'green', label: 'Green', hex: '#22C55E' },
      { value: 'gold', label: 'Gold', hex: '#EAB308' },
      { value: 'pink', label: 'Pink', hex: '#EC4899' },
      { value: 'purple', label: 'Purple', hex: '#A855F7' },
    ],
  },
]

const DISTANCE_MIN = 1
const DISTANCE_MAX = 100

const products = [
  {
    id: 1,
    name: 'Elegant Evening Gown',
    slug: 'elegant-evening-gown',
    price: '₹289',
    store: 'Luxe Boutique',
    distance: '2.3 km away',
    imageSrc: 'https://picsum.photos/seed/product1/600/800',
    wishlisted: false,
  },
  {
    id: 2,
    name: 'Classic Navy Suit',
    slug: 'classic-navy-suit',
    price: '₹450',
    store: 'The Gentleman\'s Store',
    distance: '3.1 km away',
    imageSrc: 'https://picsum.photos/seed/product2/600/800',
    wishlisted: true,
  },
  {
    id: 3,
    name: 'Bohemian Maxi Dress',
    slug: 'bohemian-maxi-dress',
    price: '₹175',
    store: 'Free Spirit Fashion',
    distance: '1.8 km away',
    imageSrc: 'https://picsum.photos/seed/product3/600/800',
    wishlisted: false,
  },
  {
    id: 4,
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    price: '₹120',
    store: 'Artisan Leather Co.',
    distance: '4.5 km away',
    imageSrc: 'https://picsum.photos/seed/product4/600/800',
    wishlisted: false,
  },
  {
    id: 5,
    name: 'Pearl Drop Earrings',
    slug: 'pearl-drop-earrings',
    price: '₹85',
    store: 'Golden Hour Jewelry',
    distance: '0.8 km away',
    imageSrc: 'https://picsum.photos/seed/product5/600/800',
    wishlisted: true,
  },
  {
    id: 6,
    name: 'Silk Cocktail Dress',
    slug: 'silk-cocktail-dress',
    price: '₹320',
    store: 'Luxe Boutique',
    distance: '2.3 km away',
    imageSrc: 'https://picsum.photos/seed/product6/600/800',
    wishlisted: false,
  },
  {
    id: 7,
    name: 'Minimalist Watch',
    slug: 'minimalist-watch',
    price: '₹195',
    store: 'TimeKeeper',
    distance: '5.2 km away',
    imageSrc: 'https://picsum.photos/seed/product7/600/800',
    wishlisted: false,
  },
  {
    id: 8,
    name: 'Velvet Blazer',
    slug: 'velvet-blazer',
    price: '₹275',
    store: 'The Gentleman\'s Store',
    distance: '3.1 km away',
    imageSrc: 'https://picsum.photos/seed/product8/600/800',
    wishlisted: false,
  },
  {
    id: 9,
    name: 'Handmade Silk Scarf',
    slug: 'handmade-silk-scarf',
    price: '₹65',
    store: 'Artisan Leather Co.',
    distance: '4.5 km away',
    imageSrc: 'https://picsum.photos/seed/product9/600/800',
    wishlisted: false,
  },
  {
    id: 10,
    name: 'Embroidered Clutch',
    slug: 'embroidered-clutch',
    price: '₹95',
    store: 'Golden Hour Jewelry',
    distance: '0.8 km away',
    imageSrc: 'https://picsum.photos/seed/product10/600/800',
    wishlisted: false,
  },
  {
    id: 11,
    name: 'Linen Palazzo Pants',
    slug: 'linen-palazzo-pants',
    price: '₹110',
    store: 'Free Spirit Fashion',
    distance: '1.8 km away',
    imageSrc: 'https://picsum.photos/seed/product11/600/800',
    wishlisted: false,
  },
  {
    id: 12,
    name: 'Statement Necklace',
    slug: 'statement-necklace',
    price: '₹150',
    store: 'Golden Hour Jewelry',
    distance: '0.8 km away',
    imageSrc: 'https://picsum.photos/seed/product12/600/800',
    wishlisted: false,
  },
]

export default function Discover() {
  const { city, isDetecting, detectLocation, openModal } = useLocation()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [selectedSort, setSelectedSort] = useState('relevance')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedDistance, setSelectedDistance] = useState(25)
  const [showEmptyState, setShowEmptyState] = useState(false)
  const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(
    new Set(products.filter((p) => p.wishlisted).map((p) => p.id))
  )
  const [reserveModalOpen, setReserveModalOpen] = useState(false)
  const [reservingProduct, setReservingProduct] = useState(null)
  const productGridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-animate="product-card"]', {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-animate="product-card"]',
          start: 'top 90%',
        },
      })
    }, productGridRef)

    return () => ctx.revert()
  }, [])

  const toggleFilter = (sectionId: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[sectionId] || []
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [sectionId]: updated }
    })
  }

  const removeFilter = (sectionId: string, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [sectionId]: (prev[sectionId] || []).filter((v) => v !== value),
    }))
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    setPriceRange([0, 1000])
    setSelectedDistance(25)
  }

  const toggleWishlist = (id: number) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const activeFilterCount = Object.values(selectedFilters).reduce(
    (count, values) => count + values.length,
    0
  )

  const getFilterLabel = (sectionId: string, value: string) => {
    const section = filterSections.find((s) => s.id === sectionId)
    const option = section?.options.find((o) => o.value === value)
    return option?.label || value
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Distance slider */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Nearest</h3>
          <span className="text-sm font-medium text-primary-600">{selectedDistance} km</span>
        </div>
        <div className="mt-3">
          <input
            type="range"
            min={DISTANCE_MIN}
            max={DISTANCE_MAX}
            value={selectedDistance}
            onChange={(e) => setSelectedDistance(Number(e.target.value))}
            className="w-full accent-primary-600 cursor-pointer"
          />
          <div className="mt-1 flex justify-between text-xs text-gray-400 dark:text-gray-500">
            <span>{DISTANCE_MIN} km</span>
            <span>{DISTANCE_MAX} km</span>
          </div>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Price Range</h3>
        <div className="mt-3 flex items-center gap-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            placeholder="Min"
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
          <span className="text-gray-400 dark:text-gray-500">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            placeholder="Max"
            className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
          />
        </div>
      </div>

      {/* Filter sections */}
      {filterSections.map((section) => (
        <Disclosure key={section.id} defaultOpen={section.id === 'category' || section.id === 'event'}>
          {({ open }) => (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <DisclosureButton className="flex w-full items-center justify-between text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">{section.name}</span>
                {open ? (
                  <ChevronUpIcon className="size-4 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDownIcon className="size-4 text-gray-500 dark:text-gray-400" />
                )}
              </DisclosureButton>
              <DisclosurePanel className="pt-3">
                {section.id === 'color' ? (
                  <div className="flex flex-wrap gap-2">
                    {section.options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleFilter(section.id, option.value)}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          (selectedFilters[section.id] || []).includes(option.value)
                            ? 'border-primary-600 text-gray-900 dark:text-white'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-500'
                        }`}
                      >
                        <span
                          className="size-3 rounded-full ring-1 ring-gray-600"
                          style={{ backgroundColor: option.hex }}
                        />
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {section.options.map((option) => (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <div className="group grid size-4 grid-cols-1">
                          <input
                            type="checkbox"
                            checked={(selectedFilters[section.id] || []).includes(option.value)}
                            onChange={() => toggleFilter(section.id, option.value)}
                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 checked:border-primary-600 checked:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                          />
                          <svg
                            fill="none"
                            viewBox="0 0 14 14"
                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                          >
                            <path
                              d="M3 8L6 11L11 3.5"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="opacity-0 group-has-[:checked]:opacity-100"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </DisclosurePanel>
            </div>
          )}
        </Disclosure>
      ))}

      {/* Clear all */}
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={clearAllFilters}
          className="w-full rounded-md border border-gray-200 dark:border-gray-700 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="bg-gray-50 dark:bg-dark">
      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-gray-50 dark:bg-dark px-4 py-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>
            <div className="mt-6">
              <FilterContent />
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <main ref={productGridRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="pb-6 pt-16 sm:pt-24">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Discover</h1>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Explore fashion from local boutiques near you
            </p>
          </div>

          {/* Location bar */}
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-4 py-3">
            <MapPinIcon className="size-5 shrink-0 text-primary-600" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Outfits near: <span className="font-medium text-gray-900 dark:text-white">{city}</span>
            </span>
            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                onClick={detectLocation}
                disabled={isDetecting}
                className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-500 disabled:opacity-50"
              >
                {isDetecting ? (
                  <>
                    <div className="size-3.5 animate-spin rounded-full border-2 border-gray-400 border-t-primary-600" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    Use my location
                  </>
                )}
              </button>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <button type="button" onClick={openModal} className="text-sm font-medium text-primary-600 hover:text-primary-500">
                Change location
              </button>
            </div>
          </div>

          {/* Sort + filter bar */}
          <div className="mt-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="flex items-center gap-4">
              <Menu as="div" className="relative">
                <MenuButton className="group inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Sort
                  <ChevronDownIcon className="-mr-1 ml-1 size-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-2 w-44 origin-top-left rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value}>
                        <button
                          type="button"
                          onClick={() => setSelectedSort(option.value)}
                          className={`block w-full px-4 py-2 text-left text-sm ${
                            selectedSort === option.value
                              ? 'bg-gray-100 dark:bg-white/5 font-semibold text-gray-900 dark:text-white'
                              : 'text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5'
                          }`}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <span className="text-sm text-gray-400 dark:text-gray-500">{products.length} results</span>
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white lg:hidden"
            >
              <FunnelIcon className="size-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-primary-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {Object.entries(selectedFilters).map(([sectionId, values]) =>
                values.map((value) => (
                  <button
                    key={`${sectionId}-${value}`}
                    type="button"
                    onClick={() => removeFilter(sectionId, value)}
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                  >
                    {getFilterLabel(sectionId, value)}
                    <XMarkIcon className="size-3.5" />
                  </button>
                ))
              )}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-medium text-primary-600 hover:text-primary-500"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Main content: sidebar + product grid */}
          <div className="mt-6 pb-24 lg:grid lg:grid-cols-[240px_1fr] lg:gap-x-8">
            {/* Desktop filter sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="rounded-full bg-primary-600/20 px-2 py-0.5 text-xs font-medium text-primary-600">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <FilterContent />
                </div>
              </div>
            </aside>

            {/* Product grid */}
            <div>
              {showEmptyState ? (
                <div className="flex flex-col items-center py-16 text-center">
                  <div className="flex size-20 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
                    <MagnifyingGlassIcon className="size-10 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No outfits found nearby</h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                    Try expanding your search radius or adjusting your filters to find more outfits.
                  </p>

                  {/* Radius slider */}
                  <div className="mt-6 w-full max-w-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Increase radius</span>
                      <span className="text-sm font-medium text-primary-600">{selectedDistance} km</span>
                    </div>
                    <input
                      type="range"
                      min={DISTANCE_MIN}
                      max={DISTANCE_MAX}
                      value={selectedDistance}
                      onChange={(e) => setSelectedDistance(Number(e.target.value))}
                      className="mt-2 w-full accent-primary-600 cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-xs text-gray-400 dark:text-gray-500">
                      <span>{DISTANCE_MIN} km</span>
                      <span>{DISTANCE_MAX} km</span>
                    </div>
                  </div>

                  {/* Try different filters */}
                  <button
                    type="button"
                    onClick={() => { clearAllFilters(); setShowEmptyState(false) }}
                    className="mt-6 flex items-center gap-2 rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-500"
                  >
                    <AdjustmentsHorizontalIcon className="size-4" />
                    Try different filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                      <div key={product.id} className="group relative" data-animate="product-card">
                        {/* Image */}
                        <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                          <Link to={`/products/${product.slug}`}>
                            <img
                              src={product.imageSrc}
                              alt={product.name}
                              className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </Link>

                          {/* Distance badge */}
                          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2.5 py-1 backdrop-blur-sm">
                            <MapPinIcon className="size-3 text-primary-600" />
                            <span className="text-xs font-medium text-white">{product.distance}</span>
                          </div>

                          {/* Wishlist button */}
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute right-2 top-2 rounded-full bg-dark/60 p-1.5 backdrop-blur-sm transition-colors hover:bg-dark/80"
                          >
                            {wishlistedIds.has(product.id) ? (
                              <HeartSolidIcon className="size-4 text-red-500" />
                            ) : (
                              <HeartIcon className="size-4 text-white" />
                            )}
                          </button>

                          {/* Reserve button on hover */}
                          <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                            <button
                              type="button"
                              onClick={() => { setReservingProduct(product); setReserveModalOpen(true) }}
                              className="w-full rounded-md bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-primary-700"
                            >
                              Reserve
                            </button>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="mt-3">
                          <Link to={`/products/${product.slug}`}>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.store}</p>
                          <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load more */}
                  <div className="mt-12 flex justify-center">
                    <button
                      type="button"
                      className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-8 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                      Load more
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <ReservationModal
        open={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        product={reservingProduct ? {
          name: reservingProduct.name,
          price: reservingProduct.price,
          store: reservingProduct.store,
          imageSrc: reservingProduct.imageSrc,
          slug: reservingProduct.slug,
        } : undefined}
      />
    </div>
  )
}
