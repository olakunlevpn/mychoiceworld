import { Head, useForm, usePage, router } from '@inertiajs/react'
import CustomerLayout from '@/Layouts/CustomerLayout'
import { CameraIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import type { SharedProps } from '@/types'

export default function ProfileEdit({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth, flash } = usePage().props as unknown as SharedProps
    const user = auth.user!
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

    const profileForm = useForm({
        name: user.name,
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
    })

    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const [notificationPrefs, setNotificationPrefs] = useState({
        reservationUpdates: user.notification_prefs?.reservationUpdates ?? true,
        promotions: user.notification_prefs?.promotions ?? false,
        newArrivals: user.notification_prefs?.newArrivals ?? true,
    })

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        profileForm.patch(route('profile.update'))
    }

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        passwordForm.put(route('password.update'), {
            onSuccess: () => passwordForm.reset(),
        })
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setAvatarPreview(URL.createObjectURL(file))

        router.post(route('profile.avatar'), { avatar: file } as any, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => setAvatarPreview(null),
        })
    }

    const inputClass = "mt-1.5 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600"
    const labelClass = "block text-sm font-medium text-gray-600 dark:text-gray-300"
    const errorClass = "mt-1 text-xs text-red-400"

    const displayAvatar = avatarPreview || user.avatar

    return (
        <CustomerLayout>
            <Head title="My Profile" />

            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="pb-6 pt-16 sm:pt-24">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">My Profile</h1>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
                </div>

                {(flash.success || status) && (
                    <div className="mb-6 rounded-md bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">
                        {flash.success || status}
                    </div>
                )}

                <div className="space-y-6 pb-24">
                    {/* Avatar */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <div className="relative">
                                {displayAvatar ? (
                                    <img src={displayAvatar} alt={user.name} className="size-24 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700" />
                                ) : (
                                    <div className="flex size-24 items-center justify-center rounded-full bg-primary-600 text-3xl font-bold text-white ring-2 ring-gray-200 dark:ring-gray-700">
                                        {user.name.charAt(0)}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-primary-600 text-white hover:bg-primary-700"
                                >
                                    <CameraIcon className="size-4" />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-500"
                                >
                                    Change Photo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Info + Location */}
                    <form onSubmit={handleProfileSubmit} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className={labelClass}>Full Name</label>
                                <input type="text" value={profileForm.data.name} onChange={(e) => profileForm.setData('name', e.target.value)} className={inputClass} />
                                {profileForm.errors.name && <p className={errorClass}>{profileForm.errors.name}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Email</label>
                                <input type="email" value={user.email} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
                                {mustVerifyEmail && !user.email_verified_at && (
                                    <p className="mt-1 text-xs text-yellow-400">Your email is not verified.</p>
                                )}
                            </div>
                            <div>
                                <label className={labelClass}>Phone</label>
                                <input type="tel" value={profileForm.data.phone} onChange={(e) => profileForm.setData('phone', e.target.value)} placeholder="+91 98765 43210" className={inputClass} />
                                {profileForm.errors.phone && <p className={errorClass}>{profileForm.errors.phone}</p>}
                            </div>
                        </div>

                        <h2 className="mt-8 text-base font-semibold text-gray-900 dark:text-white">Location</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className={labelClass}>Address</label>
                                <input type="text" value={profileForm.data.address} onChange={(e) => profileForm.setData('address', e.target.value)} className={inputClass} />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className={labelClass}>City</label>
                                    <input type="text" value={profileForm.data.city} onChange={(e) => profileForm.setData('city', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>State</label>
                                    <input type="text" value={profileForm.data.state} onChange={(e) => profileForm.setData('state', e.target.value)} className={inputClass} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Country</label>
                                <input type="text" value={profileForm.data.country} onChange={(e) => profileForm.setData('country', e.target.value)} className={inputClass} />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button type="submit" disabled={profileForm.processing} className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                                {profileForm.processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>

                    {/* Change Password */}
                    <form onSubmit={handlePasswordSubmit} className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Change Password</h2>
                        <div className="mt-4 space-y-4">
                            <div>
                                <label className={labelClass}>Current Password</label>
                                <input type="password" value={passwordForm.data.current_password} onChange={(e) => passwordForm.setData('current_password', e.target.value)} placeholder="••••••••" className={inputClass} />
                                {passwordForm.errors.current_password && <p className={errorClass}>{passwordForm.errors.current_password}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>New Password</label>
                                <input type="password" value={passwordForm.data.password} onChange={(e) => passwordForm.setData('password', e.target.value)} placeholder="••••••••" className={inputClass} />
                                {passwordForm.errors.password && <p className={errorClass}>{passwordForm.errors.password}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Confirm New Password</label>
                                <input type="password" value={passwordForm.data.password_confirmation} onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)} placeholder="••••••••" className={inputClass} />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button type="submit" disabled={passwordForm.processing} className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                                {passwordForm.processing ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>

                    {/* Notification Preferences */}
                    <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
                        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Notification Preferences</h2>
                        <div className="mt-4 space-y-4">
                            {([
                                { key: 'reservationUpdates' as const, label: 'Reservation Updates', desc: 'Get notified about reservation status changes' },
                                { key: 'promotions' as const, label: 'Promotions', desc: 'Receive promotional offers and discounts' },
                                { key: 'newArrivals' as const, label: 'New Arrivals Near Me', desc: 'Get notified when new products are available nearby' },
                            ]).map((pref) => (
                                <div key={pref.key} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{pref.label}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{pref.desc}</p>
                                    </div>
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={notificationPrefs[pref.key]}
                                        onClick={() => {
                                            const updated = { ...notificationPrefs, [pref.key]: !notificationPrefs[pref.key] }
                                            setNotificationPrefs(updated)
                                            router.patch('/profile/notifications', { notification_prefs: updated }, { preserveScroll: true })
                                        }}
                                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${notificationPrefs[pref.key] ? 'bg-primary-600' : 'bg-gray-600'}`}
                                    >
                                        <span className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow transition duration-200 ${notificationPrefs[pref.key] ? 'translate-x-5' : 'translate-x-0'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </CustomerLayout>
    )
}
