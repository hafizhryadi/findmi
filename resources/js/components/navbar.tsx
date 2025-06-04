import { InertiaLink } from '@inertiajs/inertia-react';

export default function Navbar() {
    return (
        <div className="border-b-2 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        {/* Logo Polsri */}
                        <div className="flex items-center space-x-3">
                            <img src="/app-logo.png?height=70&width=70" alt="Polsri Logo" className="h-12 w-12 object-contain" />
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold">Manajemen Informatika</h1>
                                <p className="text-sm font-medium text-pink-600">Politeknik Negeri Sriwijaya</p>
                            </div>
                        </div>
                    </div>
                    <InertiaLink
                        href="/items"
                        className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-2xl font-bold text-transparent"
                    >
                        FindMi
                    </InertiaLink>
                </div>
            </div>
        </div>
    );
}
