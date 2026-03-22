import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastProvider } from './components/UI/Toast.tsx'
import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'
import { LocationProvider } from './contexts/LocationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <LocationProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </LocationProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
)
