import type React from "react"
import { useState } from "react"
import { Link, useForm, usePage } from "@inertiajs/react"
import { ArrowLeft, Upload, ImageIcon, AlertCircle, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navbar from "@/components/navbar"
import Menu from "@/components/menu"
import Footer from "@/components/footer"

const Create: React.FC = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    description: "",
    image: undefined as File | undefined,
    status: "",
  })

  const { auth } = (usePage().props as unknown as { auth: { user: { name: string } | null } })

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
      onSuccess: () => {
        window.location.href = "/items"
      },
    })
  }

  return (
    <div className="min-h-screen ">
      {/* Header dengan Logo Polsri */}
      <Navbar auth={auth}/>

      {/* Pink Navbar */}
      <Menu/>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Link href="/items" className="flex items-center text-pink-600 hover:text-pink-700 transition-colors">
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-medium">Back to Items</span>
          </Link>
        </div>

        <Card className="border-2 border-pink-100 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create New Item</CardTitle>
            <CardDescription>
              Fill out the form below to add a new item to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">
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
                <Label htmlFor="description" className=" font-medium">
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
                <Label htmlFor="image" className=" font-medium">
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
                        <p className="text-sm  mb-2">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs ">SVG, PNG, JPG or GIF (max. 2MB)</p>
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
                <Label htmlFor="status" className=" font-medium">
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
              <Alert className="text-pink-800">
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
                <Link href="/items" className="flex-1">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-2 border-pink-200 hover:border-pink-300 text-pink-600 hover:text-pink-700 font-medium py-2 px-6 rounded-full transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer dengan Logo Polsri */}
      <Footer/>
    </div>
  )
}

export default Create
