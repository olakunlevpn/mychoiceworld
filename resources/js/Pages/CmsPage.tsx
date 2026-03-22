import { Head, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import DOMPurify from 'dompurify'
import type { SharedProps } from '@/types'

interface Props {
    page: {
        id: number
        title: string
        slug: string
        body: string
        excerpt?: string
        cover_image?: string
        meta_title?: string
        meta_description?: string
    }
}

export default function CmsPage({ page }: Props) {
    return (
        <PublicLayout>
            <Head title={page.meta_title || page.title} />

            {page.cover_image && (
                <div className="h-48 w-full overflow-hidden sm:h-64">
                    <img src={page.cover_image} alt={page.title} className="size-full object-cover" />
                </div>
            )}

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{page.title}</h1>
                {page.excerpt && <p className="mt-2 text-gray-500 dark:text-gray-400">{page.excerpt}</p>}
                <div
                    className="mt-8 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.body) }}
                />
            </div>
        </PublicLayout>
    )
}
