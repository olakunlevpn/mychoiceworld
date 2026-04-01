import { Head, Link, useForm, usePage } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import MapLocationPicker from '@/Components/MapLocationPicker'
import { useState, useRef } from 'react'
import type { SharedProps } from '@/types'

const steps = ['Store Details', 'License', 'Location']

export default function BecomeVendor() {
    const { settings } = usePage().props as unknown as SharedProps
    const [currentStep, setCurrentStep] = useState(1)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { data, setData, post, processing, errors } = useForm({
        store_name: '',
        phone: '',
        whatsapp: '',
        store_email: '',
        description: '',
        license_document: null as File | null,
        license_number: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        latitude: '' as string | number,
        longitude: '' as string | number,
    })

    const [submitError, setSubmitError] = useState('')

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(currentStep + 1)
        else {
            setSubmitError('')
            post('/customer/become-vendor', {
                forceFormData: true,
                onError: (errs) => {
                    if (errs.store_name || errs.phone) setCurrentStep(1)
                    else if (errs.license_number || errs.license_document) setCurrentStep(2)
                    else if (errs.address || errs.city || errs.state || errs.country) setCurrentStep(3)
                    setSubmitError('Please fix the errors and try again.')
                },
            })
        }
    }

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setData('license_document', e.target.files[0])
    }

    const inputClass = "mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
    const labelClass = "block text-sm font-medium text-gray-600 dark:text-gray-300"
    const errorClass = "mt-1 text-xs text-red-400"

    return (
        <CustomerLayout>
            <Head title="Become a Vendor" />
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8 sm:px-10">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Become a Vendor</h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Set up your store and start selling to customers near you.</p>

                    {/* Progress */}
                    <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Step {currentStep} of {steps.length}</span>
                            <span className="text-sm font-medium text-primary-600">{Math.round((currentStep / steps.length) * 100)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
                            <div className="h-full rounded-full bg-primary-600 transition-all duration-500" style={{ width: `${(currentStep / steps.length) * 100}%` }} />
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                            {steps.map((label, i) => (
                                <span key={label} className={`text-center text-xs font-medium ${i + 1 <= currentStep ? 'text-primary-600' : 'text-gray-400'}`}>{label}</span>
                            ))}
                        </div>
                    </div>

                    {/* Step 1 — Store Details */}
                    {currentStep === 1 && (
                        <div className="mt-8 space-y-5">
                            <div><label className={labelClass}>Store name *</label><input type="text" value={data.store_name} onChange={(e) => setData('store_name', e.target.value)} placeholder="My Awesome Boutique" className={inputClass} />{errors.store_name && <p className={errorClass}>{errors.store_name}</p>}</div>
                            <div><label className={labelClass}>Description</label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Tell customers about your store..." rows={3} className={inputClass} /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className={labelClass}>Phone *</label><input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="+91 98765 43210" className={inputClass} />{errors.phone && <p className={errorClass}>{errors.phone}</p>}</div>
                                <div><label className={labelClass}>WhatsApp</label><input type="tel" value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} placeholder="919876543210" className={inputClass} /><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Country code + number, no + or spaces</p></div>
                            </div>
                            <div><label className={labelClass}>Store email</label><input type="email" value={data.store_email} onChange={(e) => setData('store_email', e.target.value)} placeholder="store@example.com" className={inputClass} /></div>
                        </div>
                    )}

                    {/* Step 2 — License */}
                    {currentStep === 2 && (
                        <div className="mt-8 space-y-5">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Upload your business license (optional). This helps us verify your store faster.</p>
                            <div>
                                <label htmlFor="licenseFile" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-8 hover:border-gray-300 dark:hover:border-gray-600">
                                    <svg className="mb-3 size-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Click to upload</span>
                                    <span className="mt-1 text-xs text-gray-400">PDF, JPG, PNG up to 5MB</span>
                                    {data.license_document && <span className="mt-2 text-xs text-primary-600">{data.license_document.name}</span>}
                                    <input id="licenseFile" ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>
                            <div><label className={labelClass}>License number <span className="text-gray-400">(optional)</span></label><input type="text" value={data.license_number} onChange={(e) => setData('license_number', e.target.value)} placeholder="e.g. BL-123456" className={inputClass} /></div>
                        </div>
                    )}

                    {/* Step 3 — Location */}
                    {currentStep === 3 && (
                        <div className="mt-8 space-y-5">
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
                            <div><label className={labelClass}>Address *</label><input type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="123 Main Street" className={inputClass} />{errors.address && <p className={errorClass}>{errors.address}</p>}</div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className={labelClass}>City *</label><input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="Mumbai" className={inputClass} />{errors.city && <p className={errorClass}>{errors.city}</p>}</div>
                                <div><label className={labelClass}>State *</label><input type="text" value={data.state} onChange={(e) => setData('state', e.target.value)} placeholder="Maharashtra" className={inputClass} />{errors.state && <p className={errorClass}>{errors.state}</p>}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className={labelClass}>Country *</label><input type="text" value={data.country} onChange={(e) => setData('country', e.target.value)} placeholder="India" className={inputClass} />{errors.country && <p className={errorClass}>{errors.country}</p>}</div>
                                <div><label className={labelClass}>Postal code</label><input type="text" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} placeholder="400001" className={inputClass} /></div>
                            </div>
                        </div>
                    )}

                    {/* Error banner */}
                    {submitError && (
                        <div className="mt-4 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400">{submitError}</div>
                    )}
                    {Object.keys(errors).length > 0 && (
                        <div className="mt-4 rounded-md bg-red-500/10 px-4 py-3">
                            <ul className="space-y-1 text-xs text-red-400">
                                {Object.entries(errors).map(([key, msg]) => <li key={key}>{msg}</li>)}
                            </ul>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            {currentStep > 1 && (
                                <button type="button" onClick={handleBack} className="rounded-md border border-gray-200 dark:border-gray-700 px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">Back</button>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            {currentStep === 2 && (
                                <button type="button" onClick={() => setCurrentStep(3)} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600">Skip</button>
                            )}
                            <button type="button" onClick={handleNext} disabled={processing} className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                                {processing ? 'Submitting...' : currentStep === 3 ? 'Submit Application' : 'Next'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    )
}
