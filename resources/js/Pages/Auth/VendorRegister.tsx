import { Head, Link, useForm, usePage, router } from '@inertiajs/react'
import { useState, useRef } from 'react'
import SiteLogo from '@/Components/SiteLogo'
import PasswordInput from '@/Components/PasswordInput'
import MapLocationPicker from '@/Components/MapLocationPicker'
import type { SharedProps } from '@/types'

const steps = ['Account', 'Store Details', 'License', 'Location']

export default function VendorRegister() {
    const { settings } = usePage().props as unknown as SharedProps
    const [currentStep, setCurrentStep] = useState(1)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        store_name: '',
        phone: '',
        whatsapp: '',
        store_email: '',
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

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1)
        else {
            post('/vendor/register', { forceFormData: true })
        }
    }

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) setData('license_document', e.target.files[0])
    }

    const inputClass = "mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
    const labelClass = "block text-sm font-medium text-gray-600 dark:text-gray-300"
    const errorClass = "mt-1 text-xs text-red-400"

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12 sm:px-6 lg:px-8">
            <Head title="Vendor Registration" />
            <div className="w-full max-w-2xl">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/50 p-8">
                    <div className="flex justify-center">
                        <Link href="/">
                            <SiteLogo variant="desktop" className="h-10 w-auto" />
                        </Link>
                    </div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Vendor Registration</h2>

                    {/* Progress */}
                    <div className="mt-8 flex items-center justify-between">
                        {steps.map((label, index) => {
                            const stepNum = index + 1
                            const isCompleted = stepNum < currentStep
                            const isCurrent = stepNum === currentStep
                            return (
                                <div key={label} className="flex flex-1 items-center">
                                    <div className="flex flex-col items-center">
                                        <div className={`flex size-8 items-center justify-center rounded-full text-sm font-semibold ${isCompleted ? 'bg-primary-600 text-white' : isCurrent ? 'border-2 border-primary-600 bg-primary-600/20 text-primary-600' : 'border-2 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'}`}>
                                            {isCompleted ? <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : stepNum}
                                        </div>
                                        <span className={`mt-2 text-xs ${isCompleted || isCurrent ? 'text-primary-600 font-medium' : 'text-gray-400 dark:text-gray-500'}`}>{label}</span>
                                    </div>
                                    {index < steps.length - 1 && <div className={`mx-2 h-0.5 flex-1 ${stepNum < currentStep ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                                </div>
                            )
                        })}
                    </div>

                    {/* Step 1 — Account */}
                    {currentStep === 1 && (
                        <div className="mt-8 space-y-5">
                            <div><label className={labelClass}>Full name</label><input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="John Doe" className={inputClass} />{errors.name && <p className={errorClass}>{errors.name}</p>}</div>
                            <div><label className={labelClass}>Email address</label><input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="you@example.com" className={inputClass} />{errors.email && <p className={errorClass}>{errors.email}</p>}</div>
                            <div><label className={labelClass}>Password</label><PasswordInput value={data.password} onChange={(e) => setData('password', e.target.value)} className={inputClass} />{errors.password && <p className={errorClass}>{errors.password}</p>}</div>
                            <div><label className={labelClass}>Confirm password</label><PasswordInput value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} autoComplete="new-password" className={inputClass} /></div>
                        </div>
                    )}

                    {/* Step 2 — Store Details */}
                    {currentStep === 2 && (
                        <div className="mt-8 space-y-5">
                            <div><label className={labelClass}>Store name</label><input type="text" value={data.store_name} onChange={(e) => setData('store_name', e.target.value)} placeholder="My Awesome Store" className={inputClass} />{errors.store_name && <p className={errorClass}>{errors.store_name}</p>}</div>
                            <div><label className={labelClass}>Phone number</label><input type="tel" value={data.phone} onChange={(e) => setData('phone', e.target.value)} placeholder="+91 98765 43210" className={inputClass} />{errors.phone && <p className={errorClass}>{errors.phone}</p>}</div>
                            <div><label className={labelClass}>WhatsApp number</label><input type="tel" value={data.whatsapp} onChange={(e) => setData('whatsapp', e.target.value)} placeholder="919876543210" className={inputClass} /><p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Country code + number, no + or spaces. e.g. 919876543210</p></div>
                            <div><label className={labelClass}>Store email</label><input type="email" value={data.store_email} onChange={(e) => setData('store_email', e.target.value)} placeholder="store@example.com" className={inputClass} /></div>
                        </div>
                    )}

                    {/* Step 3 — License */}
                    {currentStep === 3 && (
                        <div className="mt-8 space-y-5">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Upload your business license (optional). This helps us verify your store faster.</p>
                            <div>
                                <label htmlFor="licenseFile" className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-6 py-8 hover:border-gray-300 dark:hover:border-gray-600">
                                    <svg className="mb-3 size-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Click to upload</span>
                                    <span className="mt-1 text-xs text-gray-400">PDF, JPG, PNG up to 10MB</span>
                                    {data.license_document && <span className="mt-2 text-xs text-primary-600">{data.license_document.name}</span>}
                                    <input id="licenseFile" ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
                                </label>
                            </div>
                            <div><label className={labelClass}>License number <span className="text-gray-400">(optional)</span></label><input type="text" value={data.license_number} onChange={(e) => setData('license_number', e.target.value)} placeholder="e.g. BL-123456" className={inputClass} /></div>
                        </div>
                    )}

                    {/* Step 4 — Location */}
                    {currentStep === 4 && (
                        <div className="mt-8 space-y-5">
                            <MapLocationPicker
                                latitude={data.latitude ? Number(data.latitude) : null}
                                longitude={data.longitude ? Number(data.longitude) : null}
                                onLocationChange={(lat, lng, address) => {
                                    setData(prev => ({
                                        ...prev,
                                        latitude: lat,
                                        longitude: lng,
                                        ...(address ? { address } : {}),
                                    }))
                                }}
                            />
                            <div><label className={labelClass}>Address</label><input type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="123 Main Street" className={inputClass} />{errors.address && <p className={errorClass}>{errors.address}</p>}</div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className={labelClass}>City</label><input type="text" value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="Mumbai" className={inputClass} />{errors.city && <p className={errorClass}>{errors.city}</p>}</div>
                                <div><label className={labelClass}>State</label><input type="text" value={data.state} onChange={(e) => setData('state', e.target.value)} placeholder="Maharashtra" className={inputClass} />{errors.state && <p className={errorClass}>{errors.state}</p>}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className={labelClass}>Country</label><input type="text" value={data.country} onChange={(e) => setData('country', e.target.value)} placeholder="India" className={inputClass} />{errors.country && <p className={errorClass}>{errors.country}</p>}</div>
                                <div><label className={labelClass}>Postal code</label><input type="text" value={data.postal_code} onChange={(e) => setData('postal_code', e.target.value)} placeholder="400001" className={inputClass} /></div>
                            </div>
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
                            {currentStep === 3 && (
                                <button type="button" onClick={() => setCurrentStep(4)} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">Skip</button>
                            )}
                            <button type="button" onClick={handleNext} disabled={processing} className="rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                                {processing ? 'Submitting...' : currentStep === 4 ? 'Submit Application' : 'Next'}
                            </button>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        Already have an account? <Link href={route('login')} className="font-medium text-primary-600 hover:text-primary-500">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
