import { Head, Link, usePage } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { SparklesIcon, MapPinIcon } from '@heroicons/react/24/outline'
import type { SharedProps } from '@/types'

interface MatchResult {
    id: number
    match_score: number
    color_match_score: number
    distance_km: number
    rank_position: number
    product: {
        id: number; name: string; slug: string; price: number
        primary_color?: string; primary_color_hex?: string
        primary_image?: { url: string }
        vendor?: { id: number; store_name: string; slug: string; city: string }
    }
}

interface AiSession {
    id: number
    session_token: string
    results_count: number
    skin_tone?: string
    recommended_colors?: string[]
    event_type?: { id: number; name: string }
    style_preference?: { id: number; name: string }
    results: MatchResult[]
}

interface Props {
    session: AiSession
}

export default function AiMatchResults({ session }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    return (
        <CustomerLayout>
            <Head title="Your Matches" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="text-center">
                    <SparklesIcon className="mx-auto size-10 text-primary-600" />
                    <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Your Matches</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{session.results_count} outfits matched to your preferences</p>
                </div>

                {/* Preference pills */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    {session.event_type && <span className="rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">{session.event_type.name}</span>}
                    {session.style_preference && <span className="rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">{session.style_preference.name}</span>}
                    {session.skin_tone && <span className="rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">Skin tone: {session.skin_tone}</span>}
                </div>

                {/* Color palette */}
                {session.recommended_colors && session.recommended_colors.length > 0 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="text-xs text-gray-400">Recommended colors:</span>
                        {session.recommended_colors.map((color, i) => (
                            <span key={i} className="size-6 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: color }} />
                        ))}
                    </div>
                )}

                {/* Results grid */}
                <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                    {session.results.map((result) => (
                        <Link key={result.id} href={`/products/${result.product.slug}`} className="group relative">
                            <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                                <img src={result.product.primary_image?.url || '/images/placeholder.jpg'} alt={result.product.name} className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                                <div className="absolute right-2 top-2 rounded-full bg-primary-600 px-2.5 py-1">
                                    <span className="text-xs font-bold text-white">{Math.round(result.match_score)}%</span>
                                </div>
                                {result.distance_km > 0 && (
                                    <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2 py-1 backdrop-blur-sm">
                                        <MapPinIcon className="size-3 text-primary-600" />
                                        <span className="text-xs font-medium text-white">{result.distance_km.toFixed(1)} km</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-3">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 truncate">{result.product.name}</h3>
                                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{result.product.vendor?.store_name}</p>
                                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{formatPrice(result.product.price)}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {session.results.length === 0 && (
                    <div className="mt-16 text-center">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">No matches found</p>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Try adjusting your preferences or increasing your search radius.</p>
                        <Link href="/find-my-match" className="mt-6 inline-flex items-center rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">Try Again</Link>
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link href="/find-my-match" className="text-sm font-medium text-primary-600 hover:text-primary-500">Start a new match</Link>
                </div>
            </div>
        </CustomerLayout>
    )
}
