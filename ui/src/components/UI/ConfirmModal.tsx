// @ts-nocheck
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'primary'
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
}: ConfirmModalProps) {
  const iconColor = variant === 'danger' ? 'text-red-500' : 'text-primary-600'
  const iconBg = variant === 'danger' ? 'bg-red-500/10' : 'bg-primary-600/10'
  const confirmBg = variant === 'danger' ? 'bg-red-600 hover:bg-red-500' : 'bg-primary-600 hover:bg-primary-500'

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-md transform rounded-xl bg-white dark:bg-gray-900 p-6 shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          <div className="flex flex-col items-center text-center">
            <div className={`flex size-12 items-center justify-center rounded-full ${iconBg}`}>
              <ExclamationTriangleIcon className={`size-6 ${iconColor}`} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-gray-100 dark:bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${confirmBg}`}
            >
              {confirmText}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
