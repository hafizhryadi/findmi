import { InertiaLink } from "@inertiajs/inertia-react";

export default function Menu() {
    return (
        <nav className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <InertiaLink
                href="/items"
                className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:bg-white/10 px-4 py-2 rounded-full"
              >
                All Items
              </InertiaLink>
              <InertiaLink
                href="/items/create"
                className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:bg-white/10 px-4 py-2 rounded-full"
              >
                Create Item
              </InertiaLink>
            </div>

            {/* Mobile menu button */}
            {/* <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button> */}
          </div>
        </div>
      </nav>
    )
}