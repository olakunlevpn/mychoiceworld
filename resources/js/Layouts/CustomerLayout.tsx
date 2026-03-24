import { useState, type PropsWithChildren } from 'react'
import FlashToast from '@/Components/FlashToast'
import { Dialog, DialogBackdrop, DialogPanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    Bars3Icon, MagnifyingGlassIcon, XMarkIcon, BellIcon, SparklesIcon,
    HomeIcon, MagnifyingGlassCircleIcon, ClipboardDocumentListIcon, UserCircleIcon,
    SunIcon, MoonIcon,
} from '@heroicons/react/24/outline'
import {
    HomeIcon as HomeIconSolid, MagnifyingGlassCircleIcon as MagnifyingGlassCircleIconSolid,
    SparklesIcon as SparklesIconSolid, ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
    UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/24/solid'
import { Link, router, usePage } from '@inertiajs/react'
import SiteLogo from '@/Components/SiteLogo'
import { useTheme } from '@/contexts/ThemeContext'
import type { SharedProps } from '@/types'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Discover', href: '/products' },
    { name: 'AI Stylist', href: '/find-my-match' },
]

const mobileTabLinks = [
    { name: 'Home', href: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'Discover', href: '/products', icon: MagnifyingGlassCircleIcon, activeIcon: MagnifyingGlassCircleIconSolid },
    { name: 'AI Match', href: '/find-my-match', icon: SparklesIcon, activeIcon: SparklesIconSolid },
    { name: 'Reservations', href: '/customer/reservations', icon: ClipboardDocumentListIcon, activeIcon: ClipboardDocumentListIconSolid },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon, activeIcon: UserCircleIconSolid },
]

export default function CustomerLayout({ children }: PropsWithChildren) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { isDark, toggleTheme } = useTheme()
    const { auth, settings } = usePage().props as unknown as SharedProps
    const user = auth.user!
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'

    const isActiveTab = (href: string) => {
        if (href === '/') return currentPath === '/'
        return currentPath.startsWith(href)
    }

    const handleLogout = () => {
        router.post('/logout')
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-dark">
            {/* Mobile menu */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 data-[closed]:opacity-0" />
                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel transition className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-gray-50 dark:bg-dark pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
                        <div className="flex px-4 pb-2 pt-5">
                            <button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2 rounded-md p-2 text-gray-500 dark:text-gray-400">
                                <XMarkIcon className="size-6" />
                            </button>
                        </div>
                        <div className="space-y-1 px-4 py-6">
                            {navLinks.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5">
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        <div className="space-y-1 border-t border-gray-200 dark:border-gray-700 px-4 py-6">
                            <Link href="/customer/reservations" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5">My Reservations</Link>
                            <Link href="/customer/wishlist" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5">Wishlist</Link>
                            <Link href="/customer/reviews" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5">My Reviews</Link>
                            <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5">Profile</Link>
                            <button type="button" onClick={handleLogout} className="block w-full rounded-md px-3 py-3 text-left text-base font-medium text-red-400 hover:bg-gray-100 dark:hover:bg-white/5">Logout</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Header */}
            <header className="relative z-10">
                <nav aria-label="Top">
                    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md border-b border-gray-200 dark:border-transparent">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                {/* Logo (desktop) */}
                                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                    <Link href="/">
                                        <SiteLogo variant="desktop" className="h-12 w-auto" />
                                    </Link>
                                </div>

                                {/* Nav links (desktop) */}
                                <div className="hidden h-full lg:flex">
                                    <div className="flex h-full items-center space-x-8 px-4">
                                        {navLinks.map((link) => (
                                            <Link key={link.name} href={link.href} className="flex items-center text-sm font-medium text-gray-700 dark:text-white hover:text-primary-600 transition-colors">
                                                {link.name === 'AI Stylist' && <SparklesIcon className="mr-1.5 size-4 text-primary-600" />}
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile: hamburger + search */}
                                <div className="flex flex-1 items-center lg:hidden">
                                    <button type="button" onClick={() => setMobileMenuOpen(true)} className="-ml-2 p-2 text-gray-700 dark:text-white">
                                        <Bars3Icon className="size-6" />
                                    </button>
                                    <Link href="/search" className="ml-2 p-2 text-gray-700 dark:text-white">
                                        <MagnifyingGlassIcon className="size-6" />
                                    </Link>
                                </div>

                                {/* Logo (mobile) */}
                                <Link href="/" className="lg:hidden">
                                    <SiteLogo variant="mobile" className="h-8 w-auto" />
                                </Link>

                                {/* Right icons */}
                                <div className="flex flex-1 items-center justify-end">
                                    <Link href="/search" className="hidden p-2 text-gray-700 dark:text-white hover:text-primary-600 lg:block">
                                        <MagnifyingGlassIcon className="size-6" />
                                    </Link>

                                    <button type="button" onClick={toggleTheme} className="p-2 text-gray-700 dark:text-white hover:text-primary-600 lg:ml-2" aria-label="Toggle theme">
                                        {isDark ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
                                    </button>

                                    {/* Notification bell */}
                                    <Link href="/customer/notifications" className="relative p-2 text-gray-700 dark:text-white hover:text-primary-600 lg:ml-2">
                                        <BellIcon className="size-6" />
                                        {auth.unread_notifications_count > 0 && (
                                            <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                                {auth.unread_notifications_count}
                                            </span>
                                        )}
                                    </Link>

                                    {/* User dropdown (desktop) */}
                                    <div className="hidden lg:ml-4 lg:block">
                                        <Menu as="div" className="relative">
                                            <MenuButton className="flex items-center rounded-full bg-gray-200 dark:bg-white/10 p-0.5">
                                                {user.avatar ? (
                                                    <img src={user.avatar} alt={user.name} className="size-8 rounded-full object-cover" />
                                                ) : (
                                                    <span className="flex size-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">{user.name.charAt(0)}</span>
                                                )}
                                            </MenuButton>
                                            <MenuItems transition className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                                                <div className="py-1">
                                                    <MenuItem><Link href="/customer/reservations" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">My Reservations</Link></MenuItem>
                                                    <MenuItem><Link href="/customer/wishlist" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">Wishlist</Link></MenuItem>
                                                    <MenuItem><Link href="/customer/reviews" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">My Reviews</Link></MenuItem>
                                                    <MenuItem><Link href="/profile" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">Profile</Link></MenuItem>
                                                    <div className="border-t border-gray-200 dark:border-gray-700" />
                                                    <MenuItem><button type="button" onClick={handleLogout} className="block w-full px-4 py-2 text-left text-sm text-red-400 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">Logout</button></MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Main content */}
            <div className="flex-1 pb-20 lg:pb-0">
                {children}
            </div>

            {/* Footer — hidden on mobile (bottom tabs take over) */}
            <footer className="hidden border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-dark lg:block">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} {settings.site_name}. All rights reserved. Webdesign <a href="https://maylancer.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-gray-500 hover:text-primary-600">Maylancer</a></p>
                        <div className="flex items-center gap-x-6">
                            <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms</Link>
                            <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy</Link>
                            <Link href="/help" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Help</Link>
                        </div>
                    </div>
                </div>
            </footer>

            <FlashToast />

            {/* Mobile bottom tab bar */}
            <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 dark:border-gray-800 bg-gray-50/95 dark:bg-dark/95 backdrop-blur-md lg:hidden">
                <nav className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
                    {mobileTabLinks.map((tab) => {
                        const active = isActiveTab(tab.href)
                        const Icon = active ? tab.activeIcon : tab.icon
                        return (
                            <Link key={tab.name} href={tab.href} className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${active ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'}`}>
                                <Icon className="size-5" />
                                {tab.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </div>
    )
}
