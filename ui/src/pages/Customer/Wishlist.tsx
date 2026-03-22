// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeartIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import ReservationModal from '../../components/ReservationModal'

const initialProducts = [
  {
    id: 1,
    name: 'Elegant Evening Gown',
    slug: 'elegant-evening-gown',
    price: '$289',
    store: 'Luxe Boutique',
    distance: '2.3 km',
    imageSrc: 'https://picsum.photos/seed/wish1/600/800',
  },
  {
    id: 2,
    name: 'Classic Navy Suit',
    slug: 'classic-navy-suit',
    price: '$450',
    store: "The Gentleman's Store",
    distance: '3.1 km',
    imageSrc: 'https://picsum.photos/seed/wish2/600/800',
  },
  {
    id: 3,
    name: 'Pearl Drop Earrings',
    slug: 'pearl-drop-earrings',
    price: '$85',
    store: 'Golden Hour Jewelry',
    distance: '0.8 km',
    imageSrc: 'https://picsum.photos/seed/wish3/600/800',
  },
  {
    id: 4,
    name: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    price: '$120',
    store: 'Artisan Leather Co.',
    distance: '4.5 km',
    imageSrc: 'https://picsum.photos/seed/wish4/600/800',
  },
  {
    id: 5,
    name: 'Silk Cocktail Dress',
    slug: 'silk-cocktail-dress',
    price: '$320',
    store: 'Luxe Boutique',
    distance: '2.3 km',
    imageSrc: 'https://picsum.photos/seed/wish5/600/800',
  },
  {
    id: 6,
    name: 'Bohemian Maxi Dress',
    slug: 'bohemian-maxi-dress',
    price: '$175',
    store: 'Free Spirit Fashion',
    distance: '1.8 km',
    imageSrc: 'https://picsum.photos/seed/wish6/600/800',
  },
]

export default function Wishlist() {
  const [products, setProducts] = useState(initialProducts)
  const [reserveModalOpen, setReserveModalOpen] = useState(false)
  const [reservingProduct, setReservingProduct] = useState(null)

  const removeFromWishlist = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">My Wishlist</h1>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                {products.length} {products.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
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
                  <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/80 dark:bg-dark/80 px-2 py-1 backdrop-blur-sm">
                    <MapPinIcon className="size-3 text-primary-600" />
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{product.distance}</span>
                  </div>

                  {/* Remove from wishlist */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute right-2 top-2 rounded-full bg-white/60 dark:bg-dark/60 p-1.5 backdrop-blur-sm transition-colors hover:bg-white/80 dark:hover:bg-dark/80"
                  >
                    <HeartSolidIcon className="size-4 text-red-500" />
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
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <HeartIcon className="size-20 text-gray-600" />
            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">Your wishlist is empty</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Start exploring to save items you love</p>
            <Link
              to="/discover"
              className="mt-8 rounded-md bg-primary-600 px-8 py-3 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Discover Products
            </Link>
          </div>
        )}

        <div className="pb-24" />
      </div>
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
