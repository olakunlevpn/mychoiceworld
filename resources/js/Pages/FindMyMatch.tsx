import { Head, router, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { useLocation } from '@/contexts/LocationContext'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
    CameraIcon, SparklesIcon, ArrowLeftIcon, ArrowRightIcon,
} from '@heroicons/react/24/outline'
import * as faceapi from 'face-api.js'
import type { EventType, StylePreference, SharedProps } from '@/types'

interface Props {
    eventTypes: EventType[]
    stylePreferences: StylePreference[]
}

interface DetectedFeatures {
    gender: 'male' | 'female'
    genderProbability: number
    age: number
    skinTone: string
}

const eventEmojiMap: Record<string, { emoji: string; description: string }> = {
    wedding: { emoji: '💍', description: 'Elegant attire for the big day' },
    'date-night': { emoji: '🌹', description: 'Impress with confidence' },
    party: { emoji: '🎉', description: 'Stand out on the dance floor' },
    'office-work': { emoji: '💼', description: 'Professional and polished' },
    'casual-everyday': { emoji: '☕', description: 'Relaxed everyday looks' },
    festival: { emoji: '🔥', description: 'Bold and expressive' },
    'funeral-memorial': { emoji: '🌙', description: 'Respectful and dignified' },
    travel: { emoji: '🌍', description: 'Comfortable and stylish' },
}

const styleEmojiMap: Record<string, { emoji: string; description: string }> = {
    bohemian: { emoji: '🌻', description: 'Free-spirited and flowing' },
    casual: { emoji: '☀️', description: 'Relaxed everyday looks' },
    'ethnic-traditional': { emoji: '🪷', description: 'Cultural heritage meets fashion' },
    formal: { emoji: '🎩', description: 'Black-tie and gala ready' },
    minimalist: { emoji: '◻️', description: 'Less is more, always' },
    'modern-contemporary': { emoji: '✨', description: 'Clean lines, fresh silhouettes' },
    streetwear: { emoji: '🔥', description: 'Urban edge and bold logos' },
    'vintage-retro': { emoji: '📷', description: 'Retro-inspired charm' },
}

const skinToneOptions = [
    { id: 'light', label: 'Light', color: '#FFE0BD' },
    { id: 'fair', label: 'Fair', color: '#F1C27D' },
    { id: 'medium', label: 'Medium', color: '#C68642' },
    { id: 'olive', label: 'Olive', color: '#8D5524' },
    { id: 'tan', label: 'Tan', color: '#6B3A2A' },
    { id: 'brown', label: 'Brown', color: '#4A2912' },
    { id: 'dark', label: 'Dark', color: '#321911' },
    { id: 'deep', label: 'Deep', color: '#1A0E0A' },
]

const bodyTypeOptions = ['Slim', 'Average', 'Athletic', 'Curvy', 'Plus Size']

const TOTAL_STEPS = 5
const stepLabels = ['Occasion', 'Style', 'Budget', 'Photo', 'Matching']

const budgetRanges = [
    { id: 'under-100', min: 0, max: 100 },
    { id: '100-300', min: 100, max: 300 },
    { id: '300-plus', min: 300, max: undefined },
    { id: 'no-preference', min: undefined, max: undefined },
]

function classifySkinTone(r: number, g: number, b: number): string {
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114)
    if (brightness > 220) return 'light'
    if (brightness > 195) return 'fair'
    if (brightness > 170) return 'medium'
    if (brightness > 145) return 'olive'
    if (brightness > 120) return 'tan'
    if (brightness > 90) return 'brown'
    if (brightness > 60) return 'dark'
    return 'deep'
}

function extractSkinColor(canvas: HTMLCanvasElement, detection: any): string {
    const ctx = canvas.getContext('2d')
    if (!ctx) return 'medium'

    const box = detection.detection.box
    // Sample from center of forehead area
    const sampleX = Math.floor(box.x + box.width * 0.5)
    const sampleY = Math.floor(box.y + box.height * 0.3)
    const sampleSize = Math.floor(Math.min(box.width, box.height) * 0.1)

    const imageData = ctx.getImageData(
        Math.max(0, sampleX - sampleSize / 2),
        Math.max(0, sampleY - sampleSize / 2),
        sampleSize,
        sampleSize,
    )

    let totalR = 0, totalG = 0, totalB = 0, count = 0
    for (let i = 0; i < imageData.data.length; i += 4) {
        totalR += imageData.data[i]
        totalG += imageData.data[i + 1]
        totalB += imageData.data[i + 2]
        count++
    }

    return classifySkinTone(totalR / count, totalG / count, totalB / count)
}

export default function FindMyMatch({ eventTypes, stylePreferences }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const { coordinates } = useLocation()
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
    const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
    const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
    const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
    const [manualMode, setManualMode] = useState(false)
    const [selectedSkinTone, setSelectedSkinTone] = useState<string | null>(null)
    const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null)
    const [detectedFeatures, setDetectedFeatures] = useState<DetectedFeatures | null>(null)
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [analysisError, setAnalysisError] = useState<string | null>(null)
    const [modelsLoaded, setModelsLoaded] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const cs = settings.currency_symbol
    const progressPercent = (currentStep / TOTAL_STEPS) * 100

    // Load face-api models
    useEffect(() => {
        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.ageGenderNet.loadFromUri('/models'),
                ])
                setModelsLoaded(true)
            } catch {
                // Models failed to load — manual mode will still work
            }
        }
        loadModels()
    }, [])

    // Step 5: Submit to backend AI matching
    useEffect(() => {
        if (currentStep === 5) {
            const skinTone = detectedFeatures?.skinTone || selectedSkinTone
            const budget = budgetRanges.find(b => b.id === selectedBudget)

            const payload: Record<string, string | number> = {}
            if (selectedEvent) payload.event_type_id = selectedEvent
            if (selectedStyle) payload.style_preference_id = selectedStyle
            if (budget?.min !== undefined) payload.budget_min = budget.min * 100
            if (budget?.max !== undefined) payload.budget_max = budget.max * 100
            if (skinTone) payload.skin_tone = skinTone
            if (coordinates) {
                payload.latitude = coordinates.lat
                payload.longitude = coordinates.lng
            }
            if (detectedFeatures?.gender) {
                payload.gender = detectedFeatures.gender === 'female' ? 'women' : 'men'
            }

            // If user is logged in, use the AI match backend
            router.post('/customer/ai-match', payload, {
                onError: () => {
                    // Fallback: redirect to products with filters if not logged in
                    const params: Record<string, string> = {}
                    if (selectedEvent) params.event_type = String(selectedEvent)
                    if (selectedStyle) params.style_preference = String(selectedStyle)
                    if (budget?.min !== undefined) params.min_price = String(budget.min)
                    if (budget?.max !== undefined) params.max_price = String(budget.max)
                    if (detectedFeatures?.gender) params.gender = detectedFeatures.gender === 'female' ? 'women' : 'men'
                    router.visit(`/products?${new URLSearchParams(params).toString()}`)
                },
            })
        }
    }, [currentStep])

    const analyzePhoto = useCallback(async (imageSrc: string) => {
        if (!modelsLoaded) return
        setIsAnalyzing(true)
        setAnalysisError(null)

        try {
            const img = new Image()
            img.crossOrigin = 'anonymous'
            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve()
                img.onerror = () => reject()
                img.src = imageSrc
            })

            const canvas = canvasRef.current
            if (!canvas) return
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            if (!ctx) return
            ctx.drawImage(img, 0, 0)

            const detection = await faceapi
                .detectSingleFace(canvas, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.3 }))
                .withAgeAndGender()

            if (!detection) {
                setAnalysisError('No face detected. Please upload a clear photo or select features manually.')
                setIsAnalyzing(false)
                return
            }

            const skinTone = extractSkinColor(canvas, detection)

            setDetectedFeatures({
                gender: detection.gender as 'male' | 'female',
                genderProbability: detection.genderProbability,
                age: Math.round(detection.age),
                skinTone,
            })
            setSelectedSkinTone(skinTone)
        } catch {
            setAnalysisError('Could not analyze photo. Please select features manually.')
        }

        setIsAnalyzing(false)
    }, [modelsLoaded])

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setUploadedPhoto(result)
                setDetectedFeatures(null)
                setAnalysisError(null)
                analyzePhoto(result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <PublicLayout>
            <Head title="Find My Match" />
            <canvas ref={canvasRef} className="hidden" />

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
                        <div className="mt-3 hidden sm:grid sm:grid-cols-5 sm:gap-2">
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
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {eventTypes.map((event) => {
                                const meta = eventEmojiMap[event.slug] || { emoji: '✨', description: '' }
                                return (
                                    <button key={event.id} type="button" onClick={() => setSelectedEvent(event.id)} className={`group rounded-xl border p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${selectedEvent === event.id ? 'border-primary-600 bg-primary-600/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                        <span className="text-3xl">{meta.emoji}</span>
                                        <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{event.name}</h3>
                                        {meta.description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{meta.description}</p>}
                                    </button>
                                )
                            })}
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
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {stylePreferences.map((sp) => {
                                const meta = styleEmojiMap[sp.slug] || { emoji: '🎨', description: '' }
                                return (
                                    <button key={sp.id} type="button" onClick={() => setSelectedStyle(sp.id)} className={`group rounded-xl border p-5 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${selectedStyle === sp.id ? 'border-primary-600 bg-primary-600/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                        <span className="text-3xl">{meta.emoji}</span>
                                        <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{sp.name}</h3>
                                        {meta.description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{meta.description}</p>}
                                    </button>
                                )
                            })}
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
                            <p className="mt-3 text-base text-gray-500 dark:text-gray-400">We'll detect your gender, age, and skin tone to find the best outfits</p>
                        </div>
                        <div className="mx-auto max-w-md">
                            {!manualMode ? (
                                <>
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                    {uploadedPhoto ? (
                                        <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                                            <img src={uploadedPhoto} alt="Uploaded" className="aspect-square w-full object-cover" />
                                            <button type="button" onClick={() => { setUploadedPhoto(null); setDetectedFeatures(null); setAnalysisError(null); if (fileInputRef.current) fileInputRef.current.value = '' }} className="absolute right-3 top-3 rounded-full bg-dark/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-dark">Remove</button>

                                            {/* Analysis overlay */}
                                            {isAnalyzing && (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark/70 backdrop-blur-sm">
                                                    <div className="size-10 animate-spin rounded-full border-3 border-white/30 border-t-primary-600" />
                                                    <p className="mt-4 text-sm font-medium text-white">Analyzing your photo...</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-16 hover:border-gray-300 dark:hover:border-gray-600">
                                                <CameraIcon className="size-12 text-gray-500" />
                                                <span className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">Upload Photo</span>
                                                <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">JPG, PNG up to 10MB</span>
                                            </button>
                                            <div className="mt-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 px-4 py-3">
                                                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">For best results:</p>
                                                <ul className="mt-1.5 space-y-1 text-xs text-gray-500 dark:text-gray-400">
                                                    <li>• Upload a clear, well-lit front-facing photo</li>
                                                    <li>• Make sure your face is fully visible (no sunglasses or masks)</li>
                                                    <li>• Use a recent photo with natural lighting</li>
                                                    <li>• One person per photo works best</li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {/* Detection results */}
                                    {detectedFeatures && !isAnalyzing && (
                                        <div className="mt-6 rounded-xl border border-primary-600/30 bg-primary-600/5 p-5">
                                            <h3 className="flex items-center gap-2 text-sm font-semibold text-primary-600">
                                                <SparklesIcon className="size-5" />
                                                AI Detection Results
                                            </h3>
                                            <div className="mt-4 grid grid-cols-3 gap-4">
                                                <div className="text-center">
                                                    <p className="text-2xl">{detectedFeatures.gender === 'female' ? '👩' : '👨'}</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white capitalize">{detectedFeatures.gender}</p>
                                                    <p className="text-xs text-gray-500">{Math.round(detectedFeatures.genderProbability * 100)}% confident</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-2xl">🎂</p>
                                                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">~{detectedFeatures.age} years</p>
                                                    <p className="text-xs text-gray-500">Estimated age</p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="mx-auto size-8 rounded-full border-2 border-white/30" style={{ backgroundColor: skinToneOptions.find(s => s.id === detectedFeatures.skinTone)?.color || '#C68642' }} />
                                                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white capitalize">{detectedFeatures.skinTone}</p>
                                                    <p className="text-xs text-gray-500">Skin tone</p>
                                                </div>
                                            </div>
                                            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                                                We'll use this to find {detectedFeatures.gender === 'female' ? "women's" : "men's"} outfits that complement your skin tone.
                                            </p>
                                        </div>
                                    )}

                                    {analysisError && (
                                        <div className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-center text-sm text-red-400">
                                            {analysisError}
                                        </div>
                                    )}

                                    <p className="mt-4 text-center text-xs text-gray-500">Your photo is processed in your browser and is not uploaded or stored</p>

                                    <div className="mt-6 flex flex-col items-center gap-3">
                                        <button type="button" onClick={() => setManualMode(true)} className="text-sm font-medium text-primary-600 hover:text-primary-500">
                                            Or select your features manually
                                        </button>
                                        <button type="button" onClick={() => setCurrentStep(5)} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Skip this step</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Select your skin tone</h3>
                                        <div className="mt-3 flex flex-wrap gap-3">
                                            {skinToneOptions.map((tone) => (
                                                <button key={tone.id} type="button" onClick={() => setSelectedSkinTone(tone.id)} className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all hover:scale-105 ${selectedSkinTone === tone.id ? 'border-primary-600 bg-primary-600/10' : 'border-gray-200 dark:border-gray-700'}`}>
                                                    <div className="size-10 rounded-full border-2 border-white/20" style={{ backgroundColor: tone.color }} />
                                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{tone.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Select your body type</h3>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {bodyTypeOptions.map((type) => (
                                                <button key={type} type="button" onClick={() => setSelectedBodyType(type)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${selectedBodyType === type ? 'border-primary-600 bg-primary-600/10 text-primary-600' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-400'}`}>
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center gap-3">
                                        <button type="button" onClick={() => setManualMode(false)} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                            Back to photo upload
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 5: Processing */}
                {currentStep === 5 && (
                    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                        <SparklesIcon className="size-16 text-primary-600 animate-pulse" />
                        <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">Finding your perfect matches...</h2>
                        <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                            {detectedFeatures
                                ? `Analyzing ${detectedFeatures.gender === 'female' ? "women's" : "men's"} outfits for ${detectedFeatures.skinTone} skin tone`
                                : 'Analyzing your preferences'}
                        </p>
                        <div className="mt-8 flex items-center gap-2">
                            <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '0ms' }} />
                            <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '150ms' }} />
                            <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}

                {/* Navigation buttons */}
                {currentStep <= 4 && (
                    <div className="mt-12 flex items-center justify-between">
                        <button type="button" onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)} disabled={currentStep === 1} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed">
                            <ArrowLeftIcon className="size-4" /> Back
                        </button>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Skip</button>
                            <button type="button" onClick={() => setCurrentStep(currentStep + 1)} disabled={isAnalyzing} className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                                Next <ArrowRightIcon className="size-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    )
}
