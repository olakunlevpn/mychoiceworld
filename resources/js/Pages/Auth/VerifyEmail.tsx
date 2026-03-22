import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import type { SharedProps } from '@/types';

export default function VerifyEmail({ status }: { status?: string }) {
    const { settings } = usePage().props as unknown as SharedProps;
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => { e.preventDefault(); post(route('verification.send')); };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark px-4 py-12">
            <Head title="Verify Email" />
            <div className="w-full max-w-md">
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-8 sm:px-10 text-center">
                    <EnvelopeIcon className="mx-auto size-12 text-primary-600" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Verify your email</h2>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        We've sent a verification link to your email address. Please click the link to verify your account.
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mt-4 rounded-md bg-green-500/10 px-4 py-3 text-sm font-medium text-green-400">
                            A new verification link has been sent.
                        </div>
                    )}

                    <form onSubmit={submit} className="mt-6">
                        <button type="submit" disabled={processing} className="w-full rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50">
                            {processing ? 'Sending...' : 'Resend Verification Email'}
                        </button>
                    </form>

                    <Link href={route('logout')} method="post" as="button" className="mt-4 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        Log out
                    </Link>
                </div>
            </div>
        </div>
    );
}
