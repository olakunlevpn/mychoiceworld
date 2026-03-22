import { Head, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { HelpCategory, HelpArticle } from '@/types'

interface Props {
    category: HelpCategory
    articles: HelpArticle[]
}

export default function HelpCategoryPage({ category, articles }: Props) {
    return (
        <PublicLayout>
            <Head title={category.title} />
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <Link href="/help" className="text-sm text-primary-600 hover:text-primary-500">&larr; Help Center</Link>
                <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{category.title}</h1>
                {category.description && <p className="mt-2 text-gray-500 dark:text-gray-400">{category.description}</p>}
                <div className="mt-8 divide-y divide-gray-200 dark:divide-gray-700">
                    {articles.map((article) => (
                        <Link key={article.id} href={`/help/articles/${article.slug}`} className="block py-4 group">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-primary-600">{article.title}</h3>
                            {article.excerpt && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{article.excerpt}</p>}
                            {article.read_time && <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">{article.read_time} read</p>}
                        </Link>
                    ))}
                    {articles.length === 0 && <p className="py-8 text-center text-sm text-gray-500">No articles in this category yet.</p>}
                </div>
            </div>
        </PublicLayout>
    )
}
