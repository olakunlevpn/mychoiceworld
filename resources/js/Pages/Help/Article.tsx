import { Head, Link } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import DOMPurify from 'dompurify'
import type { HelpArticle, HelpCategory } from '@/types'

interface Props {
    article: HelpArticle & { category: HelpCategory }
}

export default function HelpArticlePage({ article }: Props) {
    return (
        <PublicLayout>
            <Head title={article.title} />
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/help" className="hover:text-primary-600">Help Center</Link>
                    <span>/</span>
                    <Link href={`/help/category/${article.category.slug}`} className="hover:text-primary-600">{article.category.title}</Link>
                </div>
                <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{article.title}</h1>
                {article.read_time && <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">{article.read_time} read</p>}
                <div className="mt-8 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
            </div>
        </PublicLayout>
    )
}
