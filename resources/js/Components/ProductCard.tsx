import { Link, router, usePage } from '@inertiajs/react'
import { MapPinIcon, HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import type { SharedProps } from '@/types'

interface ProductCardProps {
    product: {
        id: number
        name: string
        slug: string
        price: number
        distance_km?: number | null
        primary_image?: { url: string; public_url?: string } | null
        vendor?: { store_name: string; slug: string } | null
    }
    wishlisted?: boolean
    onWishlistToggle?: (id: number) => void
    showReserveButton?: boolean
}

export default function ProductCard({ product, wishlisted = false, onWishlistToggle, showReserveButton = true }: ProductCardProps) {
    const { settings, auth } = usePage().props as unknown as SharedProps

    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!auth.user) {
            router.visit('/login')
            return
        }

        if (onWishlistToggle) {
            onWishlistToggle(product.id)
        }

        router.post('/customer/wishlist/toggle', { product_id: product.id }, {
            preserveState: true,
            preserveScroll: true,
            onError: () => {
                router.visit('/login')
            },
        })
    }

    return (
        <div className="group">
            <div className="relative overflow-hidden rounded-2xl">
                <Link href={`/products/${product.slug}`}>
                    <img
                        src={product.primary_image?.public_url || product.primary_image?.url || '/images/placeholder.jpg'}
                        alt={product.name}
                        className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </Link>
                {product.distance_km != null && (
                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2.5 py-1 backdrop-blur-sm">
                        <MapPinIcon className="size-3 text-primary-600" />
                        <span className="text-xs font-medium text-white">{Number(product.distance_km).toFixed(1)} km away</span>
                    </div>
                )}
                <button type="button" onClick={handleWishlistClick} aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'} className="absolute right-2 top-2 rounded-full bg-dark/60 p-1.5 backdrop-blur-sm transition-colors hover:bg-dark/80">
                    {wishlisted ? <HeartSolid className="size-4 text-red-500" /> : <HeartOutline className="size-4 text-white" />}
                </button>
                {showReserveButton && (
                    <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <Link href={`/products/${product.slug}`} className="block w-full rounded-md bg-primary-600 px-3 py-2 text-center text-xs font-semibold text-white shadow-lg hover:bg-primary-700">
                            Reserve
                        </Link>
                    </div>
                )}
            </div>
            <div className="mt-3">
                <Link href={`/products/${product.slug}`}>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors truncate">{product.name}</h3>
                </Link>
                {product.vendor && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.vendor.store_name}</p>}
                <p className="mt-1 text-sm font-bold text-primary-600">{formatPrice(product.price)}</p>
            </div>
        </div>
    )
}
