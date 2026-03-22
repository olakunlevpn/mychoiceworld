// @ts-nocheck
import { useState } from 'react'
import {
  EyeIcon,
  CalendarDaysIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  UsersIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days']

const stats = [
  {
    label: 'Total Views',
    value: '2,456',
    change: '+12%',
    trend: 'up',
    icon: EyeIcon,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
  },
  {
    label: 'Unique Visitors',
    value: '1,189',
    change: '+8%',
    trend: 'up',
    icon: UsersIcon,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
  {
    label: 'Reservations Made',
    value: '89',
    change: '+15%',
    trend: 'up',
    icon: CalendarDaysIcon,
    iconBg: 'bg-primary-600/10',
    iconColor: 'text-primary-600',
  },
  {
    label: 'Completed Reservations',
    value: '72',
    change: '+10%',
    trend: 'up',
    icon: CheckCircleIcon,
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
  },
]

const dailyBreakdown = [
  { date: 'Mar 14, 2026', views: 187, visitors: 98, reservations: 8, completed: 6 },
  { date: 'Mar 13, 2026', views: 203, visitors: 112, reservations: 11, completed: 9 },
  { date: 'Mar 12, 2026', views: 165, visitors: 87, reservations: 6, completed: 5 },
  { date: 'Mar 11, 2026', views: 221, visitors: 105, reservations: 9, completed: 7 },
  { date: 'Mar 10, 2026', views: 198, visitors: 94, reservations: 7, completed: 6 },
  { date: 'Mar 9, 2026', views: 178, visitors: 89, reservations: 5, completed: 4 },
  { date: 'Mar 8, 2026', views: 142, visitors: 76, reservations: 4, completed: 3 },
]

const viewsChartData = [
  { day: 'Mon', height: 60 },
  { day: 'Tue', height: 45 },
  { day: 'Wed', height: 80 },
  { day: 'Thu', height: 55 },
  { day: 'Fri', height: 90 },
  { day: 'Sat', height: 70 },
  { day: 'Sun', height: 35 },
]

const reservationsChartData = [
  { day: 'Mon', height: 40 },
  { day: 'Tue', height: 65 },
  { day: 'Wed', height: 30 },
  { day: 'Thu', height: 75 },
  { day: 'Fri', height: 85 },
  { day: 'Sat', height: 50 },
  { day: 'Sun', height: 20 },
]

const topProducts = [
  { rank: 1, name: 'Elegant Evening Gown', views: 342, reservations: 28, conversion: '8.2%' },
  { rank: 2, name: 'Silk Cocktail Dress', views: 289, reservations: 22, conversion: '7.6%' },
  { rank: 3, name: 'Pearl Drop Earrings', views: 231, reservations: 19, conversion: '8.2%' },
  { rank: 4, name: 'Classic Navy Suit', views: 198, reservations: 12, conversion: '6.1%' },
  { rank: 5, name: 'Cashmere Wrap Scarf', views: 174, reservations: 8, conversion: '4.6%' },
]

function BarChart({ data, label }: { data: typeof viewsChartData; label: string }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{label}</h2>
      <div className="mt-6 flex h-64 items-end justify-between gap-3 px-2">
        {data.map((bar) => (
          <div key={bar.day} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-md bg-primary-600"
              style={{ height: `${bar.height}%` }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">{bar.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Analytics() {
  const [activeRange, setActiveRange] = useState('Last 30 days')

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-6 pt-16 sm:pt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Analytics</h1>
            <div className="flex gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setActiveRange(range)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    activeRange === range
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white dark:bg-gray-900 p-6">
              <div className="flex items-center gap-4">
                <div className={`flex size-12 items-center justify-center rounded-full ${stat.iconBg}`}>
                  <stat.icon className={`size-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                {stat.trend === 'up' ? (
                  <ArrowUpIcon className="size-4 text-green-400" />
                ) : (
                  <ArrowDownIcon className="size-4 text-red-400" />
                )}
                <span
                  className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500">vs last period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Side by Side */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BarChart data={viewsChartData} label="Views Over Time" />
          <BarChart data={reservationsChartData} label="Reservations by Day" />
        </div>

        {/* Top Products */}
        <div className="mt-8">
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Rank
                    </th>
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Product Name
                    </th>
                    <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Views
                    </th>
                    <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Reservations
                    </th>
                    <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Conversion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product) => (
                    <tr key={product.rank} className="border-b border-gray-200/50 dark:border-gray-800/50">
                      <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{product.rank}</td>
                      <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                      <td className="py-3 text-right text-sm text-gray-600 dark:text-gray-300">{product.views}</td>
                      <td className="py-3 text-right text-sm text-gray-600 dark:text-gray-300">
                        {product.reservations}
                      </td>
                      <td className="py-3 text-right text-sm text-primary-600">
                        {product.conversion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Daily Breakdown */}
        <div className="mt-8">
          <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Daily Breakdown</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Date
                    </th>
                    <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Views
                    </th>
                    <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Unique Visitors
                    </th>
                    <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Reservations
                    </th>
                    <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Completed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dailyBreakdown.map((day) => (
                    <tr key={day.date} className="border-b border-gray-200/50 dark:border-gray-800/50">
                      <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{day.date}</td>
                      <td className="py-3 text-right text-sm text-gray-600 dark:text-gray-300">{day.views}</td>
                      <td className="py-3 text-right text-sm text-gray-600 dark:text-gray-300">{day.visitors}</td>
                      <td className="py-3 text-right text-sm text-gray-600 dark:text-gray-300">{day.reservations}</td>
                      <td className="py-3 text-right text-sm text-gray-600 dark:text-gray-300">{day.completed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pb-24" />
      </div>
    </div>
  )
}
