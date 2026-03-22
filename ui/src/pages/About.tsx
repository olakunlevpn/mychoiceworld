// @ts-nocheck
import { Link } from 'react-router-dom'
import {
  BuildingStorefrontIcon,
  GlobeAltIcon,
  HeartIcon,
  SparklesIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const values = [
  {
    icon: BuildingStorefrontIcon,
    title: 'Support Local',
    description:
      'We believe in empowering local boutiques and independent stores by giving them the tools to thrive in a digital world.',
  },
  {
    icon: HeartIcon,
    title: 'Curated Quality',
    description:
      'Every vendor on our platform is carefully vetted to ensure you get access to genuine, high-quality products.',
  },
  {
    icon: SparklesIcon,
    title: 'Personalised Discovery',
    description:
      'Our AI-powered matching helps you discover products that fit your unique style, taste, and preferences.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Trust & Transparency',
    description:
      'From verified vendors to honest reviews, we build trust at every step of your shopping experience.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Community First',
    description:
      'We connect shoppers with their neighbourhood stores, strengthening local communities one reservation at a time.',
  },
  {
    icon: UserGroupIcon,
    title: 'Inclusive Fashion',
    description:
      'Fashion for everyone. We champion diversity by bringing together stores that cater to all styles, sizes, and budgets.',
  },
]

const stats = [
  { label: 'Local Boutiques', value: '200+' },
  { label: 'Unique Products', value: '5,000+' },
  { label: 'Happy Customers', value: '10,000+' },
  { label: 'Cities', value: '25+' },
]

const team = [
  {
    name: 'Amara Johnson',
    role: 'Co-Founder & CEO',
    image: 'https://picsum.photos/seed/team1/400/400',
  },
  {
    name: 'Daniel Okoro',
    role: 'Co-Founder & CTO',
    image: 'https://picsum.photos/seed/team2/400/400',
  },
  {
    name: 'Sofia Martinez',
    role: 'Head of Design',
    image: 'https://picsum.photos/seed/team3/400/400',
  },
  {
    name: 'James Chen',
    role: 'Head of Partnerships',
    image: 'https://picsum.photos/seed/team4/400/400',
  },
]

export default function About() {
  return (
    <div className="bg-gray-50 dark:bg-dark">
      {/* Hero */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/about-hero/1920/800"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Reimagining how you shop local
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
            MyChoice MyWorld bridges the gap between online convenience and the charm of local shopping.
            We connect you with boutiques in your neighbourhood so you can discover, reserve, and pick up
            unique products — all while supporting the stores that make your community special.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">Our Mission</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Empowering local stores, delighting shoppers
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
            We started MyChoice MyWorld with a simple idea: what if you could browse your favourite local
            stores from the comfort of your home, find exactly what you're looking for, and have it waiting
            for you when you walk in? No more aimless browsing. No more missed opportunities. Just seamless,
            joyful shopping that keeps money in your community.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center"
            >
              <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">What We Believe</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Our values
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark p-6"
              >
                <value.icon className="size-8 text-primary-600" />
                <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">How It Works</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Shop local, made simple
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Discover',
              description: 'Browse products from local boutiques near you, or let our AI match you with your perfect style.',
            },
            {
              step: '02',
              title: 'Reserve',
              description: 'Found something you love? Reserve it instantly. The store will hold it for you — no commitment until you see it in person.',
            },
            {
              step: '03',
              title: 'Pick Up',
              description: 'Visit the store, try it on, and take it home. Simple, satisfying, and supporting your local community.',
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-600/10">
                <span className="text-lg font-bold text-primary-600">{item.step}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">The Team</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Meet the people behind the platform
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto size-28 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
                <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="rounded-2xl bg-primary-600 px-8 py-12 text-center sm:px-16">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to shop local?</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-primary-100">
            Join thousands of shoppers discovering amazing products from boutiques in their neighbourhood.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/discover"
              className="w-full rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-600 hover:bg-gray-100 sm:w-auto"
            >
              Start Exploring
            </Link>
            <Link
              to="/vendor/register"
              className="w-full rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
