import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface LocationContextType {
  city: string
  setCity: (city: string) => void
  isDetecting: boolean
  detectLocation: () => void
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const LocationContext = createContext<LocationContextType | null>(null)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState(() => localStorage.getItem('location_city') || 'Trivandrum')
  const [isDetecting, setIsDetecting] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const updateCity = useCallback((name: string) => {
    setCity(name)
    localStorage.setItem('location_city', name)
  }, [])

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) return

    setIsDetecting(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&zoom=10`,
          )
          const data = await res.json()
          const name =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            'Unknown'
          updateCity(name)
        } catch {
          // silently fail — keep current city
        } finally {
          setIsDetecting(false)
        }
      },
      () => {
        setIsDetecting(false)
      },
      { timeout: 10000 },
    )
  }, [updateCity])

  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <LocationContext.Provider
      value={{ city, setCity: updateCity, isDetecting, detectLocation, isModalOpen, openModal, closeModal }}
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
