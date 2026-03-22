import { useState, type PropsWithChildren } from 'react'
import FlashToast from '@/Components/FlashToast'
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
    Bars3Icon, XMarkIcon, HomeIcon, ShoppingBagIcon, CalendarDaysIcon,
    BuildingStorefrontIcon, ChartBarIcon, StarIcon, BellIcon, ArrowLeftIcon,
    ArrowTopRightOnSquareIcon, ArrowRightStartOnRectangleIcon,
    SunIcon, MoonIcon, ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { Link, router, usePage } from '@inertiajs/react'
import { useTheme } from '@/contexts/ThemeContext'
import type { SharedProps } from '@/types'

const sidebarNavigation = [
    { name: 'Dashboard', href: '/vendor/dashboard', icon: HomeIcon },
    {
        name: 'Products', href: '/vendor/products', icon: ShoppingBagIcon,
        children: [
            { name: 'All Products', href: '/vendor/products' },
            { name: 'Add Product', href: '/vendor/products/create' },
        ],
    },
    { name: 'Reservations', href: '/vendor/reservations', icon: CalendarDaysIcon },
    { name: 'Store Profile', href: '/vendor/store', icon: BuildingStorefrontIcon },
    { name: 'Analytics', href: '/vendor/analytics', icon: ChartBarIcon },
    { name: 'Reviews', href: '/vendor/reviews', icon: StarIcon },
]

const pageTitleMap: Record<string, string> = {
    '/vendor/dashboard': 'Dashboard',
    '/vendor/products': 'Products',
    '/vendor/products/create': 'Add Product',
    '/vendor/reservations': 'Reservations',
    '/vendor/store': 'Store Profile',
    '/vendor/analytics': 'Analytics',
    '/vendor/reviews': 'Reviews',
}

function getPageTitle(pathname: string): string {
    if (pageTitleMap[pathname]) return pageTitleMap[pathname]
    if (/^\/vendor\/products\/[^/]+\/edit$/.test(pathname)) return 'Edit Product'
    if (/^\/vendor\/reservations\/[^/]+$/.test(pathname)) return 'Reservation Detail'
    return 'Dashboard'
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/vendor/dashboard'
    const { auth } = usePage().props as unknown as SharedProps
    const vendor = auth.vendor

    const isActive = (href: string) => {
        if (href === '/vendor/dashboard') return currentPath === '/vendor/dashboard'
        return currentPath.startsWith(href)
    }

    return (
        <div className="flex h-full flex-col">
            {/* Store info */}
            <div className="flex items-center gap-x-3 px-6 py-5">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-600/20">
                    {vendor?.logo ? (
                        <img src={vendor.logo} alt={vendor.store_name} className="size-10 rounded-full object-cover" />
                    ) : (
                        <BuildingStorefrontIcon className="size-5 text-primary-600" />
                    )}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{vendor?.store_name || 'My Store'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Vendor Dashboard</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
                {sidebarNavigation.map((item) => {
                    const active = isActive(item.href)

                    if ('children' in item && item.children) {
                        return (
                            <Disclosure key={item.name} defaultOpen={active}>
                                {({ open }) => (
                                    <div>
                                        <DisclosureButton className={`group flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'border-l-2 border-primary-600 bg-primary-600/10 text-primary-600' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}>
                                            <item.icon className={`size-5 shrink-0 ${active ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'}`} />
                                            <span className="flex-1 text-left">{item.name}</span>
                                            <ChevronRightIcon className={`size-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} />
                                        </DisclosureButton>
                                        <DisclosurePanel className="ml-8 mt-1 space-y-1">
                                            {item.children.map((child) => (
                                                <Link key={child.name} href={child.href} onClick={onNavigate} className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${currentPath === child.href ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </DisclosurePanel>
                                    </div>
                                )}
                            </Disclosure>
                        )
                    }

                    return (
                        <Link key={item.name} href={item.href} onClick={onNavigate} className={`group flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? 'border-l-2 border-primary-600 bg-primary-600/10 text-primary-600' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'}`}>
                            <item.icon className={`size-5 shrink-0 ${active ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400'}`} />
                            <span className="flex-1">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom actions */}
            <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-4 space-y-1">
                {vendor?.slug && (
                    <a href={`/stores/${vendor.slug}`} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <ArrowTopRightOnSquareIcon className="size-5 shrink-0" />
                        View My Store
                    </a>
                )}
                <Link href="/" onClick={onNavigate} className="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors">
                    <ArrowLeftIcon className="size-5 shrink-0" />
                    Back to Site
                </Link>
                <button type="button" onClick={() => router.post('/logout')} className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                    <ArrowRightStartOnRectangleIcon className="size-5 shrink-0" />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default function VendorLayout({ children }: PropsWithChildren) {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
    const { isDark, toggleTheme } = useTheme()
    const { auth } = usePage().props as unknown as SharedProps
    const user = auth.user!
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/vendor/dashboard'
    const pageTitle = getPageTitle(currentPath)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-dark">
            {/* Mobile sidebar */}
            <Dialog open={mobileSidebarOpen} onClose={setMobileSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop transition className="fixed inset-0 bg-black/50 transition-opacity duration-300 data-[closed]:opacity-0" />
                <div className="fixed inset-0 z-50 flex">
                    <DialogPanel transition className="relative flex w-full max-w-64 transform flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
                        <div className="absolute right-0 top-0 flex pt-4 pr-2">
                            <button type="button" onClick={() => setMobileSidebarOpen(false)} className="-m-2 rounded-md p-2 text-gray-500 dark:text-gray-400">
                                <XMarkIcon className="size-6" />
                            </button>
                        </div>
                        <SidebarContent onNavigate={() => setMobileSidebarOpen(false)} />
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <SidebarContent />
                </div>
            </div>

            {/* Top bar */}
            <div className="sticky top-0 z-40 lg:ml-64">
                <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 sm:px-6">
                    <button type="button" onClick={() => setMobileSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-500 dark:text-gray-400 lg:hidden">
                        <Bars3Icon className="size-6" />
                    </button>
                    <h1 className="hidden lg:block text-lg font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>

                    <div className="flex items-center gap-x-4">
                        <button type="button" onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-label="Toggle theme">
                            {isDark ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
                        </button>

                        <Link href="/customer/notifications" className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <BellIcon className="size-6" />
                            {auth.unread_notifications_count > 0 && (
                                <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{auth.unread_notifications_count}</span>
                            )}
                        </Link>

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
                                    <MenuItem><Link href="/vendor/store" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">Store Profile</Link></MenuItem>
                                    <MenuItem><Link href="/profile" className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">Account Settings</Link></MenuItem>
                                    <div className="border-t border-gray-200 dark:border-gray-700" />
                                    <MenuItem><button type="button" onClick={() => router.post('/logout')} className="block w-full px-4 py-2 text-left text-sm text-red-400 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5">Logout</button></MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <main className="lg:ml-64 p-6 lg:p-8">
                {children}
            </main>

            <FlashToast />
        </div>
    )
}
