import { usePage } from '@inertiajs/react'
import { useTheme } from '@/contexts/ThemeContext'
import type { SharedProps } from '@/types'

interface SiteLogoProps {
    className?: string
    mobileClassName?: string
    variant?: 'desktop' | 'mobile'
}

export default function SiteLogo({ className = 'h-12 w-auto', mobileClassName, variant }: SiteLogoProps) {
    const { settings } = usePage().props as unknown as SharedProps
    const { isDark } = useTheme()

    const desktopLogo = isDark ? settings.logo_desktop_dark : settings.logo_desktop_light
    const mobileLogo = isDark ? settings.logo_mobile_dark : settings.logo_mobile_light
    const fallbackLogo = settings.logo_path

    if (variant === 'mobile') {
        const src = mobileLogo || fallbackLogo
        if (!src) return <span className="text-lg font-bold text-gray-900 dark:text-white">{settings.site_name}</span>
        return <img alt={settings.site_name} src={src} className={mobileClassName || className} />
    }

    if (variant === 'desktop') {
        const src = desktopLogo || fallbackLogo
        if (!src) return <span className="text-xl font-bold text-gray-900 dark:text-white">{settings.site_name}</span>
        return <img alt={settings.site_name} src={src} className={className} />
    }

    // Default: show desktop on lg+, mobile on smaller
    const dSrc = desktopLogo || fallbackLogo
    const mSrc = mobileLogo || fallbackLogo

    if (!dSrc && !mSrc) {
        return <span className="text-xl font-bold text-gray-900 dark:text-white">{settings.site_name}</span>
    }

    return (
        <>
            {dSrc && <img alt={settings.site_name} src={dSrc} className={`hidden lg:block ${className}`} />}
            {mSrc && <img alt={settings.site_name} src={mSrc} className={`lg:hidden ${mobileClassName || className}`} />}
            {!dSrc && !mSrc && <span className="text-xl font-bold text-gray-900 dark:text-white">{settings.site_name}</span>}
        </>
    )
}
