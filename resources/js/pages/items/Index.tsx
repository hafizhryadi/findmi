"use client"

import type React from "react"
import { InertiaLink } from "@inertiajs/inertia-react"
import { Edit, Trash2, Plus, Search } from "lucide-react"
import { router } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Menu from "@/components/menu"

// get all items di dalam variabel
// contoh cara ambil item
// <h5 className="card-title">{item.name}</h5>
type Item = {
  id: number
  name: string
  description?: string
  image?: string
  status: string
  canUpdate?: boolean // <-- add this
  canDelete?: boolean // <-- add this
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
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header dengan Logo Polsri */}
      <Navbar/>

      {/* Pink Navbar */}
      <Menu/>

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
                className="group hover:shadow-xl border-pink-600 transition-all duration-300 border-2 shadow-lg  overflow-hidden hover:border-pink-300"
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

                <CardHeader className="pb-3">
                  <h3 className="text-xl font-bold transition-colors">
                    {item.name}
                  </h3>
                </CardHeader>

                <CardContent className="pb-4">
                  <p className=" text-sm leading-relaxed mb-3">{item.description}</p>
                  {!item.image && (
                    <div className="mb-3">
                      <Badge className={`${getStatusColor(item.status)} font-medium`}>{item.status}</Badge>
                    </div>
                  )}
                </CardContent>


                <CardFooter className=" border-t flex justify-center gap-10 p-4">
                  {item.canUpdate && (
                    <InertiaLink href={`/items/${item.id}/edit`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:text-pink-400 hover:border-rose-300 border-rose-200"
                      >
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                    </InertiaLink>
                  )}

                  {item.canDelete && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="hover:text-red-600 hover:border-red-300 border-red-200"
                      onClick={() => {
                        if (window.confirm("Are you sure?")) {
                          router.delete(`/items/${item.id}`)
                        }
                      }}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  )}
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
                            : " hover:bg-pink-50 hover:text-pink-600"
                        }
                      `}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ) : (
                    <span
                      className="px-4 py-2 rounded-full text-sm font-medium  cursor-not-allowed"
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
      <Footer/>
    </div>
  )
}

export default Index
