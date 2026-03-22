// @ts-nocheck
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import { getArticleBySlug, getCategoryBySlug, getRelatedArticles } from '../data/helpData'

function renderContent(block: string) {
  // Simple markdown-like rendering for ## headings and paragraphs
  if (block.startsWith('## ')) {
    const heading = block.replace('## ', '')
    const parts = heading.split('\n\n')
    return (
      <div>
        <h2 className="mt-8 text-lg font-semibold text-gray-900 dark:text-white">{parts[0]}</h2>
        {parts.slice(1).map((p, i) => (
          <p key={i} className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{p}</p>
        ))}
      </div>
    )
  }
  return <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{block}</p>
}

export default function HelpArticle() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug!)

  if (!article) {
    return (
      <div className="bg-gray-50 dark:bg-dark">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Article not found</h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">The help article you're looking for doesn't exist.</p>
          <Link to="/help" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-500">
            <ArrowLeftIcon className="size-4" />
            Back to Help Center
          </Link>
        </div>
      </div>
    )
  }

  const category = getCategoryBySlug(article.category)
  const relatedArticles = getRelatedArticles(article, 3)

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link to="/help" className="hover:text-primary-600 transition-colors">Help Center</Link>
            </li>
            <li>/</li>
            <li>
              <Link to={`/help/category/${article.category}`} className="hover:text-primary-600 transition-colors">
                {category?.title}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium line-clamp-1">{article.title}</li>
          </ol>
        </nav>

        {/* Article Header */}
        <div>
          <Link
            to={`/help/category/${article.category}`}
            className="inline-block rounded-full bg-primary-600/10 px-3 py-1 text-xs font-medium text-primary-600"
          >
            {category?.title}
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            {article.title}
          </h1>
          <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-400 dark:text-gray-500">
            <ClockIcon className="size-4" />
            {article.readTime}
          </div>
        </div>

        {/* Article Content */}
        <div className="mt-8 space-y-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-8">
          {article.content.map((block, index) => (
            <div key={index}>{renderContent(block)}</div>
          ))}
        </div>

        {/* Helpful? */}
        <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center">
          <p className="text-sm font-medium text-gray-900 dark:text-white">Was this article helpful?</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              Yes, it helped
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              Not really
            </button>
          </div>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Need more help?{' '}
            <Link to="/contact" className="text-primary-600 hover:text-primary-500">Contact support</Link>
          </p>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Related articles</h2>
            <div className="mt-4 space-y-3">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  to={`/help/articles/${related.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-colors hover:border-primary-600"
                >
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{related.excerpt}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                      <ClockIcon className="size-3.5" />
                      {related.readTime}
                    </div>
                  </div>
                  <ArrowRightIcon className="size-4 shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            to={`/help/category/${article.category}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            Back to {category?.title}
          </Link>
        </div>
      </div>
    </div>
  )
}
