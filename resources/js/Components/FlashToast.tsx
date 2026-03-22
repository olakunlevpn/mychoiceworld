import { useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { useToast } from '@/contexts/ToastContext'
import type { SharedProps } from '@/types'

export default function FlashToast() {
    const { flash } = usePage().props as unknown as SharedProps
    const { toast } = useToast()

    useEffect(() => {
        if (flash.success) {
            toast({ title: flash.success, type: 'success' })
        }
        if (flash.error) {
            toast({ title: flash.error, type: 'error' })
        }
    }, [flash.success, flash.error])

    return null
}
