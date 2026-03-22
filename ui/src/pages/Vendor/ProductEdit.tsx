// @ts-nocheck
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  PlusIcon,
  XMarkIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'

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

const currencies = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'NGN', label: 'NGN' },
]

const eventTypes = ['Wedding', 'Party', 'Office', 'Casual', 'Formal', 'Date Night']
const styleTypes = ['Classic', 'Modern', 'Bohemian', 'Streetwear', 'Vintage', 'Minimalist']

export default function ProductEdit() {
  const { id } = useParams()

  const [name, setName] = useState('Elegant Evening Gown')
  const [description, setDescription] = useState(
    'A stunning floor-length evening gown crafted from premium silk fabric. Features a flattering A-line silhouette with delicate beading along the neckline. Perfect for formal events, galas, and special occasions.'
  )
  const [category, setCategory] = useState('dresses')
  const [gender, setGender] = useState('women')
  const [price, setPrice] = useState('289')
  const [comparePrice, setComparePrice] = useState('350')
  const [currency, setCurrency] = useState('USD')
  const [images, setImages] = useState([
    { id: 1, src: 'https://picsum.photos/seed/edit1/300/300' },
    { id: 2, src: 'https://picsum.photos/seed/edit2/300/300' },
    { id: 3, src: 'https://picsum.photos/seed/edit3/300/300' },
  ])
  const [variants, setVariants] = useState([
    { id: 1, size: 'S', color: 'Black', colorHex: '#000000', sku: 'EEG-S-BLK', stock: 5, priceOverride: '', isActive: true },
    { id: 2, size: 'M', color: 'Black', colorHex: '#000000', sku: 'EEG-M-BLK', stock: 10, priceOverride: '', isActive: true },
    { id: 3, size: 'L', color: 'Navy Blue', colorHex: '#001f5c', sku: 'EEG-L-NAV', stock: 8, priceOverride: '299', isActive: true },
  ])
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['Formal', 'Party', 'Date Night'])
  const [selectedStyles, setSelectedStyles] = useState<string[]>(['Classic', 'Modern'])
  const [isActive, setIsActive] = useState(true)
  const [isFeatured, setIsFeatured] = useState(true)
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

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: Date.now(), size: '', color: '', colorHex: '#000000', sku: '', stock: 0, priceOverride: '', isActive: true },
    ])
  }

  const removeVariant = (id: number) => {
    setVariants((prev) => prev.filter((v) => v.id !== id))
  }

  const updateVariant = (id: number, field: string, value: string | number | boolean) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
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
              Edit Product
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
                Save Changes
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
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className={`mt-1.5 ${inputClasses}`}
              >
                {currencies.map((cur) => (
                  <option key={cur.value} value={cur.value} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    {cur.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="mt-6 rounded-xl bg-white dark:bg-gray-900 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Images</h2>
          <div className="mt-4">
            {/* Upload Area */}
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 px-6 py-10 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
              <div className="text-center">
                <PhotoIcon className="mx-auto size-12 text-gray-400 dark:text-gray-500" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop your images here, or click to browse
                </p>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-md bg-gray-100 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                >
                  <ArrowUpTrayIcon className="size-4" />
                  Upload Images
                </button>
              </div>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                {images.map((image, index) => (
                  <div key={image.id} className="group relative">
                    <img
                      src={image.src}
                      alt="Product"
                      className="aspect-square w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <XMarkIcon className="size-3.5" />
                    </button>
                    {index === 0 ? (
                      <span className="absolute bottom-1.5 left-1.5 rounded bg-primary-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        Primary
                      </span>
                    ) : (
                      <button
                        type="button"
                        className="absolute bottom-1.5 left-1.5 rounded bg-gray-900/80 px-1.5 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        Set as Primary
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Drag images to reorder. First image will be the cover.
            </p>
          </div>
        </div>

        {/* Variants */}
        <div className="mt-6 rounded-xl bg-white dark:bg-gray-900 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Variants</h2>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
            >
              <PlusIcon className="size-4" />
              Add Variant
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {variants.map((variant) => (
              <div
                key={variant.id}
                className="rounded-lg bg-gray-100 dark:bg-white/5 p-4"
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">SKU</label>
                    <input
                      type="text"
                      value={variant.sku}
                      onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                      placeholder="e.g. SKU-001"
                      className={`mt-1 ${inputClasses}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Size</label>
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => updateVariant(variant.id, 'size', e.target.value)}
                      placeholder="e.g. M, L, XL"
                      className={`mt-1 ${inputClasses}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Color</label>
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="color"
                        value={variant.colorHex}
                        onChange={(e) => updateVariant(variant.id, 'colorHex', e.target.value)}
                        className="size-[38px] shrink-0 cursor-pointer rounded-md border border-gray-200 dark:border-gray-700 bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={variant.color}
                        onChange={(e) => updateVariant(variant.id, 'color', e.target.value)}
                        placeholder="e.g. Black"
                        className={inputClasses}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Stock</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => updateVariant(variant.id, 'stock', Number(e.target.value))}
                      placeholder="0"
                      className={`mt-1 ${inputClasses}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Price Override</label>
                    <input
                      type="number"
                      value={variant.priceOverride}
                      onChange={(e) => updateVariant(variant.id, 'priceOverride', e.target.value)}
                      placeholder="Override price"
                      className={`mt-1 ${inputClasses}`}
                    />
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">Active</label>
                      <button
                        type="button"
                        onClick={() => updateVariant(variant.id, 'isActive', !variant.isActive)}
                        className={`mt-1 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          variant.isActive ? 'bg-primary-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            variant.isActive ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVariant(variant.id)}
                      className="rounded-md p-2 text-red-400 hover:bg-red-500/10"
                    >
                      <XMarkIcon className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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

        {/* Delete Product */}
        <div className="mt-6 rounded-xl bg-white dark:bg-gray-900 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-red-400">Danger Zone</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Permanently delete this product. This action cannot be undone.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-6 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20"
            >
              <TrashIcon className="size-4" />
              Delete Product
            </button>
          </div>
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
