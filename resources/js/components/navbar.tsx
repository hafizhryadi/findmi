import { Link } from '@inertiajs/react';

interface AuthProps {
    user?: {
        name: string;
        // add other user properties if needed
    } | null;
}

export default function Navbar({ auth }: { auth: AuthProps }) {
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
                    <div className="flex items-center gap-6">
                        <Link
                            href="/items"
                            className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-2xl font-bold text-transparent"
                        >
                            FindMi
                        </Link>
                        <nav className="flex items-center justify-end gap-4">
                            {auth?.user ? (
                                <Link
                                    href="/settings/profile"
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    {auth.user.name}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
