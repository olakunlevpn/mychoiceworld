import { Head, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { useState, useEffect, useRef } from 'react'
import {
    CameraIcon, SparklesIcon, ArrowLeftIcon, ArrowRightIcon,
    HeartIcon, MusicalNoteIcon, BriefcaseIcon, SunIcon,
    StarIcon as StarOutline, MoonIcon, GlobeAltIcon, FireIcon,
    SwatchIcon, FilmIcon, StopIcon, PaintBrushIcon,
} from '@heroicons/react/24/outline'
import type { EventType, StylePreference, SharedProps } from '@/types'

interface Props {
    eventTypes: EventType[]
    stylePreferences: StylePreference[]
}

const eventIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    wedding: HeartIcon,
    'date-night': MoonIcon,
    party: MusicalNoteIcon,
    'office-work': BriefcaseIcon,
    'casual-everyday': SunIcon,
    festival: FireIcon,
    'funeral-memorial': StarOutline,
    travel: GlobeAltIcon,
}

const styleIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    bohemian: SunIcon,
    casual: SunIcon,
    'ethnic-traditional': PaintBrushIcon,
    formal: StarOutline,
    minimalist: StopIcon,
    'modern-contemporary': SparklesIcon,
    streetwear: FireIcon,
    'vintage-retro': FilmIcon,
}

const TOTAL_STEPS = 5
const stepLabels = ['Occasion', 'Style', 'Budget', 'Photo', 'Matching']

const budgetRanges = [
    { id: 'under-100', min: 0, max: 100 },
    { id: '100-300', min: 100, max: 300 },
    { id: '300-plus', min: 300, max: undefined },
    { id: 'no-preference', min: undefined, max: undefined },
]

export default function FindMyMatch({ eventTypes, stylePreferences }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
    const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
    const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
    const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const cs = settings.currency_symbol
    const progressPercent = (currentStep / TOTAL_STEPS) * 100

    useEffect(() => {
        if (currentStep === 5) {
            // Build filter params from selections and redirect to Discover
            const timer = setTimeout(() => {
                const params: Record<string, string> = {}
                if (selectedEvent) {
                    params.event_type = String(selectedEvent)
                }
                if (selectedStyle) {
                    params.style_preference = String(selectedStyle)
                }
                if (selectedBudget) {
                    const budget = budgetRanges.find(b => b.id === selectedBudget)
                    if (budget?.min !== undefined) params.min_price = String(budget.min)
                    if (budget?.max !== undefined) params.max_price = String(budget.max)
                }
                const query = new URLSearchParams(params).toString()
                router.visit(`/products${query ? '?' + query : ''}`)
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [currentStep, selectedEvent, selectedStyle, selectedBudget])

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => setUploadedPhoto(reader.result as string)
            reader.readAsDataURL(file)
        }
    }


    return (
        <PublicLayout>
            <Head title="Find My Match" />

            <div className="mx-auto max-w-3xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8">
                {/* Progress bar */}
                {currentStep <= 5 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Step {currentStep} of {TOTAL_STEPS}</span>
                            <span className="text-sm font-medium text-primary-600">{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
                            <div className="h-full rounded-full bg-primary-600 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
                        </div>
                        <div className="mt-3 hidden sm:grid sm:grid-cols-6 sm:gap-2">
                            {stepLabels.map((label, i) => (
                                <span key={label} className={`text-center text-xs font-medium ${i + 1 <= currentStep ? 'text-primary-600' : 'text-gray-400 dark:text-gray-500'}`}>{label}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 1: Occasion */}
                {currentStep === 1 && (
                    <div>
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What's the occasion?</h1>
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Tell us about your event so we can find the perfect outfit</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {eventTypes.map((event) => (
                                <button key={event.id} type="button" onClick={() => setSelectedEvent(event.id)} className={`group rounded-xl border p-5 text-center transition-all duration-200 ${selectedEvent === event.id ? 'border-primary-600 bg-primary-600/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                    {(() => { const Icon = eventIconMap[event.slug] || SparklesIcon; return (
                                        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary-600/10">
                                            <Icon className="size-6 text-primary-600" />
                                        </div>
                                    ) })()}
                                    <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{event.name}</h3>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Style */}
                {currentStep === 2 && (
                    <div>
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What's your style?</h1>
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Choose the aesthetic that speaks to you</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {stylePreferences.map((sp) => (
                                <button key={sp.id} type="button" onClick={() => setSelectedStyle(sp.id)} className={`group rounded-xl border p-5 text-center transition-all duration-200 ${selectedStyle === sp.id ? 'border-primary-600 bg-primary-600/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                    {(() => { const Icon = styleIconMap[sp.slug] || SwatchIcon; return (
                                        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary-600/10">
                                            <Icon className="size-6 text-primary-600" />
                                        </div>
                                    ) })()}
                                    <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{sp.name}</h3>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Budget */}
                {currentStep === 3 && (
                    <div>
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">What's your budget?</h1>
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">We'll find the best matches within your range</p>
                        </div>
                        <div className="mx-auto max-w-md space-y-3">
                            {budgetRanges.map((budget) => (
                                <button key={budget.id} type="button" onClick={() => setSelectedBudget(budget.id)} className={`w-full rounded-xl border px-6 py-4 text-center text-sm font-semibold transition-all duration-200 ${selectedBudget === budget.id ? 'border-primary-600 bg-primary-600/10 text-gray-900 dark:text-white' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                    {budget.id === 'no-preference' ? 'No preference' : budget.id === '300-plus' ? `${cs}${budget.min}+` : `${cs}${budget.min} - ${cs}${budget.max}`}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 4: Photo */}
                {currentStep === 4 && (
                    <div>
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Upload a photo for better matches</h1>
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Optional — helps us match colors and styles to you</p>
                        </div>
                        <div className="mx-auto max-w-md">
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            {uploadedPhoto ? (
                                <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                    <img src={uploadedPhoto} alt="Uploaded" className="aspect-square w-full object-cover" />
                                    <button type="button" onClick={() => { setUploadedPhoto(null); if (fileInputRef.current) fileInputRef.current.value = '' }} className="absolute right-3 top-3 rounded-full bg-dark/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-dark">Remove</button>
                                </div>
                            ) : (
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-16 hover:border-gray-300 dark:hover:border-gray-600">
                                    <CameraIcon className="size-12 text-gray-500" />
                                    <span className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">Upload Photo</span>
                                    <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">JPG, PNG up to 10MB</span>
                                </button>
                            )}
                            <p className="mt-4 text-center text-xs text-gray-500">Your photo is used only for color matching and is not stored</p>
                            <div className="mt-6 text-center">
                                <button type="button" onClick={() => setCurrentStep(5)} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Skip this step</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Processing */}
                {currentStep === 5 && (
                    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                        <SparklesIcon className="size-16 text-primary-600 animate-pulse" />
                        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">Finding your perfect matches...</h2>
                        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Analyzing your preferences</p>
                        <div className="mt-8 flex items-center gap-2">
                            <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '0ms' }} />
                            <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '150ms' }} />
                            <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}

                {/* Step 5 redirects to /products with filters — no step 6 needed */}

                {/* Navigation buttons */}
                {currentStep <= 4 && (
                    <div className="mt-12 flex items-center justify-between">
                        <button type="button" onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)} disabled={currentStep === 1} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                            <ArrowLeftIcon className="size-4" /> Back
                        </button>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Skip</button>
                            <button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">
                                Next <ArrowRightIcon className="size-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    )
}
