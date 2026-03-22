// @ts-nocheck
import { Link, useParams } from 'react-router-dom'
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon } from '@heroicons/react/24/outline'
import { helpCategories, getArticlesByCategory, getCategoryBySlug } from '../data/helpData'

export default function HelpCategory() {
  const { slug } = useParams()
  const category = getCategoryBySlug(slug!)
  const articles = getArticlesByCategory(slug!)

  if (!category) {
    return (
      <div className="bg-gray-50 dark:bg-dark">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Category not found</h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">The help category you're looking for doesn't exist.</p>
          <Link to="/help" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-500">
            <ArrowLeftIcon className="size-4" />
            Back to Help Center
          </Link>
        </div>
      </div>
    )
  }

  const CategoryIcon = category.icon
  const otherCategories = helpCategories.filter((c) => c.slug !== slug)

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link to="/help" className="hover:text-primary-600 transition-colors">Help Center</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{category.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-600/10">
            <CategoryIcon className="size-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              {category.title}
            </h1>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{category.description}</p>
          </div>
        </div>

        {/* Articles */}
        <div className="mt-10 space-y-3">
          <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
          </p>
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/help/articles/${article.slug}`}
              className="group flex items-center justify-between gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 transition-colors hover:border-primary-600"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors sm:text-base">
                  {article.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{article.excerpt}</p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                  <ClockIcon className="size-3.5" />
                  {article.readTime}
                </div>
              </div>
              <ArrowRightIcon className="size-4 shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-primary-600 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Other Categories */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Other categories</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  to={`/help/category/${cat.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-colors hover:border-primary-600"
                >
                  <Icon className="size-5 text-primary-600 shrink-0" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {cat.title}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10">
          <Link
            to="/help"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Help Center
          </Link>
        </div>
      </div>
    </div>
  )
}
