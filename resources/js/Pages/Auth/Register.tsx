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
