// @ts-nocheck
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  SparklesIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

const TOTAL_STEPS = 6

const eventTypes = [
  { id: 'wedding', title: 'Wedding', emoji: '\uD83D\uDC8D', description: 'Elegant attire for the big day' },
  { id: 'party', title: 'Party', emoji: '\uD83C\uDF89', description: 'Stand out on the dance floor' },
  { id: 'office', title: 'Office', emoji: '\uD83D\uDCBC', description: 'Professional and polished' },
  { id: 'casual', title: 'Casual', emoji: '\u2615', description: 'Relaxed everyday looks' },
  { id: 'formal', title: 'Formal', emoji: '\uD83C\uDFA9', description: 'Black-tie and gala ready' },
  { id: 'date-night', title: 'Date Night', emoji: '\uD83C\uDF39', description: 'Impress with confidence' },
]

const stylePreferences = [
  { id: 'classic', title: 'Classic', emoji: '\uD83E\uDDE5', description: 'Timeless, elegant staples' },
  { id: 'modern', title: 'Modern', emoji: '\u2728', description: 'Clean lines, fresh silhouettes' },
  { id: 'bohemian', title: 'Bohemian', emoji: '\uD83C\uDF3B', description: 'Free-spirited and flowing' },
  { id: 'streetwear', title: 'Streetwear', emoji: '\uD83D\uDD25', description: 'Urban edge and bold logos' },
  { id: 'vintage', title: 'Vintage', emoji: '\uD83D\uDCF7', description: 'Retro-inspired charm' },
  { id: 'minimalist', title: 'Minimalist', emoji: '\u25FB\uFE0F', description: 'Less is more, always' },
]

const budgetRanges = [
  { id: 'under-100', label: 'Under $100' },
  { id: '100-300', label: '$100 - $300' },
  { id: '300-plus', label: '$300+' },
  { id: 'no-preference', label: 'No preference' },
]

const stepLabels = ['Occasion', 'Style', 'Budget', 'Photo', 'Processing', 'Results']

const matchedProducts = [
  {
    id: 1,
    name: 'Silk Evening Gown',
    slug: 'silk-evening-gown',
    price: '$289',
    store: 'Luxe Boutique',
    distance: '1.2 km',
    matchScore: 98,
    imageSrc: 'https://picsum.photos/seed/match1/600/800',
  },
  {
    id: 2,
    name: 'Tailored Wool Blazer',
    slug: 'tailored-wool-blazer',
    price: '$195',
    store: "The Gentleman's Store",
    distance: '2.8 km',
    matchScore: 95,
    imageSrc: 'https://picsum.photos/seed/match2/600/800',
  },
  {
    id: 3,
    name: 'Embroidered Midi Dress',
    slug: 'embroidered-midi-dress',
    price: '$175',
    store: 'Free Spirit Fashion',
    distance: '0.9 km',
    matchScore: 92,
    imageSrc: 'https://picsum.photos/seed/match3/600/800',
  },
  {
    id: 4,
    name: 'Pearl Statement Necklace',
    slug: 'pearl-statement-necklace',
    price: '$120',
    store: 'Golden Hour Jewelry',
    distance: '3.4 km',
    matchScore: 88,
    imageSrc: 'https://picsum.photos/seed/match4/600/800',
  },
  {
    id: 5,
    name: 'Velvet Clutch Bag',
    slug: 'velvet-clutch-bag',
    price: '$85',
    store: 'Artisan Leather Co.',
    distance: '1.7 km',
    matchScore: 85,
    imageSrc: 'https://picsum.photos/seed/match5/600/800',
  },
  {
    id: 6,
    name: 'Suede Ankle Boots',
    slug: 'suede-ankle-boots',
    price: '$210',
    store: 'Sole Society',
    distance: '4.1 km',
    matchScore: 82,
    imageSrc: 'https://picsum.photos/seed/match6/600/800',
  },
]

export default function FindMyMatch() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedStyle, setSelectedStyle] = useState(null)
  const [selectedBudget, setSelectedBudget] = useState(null)
  const [uploadedPhoto, setUploadedPhoto] = useState(null)
  const stepContentRef = useRef(null)
  const fileInputRef = useRef(null)

  const animateStepTransition = (direction = 'next') => {
    if (!stepContentRef.current) return
    const xFrom = direction === 'next' ? 60 : -60
    gsap.fromTo(
      stepContentRef.current,
      { opacity: 0, x: xFrom },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }

  const goToStep = (step, direction = 'next') => {
    if (!stepContentRef.current) return
    const xTo = direction === 'next' ? -60 : 60
    gsap.to(stepContentRef.current, {
      opacity: 0,
      x: xTo,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentStep(step)
      },
    })
  }

  useEffect(() => {
    animateStepTransition(currentStep > 1 ? 'next' : 'next')
  }, [currentStep])

  useEffect(() => {
    if (currentStep === 5) {
      const timer = setTimeout(() => {
        goToStep(6, 'next')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1, 'next')
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1, 'back')
    }
  }

  const handleSkip = () => {
    if (currentStep < TOTAL_STEPS) {
      goToStep(currentStep + 1, 'next')
    }
  }

  const handleStartOver = () => {
    setSelectedEvent(null)
    setSelectedStyle(null)
    setSelectedBudget(null)
    setUploadedPhoto(null)
    goToStep(1, 'back')
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedPhoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const getPreferenceSummary = () => {
    const pills = []
    if (selectedEvent) {
      const event = eventTypes.find((e) => e.id === selectedEvent)
      if (event) pills.push(event.title)
    }
    if (selectedStyle) {
      const style = stylePreferences.find((s) => s.id === selectedStyle)
      if (style) pills.push(style.title)
    }
    if (selectedBudget) {
      const budget = budgetRanges.find((b) => b.id === selectedBudget)
      if (budget) pills.push(budget.label)
    }
    if (uploadedPhoto) {
      pills.push('Photo uploaded')
    }
    return pills
  }

  const progressPercent = (currentStep / TOTAL_STEPS) * 100

  return (
    <div className="bg-gray-50 dark:bg-dark min-h-screen">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:px-8">
        {/* Progress bar */}
        {currentStep <= 5 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Step {currentStep} of {TOTAL_STEPS}
              </span>
              <span className="text-sm font-medium text-primary-600">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/5">
              <div
                className="h-full rounded-full bg-primary-600 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-3 hidden sm:grid sm:grid-cols-6 sm:gap-2">
              {stepLabels.map((label, index) => (
                <span
                  key={label}
                  className={`text-center text-xs font-medium ${
                    index + 1 <= currentStep ? 'text-primary-600' : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Step content */}
        <div ref={stepContentRef}>
          {/* Step 1: Event Type */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  What's the occasion?
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  Tell us about your event so we can find the perfect outfit
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {eventTypes.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => setSelectedEvent(event.id)}
                    className={`group rounded-xl border p-6 text-left transition-all duration-200 ${
                      selectedEvent === event.id
                        ? 'border-primary-600 bg-primary-600/10'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="text-3xl">{event.emoji}</span>
                    <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{event.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Style Preference */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  What's your style?
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  Choose the aesthetic that speaks to you
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {stylePreferences.map((style) => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    className={`group rounded-xl border p-6 text-left transition-all duration-200 ${
                      selectedStyle === style.id
                        ? 'border-primary-600 bg-primary-600/10'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className="text-3xl">{style.emoji}</span>
                    <h3 className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{style.title}</h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{style.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Budget Range */}
          {currentStep === 3 && (
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  What's your budget?
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  We'll find the best matches within your range
                </p>
              </div>
              <div className="mx-auto max-w-md space-y-3">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    type="button"
                    onClick={() => setSelectedBudget(budget.id)}
                    className={`w-full rounded-xl border px-6 py-4 text-center text-sm font-semibold transition-all duration-200 ${
                      selectedBudget === budget.id
                        ? 'border-primary-600 bg-primary-600/10 text-gray-900 dark:text-white'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {budget.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Selfie Upload */}
          {currentStep === 4 && (
            <div>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Upload a photo for better matches
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  Optional — helps us match colors and styles to you
                </p>
              </div>
              <div className="mx-auto max-w-md">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {uploadedPhoto ? (
                  <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <img
                      src={uploadedPhoto}
                      alt="Uploaded photo"
                      className="aspect-square w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedPhoto(null)
                        if (fileInputRef.current) fileInputRef.current.value = ''
                      }}
                      className="absolute right-3 top-3 rounded-full bg-dark/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-dark"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-16 transition-colors hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-100 dark:hover:bg-white/5"
                  >
                    <CameraIcon className="size-12 text-gray-500" />
                    <span className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">Upload Photo</span>
                    <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">JPG, PNG up to 10MB</span>
                  </button>
                )}
                <p className="mt-4 text-center text-xs text-gray-500">
                  Your photo is used only for color matching and is not stored
                </p>
                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Skip this step
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Processing */}
          {currentStep === 5 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="relative">
                <SparklesIcon className="size-16 text-primary-600 animate-pulse" />
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                  <div className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary-600/60" />
                  <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-primary-600/40" />
                  <div className="absolute left-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary-600/50" />
                  <div className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-primary-600/30" />
                </div>
              </div>
              <h2 className="mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                Finding your perfect matches...
              </h2>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400">Analyzing your preferences</p>
              <div className="mt-8 flex items-center gap-2">
                <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '0ms' }} />
                <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '150ms' }} />
                <div className="size-2 animate-bounce rounded-full bg-primary-600" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Step 6: Results */}
          {currentStep === 6 && (
            <div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Your Matches
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                  Curated picks based on your preferences
                </p>
              </div>

              {/* Preference summary pills */}
              {getPreferenceSummary().length > 0 && (
                <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
                  {getPreferenceSummary().map((pill) => (
                    <span
                      key={pill}
                      className="rounded-full bg-gray-100 dark:bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              )}

              {/* Results grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-3">
                {matchedProducts.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                      <Link to={`/products/${product.slug}`}>
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      {/* Match score badge */}
                      <div className="absolute right-2 top-2 rounded-full bg-primary-600 px-2.5 py-1">
                        <span className="text-xs font-bold text-white">{product.matchScore}%</span>
                      </div>

                      {/* Distance badge */}
                      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-dark/80 px-2 py-1 backdrop-blur-sm">
                        <MapPinIcon className="size-3 text-primary-600" />
                        <span className="text-xs font-medium text-white">{product.distance}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <Link to={`/products/${product.slug}`}>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white transition-colors group-hover:text-primary-600">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{product.store}</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        {currentStep !== 5 && (
          <div className="mt-12 flex items-center justify-between">
            <div>
              {currentStep > 1 && currentStep !== 6 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white transition-colors hover:bg-gray-200 dark:hover:bg-white/10"
                >
                  <ArrowLeftIcon className="size-4" />
                  Back
                </button>
              )}
              {currentStep === 6 && (
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white transition-colors hover:bg-gray-200 dark:hover:bg-white/10"
                >
                  <ArrowLeftIcon className="size-4" />
                  Start Over
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {currentStep < 5 && currentStep !== 4 && (
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-4 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
                >
                  Skip
                </button>
              )}
              {currentStep < 5 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
                >
                  Next
                  <ArrowRightIcon className="size-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
