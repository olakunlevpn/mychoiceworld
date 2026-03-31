import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import PasswordInput from '@/Components/PasswordInput';
import type { SharedProps } from '@/types';

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const { settings } = usePage().props as unknown as SharedProps;
    const { data, setData, post, processing, errors, reset } = useForm({
        token, email, password: '', password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    const inputClass = "mt-1 block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-primary-600 focus:ring-1 focus:ring-primary-600 focus:outline-none sm:text-sm";

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12">
            <Head title="Reset Password" />
            <div className="w-full max-w-md">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8 sm:px-10">
                    <div className="flex justify-center"><Link href="/"><span className="text-2xl font-bold text-gray-900 dark:text-white">{settings.site_name}</span></Link></div>
                    <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Set new password</h2>

                    <form className="mt-8 space-y-5" onSubmit={submit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
                            <input type="email" name="email" id="reset-email" value={data.email} onChange={(e) => setData('email', e.target.value)} className={inputClass} />
                            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">New password</label>
                            <PasswordInput value={data.password} onChange={(e) => setData('password', e.target.value)} required className={inputClass} />
                            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Confirm password</label>
                            <PasswordInput value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required autoComplete="new-password" className={inputClass} />
                            {errors.password_confirmation && <p className="mt-1 text-xs text-red-400">{errors.password_confirmation}</p>}
                        </div>
                        <button type="submit" disabled={processing} className="flex w-full justify-center rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                            {processing ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
