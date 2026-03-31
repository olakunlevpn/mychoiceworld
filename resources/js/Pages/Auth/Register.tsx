import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import SiteLogo from '@/Components/SiteLogo';
import PasswordInput from '@/Components/PasswordInput';
import type { SharedProps } from '@/types';

export default function Register() {
    const { settings } = usePage().props as unknown as SharedProps;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    const inputClass = "mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none sm:text-sm";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12">
            <Head title="Register" />
            <div className="w-full max-w-md">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8 sm:px-10">
                    <div className="flex justify-center">
                        <Link href="/">
                            <SiteLogo variant="desktop" className="h-10 w-auto" />
                        </Link>
                    </div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Create your account</h2>

                    <form className="mt-8 space-y-5" onSubmit={submit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Full name</label>
                            <input type="text" name="name" id="reg-name" value={data.name} onChange={(e) => setData('name', e.target.value)} autoFocus required placeholder="John Doe" className={inputClass} />
                            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email address</label>
                            <input type="email" name="email" id="reg-email" value={data.email} onChange={(e) => setData('email', e.target.value)} required placeholder="you@example.com" className={inputClass} />
                            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
                            <PasswordInput value={data.password} onChange={(e) => setData('password', e.target.value)} required className={inputClass} />
                            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Confirm password</label>
                            <PasswordInput value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required autoComplete="new-password" className={inputClass} />
                            {errors.password_confirmation && <p className="mt-1 text-xs text-red-400">{errors.password_confirmation}</p>}
                        </div>
                        <button type="submit" disabled={processing} className="flex w-full justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                            {processing ? 'Creating account...' : 'Create account'}
                        </button>
                    </form>

                    {settings.google_login_enabled && (
                        <>
                            <div className="relative mt-6">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
                                <div className="relative flex justify-center text-sm"><span className="bg-white dark:bg-gray-900 px-4 text-gray-500 dark:text-gray-400">or continue with</span></div>
                            </div>
                            <a href="/auth/google/redirect" className="mt-4 flex w-full items-center justify-center gap-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                                <svg className="size-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                                Sign up with Google
                            </a>
                        </>
                    )}

                    <div className="mt-6 space-y-3 text-center text-sm">
                        <p className="text-gray-500 dark:text-gray-400">Already have an account? <Link href={route('login')} className="font-medium text-primary-600 hover:text-primary-500">Sign in</Link></p>
                        {settings.vendor_registration_enabled && (
                            <p className="text-gray-500 dark:text-gray-400">Are you a store owner? <Link href="/vendor/register" className="font-medium text-primary-600 hover:text-primary-500">Register as vendor</Link></p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
