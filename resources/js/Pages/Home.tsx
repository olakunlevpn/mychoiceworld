import { Head, Link, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { useLocation } from '@/contexts/LocationContext'
import { useState, useEffect, useCallback } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/24/outline'
import type { Product, Vendor, EventType, Category, Review, SharedProps } from '@/types'

interface HeroSlideData {
    id: number
    heading: string
    description?: string
    cta_text: string
    cta_link: string
    background_image?: string
    background_image_url?: string
}

interface Props {
    heroSlides: HeroSlideData[]
    featuredProducts: (Product & { primary_image?: { url: string }; vendor?: { store_name: string; slug: string; city: string } })[]
    featuredVendors: (Vendor & { products_count: number })[]
    eventTypes: EventType[]
    categories: Category[]
    recentReviews: (Review & { customer?: { id: number; name: string; avatar?: string }; vendor?: { id: number; store_name: string } })[]
}

const staticStats = [
    { value: '200+', label: 'Local Boutiques', icon: <svg className="size-10 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" /></svg> },
    { value: '5K+', label: 'Unique Products', icon: <svg className="size-10 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg> },
    { value: '12K+', label: 'Happy Shoppers', icon: <svg className="size-10 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" /></svg> },
    { value: '98%', label: '5-Star Reviews', icon: <svg className="size-10 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg> },
]

const howItWorks = [
    { step: 1, title: 'Discover Nearby', description: 'Explore top-rated boutiques near your area.', icon: <svg className="size-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg> },
    { step: 2, title: 'Reserve Outfits', description: 'Reserve your favorite outfits online.', icon: <svg className="size-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" /></svg> },
    { step: 3, title: 'Visit & Try On', description: 'Visit the boutique to try them on before you buy.', icon: <svg className="size-6 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" /></svg> },
]


export default function Home({ heroSlides, featuredProducts, featuredVendors, eventTypes, categories, recentReviews }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const { city, coordinates, openModal } = useLocation()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [reviewPage, setReviewPage] = useState(0)
    const reviewsPerPage = 3
    const totalReviewPages = Math.ceil(recentReviews.length / reviewsPerPage)
    const visibleReviews = recentReviews.slice(reviewPage * reviewsPerPage, reviewPage * reviewsPerPage + reviewsPerPage)

    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    const nextSlide = useCallback(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), [])
    const prevSlide = useCallback(() => setCurrentSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length), [])

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000)
        return () => clearInterval(timer)
    }, [nextSlide])

    return (
        <PublicLayout>
            <Head title="Home" />

            {/* ── Hero Slider ────────────────────────────────────────── */}
            <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] overflow-hidden bg-gray-50 dark:bg-dark">
                {heroSlides.map((slide, index) => (
                    <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-[2]' : 'opacity-0 z-0'}`}>
                        {(slide.background_image_url || slide.background_image) && <img alt="" src={slide.background_image_url || slide.background_image} className="absolute inset-0 size-full object-cover" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/60" />
                        <div className="relative flex h-full items-center justify-center z-10" style={{ perspective: '800px' }}>
                            <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-white lg:text-6xl drop-shadow-lg">
                                    {slide.heading}
                                </h1>
                                <span className="mt-4 block h-0.5 w-24 bg-primary-600" />
                                {slide.description && <p className="mt-4 text-xl text-white/90 drop-shadow-md">{slide.description}</p>}
                                <Link href={slide.cta_link} className="mt-8 inline-block rounded-md bg-primary-600 px-8 py-3 text-base font-medium text-white hover:bg-primary-700">
                                    {slide.cta_text}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
                {/* Arrow controls */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white backdrop-blur-sm transition hover:bg-gray-300 dark:hover:bg-white/20 sm:size-12">
                    <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white backdrop-blur-sm transition hover:bg-gray-300 dark:hover:bg-white/20 sm:size-12">
                    <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </button>
                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-x-2.5">
                    {heroSlides.map((_, index) => (
                        <button key={index} onClick={() => setCurrentSlide(index)} className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-primary-600' : 'w-2 bg-black/30 dark:bg-white/40'}`} />
                    ))}
                </div>
            </div>

            {/* ── Stats Bar ──────────────────────────────────────────── */}
            <section className="bg-gray-50 dark:bg-dark">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-4 py-10 sm:grid-cols-4">
                        {staticStats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-8">
                                {stat.icon}
                                <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{stat.value}</p>
                                <p className="mt-2 text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Background image wrapper ────────────────────────── */}
            <div className="relative bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('${settings.homepage_background || '/images/styles/style-3.jpg'}')` }}>
                <div className="absolute inset-0 bg-gray-50/90 dark:bg-dark/90" />

                {/* Event Category Pills */}
                {eventTypes.length > 0 && (
                    <section className="relative py-8">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-wrap items-center justify-center gap-3">
                                {eventTypes.map((event) => (
                                    <Link key={event.id} href={`/products?event_type=${event.id}`} className="inline-flex items-center gap-x-2 rounded-full border border-gray-300 dark:border-gray-600 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-white hover:border-primary-600 hover:text-primary-600 transition-colors">
                                        {event.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Trending Near You */}
                {featuredProducts.length > 0 && (
                    <section className="relative py-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Trending Near You</h2>
                                <div className="flex items-center gap-x-3 text-sm text-gray-500 dark:text-gray-400">
                                    <MapPinIcon className="size-4 text-primary-600" />
                                    <span>Showing outfits near <strong className="text-primary-600">{city}</strong></span>
                                    <button type="button" onClick={openModal} className="font-medium text-primary-600 hover:text-primary-500">Change</button>
                                    <div className="flex gap-1 ml-2">
                                        {[2, 5, 10].map((km) => (
                                            <button key={km} type="button" onClick={() => { if (coordinates) router.reload({ data: { lat: coordinates.lat, lng: coordinates.lng, radius: km } }) }} className="rounded-md px-3 py-1 text-xs font-semibold transition-colors bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-primary-600 hover:text-white">
                                                {km} km
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 lg:grid-cols-4">
                                {featuredProducts.slice(0, 8).map((product) => {
                                    return (
                                        <div key={product.id} className="group">
                                            <div className="relative overflow-hidden rounded-2xl">
                                                <Link href={`/products/${product.slug}`}>
                                                    <img alt={product.name} src={product.primary_image?.url || '/images/placeholder.jpg'} className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                                </Link>
                                                {product.distance_km != null && (
                                                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2 py-1 backdrop-blur-sm">
                                                        <MapPinIcon className="size-3 text-primary-600" />
                                                        <span className="text-xs font-medium text-white">{Number(product.distance_km).toFixed(1)} km away</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-3">
                                                <Link href={`/products/${product.slug}`}>
                                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 transition-colors">{product.name}</h3>
                                                </Link>
                                                <div className="mt-1 flex items-center gap-1">
                                                    {[0, 1, 2, 3, 4].map((i) => (
                                                        <StarIcon key={i} className={`size-3.5 ${(product.vendor?.rating_avg ?? 0) > i ? 'text-yellow-400' : 'text-gray-600'}`} />
                                                    ))}
                                                </div>
                                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.vendor?.store_name}</p>
                                                {product.distance_km != null && <p className="text-xs text-gray-400">{Number(product.distance_km).toFixed(1)} km away</p>}
                                                <Link href={`/products/${product.slug}`} className="mt-2 block w-full rounded-md bg-primary-600 py-2 text-center text-sm font-semibold text-white hover:bg-primary-700">
                                                    Reserve
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Meet Your AI Stylist */}
                <section className="relative py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5">
                            <div className="flex flex-col items-center gap-6 px-6 py-6 sm:flex-row sm:px-12">
                                <img src="/images/styles/style-2.jpg" alt="AI Stylist" className="size-32 shrink-0 rounded-full object-cover" />
                                <div className="flex-1 text-center sm:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meet Your AI Stylist</h2>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Upload a selfie and discover outfits that match your style, skin tone, and event.</p>
                                </div>
                                <Link href="/find-my-match" className="inline-flex items-center gap-x-2 rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700">
                                    Try AI Stylist
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Top Boutiques Nearby */}
                {featuredVendors.length > 0 && (
                    <section className="relative py-16">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Top Boutiques Nearby</h2>
                            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                                {featuredVendors.slice(0, 3).map((vendor) => (
                                    <div key={vendor.id} className="relative overflow-hidden rounded-lg">
                                        {vendor.logo ? (
                                            <img alt={vendor.store_name} src={vendor.logo} className="aspect-[4/3] w-full object-cover" />
                                        ) : (
                                            <div className="flex aspect-[4/3] w-full items-center justify-center bg-primary-600/20 text-6xl font-bold text-primary-600">{vendor.store_name.charAt(0)}</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 p-4">
                                            <h3 className="text-base font-semibold text-white">{vendor.store_name}</h3>
                                            <div className="mt-1 flex items-center gap-x-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`size-3.5 ${i < Math.floor(vendor.rating_avg) ? 'text-yellow-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" /></svg>
                                                ))}
                                                <span className="ml-1 text-xs text-white/80">{vendor.rating_avg}</span>
                                            </div>
                                            <div className="mt-2 flex items-center justify-between text-xs text-white/70">
                                                <span className="flex items-center gap-1">
                                                    <MapPinIcon className="size-3" />
                                                    {vendor.distance_km != null ? `${Number(vendor.distance_km).toFixed(1)} km away` : vendor.city}
                                                </span>
                                                <span>{vendor.products_count} Products</span>
                                            </div>
                                            <Link href={`/stores/${vendor.slug}`} className="mt-3 block w-full rounded-md bg-primary-600 py-2 text-center text-sm font-semibold text-white hover:bg-primary-700 transition-colors">
                                                View Store
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* How It Works */}
                <section className="relative py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">How {settings.site_name} Works</h2>
                        </div>
                        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
                            {howItWorks.map((item) => (
                                <div key={item.step} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-6 pb-8 pt-10 text-center">
                                    <div className="mx-auto flex size-12 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700">{item.icon}</div>
                                    <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vendor CTA */}
                <section className="relative py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-2xl bg-primary-600 px-6 py-16 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">
                            <div>
                                <span className="inline-flex items-center rounded-full bg-dark/20 px-3 py-1 text-xs font-medium text-white">For Sellers</span>
                                <h2 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">Got a boutique?<br />Start selling today.</h2>
                                <p className="mt-3 text-sm text-white/80">Join 200+ vendors reaching thousands of customers in your city. Setup takes less than 5 minutes.</p>
                                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
                                    {['Zero Listing Fees', 'Instant Payouts', 'Analytics Dashboard', '24/7 Support'].map((item) => (
                                        <span key={item} className="flex items-center gap-x-1">
                                            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-8 lg:mt-0 lg:shrink-0">
                                <Link href="/vendor/register" className="inline-flex items-center gap-x-2 rounded-md border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-primary-600">
                                    Become a Vendor
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </div>{/* End background image wrapper */}

            {/* ── Reviews ────────────────────────────────────────────── */}
            {recentReviews.length > 0 && <section className="bg-gray-100 dark:bg-gray-900/60 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="inline-flex items-center rounded-full border border-primary-600 px-4 py-1.5 text-xs font-medium text-primary-600">Reviews</span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Loved by Shoppers</h2>
                        <p className="mt-4 text-base text-gray-500 dark:text-gray-400">See what our community has to say about their experience</p>
                    </div>
                    <div className="relative mt-12">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                            {visibleReviews.map((review) => (
                                <div key={review.id} className="relative rounded-2xl bg-white dark:bg-white/5 p-8">
                                    <svg className="absolute top-6 right-6 size-8 text-primary-600/20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" /></svg>
                                    <div className="flex items-center gap-x-1">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg key={i} className="size-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" /></svg>
                                        ))}
                                    </div>
                                    <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-300">"{review.comment}"</p>
                                    <div className="mt-8 flex items-center gap-x-4 border-t border-gray-200 dark:border-white/10 pt-6">
                                        {review.customer?.avatar ? (
                                            <img src={review.customer.avatar} alt={review.customer.name} className="size-11 rounded-full object-cover" />
                                        ) : (
                                            <div className="flex size-11 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">{review.customer?.name?.charAt(0) || '?'}</div>
                                        )}
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.customer?.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Verified Buyer{review.vendor ? ` · ${review.vendor.store_name}` : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Review slider controls */}
                        <div className="mt-10 flex items-center justify-center gap-x-4">
                            <button onClick={() => setReviewPage(Math.max(0, reviewPage - 1))} disabled={reviewPage === 0} className="flex size-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed">
                                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
                            </button>
                            <div className="flex gap-x-2">
                                {Array.from({ length: totalReviewPages }).map((_, i) => (
                                    <button key={i} onClick={() => setReviewPage(i)} className={`h-2 rounded-full transition-all duration-300 ${i === reviewPage ? 'w-8 bg-primary-600' : 'w-2 bg-gray-400/40 dark:bg-white/30'}`} />
                                ))}
                            </div>
                            <button onClick={() => setReviewPage(Math.min(totalReviewPages - 1, reviewPage + 1))} disabled={reviewPage === totalReviewPages - 1} className="flex size-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition hover:bg-gray-200 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed">
                                <svg className="size-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>}
        </PublicLayout>
    )
}
