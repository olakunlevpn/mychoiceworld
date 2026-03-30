import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

interface Coordinates {
    lat: number
    lng: number
}

interface LocationContextType {
    city: string
    setCity: (city: string) => void
    coordinates: Coordinates | null
    isDetecting: boolean
    detectLocation: () => void
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
    hasLocation: boolean
}

const LocationContext = createContext<LocationContextType | null>(null)

function getSavedCoordinates(): Coordinates | null {
    if (typeof window === 'undefined') return null
    const saved = localStorage.getItem('location_coords')
    if (!saved) return null
    try {
        const parsed = JSON.parse(saved)
        if (parsed.lat && parsed.lng) return parsed
    } catch { /* ignore */ }
    return null
}

export function LocationProvider({ children }: { children: ReactNode }) {
    const [city, setCity] = useState(() => {
        if (typeof window === 'undefined') return 'Detecting...'
        return localStorage.getItem('location_city') || 'Set Location'
    })
    const [coordinates, setCoordinates] = useState<Coordinates | null>(getSavedCoordinates)
    const [isDetecting, setIsDetecting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const updateLocation = useCallback((name: string, coords?: Coordinates) => {
        setCity(name)
        localStorage.setItem('location_city', name)
        if (coords) {
            setCoordinates(coords)
            localStorage.setItem('location_coords', JSON.stringify(coords))
        }
    }, [])

    const updateCity = useCallback((name: string) => {
        setCity(name)
        localStorage.setItem('location_city', name)
    }, [])

    const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<string> => {
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&zoom=18&addressdetails=1`,
                { headers: { 'User-Agent': 'MyChoiceMyWorld/1.0' } },
            )
            const data = await res.json()
            const addr = data.address
            if (!addr) return 'Unknown'

            const locality = addr.suburb || addr.neighbourhood || addr.city_district || addr.town || addr.village || addr.city || ''
            const district = addr.state_district || addr.county || ''
            const state = addr.state || ''

            const parts = [locality, district, state].filter(Boolean)
            return parts.length > 0 ? parts.join(', ') : 'Unknown'
        } catch {
            return 'Unknown'
        }
    }, [])

    const detectLocation = useCallback(() => {
        if (!navigator.geolocation) return

        setIsDetecting(true)
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                const coords = { lat: latitude, lng: longitude }
                const name = await reverseGeocode(latitude, longitude)
                updateLocation(name, coords)
                setIsDetecting(false)
            },
            (error) => {
                console.warn('Geolocation error:', error.message)
                setIsDetecting(false)
            },
            { timeout: 10000, enableHighAccuracy: false, maximumAge: 300000 },
        )
    }, [reverseGeocode, updateLocation])

    // Auto-detect on first visit if no saved location
    // Only works on HTTPS — silently skips on HTTP (local dev)
    useEffect(() => {
        const isSecure = typeof window !== 'undefined' && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')
        if (!coordinates && city === 'Set Location' && navigator.geolocation && isSecure) {
            detectLocation()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const openModal = useCallback(() => setIsModalOpen(true), [])
    const closeModal = useCallback(() => setIsModalOpen(false), [])

    return (
        <LocationContext.Provider
            value={{
                city,
                setCity: updateCity,
                coordinates,
                isDetecting,
                detectLocation,
                isModalOpen,
                openModal,
                closeModal,
                hasLocation: coordinates !== null,
            }}
        >
            {children}
        </LocationContext.Provider>
    )
}

export function useLocation() {
    const ctx = useContext(LocationContext)
    if (!ctx) throw new Error('useLocation must be used within LocationProvider')
    return ctx
}
