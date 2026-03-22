import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useForm, usePage } from '@inertiajs/react'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import type { SharedProps } from '@/types'

interface Props {
    open: boolean
    onClose: () => void
    product?: {
        id: number
        name: string
        price: number
        image?: string
        store?: string
        vendor_id?: number
    }
}

export default function ReservationModal({ open, onClose, product }: Props) {
    const { settings } = usePage().props as unknown as SharedProps
    const [success, setSuccess] = useState(false)
    const [reservationCode, setReservationCode] = useState('')

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product?.id || 0,
        customer_note: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/customer/reservations', {
            preserveScroll: true,
            onSuccess: (page) => {
                setSuccess(true)
                setReservationCode((page.props as any)?.flash?.reservation_code || 'RSV-...')
                reset()
            },
        })
    }

    const handleClose = () => {
        setSuccess(false)
        setReservationCode('')
        reset()
        onClose()
    }

    if (!product) return null

    const formatPrice = (cents: number) => `${settings.currency_symbol}${(cents / 100).toFixed(0)}`

    return (
        <Dialog open={open} onClose={handleClose} className="relative z-50">
            <DialogBackdrop transition className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 data-[closed]:opacity-0" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel transition className="w-full max-w-md rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-xl transition-all duration-300 data-[closed]:scale-95 data-[closed]:opacity-0">
                    {success ? (
                        /* Success state */
                        <div className="text-center">
                            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-500/10">
                                <CheckCircleIcon className="size-10 text-green-400" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">Reservation Confirmed!</h3>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Your item has been reserved. Show this code at the store.</p>
                            {reservationCode && (
                                <div className="mt-4 rounded-lg bg-gray-100 dark:bg-white/5 px-4 py-3">
                                    <p className="text-xs text-gray-400">Reservation Code</p>
                                    <p className="mt-1 text-lg font-bold tracking-wider text-primary-600">{reservationCode}</p>
                                </div>
                            )}
                            <div className="mt-6 flex gap-3">
                                <button type="button" onClick={handleClose} className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 py-2.5 text-sm font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5">Continue Shopping</button>
                                <a href="/customer/reservations" className="flex-1 rounded-md bg-primary-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-700">View Reservations</a>
                            </div>
                        </div>
                    ) : (
                        /* Form state */
                        <>
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reserve Item</h3>
                                <button type="button" onClick={handleClose} className="rounded-md p-1 text-gray-400 hover:text-gray-500"><XMarkIcon className="size-5" /></button>
                            </div>

                            {/* Product preview */}
                            <div className="mt-4 flex gap-4 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                                {product.image && <img src={product.image} alt={product.name} className="size-16 rounded-lg object-cover" />}
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{product.name}</p>
                                    {product.store && <p className="text-xs text-gray-500 dark:text-gray-400">{product.store}</p>}
                                    <p className="mt-1 text-sm font-bold text-primary-600">{formatPrice(product.price)}</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                <input type="hidden" value={product.id} />
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Notes (optional)</label>
                                    <textarea value={data.customer_note} onChange={(e) => setData('customer_note', e.target.value)} rows={3} placeholder="Any special requests or fitting notes..." className="mt-1.5 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600" />
                                </div>

                                <div className="rounded-lg bg-gray-100 dark:bg-white/5 px-3 py-2.5">
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        <strong className="text-gray-700 dark:text-gray-300">Note:</strong> Your reservation will be held for {settings.reservation_hold_hours} hours. Visit the store to try on and purchase.
                                    </p>
                                </div>

                                {errors.product_id && <p className="text-xs text-red-400">{errors.product_id}</p>}

                                <div className="flex gap-3">
                                    <button type="button" onClick={handleClose} className="flex-1 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-white/5 py-2.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10">Cancel</button>
                                    <button type="submit" disabled={processing} className="flex-1 rounded-md bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                                        {processing ? 'Reserving...' : 'Confirm Reservation'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    )
}
