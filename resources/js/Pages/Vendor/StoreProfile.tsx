import { Head, useForm } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import MapLocationPicker from '@/Components/MapLocationPicker'
import type { Vendor } from '@/types'

interface Props {
    vendor: Vendor
}

export default function VendorStoreProfile({ vendor }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        description: vendor.description || '',
        phone: vendor.phone || '',
        whatsapp: vendor.whatsapp || '',
        email: vendor.email || '',
        address: vendor.address || '',
        city: vendor.city || '',
        state: vendor.state || '',
        country: vendor.country || '',
        postal_code: vendor.postal_code || '',
        latitude: (vendor as any).location?.coordinates?.[1] || '' as string | number,
        longitude: (vendor as any).location?.coordinates?.[0] || '' as string | number,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put('/vendor/store')
    }

    const inputClass = "w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
    const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300"
    const errorClass = "mt-1 text-xs text-red-400"

    return (
        <VendorLayout>
            <Head title="Store Profile" />
            <div className="mx-auto max-w-3xl">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Store Profile</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Update your store information visible to customers.</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Store Info */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Store Details</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className={labelClass}>Store Name</label>
                                <input type="text" value={vendor.store_name} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
                                <p className="mt-1 text-xs text-gray-400">Store name cannot be changed after approval.</p>
                            </div>
                            <div>
                                <label className={labelClass}>Description</label>
                                <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={4} className={inputClass} />
                                {errors.description && <p className={errorClass}>{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Contact</h2>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>Phone</label>
                                <input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className={inputClass} />
                                {errors.phone && <p className={errorClass}>{errors.phone}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>WhatsApp</label>
                                <input type="tel" value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} placeholder="919876543210" className={inputClass} />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Country code + number, no + or spaces. e.g. 919876543210</p>
                            </div>
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Email</label>
                                <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Location</h2>
                        <div className="mt-4">
                            <MapLocationPicker
                                latitude={data.latitude ? Number(data.latitude) : null}
                                longitude={data.longitude ? Number(data.longitude) : null}
                                onLocationChange={(lat, lng, components) => {
                                    setData(prev => ({
                                        ...prev,
                                        latitude: lat,
                                        longitude: lng,
                                        address: components.address || prev.address,
                                        city: components.city || prev.city,
                                        state: components.state || prev.state,
                                        country: components.country || prev.country,
                                        postal_code: components.postalCode || prev.postal_code,
                                    }))
                                }}
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className={labelClass}>Address</label>
                                <input type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} className={inputClass} />
                                {errors.address && <p className={errorClass}>{errors.address}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>City</label>
                                <input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>State</label>
                                <input type="text" value={data.state} onChange={(e) => setData('state', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Country</label>
                                <input type="text" value={data.country} onChange={(e) => setData('country', e.target.value)} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Postal Code</label>
                                <input type="text" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    <button type="submit" disabled={processing} className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </VendorLayout>
    )
}
