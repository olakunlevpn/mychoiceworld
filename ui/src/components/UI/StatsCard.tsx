// @ts-nocheck
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'

interface StatsCardProps {
  icon: React.ComponentType<any>
  label: string
  value: string | number
  trend?: { value: string; positive: boolean }
  iconColor?: string
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  trend,
  iconColor = 'bg-primary-600/10 text-primary-600',
}: StatsCardProps) {
  const [iconBg, iconText] = iconColor.includes(' ')
    ? iconColor.split(' ')
    : [`${iconColor}/10`, iconColor]

  return (
    <div className="rounded-xl bg-white dark:bg-gray-900 p-6">
      <div className="flex items-center gap-4">
        <div className={`flex size-10 items-center justify-center rounded-lg ${iconBg}`}>
          <Icon className={`size-5 ${iconText}`} />
        </div>
        <div className="flex-1">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
            {trend.positive ? (
              <ArrowUpIcon className="size-4" />
            ) : (
              <ArrowDownIcon className="size-4" />
            )}
            {trend.value}
          </div>
        )}
      </div>
    </div>
  )
}
