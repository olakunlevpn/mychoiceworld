import { Head, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { HelpCategory } from '@/types'

interface Props {
    categories: (HelpCategory & { articles_count: number })[]
}

export default function HelpIndex({ categories }: Props) {
    return (
        <PublicLayout>
            <Head title="Help Center" />
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Help Center</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Find answers and learn how to use our platform.</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((cat) => (
                        <Link key={cat.id} href={`/help/category/${cat.slug}`} className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 transition-shadow hover:shadow-lg">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600">{cat.title}</h3>
                            {cat.description && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{cat.description}</p>}
                            <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">{cat.articles_count} articles</p>
                        </Link>
                    ))}
                </div>
                {categories.length === 0 && (
                    <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">No help categories available yet.</p>
                )}
            </div>
        </PublicLayout>
    )
}
