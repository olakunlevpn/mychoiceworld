// @ts-nocheck
import { Link, useSearchParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  HeartIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import ReservationModal from '../components/ReservationModal'

const sortOptions = [
  { name: 'Relevance', value: 'relevance' },
  { name: 'Distance', value: 'distance' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Newest', value: 'newest' },
]

const suggestionPills = ['Dresses', 'Suits', 'Accessories', 'Shoes', 'Jewelry']

const products = [
  {
    id: 1,
    name: 'Floral Wrap Dress',
    slug: 'floral-wrap-dress',
    price: '$145',
    store: 'Bloom Boutique',
    distance: '1.2 km',
    imageSrc: 'https://picsum.photos/seed/search1/600/800',
    wishlisted: false,
  },
  {
    id: 2,
    name: 'Tailored Charcoal Suit',
    slug: 'tailored-charcoal-suit',
    price: '$520',
    store: 'The Gentleman\'s Store',
    distance: '3.4 km',
    imageSrc: 'https://picsum.photos/seed/search2/600/800',
    wishlisted: true,
  },
  {
    id: 3,
    name: 'Gold Chain Bracelet',
    slug: 'gold-chain-bracelet',
    price: '$78',
    store: 'Golden Hour Jewelry',
    distance: '0.9 km',
    imageSrc: 'https://picsum.photos/seed/search3/600/800',
    wishlisted: false,
  },
  {
    id: 4,
    name: 'Suede Ankle Boots',
    slug: 'suede-ankle-boots',
    price: '$210',
    store: 'Sole Society',
    distance: '2.7 km',
    imageSrc: 'https://picsum.photos/seed/search4/600/800',
    wishlisted: false,
  },
  {
    id: 5,
    name: 'Satin Evening Clutch',
    slug: 'satin-evening-clutch',
    price: '$95',
    store: 'Luxe Boutique',
    distance: '2.3 km',
    imageSrc: 'https://picsum.photos/seed/search5/600/800',
    wishlisted: false,
  },
  {
    id: 6,
    name: 'Embroidered Kaftan',
    slug: 'embroidered-kaftan',
    price: '$185',
    store: 'Free Spirit Fashion',
    distance: '1.8 km',
    imageSrc: 'https://picsum.photos/seed/search6/600/800',
    wishlisted: true,
  },
  {
    id: 7,
    name: 'Leather Oxford Shoes',
    slug: 'leather-oxford-shoes',
    price: '$340',
    store: 'The Gentleman\'s Store',
    distance: '3.4 km',
    imageSrc: 'https://picsum.photos/seed/search7/600/800',
    wishlisted: false,
  },
  {
    id: 8,
    name: 'Crystal Drop Earrings',
    slug: 'crystal-drop-earrings',
    price: '$62',
    store: 'Golden Hour Jewelry',
    distance: '0.9 km',
    imageSrc: 'https://picsum.photos/seed/search8/600/800',
    wishlisted: false,
  },
]

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const [selectedSort, setSelectedSort] = useState('relevance')
  const [reserveModalOpen, setReserveModalOpen] = useState(false)
  const [reservingProduct, setReservingProduct] = useState(null)
  const [wishlistedIds, setWishlistedIds] = useState<Set<number>>(
    new Set(products.filter((p) => p.wishlisted).map((p) => p.id))
  )
  const productGridRef = useRef(null)

  useEffect(() => {
    setSearchInput(query)
  }, [query])

  useEffect(() => {
    if (!query) return

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
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() })
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion)
    setSearchParams({ q: suggestion })
  }

  const toggleWishlist = (id: number) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <main ref={productGridRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search input bar */}
          <div className="pb-6 pt-16 sm:pt-24">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for products, stores, styles..."
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 py-4 pl-12 pr-4 text-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                />
              </div>
            </form>
          </div>

          {query ? (
            <>
              {/* Results header + sort */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">{products.length} results</span>{' '}
                  for &lsquo;{query}&rsquo;
                </p>

                <Menu as="div" className="relative">
                  <MenuButton className="group inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                    Sort
                    <ChevronDownIcon className="-mr-1 ml-1 size-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
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
              </div>

              {/* Product grid */}
              <div className="mt-6 pb-24">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
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
                        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2 py-1 backdrop-blur-sm">
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
              </div>
            </>
          ) : (
            /* Empty state — no query */
            <div className="flex flex-col items-center justify-center pb-24 pt-12 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
                <MagnifyingGlassIcon className="size-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Search for products</h2>
              <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                Find fashion items from local boutiques near you
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {suggestionPills.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors hover:border-primary-600 hover:text-gray-900 dark:hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
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
