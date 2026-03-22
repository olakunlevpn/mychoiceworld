import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface CartItem {
  id: string | number
  name: string
  price: string
  quantity: number
  imageSrc: string
  slug: string
  store: string
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string | number) => void
  updateQuantity: (id: string | number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[^0-9.]/g, '')) || 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('cart')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const persist = (newItems: CartItem[]) => {
    setItems(newItems)
    localStorage.setItem('cart', JSON.stringify(newItems))
  }

  const addItem = useCallback(
    (item: Omit<CartItem, 'quantity'>) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id)
        const next = existing
          ? prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
          : [...prev, { ...item, quantity: 1 }]
        localStorage.setItem('cart', JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const removeItem = useCallback(
    (id: string | number) => {
      setItems((prev) => {
        const next = prev.filter((i) => i.id !== id)
        localStorage.setItem('cart', JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const updateQuantity = useCallback(
    (id: string | number, quantity: number) => {
      if (quantity < 1) {
        removeItem(id)
        return
      }
      setItems((prev) => {
        const next = prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        localStorage.setItem('cart', JSON.stringify(next))
        return next
      })
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    persist([])
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + parsePrice(i.price) * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
