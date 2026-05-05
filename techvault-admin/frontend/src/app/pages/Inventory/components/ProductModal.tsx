"use client";

import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Settings, Link as LinkIcon, PlusCircle, Sparkles, Plus, Trash2 } from 'lucide-react';
import { Product, ProductFormData } from '../types';
import { UploadImageLoader } from '@/app/components/loading/uploadImageLoad';
import { SaveButton } from '@/app/components/buttons/Save-Button';
import { getAuthToken, uploadFile } from '../utils/inventoryUtils';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProduct: Product | null;
  onSave: () => Promise<void>;
  apiUrl: string;
}

export function ProductModal({
  isOpen,
  onClose,
  editingProduct,
  onSave,
  apiUrl,
}: ProductModalProps) {
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
  const [galleryFilesMap, setGalleryFilesMap] = useState<Map<string, File>>(new Map());
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      const mainImage = editingProduct.images?.find(img => img.is_main)?.image_url || '';
      const otherImages = editingProduct.images?.filter(img => !img.is_main).map(img => img.image_url) || [];
      const specsObject = editingProduct.specs?.[0]?.spec_key || {};
      const specsArray = Object.entries(specsObject).map(([key, value]) => ({
        key,
        value: String(value)
      }));

      setFormData({
        name: editingProduct.name,
        description: editingProduct.description || '',
        price: editingProduct.price,
        brand: editingProduct.brand || '',
        stock: editingProduct.stock,
        rating: editingProduct.rating,
        thumbnailUrl: mainImage,
        galleryUrls: otherImages,
        specs: specsArray.length > 0 ? specsArray : [
          { key: 'Processor', value: '' },
          { key: 'RAM', value: '' },
          { key: 'Storage', value: '' }
        ],
      });
    } else {
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
  }, [editingProduct]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'gallery') => {
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

  const getCleanData = (thumbnailUrlOverride?: string, galleryUrlsOverride?: string[]) => {
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

  const handleInternalSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let finalThumbnailUrl = formData.thumbnailUrl;
      if (thumbnailFile && finalThumbnailUrl.startsWith('blob:')) {
        finalThumbnailUrl = await uploadFile(thumbnailFile);
      }

      const finalGalleryUrls = await Promise.all(
        formData.galleryUrls.map(async (url) => {
          if (url.startsWith('blob:')) {
            const file = galleryFilesMap.get(url);
            if (file) return await uploadFile(file);
          }
          return url;
        })
      );

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
        await onSave();
        onClose();
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
        alert(`AI Generation Error: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      console.error('Error generating AI description:', error);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-carbon/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-brand-white rounded-3xl w-full max-w-7xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 h-[90vh] flex flex-col border border-zinc-200">
        <div className="flex justify-between items-center p-6 border-b border-zinc-100 shrink-0 bg-white z-10">
          <h2 className="text-xl font-black text-brand-carbon flex items-center gap-3 uppercase tracking-tighter">
            <div className="h-8 w-1.5 bg-[#bef264] rounded-full" />
            {editingProduct ? 'Edit Product' : 'Register Product'}
          </h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-brand-carbon hover:bg-zinc-100 rounded-xl transition-all">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleInternalSave} className="flex-1 flex flex-col min-h-0 overflow-hidden bg-zinc-50/30">
          {isUploading && <UploadImageLoader />}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-8 gap-0 overflow-hidden">

            {/* Column 1: Media (Left) */}
            <div className="lg:col-span-2 h-full overflow-y-auto p-8 border-r border-zinc-100 space-y-8 custom-scrollbar bg-white">
              <div className="flex items-center gap-2 text-brand-carbon font-bold text-[10px] uppercase tracking-[0.2em] px-1">
                <ImageIcon className="h-4 w-4 text-brand-lime" /> Gallery & Media
              </div>

              {/* Main Thumbnail */}
              <div className="space-y-4">
                <div className="aspect-square rounded-3xl bg-zinc-50 border border-zinc-100 overflow-hidden relative group transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                  {formData.thumbnailUrl ? (
                    <>
                      <img src={formData.thumbnailUrl} alt="Thumbnail" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-brand-carbon/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <label className="cursor-pointer p-3 bg-[#bef264] rounded-2xl shadow-xl hover:scale-110 transition-transform text-brand-carbon">
                          <Upload className="h-6 w-6" />
                          <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail')} accept="image/*" />
                        </label>
                      </div>
                    </>
                  ) : (
                    <label className="h-full w-full flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-100 transition-colors">
                      <div className="p-4 bg-[#bef264]/10 rounded-2xl mb-3">
                        <Upload className="h-6 w-6 text-brand-lime" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Upload Cover</span>
                      <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'thumbnail')} accept="image/*" />
                    </label>
                  )}
                </div>
                <div className="relative group">
                  <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-brand-lime transition-colors" />
                  <input
                    type="text"
                    placeholder="Image URL..."
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="w-full pl-10 pr-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-brand-lime transition-all text-xs font-medium text-brand-carbon"
                  />
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Gallery List</span>
                  <label className="cursor-pointer p-1.5 bg-[#bef264] border-2 border-transparent hover:border-black rounded-lg transition-colors group">
                    <Plus className="h-4 w-4 text-brand-carbon group-hover:text-brand-carbon" />
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

            {/* Column 2: General Info */}
            <div className="lg:col-span-3 h-full overflow-y-auto p-8 border-r border-zinc-100 space-y-8 custom-scrollbar">
              <div className="flex items-center gap-2 text-brand-carbon font-bold text-[10px] uppercase tracking-[0.2em] px-1">
                <Settings className="h-4 w-4 text-brand-lime" /> Global Properties
              </div>

              <div className="bg-white p-8 rounded-4xl border border-zinc-100 space-y-6">
                <div className="space-y-5">
                  <div className="group">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-2 ml-1">Product Name</label>
                    <input
                      type="text"
                      placeholder="e.g., MacBook Pro M3"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:border-brand-lime transition-all font-bold text-brand-carbon"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-2 ml-1">Brand Identifier</label>
                    <input
                      type="text"
                      placeholder="Apple Inc."
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:border-brand-lime transition-all text-zinc-600 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="group">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-2 ml-1">Listing Price</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">₱</span>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full pl-10 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:border-brand-lime transition-all text-brand-carbon font-black"
                          required
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-2 ml-1">Inventory Count</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:border-brand-lime transition-all text-brand-carbon font-black"
                        required
                      />
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex justify-between items-center mb-2 ml-1">
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase">Catalogue Description</label>
                      <button
                        type="button"
                        onClick={handleGenerateAIDescription}
                        disabled={isGeneratingAI}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${isGeneratingAI
                          ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                          : 'bg-[#bef264]/10 text-brand-carbon hover:bg-[#bef264] border border-brand-lime/20'
                          }`}
                      >
                        <Sparkles className={`h-3 w-3 ${isGeneratingAI ? 'animate-pulse' : ''}`} />
                        {isGeneratingAI ? 'Processing...' : 'AI Suggest'}
                      </button>
                    </div>
                    <div className="relative">
                      <textarea
                        placeholder="Compose a compelling product story..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={`w-full px-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:bg-white focus:border-brand-lime transition-all min-h-[500px] resize-none leading-relaxed text-zinc-600 text-sm ${isGeneratingAI ? 'opacity-50 pointer-events-none' : ''
                          }`}
                        rows={6}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Technical Specs */}
            <div className="lg:col-span-3 h-full overflow-y-auto p-8 space-y-8 custom-scrollbar bg-white">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2 text-brand-carbon font-bold text-[10px] uppercase tracking-[0.2em]">
                  <PlusCircle className="h-4 w-4 text-brand-lime" /> Technical Specs
                </div>
                <button
                  type="button"
                  onClick={addSpecRow}
                  className="text-[10px] font-bold text-brand-carbon bg-transparent border-2 border-brand-lime hover:border-transparent hover:bg-[#bef264] px-4 py-2 rounded-xl transition-all flex items-center gap-2 uppercase tracking-widest cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> Add Row
                </button>
              </div>

              <div className="bg-zinc-50 rounded-3xl border border-zinc-100 flex flex-col overflow-hidden">
                <div className="p-8 space-y-5">
                  {formData.specs.map((spec, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="w-2/5">
                        <input
                          type="text"
                          placeholder="Attribute"
                          value={spec.key}
                          onChange={(e) => updateSpecRow(idx, 'key', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:border-brand-lime transition-all text-xs font-bold text-brand-carbon uppercase tracking-wider"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Value"
                          value={spec.value}
                          onChange={(e) => updateSpecRow(idx, 'value', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:border-brand-lime transition-all text-xs text-zinc-600 font-medium"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecRow(idx)}
                        className="p-2.5 text-zinc-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Action Bar */}
          <div className="p-8 border-t border-zinc-100 flex justify-end items-center gap-4 shrink-0 bg-white z-10">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-4 text-xs font-bold text-zinc-500 hover:text-white bg-transparent border-2 border-zinc-200 hover:border-transparent hover:bg-zinc-900 rounded-xl uppercase tracking-widest transition-all cursor-pointer"
            >
              Discard Changes
            </button>
            <div className="w-60">
              <SaveButton label={editingProduct ? 'Update Inventory' : 'Finalize Registration'} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
