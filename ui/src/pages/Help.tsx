// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MagnifyingGlassIcon,
  ArrowRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { helpCategories, helpArticles } from '../data/helpData'

export default function Help() {
  const [search, setSearch] = useState('')

  const filteredArticles = search.trim().length > 1
    ? helpArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(search.toLowerCase())
      )
    : []

  const featuredArticles = helpArticles.filter((a) =>
    [
      'how-to-reserve-a-product',
      'how-to-become-a-vendor',
      'find-my-match-ai-discovery',
      'requesting-a-refund',
      'creating-your-account',
      'return-policy-overview',
    ].includes(a.slug)
  )

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Help Center</h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">How can we help you?</p>
        </div>

        {/* Search */}
        <div className="relative mb-16">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles..."
            className="block w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-4 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 text-base"
          />

          {/* Search Results Dropdown */}
          {search.trim().length > 1 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
              {filteredArticles.length === 0 ? (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No articles found for "{search}"
                  </p>
                  <Link
                    to="/contact"
                    className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-500"
                  >
                    Contact support instead
                  </Link>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredArticles.slice(0, 6).map((article) => (
                    <Link
                      key={article.slug}
                      to={`/help/articles/${article.slug}`}
                      className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                      onClick={() => setSearch('')}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{article.title}</p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{article.excerpt}</p>
                      </div>
                      <ArrowRightIcon className="size-3.5 shrink-0 text-gray-400 dark:text-gray-500" />
                    </Link>
                  ))}
                  {filteredArticles.length > 6 && (
                    <div className="px-5 py-3 text-center text-xs text-gray-400 dark:text-gray-500">
                      {filteredArticles.length - 6} more {filteredArticles.length - 6 === 1 ? 'result' : 'results'}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Browse by Topic</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {helpCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  to={`/help/category/${cat.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-colors hover:border-primary-600"
                >
                  <Icon className="h-7 w-7 text-primary-600" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">{cat.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{cat.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Featured Articles */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featuredArticles.map((article) => {
              const category = helpCategories.find((c) => c.slug === article.category)
              return (
                <Link
                  key={article.slug}
                  to={`/help/articles/${article.slug}`}
                  className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 transition-colors hover:border-primary-600"
                >
                  <span className="inline-block rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1 text-xs font-medium text-primary-600 mb-3">
                    {category?.title}
                  </span>
                  <h3 className="font-semibold text-gray-900 dark:text-white leading-snug group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{article.excerpt}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                    <ClockIcon className="size-3.5" />
                    {article.readTime}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Still Need Help CTA */}
        <section className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-white/5 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Still need help?</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Our support team is ready to assist you.</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-700 transition-colors w-full sm:w-auto"
            >
              Email Support
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white hover:border-gray-500 transition-colors w-full sm:w-auto"
            >
              Live Chat
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
