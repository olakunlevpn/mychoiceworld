import { Head, Link, useForm } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import type { Category, EventType, StylePreference } from '@/types'

interface Props {
    categories: Category[]
    eventTypes: EventType[]
    stylePreferences: StylePreference[]
}

export default function VendorProductCreate({ categories, eventTypes, stylePreferences }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        category_id: '',
        gender: 'women',
        price: '',
        compare_price: '',
        status: 'draft',
        is_featured: false,
        is_reservable: true,
        event_types: [] as number[],
        style_preferences: [] as number[],
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/vendor/products')
    }

    const inputClass = "w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300"
    const errorClass = "mt-1 text-xs text-red-400"

    return (
        <VendorLayout>
            <Head title="Add Product" />
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Product</h1>
                    <Link href="/vendor/products" className="text-sm text-primary-600 hover:text-primary-500">&larr; Back</Link>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Basic Info */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Basic Information</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Product Name *</label>
                                <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className={inputClass} required />
                                {errors.name && <p className={errorClass}>{errors.name}</p>}
                            </div>
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Description</label>
                                <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} className={inputClass} />
                                {errors.description && <p className={errorClass}>{errors.description}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Category *</label>
                                <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className={inputClass} required>
                                    <option value="">Select category</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                                {errors.category_id && <p className={errorClass}>{errors.category_id}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Gender *</label>
                                <select value={data.gender} onChange={(e) => setData('gender', e.target.value)} className={inputClass}>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="unisex">Unisex</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Pricing</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>Price *</label>
                                <input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} className={inputClass} required min="0" step="0.01" />
                                {errors.price && <p className={errorClass}>{errors.price}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Compare Price</label>
                                <input type="number" value={data.compare_price} onChange={(e) => setData('compare_price', e.target.value)} className={inputClass} min="0" step="0.01" />
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Tags</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className={labelClass}>Event Types</label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {eventTypes.map((et) => (
                                        <button key={et.id} type="button" onClick={() => setData('event_types', data.event_types.includes(et.id) ? data.event_types.filter(id => id !== et.id) : [...data.event_types, et.id])} className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${data.event_types.includes(et.id) ? 'border-primary-600 bg-primary-600/10 text-primary-600' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                            {et.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Style Preferences</label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {stylePreferences.map((sp) => (
                                        <button key={sp.id} type="button" onClick={() => setData('style_preferences', data.style_preferences.includes(sp.id) ? data.style_preferences.filter(id => id !== sp.id) : [...data.style_preferences, sp.id])} className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-colors ${data.style_preferences.includes(sp.id) ? 'border-primary-600 bg-primary-600/10 text-primary-600' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'}`}>
                                            {sp.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Images</h2>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Upload after saving. You can add images on the edit page.</p>
                    </div>

                    {/* Variations */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Variations (Size & Color)</h2>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Add size/color variants with price and stock after saving. You can manage variants on the edit page.</p>
                    </div>

                    {/* Settings */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Settings</h2>
                        <div className="mt-4 space-y-3">
                            <label className="flex items-center gap-3">
                                <input type="checkbox" checked={data.is_reservable} onChange={(e) => setData('is_reservable', e.target.checked)} className="size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Allow reservations</span>
                            </label>
                            <label className="flex items-center gap-3">
                                <input type="checkbox" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} className="size-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">Featured product</span>
                            </label>
                        </div>
                        <h3 className="mt-6 text-sm font-semibold text-gray-900 dark:text-white">Reservation Rules</h3>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Reservations auto-cancel if not picked up within the hold period (configured in admin settings).</p>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3">
                        <button type="submit" disabled={processing} className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save as Draft'}
                        </button>
                        <button type="button" onClick={() => { setData('status', 'active'); post('/vendor/products') }} disabled={processing} className="rounded-md border border-primary-600 px-6 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-600/10 disabled:opacity-50">
                            Save & Publish
                        </button>
                    </div>
                </form>
            </div>
        </VendorLayout>
    )
}
