import { useState, useEffect, useRef, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

// Fix default marker icon
const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

interface Props {
    latitude: number | null
    longitude: number | null
    onLocationChange: (lat: number, lng: number, address?: string) => void
    className?: string
}

interface NominatimResult {
    display_name: string
    lat: string
    lon: string
    address?: Record<string, string>
}

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng.lat, e.latlng.lng)
        },
    })
    return null
}

function MapRecenter({ lat, lng }: { lat: number; lng: number }) {
    const map = useMap()
    useEffect(() => {
        map.setView([lat, lng], map.getZoom())
    }, [lat, lng, map])
    return null
}

export default function MapLocationPicker({ latitude, longitude, onLocationChange, className }: Props) {
    const [position, setPosition] = useState<[number, number]>(
        latitude && longitude ? [latitude, longitude] : [20.5937, 78.9629] // Default: India center
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [suggestions, setSuggestions] = useState<NominatimResult[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
    }, [])

    const handleMapClick = useCallback(async (lat: number, lng: number) => {
        setPosition([lat, lng])

        // Reverse geocode
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
                { headers: { 'User-Agent': 'MyChoiceMyWorld/1.0' } },
            )
            const data = await res.json()
            onLocationChange(lat, lng, data.display_name)
        } catch {
            onLocationChange(lat, lng)
        }
    }, [onLocationChange])

    const searchLocation = useCallback((query: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (query.length < 3) { setSuggestions([]); setShowSuggestions(false); return }

        debounceRef.current = setTimeout(async () => {
            setIsSearching(true)
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&addressdetails=1&countrycodes=in`,
                    { headers: { 'User-Agent': 'MyChoiceMyWorld/1.0' } },
                )
                const data: NominatimResult[] = await res.json()
                setSuggestions(data)
                setShowSuggestions(data.length > 0)
            } catch {
                setSuggestions([])
            }
            setIsSearching(false)
        }, 300)
    }, [])

    const selectSuggestion = (result: NominatimResult) => {
        const lat = parseFloat(result.lat)
        const lng = parseFloat(result.lon)
        setPosition([lat, lng])
        setSearchQuery(result.display_name)
        setSuggestions([])
        setShowSuggestions(false)
        onLocationChange(lat, lng, result.display_name)
    }

    const handleDetectLocation = () => {
        if (!navigator.geolocation) return
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude
                const lng = pos.coords.longitude
                setPosition([lat, lng])
                handleMapClick(lat, lng)
            },
            () => {},
            { timeout: 10000, enableHighAccuracy: true },
        )
    }

    return (
        <div className={className}>
            {/* Search bar */}
            <div className="relative mb-3">
                <div className="relative">
                    <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); searchLocation(e.target.value) }}
                        onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                        placeholder="Search for a location..."
                        autoComplete="off"
                        className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 py-2 pl-9 pr-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                    />
                    {isSearching && <div className="absolute right-3 top-1/2 -translate-y-1/2"><div className="size-4 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600" /></div>}
                </div>
                {showSuggestions && (
                    <div className="absolute left-0 right-0 z-[1000] mt-1 max-h-48 overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
                        {suggestions.map((s, i) => (
                            <button key={i} type="button" onClick={() => selectSuggestion(s)} className="flex w-full items-start gap-2 px-3 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-white/5 border-b border-gray-100 dark:border-gray-800 last:border-0">
                                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary-600" />
                                <span className="text-gray-700 dark:text-gray-300 line-clamp-2">{s.display_name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 mb-3">
                <button type="button" onClick={handleDetectLocation} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5">
                    <svg className="size-3.5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    Use my location
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">or click on the map to set location</span>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700" style={{ height: '300px' }}>
                <MapContainer center={position} zoom={latitude && longitude ? 15 : 5} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={markerIcon} />
                    <MapClickHandler onMapClick={handleMapClick} />
                    <MapRecenter lat={position[0]} lng={position[1]} />
                </MapContainer>
            </div>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
            </p>
        </div>
    )
}
