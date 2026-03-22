// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {
  MapPinIcon,
  HeartIcon,
  PhoneIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartSolidIcon,
  StarIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/solid'
import ReservationModal from '../components/ReservationModal'

gsap.registerPlugin(ScrollTrigger)

const store = {
  name: 'Luxe Boutique',
  slug: 'luxe-boutique',
  rating: 4.8,
  reviewCount: 127,
  featured: true,
  city: 'Downtown, New York',
  distance: '0.8 km away',
  bannerImage: 'https://picsum.photos/seed/storebanner/1920/500',
  logoImage: 'https://picsum.photos/seed/storelogo/200/200',
  phone: '+1 (555) 234-5678',
  whatsapp: '+1 (555) 234-5678',
  address: '127 Fashion Avenue, Downtown, New York, NY 10001',
  openNow: true,
  currentHours: '9:00 AM - 9:00 PM',
  description:
    'Luxe Boutique is your premier destination for high-end fashion and accessories in the heart of Downtown New York. Established in 2018, we curate a stunning collection of designer pieces, handpicked from both emerging and established brands around the world. Our mission is to bring exceptional style and quality to every customer who walks through our doors. Whether you are shopping for a special occasion or refreshing your everyday wardrobe, our knowledgeable stylists are here to help you find the perfect look. We pride ourselves on offering a warm, personalized shopping experience that keeps our community coming back season after season.',
  operatingHours: [
    { day: 'Monday', hours: '9:00 AM - 9:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 9:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 9:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 10:00 PM' },
    { day: 'Sunday', hours: '11:00 AM - 7:00 PM' },
  ],
}

const products = [
  { id: 1, name: 'Silk Evening Gown', slug: 'silk-evening-gown', price: '$389', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp1/600/800', wishlisted: false },
  { id: 2, name: 'Cashmere Blazer', slug: 'cashmere-blazer', price: '$275', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp2/600/800', wishlisted: true },
  { id: 3, name: 'Leather Tote Bag', slug: 'leather-tote-bag', price: '$210', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp3/600/800', wishlisted: false },
  { id: 4, name: 'Gold Chain Necklace', slug: 'gold-chain-necklace', price: '$145', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp4/600/800', wishlisted: false },
  { id: 5, name: 'Embroidered Midi Skirt', slug: 'embroidered-midi-skirt', price: '$165', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp5/600/800', wishlisted: false },
  { id: 6, name: 'Velvet Wrap Dress', slug: 'velvet-wrap-dress', price: '$295', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp6/600/800', wishlisted: true },
  { id: 7, name: 'Designer Sunglasses', slug: 'designer-sunglasses', price: '$180', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp7/600/800', wishlisted: false },
  { id: 8, name: 'Tailored Wool Coat', slug: 'tailored-wool-coat', price: '$420', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp8/600/800', wishlisted: false },
  { id: 9, name: 'Pearl Drop Earrings', slug: 'pearl-drop-earrings', price: '$95', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp9/600/800', wishlisted: false },
  { id: 10, name: 'Satin Blouse', slug: 'satin-blouse', price: '$135', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp10/600/800', wishlisted: false },
  { id: 11, name: 'Ankle Strap Heels', slug: 'ankle-strap-heels', price: '$225', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp11/600/800', wishlisted: false },
  { id: 12, name: 'Structured Clutch', slug: 'structured-clutch', price: '$110', distance: '0.8 km', imageSrc: 'https://picsum.photos/seed/sp12/600/800', wishlisted: false },
]

const reviewsSummary = {
  average: 4.8,
  total: 127,
  distribution: [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ],
}

const reviewsList = [
  {
    id: 1,
    author: 'Sarah Mitchell',
    date: 'February 28, 2026',
    rating: 5,
    comment: 'Absolutely love this boutique! The staff is incredibly knowledgeable and helped me find the perfect outfit for a gala event. The quality of their pieces is unmatched in the area.',
    vendorReply: 'Thank you so much, Sarah! It was a pleasure helping you find your perfect look. We hope to see you again soon!',
  },
  {
    id: 2,
    author: 'Marcus Chen',
    date: 'February 15, 2026',
    rating: 5,
    comment: 'Great selection of menswear and accessories. The cashmere blazer I purchased is the best quality I have found at this price point. Highly recommend.',
    vendorReply: null,
  },
  {
    id: 3,
    author: 'Emily Rodriguez',
    date: 'January 30, 2026',
    rating: 4,
    comment: 'Beautiful store with a great ambiance. The collection is well-curated and unique. Only reason for 4 stars is the wait time during peak hours, but the service is worth it.',
    vendorReply: 'Thanks for the feedback, Emily! We are working on improving wait times during busy periods. Glad you enjoyed the collection!',
  },
  {
    id: 4,
    author: 'David Okafor',
    date: 'January 12, 2026',
    rating: 5,
    comment: 'Reserved a leather tote online and picked it up in-store within an hour. The reservation process was seamless. The bag exceeded my expectations in person.',
    vendorReply: null,
  },
  {
    id: 5,
    author: 'Amira Hassan',
    date: 'December 20, 2025',
    rating: 4,
    comment: 'Wonderful boutique with a fantastic eye for style. The staff helped me put together a complete wardrobe refresh. A bit pricey, but you get what you pay for in quality.',
    vendorReply: 'Thank you, Amira! We appreciate your trust in us for your wardrobe update. Quality is at the heart of everything we do.',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function StoreProfile() {
  const [wishlistedIds, setWishlistedIds] = useState(
    new Set(products.filter((p) => p.wishlisted).map((p) => p.id))
  )
  const [reserveModalOpen, setReserveModalOpen] = useState(false)
  const [reservingProduct, setReservingProduct] = useState(null)
  const pageRef = useRef(null)
  const headerRef = useRef(null)
  const infoBarRef = useRef(null)
  const tabPanelRef = useRef(null)

  const toggleWishlist = (id) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  // Header animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.querySelectorAll('[data-animate="header"]'), {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
        })
      }

      if (infoBarRef.current) {
        gsap.from(infoBarRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoBarRef.current,
            start: 'top 90%',
          },
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  // Tab panel fade-up animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (tabPanelRef.current) {
        const panels = tabPanelRef.current.querySelectorAll('[data-tab-content]')
        panels.forEach((panel) => {
          gsap.from(panel, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 90%',
            },
          })
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="bg-gray-50 dark:bg-dark">
      {/* Store header banner */}
      <div ref={headerRef} className="relative">
        {/* Banner image */}
        <div className="h-48 w-full overflow-hidden sm:h-64 lg:h-80">
          <img
            src={store.bannerImage}
            alt={`${store.name} banner`}
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
        </div>

        {/* Store info overlay */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-16 flex items-end gap-x-5 sm:-mt-20">
            {/* Store logo */}
            <div data-animate="header" className="shrink-0">
              <img
                src={store.logoImage}
                alt={store.name}
                className="size-24 rounded-full border-2 border-primary-600 bg-white dark:bg-gray-900 object-cover shadow-lg sm:size-32"
              />
            </div>

            {/* Store name & meta */}
            <div className="flex min-w-0 flex-1 flex-col gap-y-2 pb-1 sm:flex-row sm:items-end sm:justify-between sm:pb-2">
              <div data-animate="header">
                <div className="flex items-center gap-x-3">
                  <h1 className="text-2xl font-bold text-white sm:text-3xl">{store.name}</h1>
                  {store.featured && (
                    <span className="inline-flex items-center gap-x-1 rounded-full bg-primary-600/20 px-2.5 py-1 text-xs font-semibold text-primary-600">
                      <CheckBadgeIcon className="size-3.5" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  {/* Rating */}
                  <div className="flex items-center gap-x-1">
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            store.rating > rating ? 'text-primary-600' : 'text-gray-600',
                            'size-4 shrink-0'
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-white">{store.rating}</span>
                    <span className="text-sm text-gray-300">({store.reviewCount} reviews)</span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-x-1 text-sm text-gray-300">
                    <MapPinIcon className="size-4 text-primary-600" />
                    <span>{store.city}</span>
                    <span className="text-gray-400">&middot;</span>
                    <span>{store.distance}</span>
                  </div>
                </div>
              </div>

              {/* Follow action */}
              <div data-animate="header" className="flex gap-x-3 sm:pb-1">
                <button
                  type="button"
                  className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
                >
                  Follow Store
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store info bar */}
      <div ref={infoBarRef} className="mt-6 border-y border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-4">
            {/* Open Now */}
            <div className="flex items-center gap-x-2">
              <ClockIcon className="size-5 text-gray-500 dark:text-gray-400" />
              <span className="flex items-center gap-x-1.5 text-sm">
                {store.openNow ? (
                  <>
                    <span className="size-2 rounded-full bg-green-500" />
                    <span className="font-medium text-green-400">Open Now</span>
                  </>
                ) : (
                  <>
                    <span className="size-2 rounded-full bg-red-500" />
                    <span className="font-medium text-red-400">Closed</span>
                  </>
                )}
                <span className="text-gray-500 dark:text-gray-400">&middot; {store.currentHours}</span>
              </span>
            </div>

            <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-700 sm:block" />

            {/* Address */}
            <div className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300">
              <MapPinIcon className="size-5 shrink-0 text-gray-500 dark:text-gray-400" />
              <span className="truncate">{store.address}</span>
            </div>

            <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-700 sm:block" />

            {/* Phone */}
            <a href={`tel:${store.phone}`} className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <PhoneIcon className="size-5 shrink-0 text-gray-500 dark:text-gray-400" />
              <span>{store.phone}</span>
            </a>

            <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-700 sm:block" />

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${store.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ChatBubbleLeftRightIcon className="size-5 shrink-0 text-gray-500 dark:text-gray-400" />
              <span>WhatsApp</span>
            </a>

            <span className="hidden h-5 w-px bg-gray-200 dark:bg-gray-700 sm:block" />

            {/* Directions */}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-gray-200 dark:hover:bg-white/10"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m0 0-3-3m3 3 3-3m-3 3V6.75M3.375 20.1a2.25 2.25 0 0 0 2.236 2.025h12.778a2.25 2.25 0 0 0 2.236-2.025L21.75 9H2.25l1.125 11.1Z" />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        <TabGroup>
          <TabList className="flex border-b border-gray-200 dark:border-gray-700">
            {['Products', 'Reviews', 'About'].map((tab) => (
              <Tab
                key={tab}
                className="border-b-2 px-6 py-3 text-sm font-semibold transition-colors focus:outline-none data-[selected]:border-primary-600 data-[selected]:text-primary-600 data-[hover]:text-gray-600 dark:data-[hover]:text-gray-300 border-transparent text-gray-500 dark:text-gray-400"
              >
                {tab}
                {tab === 'Products' && (
                  <span className="ml-2 rounded-full bg-gray-100 dark:bg-white/5 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {products.length}
                  </span>
                )}
                {tab === 'Reviews' && (
                  <span className="ml-2 rounded-full bg-gray-100 dark:bg-white/5 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                    {reviewsSummary.total}
                  </span>
                )}
              </Tab>
            ))}
          </TabList>

          <TabPanels ref={tabPanelRef} className="mt-8">
            {/* Products Tab */}
            <TabPanel>
              <div data-tab-content>
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
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white transition-colors group-hover:text-primary-600">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{store.name}</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* Reviews Tab */}
            <TabPanel>
              <div data-tab-content>
                {/* Rating summary */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 sm:flex sm:items-start sm:gap-x-10">
                  {/* Average score */}
                  <div className="flex flex-col items-center sm:shrink-0">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">{reviewsSummary.average}</span>
                    <div className="mt-2 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviewsSummary.average > rating ? 'text-primary-600' : 'text-gray-600',
                            'size-5 shrink-0'
                          )}
                        />
                      ))}
                    </div>
                    <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">{reviewsSummary.total} reviews</span>
                  </div>

                  {/* Star distribution */}
                  <div className="mt-6 flex-1 space-y-3 sm:mt-0">
                    {reviewsSummary.distribution.map((row) => (
                      <div key={row.stars} className="flex items-center gap-x-3">
                        <span className="w-8 text-right text-sm font-medium text-gray-600 dark:text-gray-300">{row.stars}</span>
                        <StarIcon className="size-4 shrink-0 text-primary-600" />
                        <div className="flex-1">
                          <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
                            <div
                              className="h-full rounded-full bg-primary-600"
                              style={{ width: `${row.percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-10 text-right text-sm text-gray-500 dark:text-gray-400">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews list */}
                <div className="mt-8 space-y-6">
                  {reviewsList.map((review) => (
                    <div key={review.id} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-x-3">
                          <div className="flex size-10 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.author}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rating > rating ? 'text-primary-600' : 'text-gray-600',
                                'size-4 shrink-0'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{review.comment}</p>

                      {/* Vendor reply */}
                      {review.vendorReply && (
                        <div className="mt-4 rounded-md border-l-2 border-l-primary-600 bg-gray-100 dark:bg-white/5 px-4 py-3">
                          <p className="text-xs font-semibold text-primary-600">Store Reply</p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{review.vendorReply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* About Tab */}
            <TabPanel>
              <div data-tab-content>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                  {/* Store description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About {store.name}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{store.description}</p>

                    {/* Contact details */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
                      <dl className="mt-4 space-y-4">
                        <div className="flex items-start gap-x-3">
                          <MapPinIcon className="mt-0.5 size-5 shrink-0 text-primary-600" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                            <dd className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{store.address}</dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-x-3">
                          <PhoneIcon className="mt-0.5 size-5 shrink-0 text-primary-600" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</dt>
                            <dd className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{store.phone}</dd>
                          </div>
                        </div>
                        <div className="flex items-start gap-x-3">
                          <ChatBubbleLeftRightIcon className="mt-0.5 size-5 shrink-0 text-primary-600" />
                          <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">WhatsApp</dt>
                            <dd className="mt-0.5 text-sm text-gray-600 dark:text-gray-300">{store.whatsapp}</dd>
                          </div>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Right column: hours + map */}
                  <div>
                    {/* Operating hours */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Operating Hours</h3>
                    <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <table className="w-full">
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {store.operatingHours.map((item, index) => (
                            <tr
                              key={item.day}
                              className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-100 dark:bg-white/5'}
                            >
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.day}</td>
                              <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-300">{item.hours}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Placeholder map */}
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
                      <div className="mt-4 flex h-64 items-center justify-center overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                        <div className="flex flex-col items-center text-center">
                          <MapPinIcon className="size-10 text-primary-600" />
                          <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">{store.name}</p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{store.address}</p>
                          <a
                            href={`https://maps.google.com/?q=${encodeURIComponent(store.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-x-1.5 rounded-md bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700"
                          >
                            Open in Google Maps
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </main>
      <ReservationModal
        open={reserveModalOpen}
        onClose={() => setReserveModalOpen(false)}
        product={reservingProduct ? {
          name: reservingProduct.name,
          price: reservingProduct.price,
          store: store.name,
          imageSrc: reservingProduct.imageSrc,
          slug: reservingProduct.slug,
        } : undefined}
      />
    </div>
  )
}
