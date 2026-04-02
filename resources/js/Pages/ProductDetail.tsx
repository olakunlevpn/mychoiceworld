import { Head, Link, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { useLocation } from '@/contexts/LocationContext'
import ReservationModal from '@/Components/ReservationModal'
import ProductCard from '@/Components/ProductCard'
import { useState, useRef, useEffect } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { MapPinIcon, HeartIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import { StarIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import DOMPurify from 'dompurify'
import type { Product, ProductImage, ProductVariant, ProductColor, SharedProps } from '@/types'

interface Props {
    product: Product & {
        images: ProductImage[]
        variants: ProductVariant[]
        vendor: {
            id: number; store_name: string; slug: string; logo?: string; city: string;
            phone?: string; whatsapp?: string; email?: string; address: string;
            operating_hours?: { day: string; open: string; close: string; closed: boolean }[]
            rating_avg: number; rating_count: number
        }
        category: { id: number; name: string; slug: string }
        event_types: { id: number; name: string }[]
        style_preferences: { id: number; name: string }[]
    }
    relatedProducts: (Product & { primary_image?: ProductImage; vendor?: { store_name: string; slug: string } })[]
    vendorDistanceKm?: number | null
    wishlisted: boolean
    sizes: string[]
    colors: ProductColor[]
}

function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetail({ product, relatedProducts, vendorDistanceKm, wishlisted: initialWishlisted, sizes, colors }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const { coordinates } = useLocation()

    useEffect(() => {
        if (coordinates && vendorDistanceKm == null) {
            router.reload({ data: { lat: coordinates.lat, lng: coordinates.lng }, only: ['vendorDistanceKm', 'relatedProducts'] })
        }
    }, [coordinates])
    const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '')

    const filteredImages = selectedColor
        ? product.images.filter(img => !img.color || img.color.toLowerCase() === selectedColor.toLowerCase())
        : product.images
    const displayImages = filteredImages.length > 0 ? filteredImages : product.images

    const [activeImage, setActiveImage] = useState(displayImages[0] || null)

    const filteredSizes = selectedColor
        ? product.variants
            .filter(v => v.is_active && v.color?.toLowerCase() === selectedColor.toLowerCase())
            .map(v => v.size)
            .filter((s): s is string => !!s)
            .filter((v, i, a) => a.indexOf(v) === i)
        : sizes
    const [selectedSize, setSelectedSize] = useState(filteredSizes[0] || '')

    const handleColorChange = (colorName: string) => {
        setSelectedColor(colorName)
        const colorImages = product.images.filter(img => img.color?.toLowerCase() === colorName.toLowerCase())
        if (colorImages.length > 0) {
            setActiveImage(colorImages[0])
        }
        const colorSizes = product.variants
            .filter(v => v.is_active && v.color?.toLowerCase() === colorName.toLowerCase())
            .map(v => v.size)
            .filter((s): s is string => !!s)
            .filter((v, i, a) => a.indexOf(v) === i)
        if (colorSizes.length > 0) {
            setSelectedSize(colorSizes[0])
        }
    }
    const [wishlisted, setWishlisted] = useState(initialWishlisted)
    const [reserveOpen, setReserveOpen] = useState(false)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({})
    const thumbRef = useRef<HTMLDivElement>(null)

    const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setZoomStyle({ transformOrigin: `${x}% ${y}%`, transform: 'scale(2)' })
    }

    const handleImageLeave = () => {
        setZoomStyle({})
    }

    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    const toggleWishlist = () => {
        setWishlisted(!wishlisted)
        router.post('/customer/wishlist/toggle', { product_id: product.id }, { preserveState: true, preserveScroll: true })
    }

    return (
        <PublicLayout>
            <Head title={product.name} />

            <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">Home</Link>
                    <ChevronRightIcon className="size-4 shrink-0" />
                    <Link href="/products" className="hover:text-gray-900 dark:hover:text-white transition-colors">Discover</Link>
                    <ChevronRightIcon className="size-4 shrink-0" />
                    <Link href={`/stores/${product.vendor.slug}`} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        {product.vendor.store_name}
                    </Link>
                    <ChevronRightIcon className="size-4 shrink-0" />
                    <span className="text-gray-900 dark:text-white truncate">{product.name}</span>
                </nav>

                {/* Product Hero */}
                <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
                    {/* Image Gallery */}
                    <div>
                        {activeImage && (
                            <div
                                className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-white dark:bg-gray-900 cursor-zoom-in"
                                onMouseMove={handleImageHover}
                                onMouseLeave={handleImageLeave}
                                onClick={() => setLightboxOpen(true)}
                            >
                                <img src={activeImage.url} alt={activeImage.alt_text || product.name} className="size-full object-cover transition-transform duration-200" style={zoomStyle} />
                            </div>
                        )}
                        {displayImages.length > 1 && (
                            <div className="relative mt-4">
                                {displayImages.length > 4 && (
                                    <>
                                        <button type="button" onClick={() => thumbRef.current?.scrollBy({ left: -200, behavior: 'smooth' })} className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <ChevronLeftIcon className="size-4 text-gray-700 dark:text-white" />
                                        </button>
                                        <button type="button" onClick={() => thumbRef.current?.scrollBy({ left: 200, behavior: 'smooth' })} className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <ChevronRightIcon className="size-4 text-gray-700 dark:text-white" />
                                        </button>
                                    </>
                                )}
                                <div ref={thumbRef} className="flex gap-3 overflow-x-auto scrollbar-hide">
                                    {displayImages.map((image) => (
                                        <button
                                            key={image.id}
                                            type="button"
                                            onClick={() => setActiveImage(image)}
                                            className={cn(
                                                'aspect-[3/4] w-[calc(25%-9px)] shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                                                activeImage?.id === image.id ? 'border-primary-600' : 'border-transparent hover:border-gray-600'
                                            )}
                                        >
                                            <img src={image.thumbnail_url || image.url} alt={image.alt_text || ''} className="size-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 lg:mt-0">
                        {/* Store badge */}
                        <div className="flex items-center gap-3">
                            <Link href={`/stores/${product.vendor.slug}`} className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                {product.vendor.logo ? (
                                    <img src={product.vendor.logo} alt={product.vendor.store_name} className="size-5 rounded-full object-cover" />
                                ) : (
                                    <span className="flex size-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">{product.vendor.store_name.charAt(0)}</span>
                                )}
                                <span className="font-medium text-gray-900 dark:text-white">{product.vendor.store_name}</span>
                            </Link>
                        </div>

                        {/* Name */}
                        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>

                        {/* Rating */}
                        <div className="mt-3 flex items-center gap-2">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((i) => (
                                    <StarIcon key={i} className={cn('size-5 shrink-0', product.vendor.rating_avg > i ? 'text-primary-600' : 'text-gray-600')} />
                                ))}
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{product.vendor.rating_avg}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">({product.vendor.rating_count} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-2xl font-bold text-primary-600">{formatPrice(product.price)}</span>
                            {product.compare_price && product.compare_price > product.price && (
                                <>
                                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.compare_price)}</span>
                                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-500">
                                        {Math.round((1 - product.price / product.compare_price) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Availability status */}
                        <div className="mt-3">
                            {product.status === 'active' ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-400">
                                    <span className="size-2 rounded-full bg-green-500" />
                                    Available today
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-red-400">
                                    <span className="size-2 rounded-full bg-red-500" />
                                    Out of stock
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
                        )}

                        {/* Event tags */}
                        {product.event_types && product.event_types.length > 0 && (
                            <div className="mt-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Event Type</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {product.event_types.map((tag) => (
                                        <span key={tag.id} className="rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Style tags */}
                        {product.style_preferences && product.style_preferences.length > 0 && (
                            <div className="mt-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Style</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {product.style_preferences.map((tag) => (
                                        <span key={tag.id} className="rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size selector */}
                        {filteredSizes.length > 0 && (
                            <div className="mt-6">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">Size</p>
                                <div className="mt-2 grid grid-cols-4 gap-2">
                                    {filteredSizes.map((size) => (
                                        <button key={size} type="button" onClick={() => setSelectedSize(size)} className={cn(
                                            'rounded-md border py-2.5 text-sm font-semibold transition-all',
                                            selectedSize === size ? 'border-primary-600 bg-primary-600/10 text-primary-600' : 'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:border-gray-500'
                                        )}>
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color selector */}
                        {colors.length > 0 && (
                            <div className="mt-6">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    Color: <span className="font-normal text-gray-500 dark:text-gray-400 capitalize">{selectedColor}</span>
                                </p>
                                <div className="mt-2 flex gap-3">
                                    {colors.map((color) => (
                                        <button key={color.hex} type="button" onClick={() => handleColorChange(color.name)} title={color.name} className={cn(
                                            'size-8 rounded-full border-2 transition-all',
                                            selectedColor === color.name ? 'ring-2 ring-primary-600 ring-offset-2 ring-offset-gray-50 dark:ring-offset-dark border-transparent' : 'border-gray-200 dark:border-gray-700 hover:border-gray-500'
                                        )} style={{ backgroundColor: color.hex }} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            {product.is_reservable && (
                                <button type="button" onClick={() => setReserveOpen(true)} className="flex-1 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-700 transition-colors">
                                    Reserve Now
                                </button>
                            )}
                            <button type="button" onClick={toggleWishlist} className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-6 py-3.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                {wishlisted ? <HeartSolidIcon className="size-5 text-red-500" /> : <HeartIcon className="size-5" />}
                                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                            </button>
                        </div>

                        {/* Store info card */}
                        <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {product.vendor.logo ? (
                                        <img src={product.vendor.logo} alt={product.vendor.store_name} className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-700" />
                                    ) : (
                                        <div className="flex size-10 items-center justify-center rounded-full bg-primary-600/10 text-primary-600 font-bold">{product.vendor.store_name.charAt(0)}</div>
                                    )}
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{product.vendor.store_name}</p>
                                        <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                            <MapPinIcon className="size-3 shrink-0" />
                                            {vendorDistanceKm != null ? `${vendorDistanceKm} km away · ${product.vendor.city}` : product.vendor.city}
                                        </p>
                                    </div>
                                </div>
                                <Link href={`/stores/${product.vendor.slug}`} className="text-xs font-semibold text-primary-600 hover:text-primary-500">View Store</Link>
                            </div>
                            {product.vendor.address && (
                                <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <MapPinIcon className="mt-0.5 size-3.5 shrink-0" />
                                    <span>{product.vendor.address}</span>
                                </div>
                            )}
                            <div className="mt-3 flex gap-2">
                                {product.vendor.address && (
                                    <a href={`https://maps.google.com/?q=${encodeURIComponent(product.vendor.address)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                        Get Directions
                                    </a>
                                )}
                                {product.vendor.phone && (
                                    <a href={`tel:${product.vendor.phone}`} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                        Call
                                    </a>
                                )}
                                {product.vendor.whatsapp && (
                                    <a href={`https://wa.me/${product.vendor.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                                        WhatsApp
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs: Description / Details */}
                <section className="mt-16">
                    <TabGroup>
                        <TabList className="flex border-b border-gray-200 dark:border-gray-700">
                            <Tab className="border-b-2 border-transparent px-6 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400 transition-colors focus:outline-none data-[selected]:border-primary-600 data-[selected]:text-primary-600">
                                Description
                            </Tab>
                            <Tab className="border-b-2 border-transparent px-6 py-3 text-sm font-semibold text-gray-500 dark:text-gray-400 transition-colors focus:outline-none data-[selected]:border-primary-600 data-[selected]:text-primary-600">
                                Details
                            </Tab>
                        </TabList>
                        <TabPanels className="mt-8">
                            <TabPanel>
                                {product.description ? (
                                    <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No description available.</p>
                                )}
                            </TabPanel>
                            <TabPanel>
                                <dl className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {product.category && (
                                        <div className="flex justify-between py-3">
                                            <dt className="text-sm text-gray-500 dark:text-gray-400">Category</dt>
                                            <dd className="text-sm font-medium text-gray-900 dark:text-white">{product.category.name}</dd>
                                        </div>
                                    )}
                                    <div className="flex justify-between py-3">
                                        <dt className="text-sm text-gray-500 dark:text-gray-400">Gender</dt>
                                        <dd className="text-sm font-medium text-gray-900 dark:text-white capitalize">{product.gender}</dd>
                                    </div>
                                    {sizes.length > 0 && (
                                        <div className="flex justify-between py-3">
                                            <dt className="text-sm text-gray-500 dark:text-gray-400">Available Sizes</dt>
                                            <dd className="text-sm font-medium text-gray-900 dark:text-white">{sizes.join(', ')}</dd>
                                        </div>
                                    )}
                                    {colors.length > 0 && (
                                        <div className="flex justify-between py-3">
                                            <dt className="text-sm text-gray-500 dark:text-gray-400">Available Colors</dt>
                                            <dd className="text-sm font-medium text-gray-900 dark:text-white">{colors.map(c => c.name).join(', ')}</dd>
                                        </div>
                                    )}
                                </dl>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You May Also Like</h2>
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4">
                            {relatedProducts.slice(0, 8).map((rp) => (
                                <ProductCard key={rp.id} product={rp} showReserveButton={false} />
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <ReservationModal
                open={reserveOpen}
                onClose={() => setReserveOpen(false)}
                product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0]?.url,
                    store: product.vendor?.store_name,
                    vendor_id: product.vendor?.id,
                }}
            />

            {/* Fullscreen Lightbox */}
            {lightboxOpen && activeImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                    role="dialog"
                    aria-label="Image gallery"
                    tabIndex={0}
                    onClick={() => setLightboxOpen(false)}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') setLightboxOpen(false)
                        if (e.key === 'ArrowLeft') { const idx = product.images.findIndex(i => i.id === activeImage.id); if (idx > 0) setActiveImage(product.images[idx - 1]) }
                        if (e.key === 'ArrowRight') { const idx = product.images.findIndex(i => i.id === activeImage.id); if (idx < product.images.length - 1) setActiveImage(product.images[idx + 1]) }
                    }}
                    ref={(el) => el?.focus()}
                >
                    <button type="button" onClick={() => setLightboxOpen(false)} aria-label="Close gallery" className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </button>
                    <div className="flex items-center gap-4">
                        <button type="button" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); const idx = product.images.findIndex(i => i.id === activeImage.id); if (idx > 0) setActiveImage(product.images[idx - 1]) }} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
                            <ChevronLeftIcon className="size-6" />
                        </button>
                        <img src={activeImage.url} alt={activeImage.alt_text || product.name} className="max-h-[85vh] max-w-[85vw] object-contain" onClick={(e) => e.stopPropagation()} />
                        <button type="button" aria-label="Next image" onClick={(e) => { e.stopPropagation(); const idx = product.images.findIndex(i => i.id === activeImage.id); if (idx < product.images.length - 1) setActiveImage(product.images[idx + 1]) }} className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors">
                            <ChevronRightIcon className="size-6" />
                        </button>
                    </div>
                    <div className="absolute bottom-6 flex gap-2">
                        {product.images.map((img, i) => (
                            <button key={img.id} type="button" aria-label={`View image ${i + 1}`} onClick={(e) => { e.stopPropagation(); setActiveImage(img) }} className={cn('size-2 rounded-full transition-all', activeImage.id === img.id ? 'bg-primary-600 w-6' : 'bg-white/40 hover:bg-white/60')} />
                        ))}
                    </div>
                </div>
            )}
        </PublicLayout>
    )
}
