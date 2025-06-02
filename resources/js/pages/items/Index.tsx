"use client"

import type React from "react"
import { InertiaLink } from "@inertiajs/inertia-react"
import { Eye, Edit, Trash2, Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// get all items di dalam variabel
// contoh cara ambil item
// <h5 className="card-title">{item.name}</h5>
type Item = {
  id: number
  name: string
  description?: string
  image?: string
  status: string
}

type Props = {
  items: {
    data: Item[]
    links: unknown[]
  }
}

const Index: React.FC<Props> = ({ items }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "found":
        return "bg-green-100 text-green-800 border-green-200"
      case "lost":
        return "bg-red-100 text-red-800 border-red-200"
      case "available":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      {/* Header dengan Logo Polsri */}
      <div className="bg-white shadow-sm border-b-2 border-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Logo Polsri - Gunakan logo sebenarnya */}
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
                href="/items"
                className="text-white font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
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

      {/* Pink Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">FindMi - All Items</h1>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Discover and manage your items easily with our modern platform.
          </p>
          <InertiaLink href="/items/create">
            <Button
              size="lg"
              className="bg-white text-pink-600 hover:bg-pink-50 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-white"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create an Item
            </Button>
          </InertiaLink>
        </div>
      </div>

      {/* Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.data.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-8 max-w-md mx-auto shadow-lg">
              <Search className="mx-auto h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-lg font-medium text-pink-900 mb-2">No items found</h3>
              <p className="text-pink-600">Start by creating your first item!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.data.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 shadow-lg bg-white overflow-hidden hover:border-pink-300"
              >
                {item.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image.startsWith("http") ? item.image : `/storage/${item.image}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={item.name}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={`${getStatusColor(item.status)} font-medium shadow-md`}>{item.status}</Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}

                <CardHeader className="pb-3 bg-gradient-to-r from-pink-50 to-rose-50">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors">
                    {item.name}
                  </h3>
                </CardHeader>

                <CardContent className="pb-4">
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>
                  {!item.image && (
                    <div className="mb-3">
                      <Badge className={`${getStatusColor(item.status)} font-medium`}>{item.status}</Badge>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="bg-gradient-to-r from-pink-50 to-rose-50 border-t-2 border-pink-100 flex justify-between gap-2 p-4">
                  <InertiaLink href={`/items/${item.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 border-pink-200"
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                  </InertiaLink>

                  <InertiaLink href={`/items/${item.id}/edit`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 border-rose-200"
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                  </InertiaLink>

                  <InertiaLink
                    href={`/items/${item.id}`}
                    method="delete"
                    as="button"
                    data={{}}
                    onClick={(e) => {
                      if (!window.confirm("Are you sure you want to delete this item?")) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-red-50 hover:text-red-600 hover:border-red-300 border-red-200"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </InertiaLink>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pink Pagination */}
        {items.links && (items.links as Array<{ url: string | null; label: string; active: boolean }>).length > 3 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center space-x-1 bg-white rounded-full shadow-xl p-2 border-2 border-pink-200">
              {(items.links as Array<{ url: string | null; label: string; active: boolean }>).map((link, idx) => (
                <div key={idx}>
                  {link.url ? (
                    <InertiaLink
                      href={link.url}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                        ${
                          link.active
                            ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                            : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                        }
                      `}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ) : (
                    <span
                      className="px-4 py-2 rounded-full text-sm font-medium text-gray-400 cursor-not-allowed"
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
      <footer className="bg-gradient-to-r from-pink-600 to-rose-600 text-white py-8 mt-16">
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

export default Index
