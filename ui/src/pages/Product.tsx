// @ts-nocheck
import { useState, useEffect, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import {
  MapPinIcon,
  HeartIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {
  StarIcon,
  HeartIcon as HeartSolidIcon,
} from '@heroicons/react/24/solid'

gsap.registerPlugin(ScrollTrigger)

// ─── Mock data ───────────────────────────────────────────────────────────────

const product = {
  name: 'Elegant Evening Gown',
  slug: 'elegant-evening-gown',
  price: '$289',
  rating: 4.5,
  reviewCount: 24,
  shortDescription:
    'A breathtaking floor-length gown crafted from premium silk charmeuse. The draped silhouette and subtle shimmer make it the perfect statement piece for weddings, galas, and black-tie events.',
  images: [
    { id: 1, src: 'https://picsum.photos/seed/product-hero/600/800', alt: 'Elegant Evening Gown — front view' },
    { id: 2, src: 'https://picsum.photos/seed/product-2/600/800', alt: 'Elegant Evening Gown — back view' },
    { id: 3, src: 'https://picsum.photos/seed/product-3/600/800', alt: 'Elegant Evening Gown — side view' },
    { id: 4, src: 'https://picsum.photos/seed/product-4/600/800', alt: 'Elegant Evening Gown — detail' },
  ],
  eventTags: ['Wedding', 'Formal'],
  styleTags: ['Classic', 'Modern'],
  sizes: ['S', 'M', 'L', 'XL'],
  colors: [
    { id: 'black', name: 'Black', hex: '#111111' },
    { id: 'white', name: 'White', hex: '#F5F5F5' },
    { id: 'red', name: 'Red', hex: '#DC2626' },
  ],
  store: {
    name: 'Luxe Boutique',
    slug: 'luxe-boutique',
    initial: 'L',
    logo: 'https://picsum.photos/seed/storelogo/200/200',
    distance: '0.8 km away',
    openNow: true,
    address: '127 Fashion Avenue, Downtown, New York, NY 10001',
  },
}

const specs = [
  { label: 'Material', value: '100% Silk Charmeuse' },
  { label: 'Care', value: 'Dry clean only' },
  { label: 'Fit', value: 'Slim, floor-length' },
  { label: 'Origin', value: 'Handcrafted in Italy' },
  { label: 'SKU', value: 'LB-EG-2026-001' },
]

const reviewsSummary = {
  average: 4.5,
  total: 24,
  distribution: [
    { stars: 5, count: 14, percentage: 58 },
    { stars: 4, count: 6, percentage: 25 },
    { stars: 3, count: 3, percentage: 13 },
    { stars: 2, count: 1, percentage: 4 },
    { stars: 1, count: 0, percentage: 0 },
  ],
}

const reviewsList = [
  {
    id: 1,
    author: 'Sofia Marchetti',
    date: 'February 20, 2026',
    rating: 5,
    text: 'Absolutely stunning gown. The silk drapes beautifully and I received so many compliments at my sister\'s wedding. The reservation process was seamless and pickup was effortless.',
    vendorReply: 'Thank you so much, Sofia! We\'re thrilled the gown was perfect for the wedding. It was a pleasure helping you — we hope to see you again soon!',
  },
  {
    id: 2,
    author: 'James Whitfield',
    date: 'January 14, 2026',
    rating: 4,
    text: 'Bought this as a gift for my wife for our gala event. She was over the moon. Quality is exceptional — the craftsmanship is really evident. Sizing runs slightly large so order down.',
    vendorReply: null,
  },
  {
    id: 3,
    author: 'Amara Diallo',
    date: 'December 5, 2025',
    rating: 5,
    text: 'I have rented and bought evening wear from many boutiques, and this is by far the best value. The colour and weight of the silk are exactly as shown. Will definitely be back.',
    vendorReply: 'We really appreciate the kind words, Amara! Our team takes great pride in sourcing the finest silk. Looking forward to your next visit!',
  },
  {
    id: 4,
    author: 'Priya Nair',
    date: 'November 28, 2025',
    rating: 4,
    text: 'Gorgeous piece. The store staff helped me accessorise the whole look. Only minor note — the hem needed a slight adjustment but that was sorted quickly in-store.',
    vendorReply: 'Hi Priya, thank you for sharing! We\'re glad the team could help with the hem adjustment. Alterations are always complimentary for our customers.',
  },
]

const relatedProducts = [
  {
    id: 1,
    name: 'Silk Cocktail Dress',
    slug: 'silk-cocktail-dress',
    price: '$320',
    store: 'Luxe Boutique',
    distance: '0.8 km',
    imageSrc: 'https://picsum.photos/seed/related1/600/800',
    wishlisted: false,
  },
  {
    id: 2,
    name: 'Cashmere Blazer',
    slug: 'cashmere-blazer',
    price: '$275',
    store: 'The Gentleman\'s Store',
    distance: '3.1 km',
    imageSrc: 'https://picsum.photos/seed/related2/600/800',
    wishlisted: true,
  },
  {
    id: 3,
    name: 'Velvet Wrap Dress',
    slug: 'velvet-wrap-dress',
    price: '$295',
    store: 'Luxe Boutique',
    distance: '0.8 km',
    imageSrc: 'https://picsum.photos/seed/related3/600/800',
    wishlisted: false,
  },
  {
    id: 4,
    name: 'Pearl Drop Earrings',
    slug: 'pearl-drop-earrings',
    price: '$95',
    store: 'Golden Hour Jewelry',
    distance: '1.2 km',
    imageSrc: 'https://picsum.photos/seed/related4/600/800',
    wishlisted: false,
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

// ─── Reserve Modal ────────────────────────────────────────────────────────────

function ReserveModal({ open, onClose, productName }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Reserve Item</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Complete your reservation for{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{productName}</span> at{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{product.store.name}</span>.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Pickup Date</label>
            <input
              type="date"
              className="mt-1.5 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Notes (optional)</label>
            <textarea
              rows={3}
              placeholder="Any special requests or fitting notes..."
              className="mt-1.5 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex-1 rounded-md bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Product() {
  useParams()

  const navigate = useNavigate()
  const { addItem } = useCart()
  const [activeImage, setActiveImage] = useState(product.images[0])
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('black')
  const [wishlisted, setWishlisted] = useState(false)
  const [reserveOpen, setReserveOpen] = useState(false)
  const [relatedWishlist, setRelatedWishlist] = useState(
    new Set(relatedProducts.filter((p) => p.wishlisted).map((p) => p.id))
  )
  const [reviews, setReviews] = useState(reviewsList)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReviewRating, setNewReviewRating] = useState(0)
  const [newReviewText, setNewReviewText] = useState('')
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmitReview = () => {
    if (newReviewRating === 0 || !newReviewText.trim()) return
    const newReview = {
      id: Date.now(),
      author: 'You',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: newReviewRating,
      text: newReviewText,
      vendorReply: null,
    }
    setReviews((prev) => [newReview, ...prev])
    setNewReviewRating(0)
    setNewReviewText('')
    setShowReviewForm(false)
  }

  const pageRef = useRef(null)
  const breadcrumbRef = useRef(null)
  const heroRef = useRef(null)
  const tabsRef = useRef(null)
  const relatedRef = useRef(null)

  // Fancybox gallery
  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', { Thumbs: { type: 'classic' } })
    return () => {
      Fancybox.destroy()
    }
  }, [])

  // GSAP entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Breadcrumb
      if (breadcrumbRef.current) {
        gsap.from(breadcrumbRef.current, {
          y: -10,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      // Hero section — image + info stagger in
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll('[data-animate="hero-child"]'), {
          y: 30,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
        })
      }

      // Tabs section
      if (tabsRef.current) {
        gsap.from(tabsRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tabsRef.current,
            start: 'top 88%',
          },
        })
      }

      // Related products
      if (relatedRef.current) {
        gsap.from(relatedRef.current.querySelectorAll('[data-animate="related-card"]'), {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: relatedRef.current,
            start: 'top 90%',
          },
        })
      }
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const toggleRelatedWishlist = (id) => {
    setRelatedWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div ref={pageRef} className="bg-gray-50 dark:bg-dark">
      {/* Reserve Modal */}
      <ReserveModal
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        productName={product.name}
      />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">

        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <nav ref={breadcrumbRef} aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
          <ChevronRightIcon className="size-4 shrink-0" />
          <Link to="/discover" className="hover:text-gray-900 dark:hover:text-white transition-colors">Discover</Link>
          <ChevronRightIcon className="size-4 shrink-0" />
          <Link to={`/stores/${product.store.slug}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
            {product.store.name}
          </Link>
          <ChevronRightIcon className="size-4 shrink-0" />
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        {/* ── Product Hero ─────────────────────────────────────────────────── */}
        <div ref={heroRef} className="mt-8 lg:grid lg:grid-cols-2 lg:gap-12">

          {/* Left — Image Gallery */}
          <div data-animate="hero-child">
            {/* Main image */}
            <a
              href={activeImage.src}
              data-fancybox="gallery"
              data-caption={activeImage.alt}
              className="group block aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-xl bg-white dark:bg-gray-900"
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Thumbnail strip */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((image) => (
                <a
                  key={image.id}
                  href={image.src}
                  data-fancybox="gallery"
                  data-caption={image.alt}
                  onClick={(e) => {
                    if (e.target.tagName !== 'A' || e.currentTarget === e.target) {
                      e.preventDefault()
                      setActiveImage(image)
                    }
                  }}
                  className={classNames(
                    'group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-lg border-2 transition-all',
                    activeImage.id === image.id
                      ? 'border-primary-600'
                      : 'border-transparent hover:border-gray-600'
                  )}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="size-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="mt-10 lg:mt-0">

            {/* Store badge */}
            <div data-animate="hero-child" className="flex items-center gap-3">
              <Link
                to={`/stores/${product.store.slug}`}
                className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
              >
                <img
                  src={product.store.logo}
                  alt={product.store.name}
                  className="size-5 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900 dark:text-white">{product.store.name}</span>
              </Link>
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <MapPinIcon className="size-3.5 text-primary-600" />
                {product.store.distance}
              </span>
            </div>

            {/* Product name */}
            <h1 data-animate="hero-child" className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {/* Rating */}
            <div data-animate="hero-child" className="mt-3 flex items-center gap-2">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon
                    key={i}
                    className={classNames(
                      product.rating > i ? 'text-primary-600' : 'text-gray-600',
                      'size-5 shrink-0'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{product.rating}</span>
              <a
                href="#reviews-tab"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('reviews-tab')?.click()
                  document.getElementById('tabs-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                ({product.reviewCount} reviews)
              </a>
            </div>

            {/* Price */}
            <p data-animate="hero-child" className="mt-4 text-2xl font-bold text-primary-600">
              {product.price}
            </p>

            {/* Short description */}
            <p data-animate="hero-child" className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {product.shortDescription}
            </p>

            {/* Event type tags */}
            <div data-animate="hero-child" className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Event Type</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.eventTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Style tags */}
            <div data-animate="hero-child" className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Style</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.styleTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div data-animate="hero-child" className="mt-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Size</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={classNames(
                      'rounded-md border py-2.5 text-sm font-semibold transition-all',
                      selectedSize === size
                        ? 'border-primary-600 bg-primary-600/10 text-primary-600'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:border-gray-500'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selector */}
            <div data-animate="hero-child" className="mt-6">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Color: <span className="font-normal text-gray-500 dark:text-gray-400 capitalize">{selectedColor}</span>
              </p>
              <div className="mt-2 flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColor(color.id)}
                    title={color.name}
                    className={classNames(
                      'size-8 rounded-full border-2 transition-all',
                      selectedColor === color.id
                        ? 'ring-2 ring-primary-600 ring-offset-2 ring-offset-gray-50 dark:ring-offset-dark border-transparent'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-500'
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div data-animate="hero-child" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setReserveOpen(true)}
                className="flex-1 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-700 transition-colors"
              >
                Reserve Now
              </button>
              <button
                type="button"
                onClick={() =>
                  addItem({
                    id: 'product-1',
                    name: product.name,
                    price: product.price,
                    imageSrc: product.images[0].src,
                    slug: product.slug,
                    store: product.store.name,
                  })
                }
                className="flex-1 rounded-xl border border-primary-600 px-6 py-3.5 text-base font-semibold text-primary-600 hover:bg-primary-600/10 transition-colors"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  addItem({
                    id: 'product-1',
                    name: product.name,
                    price: product.price,
                    imageSrc: product.images[0].src,
                    slug: product.slug,
                    store: product.store.name,
                  })
                  navigate('/cart')
                }}
                className="flex-1 rounded-xl bg-amber-500 px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-amber-600 transition-colors"
              >
                Buy Now
              </button>
              <button
                type="button"
                onClick={() => setWishlisted((w) => !w)}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-6 py-3.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors sm:w-auto"
              >
                {wishlisted ? (
                  <HeartSolidIcon className="size-5 text-red-500" />
                ) : (
                  <HeartIcon className="size-5" />
                )}
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Store info card */}
            <div data-animate="hero-child" className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={product.store.logo}
                    alt={product.store.name}
                    className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.store.name}</p>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs">
                      {product.store.openNow ? (
                        <>
                          <span className="size-1.5 rounded-full bg-green-500" />
                          <span className="text-green-400">Open Now</span>
                        </>
                      ) : (
                        <>
                          <span className="size-1.5 rounded-full bg-red-500" />
                          <span className="text-red-400">Closed</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/stores/${product.store.slug}`}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-500 transition-colors"
                >
                  View Full Store
                </Link>
              </div>

              <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPinIcon className="mt-0.5 size-3.5 shrink-0 text-gray-400 dark:text-gray-500" />
                <span>{product.store.address}</span>
              </div>

              <div className="mt-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(product.store.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs: Description / Details / Reviews ─────────────────────── */}
        <section id="tabs-section" ref={tabsRef} className="mt-16">
          <TabGroup>
            <TabList className="flex border-b border-gray-200 dark:border-gray-700">
              {['Description', 'Details', 'Reviews'].map((tab, i) => (
                <Tab
                  key={tab}
                  id={tab === 'Reviews' ? 'reviews-tab' : undefined}
                  className="border-b-2 border-transparent px-6 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400 transition-colors focus:outline-none data-[selected]:border-primary-600 data-[selected]:text-primary-600 data-[hover]:text-gray-600 dark:data-[hover]:text-gray-300"
                >
                  {tab}
                  {tab === 'Reviews' && (
                    <span className="ml-2 rounded-full bg-gray-100 dark:bg-white/5 px-2 py-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {reviewsSummary.total}
                    </span>
                  )}
                </Tab>
              ))}
            </TabList>

            <TabPanels className="mt-8">

              {/* Description */}
              <TabPanel>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    The Elegant Evening Gown is a masterpiece of contemporary couture. Expertly constructed from 100% silk charmeuse,
                    it offers a weightless drape that moves with every step. The floor-length silhouette is designed to elongate the
                    figure, with subtle gathering at the waist that creates a timeless hourglass shape.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    Suitable for the most formal of occasions — from black-tie galas and wedding ceremonies to charity events and
                    milestone celebrations. The understated shimmer catches the light beautifully without overpowering the wearer,
                    making it equally effective under candlelight or photography flash.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    Each gown is individually cut and hand-finished in our Italian atelier, ensuring that no two pieces are exactly
                    alike. Minor variations in texture are a natural feature of silk, not a defect, and contribute to the uniqueness
                    of your garment.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    For best results, steam rather than press. Store hanging in a breathable garment bag away from direct sunlight
                    to preserve the lustre and colour of the silk.
                  </p>

                  <div className="mt-8 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 p-5">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Care Instructions</h3>
                    <ul className="mt-3 space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      {[
                        'Dry clean only — do not machine wash',
                        'Store hanging in a breathable garment bag',
                        'Avoid prolonged exposure to direct sunlight',
                        'Steam to remove creases — do not iron directly',
                        'Keep away from perfume and cosmetics before wearing',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary-600" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabPanel>

              {/* Details */}
              <TabPanel>
                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {specs.map((spec, index) => (
                        <tr
                          key={spec.label}
                          className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-100 dark:bg-white/5'}
                        >
                          <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">{spec.label}</td>
                          <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabPanel>

              {/* Reviews */}
              <TabPanel>
                {/* Rating summary */}
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 sm:flex sm:items-start sm:gap-10">
                  {/* Average */}
                  <div className="flex flex-col items-center sm:shrink-0">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">{reviewsSummary.average}</span>
                    <div className="mt-2 flex items-center">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <StarIcon
                          key={i}
                          className={classNames(
                            reviewsSummary.average > i ? 'text-primary-600' : 'text-gray-600',
                            'size-5 shrink-0'
                          )}
                        />
                      ))}
                    </div>
                    <span className="mt-1 text-sm text-gray-500 dark:text-gray-400">{reviewsSummary.total} reviews</span>
                  </div>

                  {/* Distribution bars */}
                  <div className="mt-6 flex-1 space-y-2.5 sm:mt-0">
                    {reviewsSummary.distribution.map((row) => (
                      <div key={row.stars} className="flex items-center gap-3">
                        <span className="w-4 text-right text-sm font-medium text-gray-600 dark:text-gray-300">{row.stars}</span>
                        <StarIcon className="size-4 shrink-0 text-primary-600" />
                        <div className="flex-1">
                          <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
                            <div
                              className="h-full rounded-full bg-primary-600 transition-all duration-500"
                              style={{ width: `${row.percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="w-8 text-right text-xs text-gray-500 dark:text-gray-400">{row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Write a Review Form */}
                {showReviewForm ? (
                  <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Write a Review</h3>

                    {/* Star Rating */}
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Your Rating</p>
                      <div className="mt-2 flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReviewRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-0.5"
                          >
                            <StarIcon
                              className={classNames(
                                'size-7 transition-colors',
                                (hoverRating || newReviewRating) >= star
                                  ? 'text-primary-600'
                                  : 'text-gray-600'
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Your Review</label>
                      <textarea
                        rows={4}
                        value={newReviewText}
                        onChange={(e) => setNewReviewText(e.target.value)}
                        placeholder="Share your experience with this product..."
                        className="mt-1.5 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                      />
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={handleSubmitReview}
                        disabled={newReviewRating === 0 || !newReviewText.trim()}
                        className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Submit Review
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowReviewForm(false)
                          setNewReviewRating(0)
                          setNewReviewText('')
                          setHoverRating(0)
                        }}
                        className="rounded-md border border-gray-200 dark:border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(true)}
                      className="rounded-xl border border-primary-600 bg-primary-600/10 px-6 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-600/20 transition-colors"
                    >
                      Write a Review
                    </button>
                  </div>
                )}

                {/* Review cards */}
                <div className="mt-8 space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.author}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <StarIcon
                              key={i}
                              className={classNames(
                                review.rating > i ? 'text-primary-600' : 'text-gray-600',
                                'size-4 shrink-0'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{review.text}</p>

                      {/* Vendor Reply */}
                      {review.vendorReply && (
                        <div className="mt-4 rounded-lg bg-gray-100 dark:bg-white/5 p-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={product.store.logo}
                              alt={product.store.name}
                              className="size-5 rounded-full object-cover"
                            />
                            <p className="text-xs font-semibold text-gray-900 dark:text-white">{product.store.name}</p>
                            <span className="text-xs text-gray-400 dark:text-gray-500">replied</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{review.vendorReply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </section>

        {/* ── Related Products ─────────────────────────────────────────────── */}
        <section ref={relatedRef} className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">You May Also Like</h2>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((item) => (
              <div key={item.id} className="group relative" data-animate="related-card">
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Link to={`/products/${item.slug}`}>
                    <img
                      src={item.imageSrc}
                      alt={item.name}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  {/* Distance badge */}
                  <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2 py-1 backdrop-blur-sm">
                    <MapPinIcon className="size-3 text-primary-600" />
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{item.distance}</span>
                  </div>

                  {/* Wishlist button */}
                  <button
                    type="button"
                    onClick={() => toggleRelatedWishlist(item.id)}
                    className="absolute right-2 top-2 rounded-full bg-dark/60 p-1.5 backdrop-blur-sm transition-colors hover:bg-dark/80"
                  >
                    {relatedWishlist.has(item.id) ? (
                      <HeartSolidIcon className="size-4 text-red-500" />
                    ) : (
                      <HeartIcon className="size-4 text-gray-900 dark:text-white" />
                    )}
                  </button>

                  {/* Reserve on hover */}
                  <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setReserveOpen(true)}
                      className="w-full rounded-md bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-primary-700"
                    >
                      Reserve
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-3">
                  <Link to={`/products/${item.slug}`}>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white transition-colors group-hover:text-primary-600">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{item.store}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
