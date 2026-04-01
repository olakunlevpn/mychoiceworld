import { Head, Link, router } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { ClockIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface Props {
    vendorStatus: 'pending' | 'approved' | 'rejected' | 'suspended'
    rejectionReason?: string
}

export default function VendorStatus({ vendorStatus, rejectionReason }: Props) {
    return (
        <PublicLayout>
            <Head title="Vendor Status" />
            <div className="mx-auto max-w-lg px-4 py-24 sm:px-6 text-center">
                {vendorStatus === 'pending' && (
                    <>
                        <ClockIcon className="mx-auto size-16 text-yellow-400" />
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Application Under Review</h1>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Your vendor application is currently being reviewed. We will notify you once a decision has been made.</p>
                    </>
                )}
                {vendorStatus === 'rejected' && (
                    <>
                        <XCircleIcon className="mx-auto size-16 text-red-400" />
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Application Rejected</h1>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Unfortunately, your vendor application has been rejected.</p>
                        {rejectionReason && (
                            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-left">
                                <p className="text-xs font-semibold text-red-400">Reason</p>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{rejectionReason}</p>
                            </div>
                        )}
                    </>
                )}
                {vendorStatus === 'suspended' && (
                    <>
                        <XCircleIcon className="mx-auto size-16 text-orange-400" />
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Account Suspended</h1>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Your vendor account has been suspended. Please contact support for more information.</p>
                    </>
                )}
                {vendorStatus === 'approved' && (
                    <>
                        <CheckCircleIcon className="mx-auto size-16 text-green-400" />
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">You're Approved!</h1>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Your vendor account is active. Head to your dashboard to start managing your store.</p>
                        <Link href="/vendor/dashboard" className="mt-6 inline-flex items-center rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700">Go to Dashboard</Link>
                    </>
                )}
                <div className="mt-8 flex flex-col items-center gap-3">
                    <Link href="/" className="text-sm font-medium text-primary-600 hover:text-primary-500">&larr; Back to Home</Link>
                    <button type="button" onClick={() => router.post('/logout')} className="text-sm font-medium text-red-400 hover:text-red-500">
                        Sign Out
                    </button>
                </div>
            </div>
        </PublicLayout>
    )
}
