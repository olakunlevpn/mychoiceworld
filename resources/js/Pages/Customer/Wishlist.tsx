import { Head, Link, router, usePage } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { HeartIcon } from '@heroicons/react/24/solid'
import type { Wishlist, Product, ProductImage, PaginatedResponse, SharedProps } from '@/types'

interface Props {
    wishlists: PaginatedResponse<Wishlist & { product: Product & { primary_image?: ProductImage; vendor?: { store_name: string; slug: string }; category?: { id: number; name: string } } }>
}

export default function WishlistPage({ wishlists }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    const removeFromWishlist = (productId: number) => {
        router.post('/customer/wishlist/toggle', { product_id: productId }, { preserveState: true, preserveScroll: true })
    }

    return (
        <CustomerLayout>
            <Head title="My Wishlist" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>

                {wishlists.data.length === 0 ? (
                    <div className="py-16 text-center">
                        <HeartIcon className="mx-auto size-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Your wishlist is empty</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Save products you love and come back to them later.</p>
                        <Link href="/products" className="mt-6 inline-flex items-center rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">Browse Products</Link>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlists.data.map((item) => (
                            <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 transition-shadow hover:shadow-lg">
                                <div className="relative overflow-hidden">
                                    <Link href={`/products/${item.product.slug}`}>
                                        <img src={item.product.primary_image?.url || '/images/placeholder.jpg'} alt={item.product.name} className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                    </Link>
                                    <button type="button" onClick={() => removeFromWishlist(item.product.id)} className="absolute right-2 top-2 rounded-full bg-dark/60 p-1.5 backdrop-blur-sm hover:bg-dark/80">
                                        <HeartIcon className="size-4 text-red-500" />
                                    </button>
                                </div>
                                <div className="p-3">
                                    <Link href={`/products/${item.product.slug}`}>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 truncate">{item.product.name}</h3>
                                    </Link>
                                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{item.product.vendor?.store_name}</p>
                                    <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">{formatPrice(item.product.price)}</p>
                                    {item.product.status === 'out_of_stock' && (
                                        <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-400">
                                            <span className="size-1.5 rounded-full bg-red-500" />
                                            Out of stock
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {wishlists.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        {wishlists.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} preserveState preserveScroll className={`rounded-md px-3 py-2 text-sm font-medium ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300 cursor-not-allowed'}`} >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                        ))}
                    </div>
                )}
            </div>
        </CustomerLayout>
    )
}
