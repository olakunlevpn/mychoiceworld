import { Head, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import type { SharedProps } from '@/types'

export default function About() {
    const { settings } = usePage().props as unknown as SharedProps

    return (
        <PublicLayout>
            <Head title="About Us" />

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    About Us
                </h1>

                <div className="mt-10 space-y-10">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Who We Are
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            {settings.site_name} is a fashion discovery platform that connects you with local
                            boutiques and vendors in your area. We believe that fashion is personal, and the best
                            way to find your perfect outfit is to explore what is available near you.
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Our platform bridges the gap between online convenience and the in-store experience.
                            Browse curated collections from local vendors, reserve the items you love, and try
                            them on at the store before you commit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Our Mission
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We are on a mission to make fashion discovery effortless and accessible. By empowering
                            local boutiques with a digital presence and giving customers the tools to discover
                            unique styles nearby, we are building a more connected and vibrant fashion community.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            How It Works
                        </h2>

                        <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                            For Customers
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Discover fashion from boutiques near you, save items to your wishlist, and reserve
                            outfits to try on in-store. Our AI Stylist can even help you find the perfect match
                            for any occasion.
                        </p>

                        <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                            For Vendors
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Showcase your products to a wider audience, manage reservations seamlessly, and grow
                            your business with powerful tools designed specifically for local fashion retailers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            What Makes Us Different
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Unlike traditional e-commerce platforms, we focus on connecting you with fashion that
                            is physically near you. There is no shipping wait, no return hassles, and no guessing
                            on fit. Reserve online, walk into the store, and try it on. It is fashion discovery,
                            reimagined for the modern shopper.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Join Our Community
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Whether you are a fashion enthusiast looking for your next favorite piece or a boutique
                            owner ready to reach more customers, we would love to have you on board. Together, we
                            are building a platform where style meets convenience and local businesses thrive.
                        </p>
                    </section>
                </div>
            </div>
        </PublicLayout>
    )
}
