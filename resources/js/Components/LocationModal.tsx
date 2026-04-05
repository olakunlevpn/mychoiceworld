import { useState, useEffect, useRef, useCallback } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from '@/contexts/LocationContext'

interface Suggestion {
    display_name: string
    lat: string
    lon: string
    address?: {
        suburb?: string
        city_district?: string
        city?: string
        town?: string
        village?: string
        state_district?: string
        county?: string
        state?: string
    }
}

export default function LocationModal() {
    const { city, setCity, setLocation, isDetecting, detectLocation, isModalOpen, closeModal } = useLocation()
    const [inputValue, setInputValue] = useState(city)
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (isModalOpen) setInputValue(city === 'Set Location' ? '' : city)
    }, [isModalOpen, city])

    useEffect(() => {
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [])

    const searchSuggestions = useCallback((query: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (query.length < 2) { setSuggestions([]); setShowSuggestions(false); return }

        debounceRef.current = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=in`,
                    { headers: { 'User-Agent': 'MyChoiceMyWorld/1.0' } },
                )
                const data: Suggestion[] = await res.json()
                setSuggestions(data)
                setShowSuggestions(data.length > 0)
            } catch {
                setSuggestions([])
            }
        }, 300)
    }, [])

    const handleInputChange = (value: string) => {
        setInputValue(value)
        searchSuggestions(value)
    }

    const selectSuggestion = (suggestion: Suggestion) => {
        const addr = suggestion.address
        const locality = addr?.suburb || addr?.city_district || addr?.town || addr?.village || addr?.city || ''
        const district = addr?.state_district || addr?.county || ''
        const state = addr?.state || ''
        const displayName = [locality, district, state].filter(Boolean).join(', ') || suggestion.display_name

        const coords = { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) }
        setInputValue(displayName)
        setLocation(displayName, coords)
        setSuggestions([])
        setShowSuggestions(false)
        closeModal()
    }

    const handleSave = async () => {
        const trimmed = inputValue.trim()
        if (!trimmed) { closeModal(); return }

        setCity(trimmed)
        setShowSuggestions(false)
        closeModal()

        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(trimmed)}&format=json&limit=1&addressdetails=1&countrycodes=in`,
                { headers: { 'User-Agent': 'MyChoiceMyWorld/1.0' } },
            )
            const data = await res.json()
            if (data[0]?.lat && data[0]?.lon) {
                const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
                setLocation(trimmed, coords)
            }
        } catch { /* geocoding failed silently */ }
    }

    const handleDetect = () => {
        detectLocation()
        setShowSuggestions(false)
        closeModal()
    }

    return (
        <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-sm rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 shadow-xl transition-all duration-300 data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-x-2">
                            <MapPinIcon className="size-5 text-primary-600" />
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Set Your Location</h3>
                        </div>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="rounded-md p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                        >
                            <XMarkIcon className="size-5" />
                        </button>
                    </div>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Enter your city to discover boutiques and outfits nearby.
                    </p>

                    <div className="relative mt-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                            name="city" id="location-city" placeholder="Search for area, street name..."
                            autoComplete="off"
                            className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => selectSuggestion(s)}
                                        className="flex w-full items-start gap-2.5 px-4 py-3 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                                    >
                                        <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary-600" />
                                        <span className="text-gray-700 dark:text-gray-300 line-clamp-2">{s.display_name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleDetect}
                        disabled={isDetecting}
                        className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50"
                    >
                        {isDetecting ? (
                            <>
                                <div className="size-4 animate-spin rounded-full border-2 border-gray-400 border-t-primary-600" />
                                Detecting...
                            </>
                        ) : (
                            <>
                                <svg className="size-4 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                Use my current location
                            </>
                        )}
                    </button>

                    <div className="mt-4 flex gap-x-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            className="flex-1 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
                        >
                            Save
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
