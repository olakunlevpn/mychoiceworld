// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import Pagination from '../../components/Pagination'

const myReviews = [
  {
    id: 1,
    product: 'Elegant Evening Gown',
    productSlug: 'elegant-evening-gown',
    store: 'Luxe Boutique',
    storeSlug: 'luxe-boutique',
    image: 'https://picsum.photos/seed/rev-p1/300/400',
    rating: 5,
    date: 'Mar 12, 2026',
    text: 'Absolutely stunning gown! The fabric quality is incredible and it fits perfectly. I received so many compliments at the gala. Will definitely be coming back for more.',
    vendorReply: 'Thank you so much! We\'re thrilled you loved the gown. It was a pleasure helping you find the perfect piece for your event!',
  },
  {
    id: 2,
    product: 'Classic Navy Suit',
    productSlug: 'classic-navy-suit',
    store: 'Luxe Boutique',
    storeSlug: 'luxe-boutique',
    image: 'https://picsum.photos/seed/rev-p2/300/400',
    rating: 4,
    date: 'Feb 28, 2026',
    text: 'Great quality suit with excellent tailoring. The fabric feels premium and the fit is spot on. Only minor issue was the delivery took a day longer than expected.',
    vendorReply: 'Thank you for the review! We apologize for the slight delay and are working to improve our pickup process.',
  },
  {
    id: 3,
    product: 'Pearl Drop Earrings',
    productSlug: 'pearl-drop-earrings',
    store: 'Golden Hour Jewelry',
    storeSlug: 'golden-hour-jewelry',
    image: 'https://picsum.photos/seed/rev-p3/300/400',
    rating: 5,
    date: 'Feb 15, 2026',
    text: 'Beautiful earrings with a lovely sheen. The packaging was elegant too — felt like a real luxury experience from start to finish.',
    vendorReply: null,
  },
  {
    id: 4,
    product: 'Cashmere Wrap Scarf',
    productSlug: 'cashmere-wrap-scarf',
    store: 'The Gentleman\'s Store',
    storeSlug: 'the-gentlemans-store',
    image: 'https://picsum.photos/seed/rev-p4/300/400',
    rating: 3,
    date: 'Jan 20, 2026',
    text: 'The scarf is nice but I expected it to be a bit thicker for the price. The color is beautiful though and it\'s very soft.',
    vendorReply: 'Hi! Thank you for the honest feedback. We offer a thicker cashmere blend option that might be more to your liking — feel free to check it out on your next visit!',
  },
  {
    id: 5,
    product: 'Silk Cocktail Dress',
    productSlug: 'silk-cocktail-dress',
    store: 'Luxe Boutique',
    storeSlug: 'luxe-boutique',
    image: 'https://picsum.photos/seed/rev-p5/300/400',
    rating: 5,
    date: 'Jan 5, 2026',
    text: 'Perfect dress for date night. The silk quality is amazing and the color was exactly as shown. The reservation process was quick and easy.',
    vendorReply: null,
  },
  {
    id: 6,
    product: 'Leather Crossbody Bag',
    productSlug: 'leather-crossbody-bag',
    store: 'Urban Luxe',
    storeSlug: 'urban-luxe',
    image: 'https://picsum.photos/seed/rev-p6/300/400',
    rating: 4,
    date: 'Dec 22, 2025',
    text: 'Great everyday bag with a premium feel. The stitching is solid and it holds more than expected. Colour was slightly darker than the photo but still lovely.',
    vendorReply: 'Thanks for the kind words! We\'ve updated the product photos to better represent the true colour. Enjoy the bag!',
  },
  {
    id: 7,
    product: 'Diamond Tennis Bracelet',
    productSlug: 'diamond-tennis-bracelet',
    store: 'Golden Hour Jewelry',
    storeSlug: 'golden-hour-jewelry',
    image: 'https://picsum.photos/seed/rev-p7/300/400',
    rating: 5,
    date: 'Dec 10, 2025',
    text: 'Absolutely breathtaking bracelet. The sparkle catches light beautifully and the clasp is very secure. Arrived in a gorgeous gift box too.',
    vendorReply: null,
  },
  {
    id: 8,
    product: 'Merino Wool Blazer',
    productSlug: 'merino-wool-blazer',
    store: 'The Gentleman\'s Store',
    storeSlug: 'the-gentlemans-store',
    image: 'https://picsum.photos/seed/rev-p8/300/400',
    rating: 2,
    date: 'Nov 30, 2025',
    text: 'The blazer looks good but the sizing runs quite small. I had to exchange it for a larger size which took extra time. Material quality is decent though.',
    vendorReply: 'We\'re sorry about the sizing issue. We\'ve added more detailed size charts to help future customers. Thank you for the feedback!',
  },
  {
    id: 9,
    product: 'Rose Gold Watch',
    productSlug: 'rose-gold-watch',
    store: 'Timecraft Co.',
    storeSlug: 'timecraft-co',
    image: 'https://picsum.photos/seed/rev-p9/300/400',
    rating: 4,
    date: 'Nov 15, 2025',
    text: 'Elegant watch with a comfortable band. Keeps perfect time and the rose gold finish is very classy. Would have liked a slightly larger face option.',
    vendorReply: null,
  },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <StarIcon key={star} className="size-4 text-primary-600" />
        ) : (
          <StarOutlineIcon key={star} className="size-4 text-gray-600" />
        )
      )}
    </div>
  )
}

export default function CustomerReviews() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const paginatedReviews = myReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="pb-6 pt-16 sm:pt-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">My Reviews</h1>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
            All reviews you&apos;ve submitted across different stores
          </p>
        </div>

        {myReviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <StarOutlineIcon className="size-16 text-gray-600" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No reviews yet</h3>
            <p className="mt-2 max-w-sm text-center text-sm text-gray-500 dark:text-gray-400">
              Once you complete a reservation and leave feedback, your reviews will appear here.
            </p>
            <Link
              to="/discover"
              className="mt-6 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedReviews.map((review) => (
              <div key={review.id} className="rounded-xl bg-white dark:bg-gray-900 p-5">
                {/* Product info */}
                <div className="flex gap-4">
                  <Link to={`/products/${review.productSlug}`} className="shrink-0">
                    <img
                      src={review.image}
                      alt={review.product}
                      className="size-20 rounded-lg object-cover"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          to={`/products/${review.productSlug}`}
                          className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 transition-colors"
                        >
                          {review.product}
                        </Link>
                        <p className="mt-0.5">
                          <Link
                            to={`/stores/${review.storeSlug}`}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-600 transition-colors"
                          >
                            {review.store}
                          </Link>
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">{review.date}</span>
                    </div>
                    <div className="mt-2">
                      <Stars rating={review.rating} />
                    </div>
                  </div>
                </div>

                {/* Review text */}
                <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{review.text}</p>

                {/* Vendor reply */}
                {review.vendorReply && (
                  <div className="mt-4 rounded-lg bg-gray-100 dark:bg-white/5 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">{review.store}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">replied</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{review.vendorReply}</p>
                  </div>
                )}

                {/* Link to product review section */}
                <div className="mt-3">
                  <Link
                    to={`/products/${review.productSlug}`}
                    className="text-xs font-medium text-primary-600 hover:text-primary-500"
                  >
                    View on product page
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalItems={myReviews.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
