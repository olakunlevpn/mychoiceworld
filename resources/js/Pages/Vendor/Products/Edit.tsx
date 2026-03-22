import { Head, Link, useForm, router, usePage } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import type { Product, ProductImage, ProductVariant, Category, EventType, StylePreference, SharedProps } from '@/types'

interface Props {
    product: Product & { event_types: { id: number }[]; style_preferences: { id: number }[]; images?: ProductImage[]; variants?: ProductVariant[] }
    categories: Category[]
    eventTypes: EventType[]
    stylePreferences: StylePreference[]
}

export default function VendorProductEdit({ product, categories, eventTypes, stylePreferences }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        category_id: String(product.category_id),
        gender: product.gender,
        price: String(product.price / 100),
        compare_price: product.compare_price ? String(product.compare_price / 100) : '',
        status: product.status,
        is_featured: product.is_featured,
        is_reservable: product.is_reservable,
        event_types: product.event_types?.map(e => e.id) || [],
        style_preferences: product.style_preferences?.map(s => s.id) || [],
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/vendor/products/${product.id}`)
    }

    const inputClass = "w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300"
    const errorClass = "mt-1 text-xs text-red-400"

    return (
        <VendorLayout>
            <Head title={`Edit: ${product.name}`} />
            <div className="mx-auto max-w-3xl">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
                    <Link href="/vendor/products" className="text-sm text-primary-600 hover:text-primary-500">&larr; Back</Link>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                            </div>
                            <div>
                                <label className={labelClass}>Category *</label>
                                <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className={inputClass}>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Gender</label>
                                <select value={data.gender} onChange={(e) => setData('gender', e.target.value as 'women' | 'men' | 'unisex')} className={inputClass}>
                                    <option value="women">Women</option>
                                    <option value="men">Men</option>
                                    <option value="unisex">Unisex</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Price *</label>
                                <input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} className={inputClass} required min="0" step="0.01" />
                                {errors.price && <p className={errorClass}>{errors.price}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Compare Price</label>
                                <input type="number" value={data.compare_price} onChange={(e) => setData('compare_price', e.target.value)} className={inputClass} min="0" step="0.01" />
                            </div>
                            <div>
                                <label className={labelClass}>Status</label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value as 'draft' | 'active' | 'archived')} className={inputClass}>
                                    <option value="draft">Draft</option>
                                    <option value="active">Active</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>
                        </div>
                    </div>

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

                    <div className="flex gap-3">
                        <button type="submit" disabled={processing} className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>

                {/* Images */}
                <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Product Images</h2>
                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {product.images?.map((img) => (
                            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                                <img src={img.url} alt="" className="size-full object-cover" />
                                <button type="button" onClick={() => { if (confirm('Delete this image?')) router.delete(`/vendor/products/${product.id}/images/${img.id}`, { preserveScroll: true }) }} className="absolute right-1 top-1 hidden rounded-full bg-red-500 p-1 text-white group-hover:flex">
                                    <TrashIcon className="size-3" />
                                </button>
                                {img.is_primary && <span className="absolute left-1 top-1 rounded bg-primary-600 px-1.5 py-0.5 text-[10px] font-bold text-white">Primary</span>}
                            </div>
                        ))}
                        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500">
                            <PlusIcon className="size-6 text-gray-400" />
                            <span className="mt-1 text-xs text-gray-400">Add</span>
                            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => {
                                if (e.target.files?.length) {
                                    const formData = new FormData()
                                    Array.from(e.target.files).forEach(f => formData.append('images[]', f))
                                    router.post(`/vendor/products/${product.id}/images`, formData as any, { preserveScroll: true, forceFormData: true })
                                }
                            }} />
                        </label>
                    </div>
                </div>

                {/* Variants */}
                <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Variants</h2>
                        <button type="button" onClick={() => router.post(`/vendor/products/${product.id}/variants`, { size: '', color: '', color_hex: '', sku: '', stock_quantity: 0, is_active: true }, { preserveScroll: true })} className="inline-flex items-center gap-1 rounded-md bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">
                            <PlusIcon className="size-3" /> Add Variant
                        </button>
                    </div>
                    {product.variants && product.variants.length > 0 ? (
                        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Size</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">Color</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium uppercase text-gray-500">SKU</th>
                                        <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Stock</th>
                                        <th className="px-3 py-2 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {product.variants.map((v) => (
                                        <tr key={v.id}>
                                            <td className="px-3 py-2 text-sm text-gray-900 dark:text-white">{v.size || '-'}</td>
                                            <td className="px-3 py-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    {v.color_hex && <span className="size-4 rounded-full border border-gray-300" style={{ backgroundColor: v.color_hex }} />}
                                                    <span className="text-gray-900 dark:text-white">{v.color || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-sm text-gray-500">{v.sku || '-'}</td>
                                            <td className="px-3 py-2 text-right text-sm text-gray-900 dark:text-white">{v.stock_quantity}</td>
                                            <td className="px-3 py-2 text-right">
                                                <button type="button" onClick={() => { if (confirm('Delete this variant?')) router.delete(`/vendor/products/${product.id}/variants/${v.id}`, { preserveScroll: true }) }} className="text-xs text-red-400 hover:text-red-300">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">No variants yet. Add sizes and colors for your product.</p>
                    )}
                </div>
            </div>
        </VendorLayout>
    )
}
