// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'

const categories = [
  { value: '', label: 'Select category' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'suits', label: 'Suits' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'bags', label: 'Bags' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'shoes', label: 'Shoes' },
]

const genderOptions = [
  { value: '', label: 'Select gender' },
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'unisex', label: 'Unisex' },
]

const eventTypes = ['Wedding', 'Party', 'Office', 'Casual', 'Formal', 'Date Night']
const styleTypes = ['Classic', 'Modern', 'Bohemian', 'Streetwear', 'Vintage', 'Minimalist']

export default function ProductCreate() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [price, setPrice] = useState('')
  const [comparePrice, setComparePrice] = useState('')
  const [selectedEvents, setSelectedEvents] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [isActive, setIsActive] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)
  const [allowReservations, setAllowReservations] = useState(true)

  const toggleEvent = (event: string) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event]
    )
  }

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    )
  }

  const inputClasses =
    'w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600'

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="pb-6 pt-16 sm:pt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Add New Product
            </h1>
            <div className="flex items-center gap-3">
              <Link
                to="/vendor/products"
                className="rounded-md border border-gray-200 dark:border-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
              >
                Cancel
              </Link>
              <button
                type="button"
                className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className={`mt-1.5 ${inputClasses}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your product..."
                className={`mt-1.5 ${inputClasses}`}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`mt-1.5 ${inputClasses}`}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className={`mt-1.5 ${inputClasses}`}
                >
                  {genderOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-6 rounded-xl bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pricing</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Regular Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className={`mt-1.5 ${inputClasses}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Compare-at Price <span className="text-gray-400 dark:text-gray-500">(optional)</span>
              </label>
              <input
                type="number"
                value={comparePrice}
                onChange={(e) => setComparePrice(e.target.value)}
                placeholder="0.00"
                className={`mt-1.5 ${inputClasses}`}
              />
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
            Images and variants can be added after the product is created.
          </p>
        </div>

        {/* Tags */}
        <div className="mt-6 rounded-xl bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tags</h2>
          <div className="mt-4 space-y-6">
            {/* Event Types */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Event Type</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {eventTypes.map((event) => (
                  <label
                    key={event}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm transition-colors has-[:checked]:border-primary-600 has-[:checked]:bg-primary-600/10"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEvents.includes(event)}
                      onChange={() => toggleEvent(event)}
                      className="size-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-primary-600 focus:ring-primary-600 focus:ring-offset-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">{event}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Style Types */}
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">Style</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {styleTypes.map((style) => (
                  <label
                    key={style}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm transition-colors has-[:checked]:border-primary-600 has-[:checked]:bg-primary-600/10"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStyles.includes(style)}
                      onChange={() => toggleStyle(style)}
                      className="size-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-primary-600 focus:ring-primary-600 focus:ring-offset-0"
                    />
                    <span className="text-gray-600 dark:text-gray-300">{style}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-6 rounded-xl bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
          <div className="mt-4 space-y-4">
            {/* Status Toggle */}
            <div className="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-white/5 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Status</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isActive ? 'Product is visible to customers' : 'Product is saved as draft'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isActive ? 'bg-primary-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-white/5 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Featured</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Show product in featured sections</p>
              </div>
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isFeatured ? 'bg-primary-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isFeatured ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Allow Reservations Toggle */}
            <div className="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-white/5 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Allow Reservations</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Let customers reserve this product</p>
              </div>
              <button
                type="button"
                onClick={() => setAllowReservations(!allowReservations)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  allowReservations ? 'bg-primary-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    allowReservations ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex items-center justify-end gap-3">
          <Link
            to="/vendor/products"
            className="rounded-md border border-gray-200 dark:border-gray-700 px-6 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Save Product
          </button>
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
