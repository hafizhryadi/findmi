import { InertiaLink } from '@inertiajs/inertia-react';
import { router, useForm, usePage } from '@inertiajs/react'; // Pastikan router diimpor
import { Edit, Search, Trash2 } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import Footer from '@/components/footer';
import Menu from '@/components/menu';
import Navbar from '@/components/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Hero from './_components/Hero';

type Item = {
    id: number;
    name: string;
    description?: string;
    image?: string;
    status: string;
    canUpdate?: boolean;
    canDelete?: boolean;
    creator_name: string;
    creator_phone: string;
};

type Props = {
    items: {
        data: Item[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
};

const Index: React.FC<Props> = ({ items }) => {
    const { auth, filters } = usePage().props as unknown as {
        auth: { user: { name: string } | null };
        filters?: { search?: string; status?: string };
    };

    // State for search and status filter
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    // Handle filter submit
    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/items', { search, status }, { preserveState: true });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'found':
                return 'bg-blue-100 text-green-800 border-green-200';
            case 'lost':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    function formatPhone(phone: string) {
        const clean = phone.replace(/\D/g, '');
        if (clean.startsWith('0')) {
            return clean.substring(1);
        }
        return clean;
    }

    // Fungsi handleCardClick yang akan digunakan pada setiap Card
    const handleCardClick = (itemId: number, e: React.MouseEvent) => {
        // Mencegah navigasi jika klik berasal dari tombol atau tautan di dalam kartu
        // e.target adalah elemen yang sebenarnya diklik
        // .closest() akan mencari elemen terdekat yang cocok dengan selector
        if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
            e.stopPropagation(); // Mencegah event klik "naik" ke Card
            return; // Hentikan fungsi jika tombol/tautan diklik
        }
        // Jika bukan tombol atau tautan, navigasi ke halaman detail
        router.visit(`/items/${itemId}`);
    };

    const { delete: destroy, reset } = useForm();

    const destroyItem = (e: React.FormEvent, item: Item) => {
        e.preventDefault();
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }
        destroy(route('items.destroy', item), {
            onFinish: () => reset(),
        });
    };

    return (
        <div className="min-h-screen">
            {/* Header dengan Logo Polsri */}
            <Navbar auth={auth} />
            {/* Pink Navbar */}
            <Menu />
            {/* Pink Hero Section */}
            <Hero />

            {/* Search & Filter */}
            <div className="mx-auto max-w-6xl px-2 pt-8 pb-2 sm:px-3 lg:px-10">
                <form onSubmit={handleFilter} className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border-2 border-pink-200 px-4 py-2 focus:border-pink-400 focus:outline-none"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-lg border-2 border-pink-200 px-4 py-2 focus:border-pink-400 focus:outline-none"
                    >
                        <option className="dark:bg-black" value="">
                            All Status
                        </option>
                        <option className="dark:bg-black" value="lost">
                            Lost
                        </option>
                        <option className="dark:bg-black" value="found">
                            Found
                        </option>
                        <option className="dark:bg-black" value="claimed">
                            Claimed
                        </option>
                    </select>
                    <Button type="submit" className="rounded-lg bg-pink-500 px-6 py-2 text-white hover:bg-pink-600">
                        Search
                    </Button>
                </form>
            </div>

            {/* Items Grid */}
            <div className="mx-auto max-w-6xl px-2 py-5 sm:px-3 lg:px-10">
                {items.data.length === 0 ? (
                    <div className="py-16 text-center">
                        <div className="mx-auto max-w-md rounded-xl border-2 border-pink-200 bg-pink-50 p-8 shadow-lg dark:border-pink-950 dark:bg-black">
                            <Search className="mx-auto mb-4 h-12 w-12 text-pink-400" />
                            <h3 className="mb-2 text-lg font-medium text-pink-900 dark:text-pink-500">No items found</h3>
                            <p className="text-pink-600 dark:text-pink-100">Start by creating your first item!</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {items.data.map((item) => (
                            <Card
                                key={item.id}
                                // Tambahkan onClick pada Card
                                onClick={(e) => handleCardClick(item.id, e)}
                                className="group h-full cursor-pointer overflow-hidden border-2 border-pink-600 shadow-lg transition-all duration-300 hover:border-pink-300 hover:shadow-xl"
                            >
                                {item.image && (
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={item.image.startsWith('http') ? item.image : `/storage/${item.image}`}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            alt={item.name}
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Badge className={`${getStatusColor(item.status)} font-medium shadow-md`}>{item.status}</Badge>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </div>
                                )}

                                <CardHeader className="pb-3">
                                    <h3 className="text-xl font-bold transition-colors">{item.name}</h3>
                                    {item.creator_name && <div className="mt-1 text-xs text-gray-500">By {item.creator_name}</div>}
                                </CardHeader>

                                <CardContent className="pb-4">
                                    <p className="mb-3 text-sm leading-relaxed">{item.description}</p>
                                    <button className="rounded-full border-2 border-pink-200 bg-white px-4 py-2 text-pink-600 transition-colors duration-200 hover:border-pink-300 hover:bg-pink-50 dark:border-pink-900 dark:bg-black dark:text-pink-200 dark:hover:border-pink-300 dark:hover:bg-slate-950">
                                        <a href={`https://wa.me/+62${formatPhone(item.creator_phone)}`}>Contact Me!</a>
                                    </button>
                                    {!item.image && (
                                        <div className="mb-3">
                                            <Badge className={`${getStatusColor(item.status)} font-medium`}>{item.status}</Badge>
                                        </div>
                                    )}
                                </CardContent>

                                <CardFooter className="flex justify-center gap-10 border-t p-4">
                                    {item.canUpdate && (
                                        // InertiaLink untuk tombol edit tetap ada, dengan stopPropagation
                                        <InertiaLink href={`/items/${item.id}/edit`} onClick={(e) => e.stopPropagation()}>
                                            <Button variant="outline" size="sm" className="border-rose-200 hover:border-rose-300 hover:text-pink-400">
                                                <Edit className="mr-1 h-4 w-4" />
                                                Edit
                                            </Button>
                                        </InertiaLink>
                                    )}

                                    {item.canDelete && (
                                        <form onClick={(e) => e.stopPropagation()} onSubmit={(e) => destroyItem(e, item)}>
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                size="sm"
                                                className="flex items-center gap-1 border-rose-200 hover:border-rose-300 hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </form>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pink Pagination */}
                {items.links && items.links.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <nav className="flex items-center space-x-1 rounded-full border-2 border-pink-200 bg-white p-2 shadow-xl">
                            {items.links.map((link, idx) => (
                                <div key={idx}>
                                    {link.url ? (
                                        <InertiaLink
                                            href={link.url}
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                                link.active
                                                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                                                    : 'hover:bg-pink-50 hover:text-pink-600'
                                            } `}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span
                                            className="cursor-not-allowed rounded-full px-4 py-2 text-sm font-medium"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                )}
            </div>

            {/* Footer dengan Logo Polsri */}
            <Footer />
        </div>
    );
};

export default Index;


