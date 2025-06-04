export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src="/app-logo.png?height=40&width=40"
                alt="Polsri Logo"
                className="w-10 h-10 object-contain bg-white/20 rounded-full p-1"
              />
              <div>
                <p className="font-medium">Manajemen Informatika</p>
                <p className="text-sm text-pink-100">Politeknik Negeri Sriwijaya</p>
              </div>
            </div>
            <div className="text-center md:text-right">
                <p className="text-sm text-pink-100">
                    © {new Date().getFullYear()} FindMi. <a href="https://github.com/hafizhryadi">All rights reserved.</a> 
                </p>
            </div>
          </div>
        </div>
      </footer>
    )
}