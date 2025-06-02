"use client"

import type React from "react"
import { InertiaLink } from "@inertiajs/inertia-react"
import { Search, Plus, Users, MapPin, Shield, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header dengan Logo Polsri */}
      <div className="bg-white shadow-sm border-b-2 border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo Polsri */}
              <div className="flex items-center space-x-3">
                <img src="/placeholder.svg?height=48&width=48" alt="Polsri Logo" className="w-12 h-12 object-contain" />
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-800">Manajemen Informatika</h1>
                  <p className="text-sm text-pink-600 font-medium">Politeknik Negeri Sriwijaya</p>
                </div>
              </div>
            </div>
            <InertiaLink
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
            >
              FindMi
            </InertiaLink>
          </div>
        </div>
      </div>

      {/* Pink Navbar */}
      <nav className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Desktop Navigation */}
            <div className="flex items-center space-x-8">
              <InertiaLink
                href="/"
                className="text-white font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
              >
                Home
              </InertiaLink>
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
            <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to <span className="text-pink-200">FindMi</span>
          </h1>
          <p className="text-xl md:text-2xl text-pink-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            FindMi helps you discover, manage, and keep track of your lost and found items with ease.
          </p>
          <InertiaLink href="/items">
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white text-lg"
            >
              <Search className="mr-3 h-6 w-6" />
              View All Items
            </Button>
          </InertiaLink>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How FindMi Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to reunite lost items with their owners through a simple and secure process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 shadow-lg bg-white overflow-hidden hover:border-pink-300 text-center">
            <CardHeader className="pb-4 bg-gradient-to-r from-pink-50 to-rose-50">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                Post Lost or Found Items
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <p className="text-gray-600 leading-relaxed">
                Easily add items you have lost or found to help others connect with you through our simple posting
                system.
              </p>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 shadow-lg bg-white overflow-hidden hover:border-pink-300 text-center">
            <CardHeader className="pb-4 bg-gradient-to-r from-pink-50 to-rose-50">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Search className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                Browse All Listings
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <p className="text-gray-600 leading-relaxed">
                Search and filter through all items to find what you need quickly with our advanced search features.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 shadow-lg bg-white overflow-hidden hover:border-pink-300 text-center">
            <CardHeader className="pb-4 bg-gradient-to-r from-pink-50 to-rose-50">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                Connect with Owners
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <p className="text-gray-600 leading-relaxed">
                Contact item owners securely to return or claim lost and found items through our protected messaging
                system.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">FindMi in Numbers</h2>
            <p className="text-xl text-pink-100">Making a difference in our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-pink-100 font-medium">Items Posted</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">300+</div>
              <div className="text-pink-100 font-medium">Items Reunited</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-pink-100 font-medium">Happy Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose FindMi?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide the best features to ensure your lost items find their way back home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-pink-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Location Tracking</h3>
              <p className="text-gray-600 text-sm">
                Track where items were lost or found with precise location details.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-pink-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Platform</h3>
              <p className="text-gray-600 text-sm">
                Your personal information is protected with advanced security measures.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-pink-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">24/7 Availability</h3>
              <p className="text-gray-600 text-sm">
                Post and search for items anytime, anywhere with our always-on platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-pink-100 mb-8">
            Join thousands of users who have successfully reunited with their lost items.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <InertiaLink href="/items">
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Search className="mr-2 h-5 w-5" />
                Browse Items
              </Button>
            </InertiaLink>
            <InertiaLink href="/items/create">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-pink-600 font-semibold px-8 py-3 rounded-full transition-all duration-200"
              >
                <Plus className="mr-2 h-5 w-5" />
                Post an Item
              </Button>
            </InertiaLink>
          </div>
        </div>
      </div>

      {/* Footer dengan Logo Polsri */}
      <footer className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Polsri Logo"
                className="w-10 h-10 object-contain bg-white/20 rounded-full p-1"
              />
              <div>
                <p className="font-medium">Manajemen Informatika</p>
                <p className="text-sm text-pink-100">Politeknik Negeri Sriwijaya</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-pink-100">© 2024 FindMi. All rights reserved.</p>
              <p className="text-xs text-pink-200 mt-1">Developed by Manajemen Informatika Students</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
