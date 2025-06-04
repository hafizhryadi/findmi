"use client"

import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

type Item = {
  id: number
  name: string
  description?: string
  image?: string
  status: string
}

type Props = {
  item: Item
}

const ShowItem = ({ item }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "found":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "lost":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border-2 border-pink-200 rounded-xl shadow-lg overflow-hidden">
          {/* Gambar Item */}
          {item.image && (
            <img
              src={item.image.startsWith("http") ? item.image : `/storage/${item.image}`}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
          )}

          {/* Konten Detail */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{item.name}</h1>
              <Badge className={`${getStatusColor(item.status)} font-medium`}>
                {item.status}
              </Badge>
            </div>

            <p className="text-gray-600 text-sm">{item.description || "No description available."}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ShowItem
