// @ts-nocheck
import { Link } from 'react-router-dom'
import { MapPinIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

interface ProductCardProps {
  id: number
  name: string
  slug: string
  price: string
  store?: string
  distance?: string
  imageSrc: string
  wishlisted?: boolean
  onToggleWishlist?: (id: number) => void
  onReserve?: (id: number) => void
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  store,
  distance,
  imageSrc,
  wishlisted = false,
  onToggleWishlist,
  onReserve,
}: ProductCardProps) {
  return (
    <div className="group relative">
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
        <Link to={`/products/${slug}`}>
          <img
            src={imageSrc}
            alt={name}
            className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Distance badge */}
        {distance && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2 py-1 backdrop-blur-sm">
            <MapPinIcon className="size-3 text-primary-600" />
            <span className="text-xs font-medium text-gray-900 dark:text-white">{distance}</span>
          </div>
        )}

        {/* Wishlist button */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={() => onToggleWishlist(id)}
            className="absolute right-2 top-2 rounded-full bg-dark/60 p-1.5 backdrop-blur-sm transition-colors hover:bg-dark/80"
          >
            {wishlisted ? (
              <HeartSolidIcon className="size-4 text-red-500" />
            ) : (
              <HeartIcon className="size-4 text-white" />
            )}
          </button>
        )}

        {/* Reserve button on hover */}
        {onReserve && (
          <div className="absolute inset-x-2 bottom-2 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => onReserve(id)}
              className="w-full rounded-md bg-primary-600 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-primary-700"
            >
              Reserve
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3">
        <Link to={`/products/${slug}`}>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </Link>
        {store && <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{store}</p>}
        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{price}</p>
      </div>
    </div>
  )
}
