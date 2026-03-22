// @ts-nocheck
import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  HeartIcon,
  XMarkIcon,
  UserCircleIcon,
  SparklesIcon,
  SunIcon,
  MoonIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'
import { Outlet, Link } from 'react-router-dom'
import CookieBanner from './CookieBanner'
import LocationModal from './LocationModal'
import { useTheme } from '../contexts/ThemeContext'
import { useLocation } from '../contexts/LocationContext'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Discover', href: '/discover' },
  { name: 'AI Stylist', href: '/find-my-match' },
]
const footerNavigation = {
  quickLinks: [
    { name: 'Discover', href: '/discover' },
    { name: 'AI Stylist', href: '/find-my-match' },
    { name: 'Become a Vendor', href: '/vendor/register' },
    { name: 'My Account', href: '/login' },
    { name: 'My Reservations', href: '/reservations' },
    { name: 'Wishlist', href: '/wishlist' },
  ],
  support: [
    { name: 'About Us', href: '/about' },
    { name: 'Help Center', href: '/help' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
}
const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
      </svg>
    ),
  },
]
const paymentMethods = [
  { name: 'Visa', icon: '/icons/visa-1@2x.png' },
  { name: 'MasterCard', icon: '/icons/mastercard@2x.png' },
  { name: 'PayPal', icon: '/icons/paypal@2x.png' },
  { name: 'Apple Pay', icon: '/icons/apple-pay@2x.png' },
  { name: 'Google Wallet', icon: '/icons/google-wallet@2x.png' },
  { name: 'American Express', icon: '/icons/american-express@2x.png' },
  { name: 'Discover', icon: '/icons/discover@2x.png' },
]

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { city, openModal } = useLocation()

  return (
    <div className="bg-gray-50 dark:bg-dark">
      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white dark:bg-dark pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-500 dark:text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            <div className="space-y-1 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="space-y-1 border-t border-gray-200 dark:border-gray-700 px-4 py-6">
              <button
                type="button"
                onClick={openModal}
                className="flex w-full items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <MapPinIcon className="size-5 text-primary-600" />
                <span>{city}</span>
                <span className="ml-auto text-xs font-medium text-primary-600">Change</span>
              </button>
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <HeartIcon className="size-5" />
                Wishlist
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-3 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              >
                Create an account
              </Link>
              <Link
                to="/vendor/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-medium text-primary-600 hover:bg-gray-100 dark:hover:bg-white/5"
              >
                Become a Vendor
              </Link>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Header */}
      <div className="bg-gray-50 dark:bg-dark">
        <header className="relative z-10">
          <nav aria-label="Top">
            {/* Top bar */}
            <div className="bg-gray-50 dark:bg-dark border-b border-gray-200 dark:border-gray-800">
              <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <button
                  type="button"
                  onClick={openModal}
                  className="hidden items-center gap-x-1.5 text-sm text-gray-700 dark:text-white hover:text-primary-600 lg:flex"
                >
                  <MapPinIcon className="size-4 text-primary-600" />
                  <span className="font-medium">{city}</span>
                  <span className="ml-1 text-xs font-medium text-primary-600">Change</span>
                </button>
                <div className="flex items-center space-x-6">
                  <Link to="/vendor/register" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    Become a Vendor
                  </Link>
                  <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                    Sign in
                  </Link>
                  <Link to="/register" className="text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-100">
                    Create an account
                  </Link>
                </div>
              </div>
            </div>

            {/* Main nav */}
            <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md backdrop-filter border-b border-gray-200 dark:border-transparent">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <Link to="/">
                      <span className="sr-only">myChoice</span>
                      <img alt="myChoice" src="/logo-desktop-light.png" className="h-12 w-auto dark:hidden" />
                      <img alt="myChoice" src="/logo-desktop-dark.png" className="hidden h-12 w-auto dark:block" />
                    </Link>
                  </div>

                  <div className="hidden h-full lg:flex">
                    <div className="flex h-full items-center space-x-8 px-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          className="flex items-center text-sm font-medium text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-600 transition-colors"
                        >
                          {link.name === 'AI Stylist' && (
                            <SparklesIcon className="mr-1.5 size-4 text-primary-600" />
                          )}
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile: hamburger + search */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button type="button" onClick={() => setMobileMenuOpen(true)} className="-ml-2 p-2 text-gray-700 dark:text-white">
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                    <Link to="/search" className="ml-2 p-2 text-gray-700 dark:text-white">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                    </Link>
                  </div>

                  {/* Logo (mobile) */}
                  <Link to="/" className="lg:hidden">
                    <span className="sr-only">myChoice</span>
                    <img alt="myChoice" src="/logo-mobile-light.png" className="h-8 w-auto dark:hidden" />
                    <img alt="myChoice" src="/logo-mobile-dark.png" className="hidden h-8 w-auto dark:block" />
                  </Link>

                  {/* Right icons */}
                  <div className="flex flex-1 items-center justify-end gap-1">
                    {/* Search (desktop) */}
                    <Link to="/search" className="hidden p-2 text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-600 lg:block">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
                    </Link>

                    {/* Theme toggle */}
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="p-2 text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-600 transition-colors"
                      aria-label="Toggle theme"
                    >
                      {isDark ? (
                        <SunIcon className="size-5" />
                      ) : (
                        <MoonIcon className="size-5" />
                      )}
                    </button>

                    {/* Wishlist */}
                    <Link to="/wishlist" className="p-2 text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-600">
                      <HeartIcon aria-hidden="true" className="size-6" />
                      <span className="sr-only">Wishlist</span>
                    </Link>

                    {/* Account */}
                    <Link to="/login" className="ml-1 p-2 text-gray-700 dark:text-white hover:text-primary-600 dark:hover:text-primary-600">
                      <span className="sr-only">Account</span>
                      <UserCircleIcon aria-hidden="true" className="size-6" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>

      <Outlet />

      <CookieBanner />
      <LocationModal />

      {/* Footer */}
      <footer aria-labelledby="footer-heading" className="bg-gray-100 dark:bg-dark border-t border-gray-200 dark:border-gray-800">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <div className="py-16 lg:grid lg:grid-cols-4 lg:gap-x-8">
            {/* Brand column */}
            <div>
              <Link to="/">
                <img alt="myChoice" src="/logo-desktop-light.png" className="h-10 w-auto dark:hidden" />
                <img alt="myChoice" src="/logo-desktop-dark.png" className="hidden h-10 w-auto dark:block" />
              </Link>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                Your trusted marketplace for discovering fashion from local boutiques. Reserve online, try in store.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-x-1.5 rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-white">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                  Secure
                </span>
                <span className="inline-flex items-center gap-x-1.5 rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-white">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" /></svg>
                  Easy Pickup
                </span>
                <span className="inline-flex items-center gap-x-1.5 rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-white">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
                  Top Rated
                </span>
              </div>

              <div className="mt-8">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Follow Us</h3>
                <div className="mt-4 flex space-x-4">
                  {socialLinks.map((item) => (
                    <a key={item.name} href={item.href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-600">
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-12 lg:mt-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Quick Links</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="mt-12 lg:mt-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Support</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.support.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="mt-12 lg:mt-0">
              <div className="rounded-lg border border-gray-300 dark:border-gray-700 p-6">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Stay Updated</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Get exclusive deals</p>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                  Subscribe to our newsletter for exclusive deals, new arrivals, and updates.
                </p>
                <form className="mt-4">
                  <input
                    id="footer-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    aria-label="Email address"
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
                  />
                  <button
                    type="submit"
                    className="mt-3 flex w-full items-center justify-center gap-x-2 rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus:outline-none"
                  >
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
                    Subscribe Now
                  </button>
                </form>
                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  By subscribing, you agree to our{' '}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-500">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Contact info bar */}
          <div className="border-t border-gray-200 dark:border-gray-800 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-center gap-x-4 rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-4">
                <svg className="size-6 shrink-0 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Address</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">123 Commerce Street, Business District, City 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-4">
                <svg className="size-6 shrink-0 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Phone</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-4">
                <svg className="size-6 shrink-0 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">support@mychoice.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment methods */}
          <div className="border-t border-gray-200 dark:border-gray-800 py-8">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Accepted Payment Methods</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {paymentMethods.map((method) => (
                <img key={method.name} src={method.icon} alt={method.name} className="h-8 w-auto rounded" />
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 dark:border-gray-800 py-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2026 myChoice. All rights reserved.</p>
              <a href="https://maylancer.org" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400">Webdesign Maylancer</a>
              <div className="flex items-center gap-x-6">
                <Link to="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Service</Link>
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</Link>
                <Link to="/cookies" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
