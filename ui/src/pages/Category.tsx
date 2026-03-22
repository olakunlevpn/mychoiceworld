// @ts-nocheck
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
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
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import ReservationModal from '../components/ReservationModal'

const sortOptions = [
  { name: 'Most Popular', value: 'popular' },
  { name: 'Newest', value: 'newest' },
  { name: 'Best Rating', value: 'rating' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'dresses', label: 'Dresses' },
      { value: 'suits', label: 'Suits' },
      { value: 'tops', label: 'Tops' },
      { value: 'bottoms', label: 'Bottoms' },
      { value: 'outerwear', label: 'Outerwear' },
      { value: 'accessories', label: 'Accessories' },
    ],
  },
  {
    id: 'style',
    name: 'Style',
    options: [
      { value: 'casual', label: 'Casual' },
      { value: 'formal', label: 'Formal' },
      { value: 'streetwear', label: 'Streetwear' },
      { value: 'vintage', label: 'Vintage' },
      { value: 'minimalist', label: 'Minimalist' },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'black', label: 'Black' },
      { value: 'white', label: 'White' },
      { value: 'navy', label: 'Navy' },
      { value: 'beige', label: 'Beige' },
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
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
      { value: '2xl', label: '2XL' },
    ],
  },
]

const products = [
  {
    id: 1,
    name: 'Silk Evening Dress',
    slug: 'silk-evening-dress',
    store: 'Velvet Boutique',
    price: '$245',
    description: 'Midnight black, floor length',
    imageSrc: 'https://picsum.photos/seed/cat-dress1/400/600',
    imageAlt: 'Elegant black silk evening dress',
  },
  {
    id: 2,
    name: 'Structured Blazer',
    slug: 'structured-blazer',
    store: 'Mode Élite',
    price: '$189',
    description: 'Camel, single-button',
    imageSrc: 'https://picsum.photos/seed/cat-blazer1/400/600',
    imageAlt: 'Structured camel blazer',
  },
  {
    id: 3,
    name: 'Wrap Midi Dress',
    slug: 'wrap-midi-dress',
    store: 'Bloom Studio',
    price: '$128',
    description: 'Floral print, tie waist',
    imageSrc: 'https://picsum.photos/seed/cat-wrap1/400/600',
    imageAlt: 'Floral wrap midi dress',
  },
  {
    id: 4,
    name: 'Wide-Leg Trousers',
    slug: 'wide-leg-trousers',
    store: 'The Linen Room',
    price: '$115',
    description: 'Ivory, high waist',
    imageSrc: 'https://picsum.photos/seed/cat-trousers1/400/600',
    imageAlt: 'Ivory wide-leg trousers',
  },
  {
    id: 5,
    name: 'Leather Moto Jacket',
    slug: 'leather-moto-jacket',
    store: 'Edge District',
    price: '$320',
    description: 'Black, asymmetric zip',
    imageSrc: 'https://picsum.photos/seed/cat-moto1/400/600',
    imageAlt: 'Black leather moto jacket',
  },
  {
    id: 6,
    name: 'Cashmere Turtleneck',
    slug: 'cashmere-turtleneck',
    store: 'Knitwear Co.',
    price: '$175',
    description: 'Cream, relaxed fit',
    imageSrc: 'https://picsum.photos/seed/cat-turtle1/400/600',
    imageAlt: 'Cream cashmere turtleneck',
  },
  {
    id: 7,
    name: 'Pleated Mini Skirt',
    slug: 'pleated-mini-skirt',
    store: 'Bloom Studio',
    price: '$89',
    description: 'Plaid, fitted waist',
    imageSrc: 'https://picsum.photos/seed/cat-skirt1/400/600',
    imageAlt: 'Plaid pleated mini skirt',
  },
  {
    id: 8,
    name: 'Linen Shirt Dress',
    slug: 'linen-shirt-dress',
    store: 'The Linen Room',
    price: '$142',
    description: 'Sage green, belted',
    imageSrc: 'https://picsum.photos/seed/cat-linen1/400/600',
    imageAlt: 'Sage green linen shirt dress',
  },
  {
    id: 9,
    name: 'Velvet Blazer',
    slug: 'velvet-blazer',
    store: 'Velvet Boutique',
    price: '$215',
    description: 'Deep burgundy, peak lapel',
    imageSrc: 'https://picsum.photos/seed/cat-velblazer/400/600',
    imageAlt: 'Burgundy velvet blazer',
  },
  {
    id: 10,
    name: 'Tailored Jumpsuit',
    slug: 'tailored-jumpsuit',
    store: 'Mode Élite',
    price: '$195',
    description: 'Navy, wide leg',
    imageSrc: 'https://picsum.photos/seed/cat-jump1/400/600',
    imageAlt: 'Navy tailored jumpsuit',
  },
  {
    id: 11,
    name: 'Chiffon Blouse',
    slug: 'chiffon-blouse',
    store: 'Bloom Studio',
    price: '$78',
    description: 'Blush pink, flutter sleeve',
    imageSrc: 'https://picsum.photos/seed/cat-blouse1/400/600',
    imageAlt: 'Blush pink chiffon blouse',
  },
  {
    id: 12,
    name: 'Slim Cargo Pants',
    slug: 'slim-cargo-pants',
    store: 'Edge District',
    price: '$135',
    description: 'Olive, tapered fit',
    imageSrc: 'https://picsum.photos/seed/cat-cargo1/400/600',
    imageAlt: 'Olive slim cargo pants',
  },
]

export default function Category() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [activeSort, setActiveSort] = useState('popular')
  const [reserveModalOpen, setReserveModalOpen] = useState(false)
  const [reservingProduct, setReservingProduct] = useState(null)
  const productGridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-animate="product-item"]', {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-animate="product-item"]',
          start: 'top 85%',
        },
      })
    }, productGridRef)
    return () => ctx.revert()
  }, [])

  const currentSort = sortOptions.find((o) => o.value === activeSort)?.name ?? 'Most Popular'

  return (
    <div className="bg-gray-50 dark:bg-dark">
      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 sm:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/20 dark:bg-black/60 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-gray-900 py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure key={section.name} as="div" className="border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                  <h3 className="-mx-2 -my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-transparent px-2 py-3 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-medium text-gray-900 dark:text-white">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        <ChevronDownIcon className="size-5 rotate-0 transform group-data-[open]:-rotate-180 transition-transform" />
                      </span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <input
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="size-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-primary-600 focus:ring-primary-600"
                            />
                          </div>
                          <label htmlFor={`filter-mobile-${section.id}-${optionIdx}`} className="text-sm text-gray-600 dark:text-gray-300">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <main ref={productGridRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="py-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">New Arrivals</h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 dark:text-gray-400">
              Fresh styles from your favourite local boutiques, updated weekly.
            </p>
          </div>

          {/* Filters bar */}
          <section aria-labelledby="filter-heading" className="border-t border-gray-200 dark:border-gray-800 pt-6">
            <h2 id="filter-heading" className="sr-only">Product filters</h2>

            <div className="flex items-center justify-between">
              {/* Sort */}
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Sort: <span className="ml-1 text-gray-900 dark:text-white">{currentSort}</span>
                  <ChevronDownIcon className="-mr-1 ml-1 size-5 shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute left-0 z-10 mt-2 w-48 origin-top-left rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.value}>
                        <button
                          onClick={() => setActiveSort(option.value)}
                          className={`block w-full px-4 py-2 text-left text-sm data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5 data-[focus]:outline-none ${
                            activeSort === option.value ? 'font-semibold text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-300'
                          }`}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* Mobile filter button */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white sm:hidden"
              >
                <FunnelIcon className="size-4" />
                Filters
              </button>

              {/* Desktop filters */}
              <PopoverGroup className="hidden sm:flex sm:items-baseline sm:gap-8">
                {filters.map((section) => (
                  <Popover key={section.name} className="relative inline-block text-left">
                    <PopoverButton className="group inline-flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                      <span>{section.name}</span>
                      <ChevronDownIcon className="-mr-1 ml-1 size-5 shrink-0 text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                    </PopoverButton>
                    <PopoverPanel
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 p-4 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75"
                    >
                      <form className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="mt-0.5 size-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-primary-600 focus:ring-primary-600"
                            />
                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </form>
                    </PopoverPanel>
                  </Popover>
                ))}
              </PopoverGroup>
            </div>
          </section>

          {/* Product grid */}
          <section aria-labelledby="products-heading" className="mt-8">
            <h2 id="products-heading" className="sr-only">Products</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-6">
              {products.map((product) => (
                <div key={product.id} className="group relative" data-animate="product-item">
                  <div className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 aspect-[3/4]">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Reserve on hover */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 p-3">
                      <button
                        onClick={() => { setReservingProduct(product); setReserveModalOpen(true) }}
                        className="w-full rounded-lg bg-primary-600 py-2 text-xs font-semibold text-white hover:bg-primary-700 transition-colors"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link to={`/products/${product.slug}`} className="block">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{product.store}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-sm font-semibold text-primary-600">{product.price}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 italic">{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured collection banner */}
          <section aria-labelledby="featured-heading" className="relative mt-16 overflow-hidden rounded-2xl lg:h-80">
            <div className="absolute inset-0">
              <img
                alt="Featured collection"
                src="https://picsum.photos/seed/cat-featured/1200/400"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="relative flex h-full flex-col justify-center px-8 py-12 lg:max-w-sm">
              <h2 id="featured-heading" className="text-2xl font-bold text-white">
                Event Season Collection
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                Dress to impress for every occasion — from weddings to galas.
              </p>
              <Link
                to="/find-my-match"
                className="mt-6 inline-flex w-fit items-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Find My Match
              </Link>
            </div>
          </section>

          {/* Browse all CTA */}
          <div className="mt-12 mb-24 text-center">
            <p className="text-gray-500 dark:text-gray-400">Looking for something specific?</p>
            <Link
              to="/discover"
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-3 text-sm font-medium text-gray-900 dark:text-white hover:border-primary-600 hover:text-primary-400 transition-colors"
            >
              <AdjustmentsHorizontalIcon className="size-4" />
              Browse All with Advanced Filters
            </Link>
          </div>
        </div>
      </main>

      <ReservationModal
        open={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        product={
          reservingProduct
            ? {
                name: reservingProduct.name,
                price: reservingProduct.price,
                store: reservingProduct.store,
                imageSrc: reservingProduct.imageSrc,
                slug: reservingProduct.slug,
              }
            : undefined
        }
      />
    </div>
  )
}
