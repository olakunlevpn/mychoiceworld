import { useState, useEffect, useRef, useCallback } from 'react'
import { usePage } from '@inertiajs/react'
import type { SharedProps } from '@/types'

export interface AddressComponents {
    address: string
    city: string
    state: string
    country: string
    postalCode: string
}

interface Props {
    latitude: number | null
    longitude: number | null
    onLocationChange: (lat: number, lng: number, components: AddressComponents) => void
    className?: string
}

declare global {
    interface Window {
        google: any
        initGoogleMaps?: () => void
    }
}

function loadGoogleMaps(apiKey: string): Promise<void> {
    return new Promise((resolve) => {
        if (window.google?.maps?.places) { resolve(); return }
        if (document.querySelector('script[src*="maps.googleapis.com"]')) {
            window.initGoogleMaps = () => resolve()
            return
        }
        window.initGoogleMaps = () => resolve()
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
    })
}

function parseGooglePlace(place: any): AddressComponents {
    const get = (type: string): string => {
        const comp = place.address_components?.find((c: any) => c.types.includes(type))
        return comp?.long_name || ''
    }
    const getShort = (type: string): string => {
        const comp = place.address_components?.find((c: any) => c.types.includes(type))
        return comp?.short_name || ''
    }

    const streetNumber = get('street_number')
    const route = get('route')
    const sublocality = get('sublocality_level_1') || get('sublocality')
    const address = [streetNumber, route, sublocality].filter(Boolean).join(', ') || place.formatted_address || ''

    return {
        address,
        city: get('locality') || get('administrative_area_level_2') || get('sublocality_level_1') || '',
        state: get('administrative_area_level_1') || '',
        country: get('country') || '',
        postalCode: get('postal_code') || '',
    }
}

export default function MapLocationPicker({ latitude, longitude, onLocationChange, className }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const apiKey = settings.google_maps_api_key

    const mapRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const mapInstanceRef = useRef<any>(null)
    const markerRef = useRef<any>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isDetecting, setIsDetecting] = useState(false)
    const [coords, setCoords] = useState<{ lat: number; lng: number }>({
        lat: latitude || 20.5937,
        lng: longitude || 78.9629,
    })

    const onLocationChangeRef = useRef(onLocationChange)
    onLocationChangeRef.current = onLocationChange

    // Load Google Maps
    useEffect(() => {
        if (!apiKey) return
        loadGoogleMaps(apiKey).then(() => setIsLoaded(true))
    }, [apiKey])

    // Initialize map + autocomplete
    useEffect(() => {
        if (!isLoaded || !mapRef.current || !inputRef.current) return
        if (mapInstanceRef.current) return

        const google = window.google
        const center = { lat: coords.lat, lng: coords.lng }

        const map = new google.maps.Map(mapRef.current, {
            center,
            zoom: latitude && longitude ? 16 : 5,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        })
        mapInstanceRef.current = map

        const marker = new google.maps.Marker({
            map,
            position: center,
            draggable: true,
        })
        markerRef.current = marker

        // Autocomplete
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            fields: ['geometry', 'address_components', 'formatted_address'],
        })
        autocomplete.bindTo('bounds', map)

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()
            if (!place.geometry?.location) return

            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()

            map.setCenter({ lat, lng })
            map.setZoom(17)
            marker.setPosition({ lat, lng })
            setCoords({ lat, lng })

            const components = parseGooglePlace(place)
            onLocationChangeRef.current(lat, lng, components)
        })

        // Click on map
        map.addListener('click', (e: any) => {
            const lat = e.latLng.lat()
            const lng = e.latLng.lng()
            marker.setPosition({ lat, lng })
            setCoords({ lat, lng })
            reverseGeocode(lat, lng)
        })

        // Drag marker
        marker.addListener('dragend', () => {
            const pos = marker.getPosition()
            const lat = pos.lat()
            const lng = pos.lng()
            setCoords({ lat, lng })
            reverseGeocode(lat, lng)
        })
    }, [isLoaded])

    const reverseGeocode = useCallback((lat: number, lng: number) => {
        if (!window.google) return
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
            if (status === 'OK' && results?.[0]) {
                const components = parseGooglePlace(results[0])
                if (inputRef.current) inputRef.current.value = results[0].formatted_address
                onLocationChangeRef.current(lat, lng, components)
            } else {
                onLocationChangeRef.current(lat, lng, { address: '', city: '', state: '', country: '', postalCode: '' })
            }
        })
    }, [])

    const handleDetectLocation = () => {
        if (!navigator.geolocation) return
        setIsDetecting(true)
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude
                const lng = pos.coords.longitude
                setCoords({ lat, lng })
                if (mapInstanceRef.current && markerRef.current) {
                    mapInstanceRef.current.setCenter({ lat, lng })
                    mapInstanceRef.current.setZoom(17)
                    markerRef.current.setPosition({ lat, lng })
                }
                reverseGeocode(lat, lng)
                setIsDetecting(false)
            },
            () => { setIsDetecting(false) },
            { timeout: 10000, enableHighAccuracy: true },
        )
    }

    if (!apiKey) {
        return (
            <div className={className}>
                <div className="rounded-lg border border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3 text-sm text-yellow-700 dark:text-yellow-400">
                    Google Maps API key not configured. Please add it in Admin &gt; Settings &gt; Platform.
                </div>
            </div>
        )
    }

    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Store Location</label>

            {/* Google Places Autocomplete */}
            <input
                ref={inputRef}
                type="text"
                placeholder="Start typing your store address..."
                className="block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 mb-3"
            />

            <div className="flex items-center gap-2 mb-3">
                <button type="button" onClick={handleDetectLocation} disabled={isDetecting} className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 disabled:opacity-50">
                    {isDetecting ? (
                        <><div className="size-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-primary-600" /> Detecting...</>
                    ) : (
                        <><svg className="size-3.5 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg> Use my current location</>
                    )}
                </button>
                <span className="text-xs text-gray-500 dark:text-gray-400">or click on the map to pin your store</span>
            </div>

            {/* Google Map */}
            <div ref={mapRef} className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700" style={{ height: '280px', background: '#1a1a2e' }}>
                {!isLoaded && (
                    <div className="flex h-full items-center justify-center">
                        <div className="size-6 animate-spin rounded-full border-2 border-gray-400 border-t-primary-600" />
                    </div>
                )}
            </div>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Drag the marker or click the map to fine-tune. Coordinates: {coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}
            </p>
        </div>
    )
}
