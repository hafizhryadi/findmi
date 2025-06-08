import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface AuthProps {
    user?: {
        name: string;
        // add other user properties if needed
    } | null;
}

export default function Navbar({ auth }: { auth: AuthProps }) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check localStorage for theme preference
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };

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
                        <Link href="/" className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-2xl font-bold text-transparent">
                            FindMi
                        </Link>
                        {/* Dark mode toggle button */}
                        <button
                            onClick={toggleDarkMode}
                            className="rounded-full p-2 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                // Moon icon (dark mode active)
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-yellow-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                                    />
                                </svg>
                            ) : (
                                // Sun icon (light mode active)
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-yellow-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <circle cx="12" cy="12" r="5" fill="currentColor" stroke="currentColor" strokeWidth="0" />

                                    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <line x1="12" y1="2" x2="12" y2="5" />

                                        <line x1="18.07" y1="4.93" x2="16.18" y2="7.07" />

                                        <line x1="19" y1="12" x2="22" y2="12" />

                                        <line x1="18.07" y1="19.07" x2="16.18" y2="16.93" />

                                        <line x1="12" y1="19" x2="12" y2="22" />

                                        <line x1="6.07" y1="19.07" x2="7.82" y2="16.93" />

                                        <line x1="5" y1="12" x2="2" y2="12" />
                                        
                                        <line x1="6.07" y1="4.93" x2="7.82" y2="7.07" />
                                    </g>
                                </svg>
                            )}
                        </button>
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
