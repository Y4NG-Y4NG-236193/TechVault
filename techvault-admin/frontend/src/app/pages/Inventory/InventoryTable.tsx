"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, X, Upload, Image as ImageIcon, Settings, Link as LinkIcon, PlusCircle, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { handleDelete } from '@/app/components/buttons/Delete-Button';
import { SaveButton } from '@/app/components/buttons/Save-Button';
import { useSave } from '@/app/hooks/useSave';
import { UploadImageLoader } from '@/app/components/loading/uploadImageLoad';

// Subset of Product used in the create/edit form
type ProductFormData = {
  name: string;
  description: string;
  price: number | string; // string is used for the empty value in the input field
  brand: string;
  stock: number | string; // string is used for the empty value in the input field
  rating: number;
  thumbnailUrl: string;
  galleryUrls: string[]; // the images in the gallery converted into arrays
  specs: { key: string; value: string }[]; // the specs in the form
};

interface ProductImage {
  image_id: string;
  product_id: string;
  image_url: string;
  is_main: boolean;
}

interface ProductSpec {
  spec_id: string;
  product_id: string;
  spec_key: any;
}

interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number | string;
  brand: string;
  category_id?: string;
  stock: number | string;
  rating: number;
  created_at: string;
  images?: ProductImage[];
  specs?: ProductSpec[];
}

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State — typed explicitly so useSave generic resolves correctly
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    brand: '',
    stock: '',
    rating: 0,
    thumbnailUrl: '',
    galleryUrls: [],
    specs: [
      { key: 'Processor', value: '' },
      { key: 'RAM', value: '' },
      { key: 'Storage', value: '' },
      { key: 'GPU', value: '' },
      { key: 'Display', value: '' },
    ],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  // Key: blob preview URL, Value: actual File object
  const [galleryFilesMap, setGalleryFilesMap] = useState<Map<string, File>>(new Map());
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const getAuthToken = async () => {
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      return session?.access_token || '';
    } catch (e) {
      console.error('Error getting auth token', e);
      return '';
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = await getAuthToken();
      const res = await fetch(`${apiUrl}/api/products`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setThumbnailFile(null);
    galleryFilesMap.forEach((_, url) => URL.revokeObjectURL(url));
    setGalleryFilesMap(new Map());

    // Revoke object URLs to avoid memory leaks
    if (formData.thumbnailUrl.startsWith('blob:')) {
      URL.revokeObjectURL(formData.thumbnailUrl);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);

      // Extract thumbnail and gallery from images array
      const mainImage = product.images?.find(img => img.is_main)?.image_url || '';
      const otherImages = product.images?.filter(img => !img.is_main).map(img => img.image_url) || [];
      const specsObject = product.specs?.[0]?.spec_key || {};

      // Convert JSON object to array of key-value pairs
      const specsArray = Object.entries(specsObject).map(([key, value]) => ({
        key,
        value: String(value)
      }));

      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        brand: product.brand || '',
        stock: product.stock,
        rating: product.rating,
        thumbnailUrl: mainImage,
        galleryUrls: otherImages,
        specs: specsArray.length > 0 ? specsArray : [
          { key: 'Processor', value: '' },
          { key: 'RAM', value: '' },
          { key: 'Storage', value: '' }
        ],
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        brand: '',
        stock: '',
        rating: 0,
        thumbnailUrl: '',
        galleryUrls: [],
        specs: [
          { key: 'Processor', value: '' },
          { key: 'RAM', value: '' },
          { key: 'Storage', value: '' },
          { key: 'GPU', value: '' },
          { key: 'Display', value: '' },
        ],
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'gallery') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (type === 'thumbnail') {
      const file = files[0];
      setThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, thumbnailUrl: previewUrl }));
    } else {
      const newFiles = Array.from(files);
      const newMap = new Map(galleryFilesMap);
      const previewUrls: string[] = [];

      newFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        newMap.set(url, file);
        previewUrls.push(url);
      });

      setGalleryFilesMap(newMap);
      setFormData(prev => ({ ...prev, galleryUrls: [...prev.galleryUrls, ...previewUrls] }));
    }
  };

  const removeGalleryImage = (index: number) => {
    const urlToRemove = formData.galleryUrls[index];
    if (urlToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(urlToRemove);
      const newMap = new Map(galleryFilesMap);
      newMap.delete(urlToRemove);
      setGalleryFilesMap(newMap);
    }
    setFormData(prev => ({
      ...prev,
      galleryUrls: prev.galleryUrls.filter((_, i) => i !== index)
    }));
  };

  const uploadFile = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Upload error: ${uploadError.message}`);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const addSpecRow = () => {
    setFormData(prev => ({
      ...prev,
      specs: [...prev.specs, { key: '', value: '' }]
    }));
  };

  const removeSpecRow = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const updateSpecRow = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...formData.specs];
    newSpecs[index][field] = value;
    setFormData(prev => ({ ...prev, specs: newSpecs }));
  };

  // Generic save handler — fully driven by useSave hook
  const getCleanData = (thumbnailUrlOverride?: string, galleryUrlsOverride?: string[]) => {
    // Convert specs array back to JSON object for backend
    const specsObject = formData.specs.reduce((acc: any, curr) => {
      if (curr.key.trim()) {
        acc[curr.key.trim()] = curr.value;
      }
      return acc;
    }, {});

    const thumbUrl = thumbnailUrlOverride || formData.thumbnailUrl;
    const gUrls = galleryUrlsOverride || formData.galleryUrls;

    return {
      name: formData.name,
      description: formData.description,
      brand: formData.brand,
      price: typeof formData.price === 'string' ? parseFloat(formData.price) || 0 : formData.price,
      stock: typeof formData.stock === 'string' ? parseInt(formData.stock, 10) || 0 : formData.stock,
      rating: formData.rating,
      images: [
        ...(thumbUrl ? [{ image_url: thumbUrl, is_main: true }] : []),
        ...gUrls.map(url => ({ image_url: url, is_main: false }))
      ],
      specs: specsObject,
    };
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // 1. Handle Thumbnail Upload
      let finalThumbnailUrl = formData.thumbnailUrl;
      if (thumbnailFile && finalThumbnailUrl.startsWith('blob:')) {
        finalThumbnailUrl = await uploadFile(thumbnailFile);
      }

      // 2. Handle Gallery Uploads
      const finalGalleryUrls = await Promise.all(
        formData.galleryUrls.map(async (url) => {
          if (url.startsWith('blob:')) {
            const file = galleryFilesMap.get(url);
            if (file) return await uploadFile(file);
          }
          return url;
        })
      );

      // 3. Submit Data
      const token = await getAuthToken();
      const payload = getCleanData(finalThumbnailUrl, finalGalleryUrls);
      const method = editingProduct ? 'PUT' : 'POST';
      const endpoint = editingProduct ? `${apiUrl}/api/products/${editingProduct.product_id}` : `${apiUrl}/api/products`;

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        await fetchProducts();
        handleCloseModal();
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || 'Failed to save product'}`);
      }
    } catch (error) {
      console.error('Error during save:', error);
      alert('An unexpected error occurred while saving.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateAIDescription = async () => {
    if (!formData.name) {
      alert('Please fill the (name, brand, technical specifications) first.');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const token = await getAuthToken();
      // Convert specs array back to JSON object for backend
      const specsObject = formData.specs.reduce((acc: any, curr) => {
        if (curr.key.trim()) {
          acc[curr.key.trim()] = curr.value;
        }
        return acc;
      }, {});

      const res = await fetch(`${apiUrl}/api/ai/generate-description`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          brand: formData.brand,
          specs: specsObject
        })
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, description: data.description }));
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Failed to generate AI description:', errorData.message || res.statusText);
        alert(`AI Generation Error: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      console.error('Error generating AI description:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inventory Management</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog, pricing, and stock levels.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-200"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Loading products...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No products found. Start by adding one.</td>
                </tr>
              ) : (
                products
                  .filter(product =>
                    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <tr key={product.product_id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-gray-500 text-xs truncate max-w-xs">{product.description}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.brand || '-'}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">₱{Number(product.price).toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${Number(product.stock) > 10 ? 'bg-emerald-50 text-emerald-700' : Number(product.stock) > 0 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleOpenModal(product)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete('products', product.product_id, fetchProducts)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-7xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0 bg-white z-10">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <div className="h-8 w-1.5 bg-indigo-600 rounded-full" />
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={handleCloseModal} className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 flex flex-col min-h-0 overflow-hidden bg-gray-50/20">
              {isUploading && <UploadImageLoader />}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">

                {/* Column 1: Media (Left) - Separate Scroll */}
                <div className="lg:col-span-4 h-full overflow-y-auto p-8 border-r border-gray-100 space-y-8 custom-scrollbar">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest px-1">
                    <ImageIcon className="h-4 w-4" /> Gallery & Media
                  </div>

                  {/* Main Thumbnail */}
                  <div className="space-y-4">
                    <div className="aspect-square rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative group transition-all hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] border border-gray-100">
                      {formData.thumbnailUrl ? (
                        <>
                          <img src={formData.thumbnailUrl} alt="Thumbnail" className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <label className="cursor-pointer p-3 bg-white rounded-2xl shadow-xl hover:scale-110 transition-transform text-indigo-600">
                              <Upload className="h-6 w-6" />
                              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail')} accept="image/*" />
                            </label>
                          </div>
                        </>
                      ) : (
                        <label className="h-full w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="p-4 bg-indigo-50 rounded-2xl mb-3">
                            <Upload className="h-6 w-6 text-indigo-600" />
                          </div>
                          <span className="text-sm font-semibold text-gray-500">Upload Cover</span>
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail')} accept="image/*" />
                        </label>
                      )}
                    </div>
                    <div className="relative group">
                      <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input
                        type="text"
                        placeholder="Image URL..."
                        value={formData.thumbnailUrl}
                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                        className="w-full pl-10 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(79,70,229,0.05)] transition-all text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Gallery Grid */}
                  <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gallery List</span>
                      <label className="cursor-pointer p-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group">
                        <Plus className="h-4 w-4 text-indigo-600" />
                        <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e, 'gallery')} accept="image/*" />
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {formData.galleryUrls.map((url, idx) => (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group border border-gray-100 hover:shadow-md transition-all">
                          <img src={url} alt={`Gallery ${idx}`} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="absolute top-1 right-1 p-1.5 bg-black/60 hover:bg-rose-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-all hover:border-indigo-300 group">
                        <Plus className="h-6 w-6 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                        <input type="file" multiple className="hidden" onChange={(e) => handleFileUpload(e, 'gallery')} accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Column 2: General Info (Middle) - Separate Scroll */}
                <div className="lg:col-span-4 h-full overflow-y-auto p-8 border-r border-gray-100 space-y-8 custom-scrollbar">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest px-1">
                    <Settings className="h-4 w-4" /> Global Properties
                  </div>

                  <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-6">
                    <div className="space-y-5">
                      <div className="group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Product Name</label>
                        <input
                          type="text"
                          placeholder="e.g., MacBook Pro M3"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all font-medium text-gray-900"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Brand Identifier</label>
                        <input
                          type="text"
                          placeholder="Apple Inc."
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          className="w-full px-5 py-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all text-gray-700"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="group">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Listing Price</label>
                          <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₱</span>
                            <input
                              type="number"
                              step="0.01"
                              value={formData.price}
                              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                              className="w-full pl-10 pr-4 py-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all text-gray-900 font-mono"
                              required
                            />
                          </div>
                        </div>
                        <div className="group">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">Inventory Count</label>
                          <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                            className="w-full px-5 py-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all text-gray-900 font-mono"
                            required
                          />
                        </div>
                      </div>

                      <div className="group">
                        <div className="flex justify-between items-center mb-2 ml-1">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase">Catalogue Description</label>
                          <button
                            type="button"
                            onClick={handleGenerateAIDescription}
                            disabled={isGeneratingAI}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${isGeneratingAI
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-sm hover:shadow-indigo-200'
                              }`}
                          >
                            <Sparkles className={`h-3 w-3 ${isGeneratingAI ? 'animate-pulse' : ''}`} />
                            {isGeneratingAI ? 'Generating...' : 'AI Suggest'}
                          </button>
                        </div>
                        <div className="relative">
                          <textarea
                            placeholder="Compose a compelling product story..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={`w-full px-5 py-4 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all min-h-[180px] resize-none leading-relaxed text-gray-600 ${isGeneratingAI ? 'opacity-50 pointer-events-none' : ''
                              }`}
                            rows={6}
                          />
                          {isGeneratingAI && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="h-1 w-24 bg-indigo-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 animate-[shimmer_2s_infinite]" style={{ width: '50%' }} />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Technical Specs (Right) - Separate Scroll */}
                <div className="lg:col-span-4 h-full overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
                      <PlusCircle className="h-4 w-4" /> Technical Specifications
                    </div>
                    <button
                      type="button"
                      onClick={addSpecRow}
                      className="text-[10px] font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 px-4 py-2 border border-indigo-100 rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <Plus className="h-3 w-3" /> Add Row
                    </button>
                  </div>

                  <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col overflow-hidden">
                    <div className="p-8 space-y-5">
                      {formData.specs.map((spec, idx) => (
                        <div key={idx} className="flex gap-4 items-center animate-in slide-in-from-right-4 duration-500 ease-out">
                          <div className="w-2/5">
                            <input
                              type="text"
                              placeholder="Attribute"
                              value={spec.key}
                              onChange={(e) => updateSpecRow(idx, 'key', e.target.value)}
                              className="w-full px-4 py-3.5 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all text-sm font-bold text-gray-800 placeholder:font-normal placeholder:text-gray-300"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              placeholder="Value"
                              value={spec.value}
                              onChange={(e) => updateSpecRow(idx, 'value', e.target.value)}
                              className="w-full px-4 py-3.5 bg-gray-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 focus:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all text-sm text-gray-600 placeholder:text-gray-300"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSpecRow(idx)}
                            className="p-2.5 text-gray-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      {formData.specs.length === 0 && (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-300 space-y-4">
                          <div className="p-6 bg-gray-50 rounded-full">
                            <Settings className="h-10 w-10" />
                          </div>
                          <p className="text-sm font-medium">No specialized specs defined.</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-indigo-50/30 border-t border-indigo-50 flex items-center gap-4">
                      <div className="p-2.5 bg-white rounded-xl shadow-sm">
                        <Settings className="h-5 w-5 text-indigo-600" />
                      </div>
                      <p className="text-[11px] text-indigo-600/80 font-medium leading-relaxed">
                        Specific technical data improves AI Search accuracy and provides better comparison metrics for buyers.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Bar (Fixed Footer) */}
              <div className="p-8 border-t border-gray-100 flex justify-end items-center gap-4 shrink-0 bg-white z-10 shadow-[0_-1px_10px_rgba(0,0,0,0.02)]">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-10 py-4 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-2xl transition-all"
                >
                  Discard Changes
                </button>
                <div className="w-72">
                  <SaveButton label={editingProduct ? 'Update Inventory Item' : 'Register New Product'} />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
