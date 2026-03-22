import { Head, useForm, usePage } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import type { SharedProps } from '@/types'

export default function Contact() {
    const { flash } = usePage().props as unknown as SharedProps
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', subject: '', message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/contact', { onSuccess: () => reset() })
    }

    const inputClass = "mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"

    return (
        <PublicLayout>
            <Head title="Contact Us" />
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Have a question? We'd love to hear from you.</p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600/10">
                                <EnvelopeIcon className="size-5 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Email</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{(usePage().props as unknown as SharedProps).settings.support_email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600/10">
                                <PhoneIcon className="size-5 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Phone</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-600/10">
                                <MapPinIcon className="size-5 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Address</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">123 Commerce Street, Business District</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        {flash.success && <div className="mb-4 rounded-md bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">{flash.success}</div>}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Name</label>
                                <input type="text" name="name" id="contact-name" value={data.name} onChange={(e) => setData('name', e.target.value)} required className={inputClass} />
                                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                                <input type="email" name="email" id="contact-email" value={data.email} onChange={(e) => setData('email', e.target.value)} required className={inputClass} />
                                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Subject</label>
                                <input type="text" name="subject" id="contact-subject" value={data.subject} onChange={(e) => setData('subject', e.target.value)} required className={inputClass} />
                                {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Message</label>
                                <textarea name="message" id="contact-message" value={data.message} onChange={(e) => setData('message', e.target.value)} rows={5} required className={inputClass} />
                                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                            </div>
                            <button type="submit" disabled={processing} className="w-full rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                                {processing ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}
