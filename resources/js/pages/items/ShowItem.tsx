import type React from "react"
import { InertiaLink } from "@inertiajs/inertia-react"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { router, usePage } from "@inertiajs/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Menu from "@/components/menu"

type Item = {
  id: number
  name: string
  description?: string
  image?: string
  status: string
  canUpdate?: boolean
  canDelete?: boolean
}

type Props = {
  item: Item
}

const ShowItem: React.FC<Props> = ({ item }) => {
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

  const { auth } = (usePage().props as unknown as { auth: { user: { name: string } | null } })

  return (
    <div className="min-h-screen">
      {/* Header dengan Logo Polsri */}
      <Navbar auth={auth} />

      {/* Pink Navbar */}
      <Menu />

      {/* Pink Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between">
            <div>
              <InertiaLink href="/">
                <Button
                  variant="outline"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Items
                </Button>
              </InertiaLink>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {item.name}
              </h1>
              <div className="flex items-center gap-4">
                <Badge className={`${getStatusColor(item.status)} font-medium text-lg px-4 py-2`}>
                  {item.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Detail Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-2 border-pink-200 shadow-xl overflow-hidden">
          {/* Image Section */}
          {item.image && (
            <div className="relative h-96 overflow-hidden">
              <img
                src={item.image.startsWith("http") ? item.image : `/storage/${item.image}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}

          {/* Content Section */}
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {!item.image && (
                  <Badge className={`${getStatusColor(item.status)} font-medium mb-4`}>
                    {item.status}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-6">
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="leading-relaxed">
                  {item.description || "No description available for this item."}
                </p>
              </div>

              {/* Item Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <h4 className="font-semibold text-pink-900 mb-1">Status</h4>
                  <Badge className={`${getStatusColor(item.status)} font-medium`}>
                    {item.status}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              {(item.canUpdate || item.canDelete) && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                  <div className="flex gap-4">
                    {item.canUpdate && (
                      <InertiaLink href={`/items/${item.id}/edit`}>
                        <Button
                          className="bg-pink-600 hover:bg-pink-700 text-white"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Item
                        </Button>
                      </InertiaLink>
                    )}

                    {item.canDelete && (
                      <Button
                        variant="destructive"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this item?")) {
                            router.delete(`/items/${item.id}`)
                          }
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Item
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer dengan Logo Polsri */}
      <Footer />
    </div>
  )
}

export default ShowItem