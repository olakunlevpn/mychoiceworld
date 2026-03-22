import { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const STORAGE_KEY = 'cookie_consent'

export default function CookieBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem(STORAGE_KEY)
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 800)
            return () => clearTimeout(timer)
        }
    }, [])

    const accept = () => {
        localStorage.setItem(STORAGE_KEY, 'accepted')
        setVisible(false)
    }

    const decline = () => {
        localStorage.setItem(STORAGE_KEY, 'declined')
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
            <div className="mx-auto max-w-4xl rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-2xl sm:flex sm:items-center sm:gap-6 sm:p-6">
                <div className="hidden shrink-0 sm:block">
                    <span className="text-3xl" role="img" aria-label="cookie">🍪</span>
                </div>

                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">We use cookies</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        We use cookies and similar technologies to improve your experience, analyse traffic, and personalise content.
                        {' '}
                        <Link href="/cookies" className="text-primary-600 hover:text-primary-500 underline underline-offset-2">
                            Learn more
                        </Link>
                    </p>
                </div>

                <div className="mt-4 flex items-center gap-3 sm:mt-0 sm:shrink-0">
                    <button
                        type="button"
                        onClick={decline}
                        className="rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        type="button"
                        onClick={accept}
                        className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
                    >
                        Accept all
                    </button>
                </div>

                <button
                    type="button"
                    onClick={decline}
                    className="absolute right-3 top-3 rounded-md p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 sm:relative sm:right-auto sm:top-auto"
                >
                    <XMarkIcon className="size-4" />
                </button>
            </div>
        </div>
    )
}
