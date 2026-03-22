// @ts-nocheck
import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  StarIcon,
  BellIcon,
  ArrowLeftIcon,
  ArrowTopRightOnSquareIcon,
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { useTheme } from '../contexts/ThemeContext'

const sidebarNavigation = [
  { name: 'Dashboard', href: '/vendor/dashboard', icon: HomeIcon },
  {
    name: 'Products',
    href: '/vendor/products',
    icon: ShoppingBagIcon,
    children: [
      { name: 'All Products', href: '/vendor/products' },
      { name: 'Add Product', href: '/vendor/products/create' },
    ],
  },
  { name: 'Reservations', href: '/vendor/reservations', icon: CalendarDaysIcon, badge: 3 },
  { name: 'Store Profile', href: '/vendor/store', icon: BuildingStorefrontIcon },
  { name: 'Analytics', href: '/vendor/analytics', icon: ChartBarIcon },
  { name: 'Reviews', href: '/vendor/reviews', icon: StarIcon, badge: 2 },
]

const pageTitleMap: Record<string, string> = {
  '/vendor/dashboard': 'Dashboard',
  '/vendor/products': 'Products',
  '/vendor/products/create': 'Add Product',
  '/vendor/reservations': 'Reservations',
  '/vendor/store': 'Store Profile',
  '/vendor/analytics': 'Analytics',
  '/vendor/reviews': 'Reviews',
  '/vendor/notifications': 'Notifications',
}

function getPageTitle(pathname: string): string {
  // Check exact matches first
  if (pageTitleMap[pathname]) {
    return pageTitleMap[pathname]
  }
  // Check for /vendor/products/:id/edit pattern
  if (/^\/vendor\/products\/[^/]+\/edit$/.test(pathname)) {
    return 'Edit Product'
  }
  return 'Dashboard'
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/vendor/dashboard') {
      return location.pathname === '/vendor/dashboard'
    }
    return location.pathname.startsWith(href)
  }

  const isChildActive = (href: string) => {
    return location.pathname === href
  }

  return (
    <div className="flex h-full flex-col">
      {/* Store logo area */}
      <div className="flex items-center gap-x-3 px-6 py-5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-600/20">
          <BuildingStorefrontIcon className="size-5 text-primary-600" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">Luxe Boutique</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Vendor Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarNavigation.map((item) => {
          const active = isActive(item.href)

          if (item.children) {
            return (
              <Disclosure key={item.name} defaultOpen={active}>
                {({ open }) => (
                  <div>
                    <DisclosureButton
                      className={`group flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        active
                          ? 'border-l-2 border-primary-600 bg-primary-600/10 text-primary-600'
                          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <item.icon className={`size-5 shrink-0 ${active ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
                      <span className="flex-1 text-left">{item.name}</span>
                      <ChevronRightIcon
                        className={`size-4 shrink-0 transition-transform duration-200 ${
                          open ? 'rotate-90' : ''
                        } ${active ? 'text-primary-600' : 'text-gray-400 dark:text-gray-500'}`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const childActive = isChildActive(child.href)
                        return (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={onNavigate}
                            className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                              childActive
                                ? 'text-primary-600'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          >
                            {child.name}
                          </Link>
                        )
                      })}
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            )
          }

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onNavigate}
              className={`group flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? 'border-l-2 border-primary-600 bg-primary-600/10 text-primary-600'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <item.icon className={`size-5 shrink-0 ${active ? 'text-primary-600' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`} />
              <span className="flex-1">{item.name}</span>
              {item.badge != null && (
                <span className="bg-yellow-500/10 text-yellow-400 text-xs px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-gray-200 dark:border-gray-800 px-3 py-4 space-y-1">
        <a
          href="/stores/luxe-boutique"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowTopRightOnSquareIcon className="size-5 shrink-0" />
          View My Store
        </a>
        <Link
          to="/"
          onClick={onNavigate}
          className="flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="size-5 shrink-0" />
          Back to Site
        </Link>
        <button
          type="button"
          className="flex w-full items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
        >
          <ArrowRightStartOnRectangleIcon className="size-5 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default function VendorLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const pageTitle = getPageTitle(location.pathname)

  return (
    <div className="bg-gray-50 dark:bg-dark">
      {/* Mobile sidebar */}
      <Dialog open={mobileSidebarOpen} onClose={setMobileSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-50 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-64 transform flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="absolute right-0 top-0 flex pt-4 pr-2">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <span className="sr-only">Close sidebar</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
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
          {/* Left: hamburger on mobile, page title on desktop */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>

          {/* Page title for desktop */}
          <h1 className="hidden lg:block text-lg font-semibold text-gray-900 dark:text-white">
            {pageTitle}
          </h1>

          {/* Right: notification bell + avatar dropdown */}
          <div className="flex items-center gap-x-4">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <span className="sr-only">Toggle theme</span>
              {isDark ? (
                <SunIcon aria-hidden="true" className="size-6" />
              ) : (
                <MoonIcon aria-hidden="true" className="size-6" />
              )}
            </button>

            {/* Notification bell */}
            <Link to="/vendor/notifications" className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
              <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </Link>

            {/* Vendor avatar dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="flex items-center rounded-full bg-gray-200 dark:bg-white/10 p-0.5">
                <img
                  src="https://picsum.photos/seed/vendor/80/80"
                  alt="Vendor avatar"
                  className="size-8 rounded-full object-cover"
                />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <Link
                      to="/vendor/store"
                      className="flex items-center gap-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5 data-[focus]:text-gray-900 dark:data-[focus]:text-white"
                    >
                      <BuildingStorefrontIcon className="size-4" />
                      Store Profile
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      to="/vendor/settings"
                      className="flex items-center gap-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5 data-[focus]:text-gray-900 dark:data-[focus]:text-white"
                    >
                      <Cog6ToothIcon className="size-4" />
                      Account Settings
                    </Link>
                  </MenuItem>
                  <div className="border-t border-gray-200 dark:border-gray-700" />
                  <MenuItem>
                    <button
                      type="button"
                      className="flex w-full items-center gap-x-2 px-4 py-2 text-left text-sm text-red-400 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/5"
                    >
                      <ArrowRightStartOnRectangleIcon className="size-4" />
                      Logout
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="lg:ml-64">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
