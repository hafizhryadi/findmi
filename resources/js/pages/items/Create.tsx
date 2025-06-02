"use client"

import type React from "react"
import { useState } from "react"
import { InertiaLink, useForm } from "@inertiajs/inertia-react"
import { ArrowLeft, Upload, ImageIcon, AlertCircle, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

const Create: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    image: undefined as File | undefined,
    status: "available",
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0]
      setData(name as "image", file)

      // Create preview URL for the image
      if (file) {
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      } else {
        setPreviewUrl(null)
      }
    } else if (name === "name" || name === "description" || name === "status") {
      setData(name, value)
    }
  }

  const handleSelectChange = (value: string) => {
    setData("status", value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post("/items", {
      forceFormData: true,
    })
  }

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
                href="/items"
                className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:bg-white/10 px-4 py-2 rounded-full"
              >
                All Items
              </InertiaLink>
              <InertiaLink
                href="/items/create"
                className="text-white font-medium px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <InertiaLink href="/items" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-medium">Back to Items</span>
          </InertiaLink>
        </div>

        <Card className="border-2 border-pink-100 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
            <CardTitle className="text-2xl font-bold text-gray-800">Create New Item</CardTitle>
            <CardDescription className="text-gray-600">
              Fill out the form below to add a new item to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Item Name <span className="text-pink-600">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter item name"
                  className={`border-2 ${
                    errors.name ? "border-red-300 focus:border-red-500" : "border-pink-200 focus:border-pink-500"
                  } focus:ring-pink-200`}
                  required
                />
                {errors.name && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Description Field - Changed from Textarea to Input */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 font-medium">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Provide a brief description of the item"
                  className={`border-2 ${
                    errors.description ? "border-red-300 focus:border-red-500" : "border-pink-200 focus:border-pink-500"
                  } focus:ring-pink-200`}
                />
                {errors.description && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.description}
                  </div>
                )}
              </div>

              {/* Image Upload Field */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-gray-700 font-medium">
                  Image
                </Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    errors.image
                      ? "border-red-300 bg-red-50"
                      : previewUrl
                        ? "border-green-300 bg-green-50"
                        : "border-pink-200 hover:border-pink-400 bg-pink-50/50"
                  } transition-all cursor-pointer`}
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleChange}
                    className="hidden"
                    accept="image/*"
                  />

                  {previewUrl ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-48 mx-auto overflow-hidden rounded-lg">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-center text-green-600">
                        <Check className="h-5 w-5 mr-2" />
                        <span>Image uploaded successfully</span>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-pink-200 hover:border-pink-400 text-pink-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewUrl(null)
                          setData("image", undefined)
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="mx-auto w-16 h-16 bg-pink-200/50 rounded-full flex items-center justify-center">
                        <Upload className="h-8 w-8 text-pink-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-pink-200 hover:border-pink-400 text-pink-600"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Select Image
                      </Button>
                    </div>
                  )}
                </div>
                {errors.image && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.image}
                  </div>
                )}
              </div>

              {/* Status Field */}
              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-700 font-medium">
                  Status <span className="text-pink-600">*</span>
                </Label>
                <Select name="status" value={data.status} onValueChange={handleSelectChange} required>
                  <SelectTrigger
                    id="status"
                    className={`border-2 ${
                      errors.status ? "border-red-300 focus:border-red-500" : "border-pink-200 focus:border-pink-500"
                    } focus:ring-pink-200`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Lost
                      </div>
                    </SelectItem>
                    <SelectItem value="found">
                      <div className="flex items-center">
                        <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                        Found
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && (
                  <div className="flex items-center text-red-600 text-sm mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.status}
                  </div>
                )}
              </div>

              {/* Form Tips */}
              <Alert className="bg-pink-50 border-pink-200 text-pink-800">
                <AlertDescription className="text-sm">
                  Adding clear images and brief descriptions will help others identify your item more easily.
                </AlertDescription>
              </Alert>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex-1"
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Item"
                  )}
                </Button>
                <InertiaLink href="/items" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-2 border-pink-200 hover:border-pink-300 text-pink-600 hover:text-pink-700 font-medium py-2 px-6 rounded-full transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </InertiaLink>
              </div>
            </form>
          </CardContent>
        </Card>
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

export default Create
