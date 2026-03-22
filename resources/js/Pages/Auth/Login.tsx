import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import type { SharedProps } from '@/types';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { settings } = usePage().props as unknown as SharedProps;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    const inputClass = "mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none sm:text-sm";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12">
            <Head title="Sign In" />
            <div className="w-full max-w-md">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8 sm:px-10">
                    <div className="flex justify-center">
                        <Link href="/">
                            {settings.logo_path ? (
                                <img alt={settings.site_name} src={settings.logo_path} className="h-10 w-auto" />
                            ) : (
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">{settings.site_name}</span>
                            )}
                        </Link>
                    </div>

                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Sign in to your account</h2>

                    {status && <div className="mt-4 rounded-md bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">{status}</div>}

                    <form className="mt-8 space-y-5" onSubmit={submit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email address</label>
                            <input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} autoComplete="email" autoFocus required placeholder="you@example.com" className={inputClass} />
                            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Password</label>
                            <input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} autoComplete="current-password" required placeholder="••••••••" className={inputClass} />
                            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} className="size-4 rounded border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-primary-600 focus:ring-primary-600" />
                                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</span>
                            </label>
                            {canResetPassword && (
                                <Link href={route('password.request')} className="text-sm font-medium text-primary-600 hover:text-primary-500">Forgot password?</Link>
                            )}
                        </div>

                        <button type="submit" disabled={processing} className="flex w-full justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <div className="mt-6 space-y-3 text-center text-sm">
                        <p className="text-gray-500 dark:text-gray-400">
                            Don't have an account? <Link href={route('register')} className="font-medium text-primary-600 hover:text-primary-500">Register</Link>
                        </p>
                        {settings.vendor_registration_enabled && (
                            <p className="text-gray-500 dark:text-gray-400">
                                Are you a store owner? <Link href="/vendor/register" className="font-medium text-primary-600 hover:text-primary-500">Register as vendor</Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
