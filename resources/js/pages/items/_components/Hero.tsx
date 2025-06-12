import { Button } from '@/components/ui/button';
import { InertiaLink } from "@inertiajs/inertia-react";
import { Plus } from "lucide-react";

const Hero = () => {
    return (
        <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700"></div>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                    <h1 className="mb-6 text-4xl font-bold text-white drop-shadow-lg md:text-6xl dark:text-pink-200">Welcome to FindMi</h1>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-pink-100">Temukan barang yang hilang dengan mudah dan cepat.</p>
                    <InertiaLink href="/items/create">
                        <Button
                            size="lg"
                            className="cursor-pointer rounded-full border-2 border-white bg-white px-8 py-3 font-semibold text-pink-600 shadow-lg transition-all duration-200 hover:bg-pink-50 hover:shadow-xl dark:border-black dark:bg-black dark:text-pink-300"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Create an Item
                        </Button>
                    </InertiaLink>
                </div>
            </div>
    )
}

export default Hero;
