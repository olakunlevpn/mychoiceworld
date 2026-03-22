import { Head, Link, router } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { BellIcon } from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'
import type { AppNotification, PaginatedResponse } from '@/types'

interface Props {
    notifications: PaginatedResponse<AppNotification>
}

export default function Notifications({ notifications }: Props) {
    const markAsRead = (id: string) => {
        router.put(`/customer/notifications/${id}/read`, {}, { preserveState: true, preserveScroll: true })
    }

    const markAllAsRead = () => {
        router.put('/customer/notifications/read-all', {}, { preserveState: true })
    }

    return (
        <CustomerLayout>
            <Head title="Notifications" />
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                    {notifications.data.some(n => !n.read_at) && (
                        <button type="button" onClick={markAllAsRead} className="text-sm font-medium text-primary-600 hover:text-primary-500">Mark all as read</button>
                    )}
                </div>

                {notifications.data.length === 0 ? (
                    <div className="py-16 text-center">
                        <BellIcon className="mx-auto size-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No notifications</h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">You're all caught up!</p>
                    </div>
                ) : (
                    <div className="mt-6 space-y-2">
                        {notifications.data.map((notif) => (
                            <button
                                key={notif.id}
                                type="button"
                                onClick={() => {
                                    if (!notif.read_at) markAsRead(notif.id)
                                    if (notif.data.link) router.visit(notif.data.link)
                                }}
                                className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-shadow hover:shadow-md ${notif.read_at ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900' : 'border-primary-600/20 bg-primary-600/5'}`}
                            >
                                <div className={`mt-0.5 flex size-2.5 shrink-0 rounded-full ${notif.read_at ? 'bg-transparent' : 'bg-primary-600'}`} />
                                <div className="min-w-0 flex-1">
                                    <p className={`text-sm font-semibold ${notif.read_at ? 'text-gray-900 dark:text-white' : 'text-primary-600'}`}>{notif.data.title}</p>
                                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{notif.data.message}</p>
                                    <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {notifications.last_page > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        {notifications.links.map((link, i) => (
                            <Link key={i} href={link.url || '#'} preserveState preserveScroll className={`rounded-md px-3 py-2 text-sm font-medium ${link.active ? 'bg-primary-600 text-white' : link.url ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300 cursor-not-allowed'}`} >{link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}</Link>
                        ))}
                    </div>
                )}
            </div>
        </CustomerLayout>
    )
}
