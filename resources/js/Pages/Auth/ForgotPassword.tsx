import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import type { SharedProps } from '@/types';

export default function ForgotPassword({ status }: { status?: string }) {
    const { settings } = usePage().props as unknown as SharedProps;
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit: FormEventHandler = (e) => { e.preventDefault(); post(route('password.email')); };

    const inputClass = "mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none sm:text-sm";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12">
            <Head title="Forgot Password" />
            <div className="w-full max-w-md">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8 sm:px-10">
                    <div className="flex justify-center">
                        <Link href="/"><span className="text-2xl font-bold text-gray-900 dark:text-white">{settings.site_name}</span></Link>
                    </div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h2>
                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">Enter your email and we'll send you a reset link.</p>

                    {status && <div className="mt-4 rounded-md bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">{status}</div>}

                    <form className="mt-8 space-y-5" onSubmit={submit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email address</label>
                            <input type="email" name="email" id="forgot-email" value={data.email} onChange={(e) => setData('email', e.target.value)} autoFocus required placeholder="you@example.com" className={inputClass} />
                            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>
                        <button type="submit" disabled={processing} className="flex w-full justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                            {processing ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        <Link href={route('login')} className="font-medium text-primary-600 hover:text-primary-500">&larr; Back to sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
