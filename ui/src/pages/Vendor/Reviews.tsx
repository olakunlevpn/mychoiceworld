// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline'
import Pagination from '../../components/Pagination'

const ratingDistribution = [
  { stars: 5, percentage: 80, count: 102 },
  { stars: 4, percentage: 12, count: 15 },
  { stars: 3, percentage: 5, count: 6 },
  { stars: 2, percentage: 2, count: 3 },
  { stars: 1, percentage: 1, count: 1 },
]

const initialReviews = [
  {
    id: 1,
    reviewer: 'Sarah Mitchell',
    date: 'Mar 12, 2026',
    rating: 5,
    product: 'Elegant Evening Gown',
    productLink: '/products/elegant-evening-gown',
    reservationCode: 'RSV-2024-008',
    text: 'Absolutely stunning gown! The fabric quality is incredible and it fits perfectly. I received so many compliments at the gala. Will definitely be coming back for more.',
    reply: 'Thank you so much, Sarah! We\'re thrilled you loved the gown. It was a pleasure helping you find the perfect piece for your event!',
  },
  {
    id: 2,
    reviewer: 'James Kowalski',
    date: 'Mar 11, 2026',
    rating: 5,
    product: 'Classic Navy Suit',
    productLink: '/products/classic-navy-suit',
    reservationCode: 'RSV-2024-012',
    text: 'Perfect tailoring and premium materials. The suit looks even better in person than in the photos. Great customer service as well.',
    reply: null,
  },
  {
    id: 3,
    reviewer: 'Olivia Reyes',
    date: 'Mar 10, 2026',
    rating: 4,
    product: 'Pearl Drop Earrings',
    productLink: '/products/pearl-drop-earrings',
    reservationCode: 'RSV-2024-015',
    text: 'Beautiful earrings with a lovely sheen. Packaging was elegant too. Only reason for 4 stars is the clasp feels slightly loose, but overall very happy.',
    reply: 'Hi Olivia, thank you for your feedback! We\'re glad you love the earrings. Please don\'t hesitate to visit us if you\'d like us to tighten the clasp for you — it\'s on the house!',
  },
  {
    id: 4,
    reviewer: 'Daniel Park',
    date: 'Mar 8, 2026',
    rating: 5,
    product: 'Silk Cocktail Dress',
    productLink: '/products/silk-cocktail-dress',
    reservationCode: 'RSV-2024-018',
    text: 'My wife loved this dress. The silk quality is top notch and the color is exactly as shown. Fast reservation process too.',
    reply: null,
  },
  {
    id: 5,
    reviewer: 'Emma Thompson',
    date: 'Mar 5, 2026',
    rating: 3,
    product: 'Cashmere Wrap Scarf',
    productLink: '/products/cashmere-wrap-scarf',
    reservationCode: 'RSV-2024-022',
    text: 'The scarf is nice but I expected it to be a bit thicker for the price. The color is beautiful though and it\'s very soft.',
    reply: null,
  },
  {
    id: 6,
    reviewer: 'Michael Chen',
    date: 'Mar 3, 2026',
    rating: 4,
    product: 'Leather Weekend Bag',
    productLink: '/products/leather-weekend-bag',
    reservationCode: 'RSV-2024-025',
    text: 'Great quality leather bag with excellent stitching. Spacious enough for a weekend trip. The only downside is the strap could be slightly more padded for comfort.',
    reply: 'Thank you for the review, Michael! We appreciate the detailed feedback. We\'re actually working on an updated strap design based on feedback like yours.',
  },
  {
    id: 7,
    reviewer: 'Amara Osei',
    date: 'Feb 28, 2026',
    rating: 5,
    product: 'Gold Chain Necklace',
    productLink: '/products/gold-chain-necklace',
    reservationCode: 'RSV-2024-029',
    text: 'Gorgeous necklace with a rich, warm tone. It layers beautifully with other pieces and the clasp is very secure. Arrived in a lovely gift box too.',
    reply: 'Thank you, Amara! We\'re so glad the necklace exceeded your expectations. It\'s one of our personal favourites as well!',
  },
  {
    id: 8,
    reviewer: 'Liam O\'Brien',
    date: 'Feb 25, 2026',
    rating: 2,
    product: 'Wool Overcoat',
    productLink: '/products/wool-overcoat',
    reservationCode: 'RSV-2024-031',
    text: 'The coat looks great but the sizing runs quite small. I ordered my usual size and it was tight around the shoulders. Had to return it unfortunately.',
    reply: null,
  },
  {
    id: 9,
    reviewer: 'Priya Sharma',
    date: 'Feb 20, 2026',
    rating: 4,
    product: 'Embroidered Clutch Bag',
    productLink: '/products/embroidered-clutch-bag',
    reservationCode: 'RSV-2024-034',
    text: 'Stunning craftsmanship on the embroidery. The colours are vibrant and it holds just the right amount for a night out. Wish it came in more colour options.',
    reply: 'Hi Priya, thank you for your kind words! We\'re excited to share that two new colour options will be available next month. Stay tuned!',
  },
  {
    id: 10,
    reviewer: 'Carlos Mendez',
    date: 'Feb 15, 2026',
    rating: 1,
    product: 'Linen Summer Shirt',
    productLink: '/products/linen-summer-shirt',
    reservationCode: 'RSV-2024-037',
    text: 'Very disappointed. The shirt arrived with a visible stain on the front and a loose button. Expected much better quality control for the price point.',
    reply: null,
  },
]

const ratingFilters = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star']
const replyFilters = ['All', 'Replied', 'Not Replied']

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= rating ? (
          <StarIcon key={star} className="size-4 text-yellow-400" />
        ) : (
          <StarOutlineIcon key={star} className="size-4 text-gray-600" />
        )
      )}
    </div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews)
  const [ratingFilter, setRatingFilter] = useState('All')
  const [replyFilter, setReplyFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [editingReply, setEditingReply] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')

  const filteredReviews = reviews.filter((review) => {
    if (ratingFilter !== 'All') {
      const stars = parseInt(ratingFilter)
      if (review.rating !== stars) return false
    }
    if (replyFilter === 'Replied' && !review.reply) return false
    if (replyFilter === 'Not Replied' && review.reply) return false
    return true
  })

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSubmitReply = (reviewId: number) => {
    if (!replyText.trim()) return
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, reply: replyText } : r))
    )
    setReplyingTo(null)
    setEditingReply(null)
    setReplyText('')
  }

  const handleEditReply = (review: typeof initialReviews[0]) => {
    setEditingReply(review.id)
    setReplyText(review.reply || '')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 pt-16 sm:pt-24">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Reviews</h1>
            <div className="flex items-center gap-1.5">
              <StarIcon className="size-6 text-yellow-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">4.8</span>
            </div>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="text-center sm:text-left">
              <p className="text-5xl font-bold text-gray-900 dark:text-white">4.8</p>
              <Stars rating={5} />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">127 reviews</p>
            </div>
            <div className="flex-1 space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-14 text-right text-sm text-gray-500 dark:text-gray-400">
                    {item.stars} star
                  </span>
                  <div className="flex-1">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className="h-full rounded-full bg-yellow-400"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-8 text-right text-xs text-gray-400 dark:text-gray-500">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {ratingFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => { setRatingFilter(filter); setCurrentPage(1) }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  ratingFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {replyFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => { setReplyFilter(filter); setCurrentPage(1) }}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  replyFilter === filter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Review List */}
        <div className="mt-6 space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <StarOutlineIcon className="size-16 text-gray-600" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No reviews yet</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
                Reviews will appear here once customers complete reservations and leave feedback.
              </p>
            </div>
          ) : null}
          {paginatedReviews.map((review) => (
            <div key={review.id} className="rounded-xl bg-white dark:bg-gray-900 p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-600/20 text-sm font-semibold text-primary-600">
                    {getInitials(review.reviewer)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.reviewer}</p>
                    <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">{review.date}</p>
                  </div>
                </div>
                <Stars rating={review.rating} />
              </div>

              {/* Product Link */}
              <div className="mt-2 flex items-center gap-1.5">
                <Link
                  to={review.productLink}
                  className="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  {review.product}
                </Link>
                <span className="text-xs text-gray-400 dark:text-gray-500">&middot;</span>
                <Link
                  to={`/vendor/reservations/${review.reservationCode}`}
                  className="text-xs text-gray-400 dark:text-gray-500 hover:text-primary-600"
                >
                  {review.reservationCode}
                </Link>
              </div>

              {/* Review Text */}
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{review.text}</p>

              {/* Reply Section */}
              {review.reply && editingReply !== review.id ? (
                <div className="mt-4 rounded-lg bg-gray-100 dark:bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      You replied:
                    </p>
                    <button
                      type="button"
                      onClick={() => handleEditReply(review)}
                      className="text-xs font-medium text-primary-600 hover:text-primary-500"
                    >
                      Edit Reply
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{review.reply}</p>
                </div>
              ) : replyingTo === review.id || editingReply === review.id ? (
                <div className="mt-4 space-y-3">
                  <div>
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      maxLength={1000}
                      placeholder="Write your reply..."
                      className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                    />
                    <p className={`mt-1 text-right text-xs ${replyText.length > 1000 ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
                      {replyText.length} / 1000
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleSubmitReply(review.id)}
                      className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                    >
                      Submit Reply
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReplyingTo(null)
                        setEditingReply(null)
                        setReplyText('')
                      }}
                      className="rounded-md bg-gray-100 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setReplyingTo(review.id)}
                  className="mt-4 text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Reply
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredReviews.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
