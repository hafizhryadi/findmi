import { Link, router, usePage } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Check, ImageIcon, Upload } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import Footer from '@/components/footer';
import Menu from '@/components/menu';
import Navbar from '@/components/navbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Add Inertia to the Window interface for TypeScript
declare global {
    interface Window {
        Inertia?: {
            visit: (
                url: string,
                options: {
                    method: string;
                    data: FormData;
                    forceFormData: boolean;
                    onSuccess: () => void;
                },
            ) => void;
        };
    }
}

const Edit: React.FC = () => {
    const { item, errors } = usePage().props as unknown as {
        item: {
            id: number;
            name: string;
            description: string;
            image?: string;
            status: string;
        };
        errors: Record<string, string>;
        auth: { user: { name: string } | null };
    };
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [status, setStatus] = useState(item.status);
    const [image, setImage] = useState<File | undefined>(undefined);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        item.image ? (item.image.startsWith('http') ? item.image : `/storage/${item.image}`) : null,
    );
    const { auth } = usePage().props as unknown as { auth: { user: { name: string } | null } };

    const updateItem = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('status', status);
        if (image) formData.append('image', image);
        formData.append('_method', 'put');
        router.post(`/items/${item.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                window.location.href = '/items';
            },
        });
    };

    return (
        <div className="min-h-screen">
            {/* Header dengan Logo Polsri */}
            <Navbar auth={auth} />

            {/* Pink Navbar */}
            <Menu />

            {/* Main Content */}
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center">
                    <Link href="/items" className="flex items-center text-pink-600 transition-colors hover:text-pink-700">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        <span className="font-medium">Back to Items</span>
                    </Link>
                </div>

                <Card className="border-2 border-pink-100 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Edit Item</CardTitle>
                        <CardDescription>Update the details of your item below.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={updateItem} encType="multipart/form-data" className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="font-medium">
                                    Item Name <span className="text-pink-600">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter item name"
                                    className={`border-2 ${
                                        errors.name ? 'border-red-300 focus:border-red-500' : 'border-pink-200 focus:border-pink-500'
                                    } focus:ring-pink-200`}
                                    required
                                />
                                {errors.name && (
                                    <div className="mt-1 flex items-center text-sm text-red-600">
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Description Field - Changed from Textarea to Input */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-medium">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Provide a brief description of the item"
                                    className={`border-2 ${
                                        errors.description ? 'border-red-300 focus:border-red-500' : 'border-pink-200 focus:border-pink-500'
                                    } focus:ring-pink-200`}
                                />
                                {errors.description && (
                                    <div className="mt-1 flex items-center text-sm text-red-600">
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.description}
                                    </div>
                                )}
                            </div>

                            {/* Image Upload Field */}
                            <div className="space-y-2">
                                <Label htmlFor="image" className="font-medium">
                                    Image
                                </Label>
                                <div
                                    className={`rounded-lg border-2 border-dashed p-6 text-center ${
                                        errors.image
                                            ? 'border-red-300 bg-red-50'
                                            : previewUrl
                                              ? 'border-green-300 bg-green-50'
                                              : 'border-pink-200 bg-pink-50/50 hover:border-pink-400'
                                    } cursor-pointer transition-all`}
                                    onClick={() => document.getElementById('image')?.click()}
                                >
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={(e) => {
                                            const file = (e.target as HTMLInputElement).files?.[0];
                                            setImage(file);
                                            setPreviewUrl(file ? URL.createObjectURL(file) : null);
                                        }}
                                        className="hidden"
                                        accept="image/*"
                                    />

                                    {previewUrl ? (
                                        <div className="space-y-4">
                                            <div className="relative mx-auto h-48 w-full overflow-hidden rounded-lg">
                                                <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex items-center justify-center text-green-600">
                                                <Check className="mr-2 h-5 w-5" />
                                                <span>Image uploaded successfully</span>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="border-pink-200 text-pink-600 hover:border-pink-400"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPreviewUrl(null);
                                                    setImage(undefined);
                                                }}
                                            >
                                                Change Image
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-200/50">
                                                <Upload className="h-8 w-8 text-pink-500" />
                                            </div>
                                            <div>
                                                <p className="mb-2 text-sm">
                                                    <span className="font-medium">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs">SVG, PNG, JPG or GIF (max. 2MB)</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="border-pink-200 text-pink-600 hover:border-pink-400"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ImageIcon className="mr-2 h-4 w-4" />
                                                Select Image
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                {errors.image && (
                                    <div className="mt-1 flex items-center text-sm text-red-600">
                                        <AlertCircle className="mr-1 h-4 w-4" />
                                        {errors.image}
                                    </div>
                                )}
                            </div>

                            {/* Status Field */}
                            <div className="space-y-2">
                                <Label htmlFor="status" className="font-medium">
                                    Status <span className="text-pink-600">*</span>
                                </Label>
                                <Select name="status" value={status} onValueChange={setStatus} required>
                                    <SelectTrigger
                                        id="status"
                                        className={`border-2 ${
                                            errors.status ? 'border-red-300 focus:border-red-500' : 'border-pink-200 focus:border-pink-500'
                                        } focus:ring-pink-200`}
                                    >
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="lost">
                                            <div className="flex items-center">
                                                <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                                                Lost
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="found">
                                            <div className="flex items-center">
                                                <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                                                Found
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="claimed">
                                            <div className="flex items-center">
                                                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                                                Claimed
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <div className="mt-1 flex items-center text-sm text-red-600">
                                        <AlertCircle className="mr-1 h-4 w-4" />
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
                            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                                <Button
                                    type="submit"
                                    className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-pink-600 hover:to-rose-600 hover:shadow-lg"
                                >
                                    Update Item
                                </Button>
                                <Link href="/items" className="flex-1">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full rounded-full border-2 border-pink-200 px-6 py-2 font-medium text-pink-600 transition-all duration-200 hover:border-pink-300 hover:text-pink-700"
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
            <Footer />
        </div>
    );
};

export default Edit;
