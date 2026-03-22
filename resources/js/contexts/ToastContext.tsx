import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
    CheckCircleIcon,
    XCircleIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastMessage {
    id: number
    title: string
    description?: string
    type: ToastType
    visible: boolean
}

interface ToastOptions {
    title: string
    description?: string
    type: ToastType
}

interface ToastContextValue {
    toast: (options: ToastOptions) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

let toastId = 0

const iconMap = {
    success: CheckCircleIcon,
    error: XCircleIcon,
    info: InformationCircleIcon,
    warning: ExclamationTriangleIcon,
}

const iconColorMap = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([])
    const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)))
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id))
        }, 300)
    }, [])

    const toast = useCallback(
        (options: ToastOptions) => {
            const id = ++toastId
            setToasts((prev) => [...prev, { ...options, id, visible: false }])
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: true } : t)))
                })
            })
            const timer = setTimeout(() => {
                removeToast(id)
                timersRef.current.delete(id)
            }, 5000)
            timersRef.current.set(id, timer)
        },
        [removeToast],
    )

    useEffect(() => {
        return () => {
            timersRef.current.forEach((timer) => clearTimeout(timer))
        }
    }, [])

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                {toasts.map((t) => {
                    const Icon = iconMap[t.type]
                    return (
                        <div
                            key={t.id}
                            className={`flex max-w-sm items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-xl transition-all duration-300 ease-in-out ${
                                t.visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                            }`}
                        >
                            <Icon className={`size-5 shrink-0 ${iconColorMap[t.type]}`} />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.title}</p>
                                {t.description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{t.description}</p>}
                            </div>
                            <button type="button" onClick={() => removeToast(t.id)} className="shrink-0 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                                <XMarkIcon className="size-5" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast(): ToastContextValue {
    const context = useContext(ToastContext)
    if (!context) throw new Error('useToast must be used within a ToastProvider')
    return context
}
