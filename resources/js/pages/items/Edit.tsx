import { Link, useForm, usePage } from '@inertiajs/react';
import { AlertCircle, ArrowLeft, Check, ImageIcon, Loader2, Upload } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';

import Footer from '@/components/footer';
import Menu from '@/components/menu';
import Navbar from '@/components/navbar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Edit: React.FC = () => {
    // Get item from page props
    const { item, auth } = usePage().props as unknown as {
        item: {
            id: number;
            name: string;
            description?: string;
            image?: string;
            status: string;
        };
        auth: { user: { name: string } | null };
    };

    const { data, setData, put, processing, errors} = useForm({
        name: item?.name || '',
        description: item?.description || '',
        image: undefined as File | undefined,
        status: item?.status || 'lost',
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(item?.image ? `/storage/${item.image}` : null);

    // Sync form data and previewUrl with item prop changes
    useEffect(() => {
        setData((data) => ({
            ...data,
            name: item?.name || '',
            description: item?.description || '',
            image: undefined,
            status: item?.status || 'lost',
        }));
        setPreviewUrl(item?.image ? `/storage/${item.image}` : null);
    }, [item, setData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const file = (e.target as HTMLInputElement).files?.[0];
            setData(name as 'image', file);

            // Create preview URL for the image
            if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }
        } else if (name === 'name' || name === 'description' || name === 'status') {
            setData(name, value);
        }
    };

    const handleSelectChange = (value: string) => {
        setData('status', value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Check if data has changed
        const isUnchanged = data.name === item.name && data.description === (item.description || '') && data.status === item.status && !data.image; // Only consider image changed if a new file is selected

        if (isUnchanged) {
            alert('No changes detected. Please modify the form before submitting.');
            return;
        }
        put(`/items/${item.id}`, {
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
                        <CardDescription>Fill out the form below to edit item.</CardDescription>
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
                                    value={data.description}
                                    onChange={handleChange}
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
                                    <input id="image" name="image" type="file" onChange={handleChange} className="hidden" accept="image/*" />

                                    {previewUrl ? (
                                        <div className="space-y-4">
                                            <div className="relative mx-auto h-48 w-full overflow-hidden rounded-lg">
                                                <img src={previewUrl || '/placeholder.svg'} alt="Preview" className="h-full w-full object-cover" />
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
                                                    setData('image', undefined);
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
                                <Select name="status" value={data.status} onValueChange={handleSelectChange} required>
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
                                    disabled={processing}
                                    className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 font-medium text-white shadow-md transition-all duration-200 hover:from-pink-600 hover:to-rose-600 hover:shadow-lg"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Item'
                                    )}
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
