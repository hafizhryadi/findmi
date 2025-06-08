import { Head, usePage } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import Navbar from '@/components/navbar';
import SettingsLayout from '@/layouts/settings/layout';

export default function Appearance() {
    const { auth } = usePage().props as unknown as { auth: { user: { name: string } | null } };
    return (
        <div className="bg-background min-h-screen">
            <Navbar auth={auth} />
            <div className="flex w-full justify-center">
                <div className="w-full max-w-2xl">
                    <Head title="Appearance settings" />
                    <SettingsLayout>
                        <div className="space-y-6">
                            <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                            <AppearanceTabs />
                        </div>
                    </SettingsLayout>
                </div>
            </div>
        </div>
    );
}
