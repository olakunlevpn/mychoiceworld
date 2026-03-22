import { Head, router } from '@inertiajs/react'
import VendorLayout from '@/Layouts/VendorLayout'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import type { VendorAnalytic } from '@/types'

interface Props {
    analytics: VendorAnalytic[]
    totals: { views: number; unique_visitors: number; reservations: number; completed: number }
    days: number
}

const periodOptions = [
    { label: '7 days', value: 7 },
    { label: '30 days', value: 30 },
    { label: '90 days', value: 90 },
]

export default function VendorAnalyticsIndex({ analytics, totals, days }: Props) {
    const chartData = analytics.map((a) => ({
        date: format(new Date(a.date), 'MMM d'),
        views: a.profile_views + a.product_views,
        profile_views: a.profile_views,
        product_views: a.product_views,
        reservations: a.reservations_made,
        completed: a.reservations_completed,
    }))

    return (
        <VendorLayout>
            <Head title="Analytics" />

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
                <div className="flex gap-2">
                    {periodOptions.map((opt) => (
                        <button key={opt.value} type="button" onClick={() => router.get('/vendor/analytics', { days: opt.value }, { preserveState: true })} className={`rounded-full px-3 py-1.5 text-xs font-medium ${days === opt.value ? 'bg-primary-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                    { label: 'Total Views', value: totals.views },
                    { label: 'Unique Visitors', value: totals.unique_visitors },
                    { label: 'Reservations', value: totals.reservations },
                    { label: 'Completed', value: totals.completed },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Views Chart */}
            <div className="mt-8 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Views Over Time</h2>
                <div className="mt-4 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 8 }} labelStyle={{ color: '#fff' }} />
                            <Line type="monotone" dataKey="profile_views" stroke="#14878E" strokeWidth={2} name="Profile Views" dot={false} />
                            <Line type="monotone" dataKey="product_views" stroke="#2b969e" strokeWidth={2} name="Product Views" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Reservations Chart */}
            <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Reservations</h2>
                <div className="mt-4 h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
                            <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 8 }} labelStyle={{ color: '#fff' }} />
                            <Bar dataKey="reservations" fill="#14878E" name="Made" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="completed" fill="#2b969e" name="Completed" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Daily Breakdown */}
            {analytics.length > 0 && (
                <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Profile</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Products</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Reservations</th>
                                <th className="px-4 py-3 text-right text-xs font-medium uppercase text-gray-500">Completed</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900/50">
                            {analytics.slice().reverse().slice(0, 14).map((a) => (
                                <tr key={a.id}>
                                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{format(new Date(a.date), 'MMM d, yyyy')}</td>
                                    <td className="px-4 py-3 text-right text-sm text-gray-500">{a.profile_views}</td>
                                    <td className="px-4 py-3 text-right text-sm text-gray-500">{a.product_views}</td>
                                    <td className="px-4 py-3 text-right text-sm text-gray-500">{a.reservations_made}</td>
                                    <td className="px-4 py-3 text-right text-sm text-gray-500">{a.reservations_completed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </VendorLayout>
    )
}
