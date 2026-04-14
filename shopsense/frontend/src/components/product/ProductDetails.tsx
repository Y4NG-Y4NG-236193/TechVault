"use client";

import React, { useState } from 'react';
import { Product, SpecGroup } from '@/types/product';
import { mockTrendingProducts } from '@/data/mockProducts';

import { Star, Heart, ShoppingCart, Cpu, Monitor, Database, Wifi, Battery, ShieldCheck, Zap, Volume2 } from 'lucide-react';
import Link from 'next/link';

interface ProductDetailsProps {
    product?: Product;
}

export default function ProductDetails({ product = mockTrendingProducts[0] }: ProductDetailsProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState('Midnight Space');
    const [selectedStorage, setSelectedStorage] = useState('1TB SSD');

    const colors = [
        { name: 'Midnight Space', class: 'bg-[#2A3648]' },
        { name: 'Graphite Grey', class: 'bg-[#7E868C]' },
        { name: 'Lunar Silver', class: 'bg-[#CED2D5]' },
    ];

    const storageOptions = ['512GB SSD', '1TB SSD', '2TB SSD', '4TB SSD', '8TB SSD'];

    // Mocking multiple images for the thumbnail gallery
    const images = [product.image, product.image, product.image, product.image];

    // Suggested products — exclude the current product
    const suggestedProducts = mockTrendingProducts.filter(p => p.id !== product.id);

    const getIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'system platform': return <Cpu className="w-5 h-5 text-slate-700" />;
            case 'visual & audio': return <Volume2 className="w-5 h-5 text-slate-700" />;
            case 'storage': return <Database className="w-5 h-5 text-slate-700" />;
            case 'connectivity': return <Wifi className="w-5 h-5 text-slate-700" />;
            case 'battery': return <Battery className="w-5 h-5 text-slate-700" />;
            case 'security': return <ShieldCheck className="w-5 h-5 text-slate-700" />;
            default: return <Zap className="w-5 h-5 text-slate-700" />;
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8">
            <div className="flex flex-col xl:flex-row gap-8 items-start">

                {/* ── Main Product Area ── */}
                <div className="flex-1 min-w-0 flex flex-col lg:flex-row gap-8">

                    {/* Left — Image Gallery */}
                    <div className="w-full lg:w-[55%] flex flex-col gap-3">
                        {/* Main Image */}
                        <div className="w-full aspect-4/3 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-6 shadow-sm">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="max-w-full max-h-[360px] object-contain drop-shadow-xl transition-transform duration-500 hover:scale-[1.02]"
                            />
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`shrink-0 w-20 h-20 rounded-md border-2 flex items-center justify-center p-1.5 bg-white transition-all overflow-hidden ${selectedImage === idx
                                        ? 'border-slate-800 shadow-md ring-2 ring-slate-800/10'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right — Product Info */}
                    <div className="w-full lg:w-[45%] flex flex-col">
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-2">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 5) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-xs text-gray-500">
                                {product.reviews} reviews
                            </span>
                        </div>

                        {/* Price */}
                        <p className="text-2xl font-extrabold text-gray-900 mt-4">${product.price}</p>

                        <div className="w-full h-px bg-gray-100 my-4" />

                        {/* Color Selection */}
                        <div className="mb-4">
                            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Color</h3>
                            <div className="flex gap-2">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-9 h-9 rounded-lg outline-none flex items-center justify-center transition-all ${selectedColor === color.name
                                            ? 'ring-2 ring-slate-800 scale-110 shadow-md'
                                            : 'ring-1 ring-gray-200 hover:scale-105'
                                            }`}
                                        aria-label={`Select ${color.name} color`}
                                    >
                                        <span className={`w-5 h-5 rounded-md ${color.class} block shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Storage Selection */}
                        <div className="mb-6">
                            <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Storage</h3>
                            <div className="flex flex-wrap gap-2">
                                {storageOptions.map((storage) => (
                                    <button
                                        key={storage}
                                        onClick={() => setSelectedStorage(storage)}
                                        className={`px-3.5 py-1.5 rounded-md font-semibold text-xs transition-all duration-200 border ${selectedStorage === storage
                                            ? 'bg-slate-800 text-white border-slate-800 shadow-sm'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                                            }`}
                                    >
                                        {storage}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                            <button className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-lg text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:-translate-y-0.5 uppercase">
                                Add To Cart
                            </button>
                            <button className="flex-1 bg-[#F59E0B] hover:bg-[#D97706] text-white px-4 py-3 rounded-lg text-xs font-bold tracking-wider transition-all duration-300 flex items-center justify-center hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5 uppercase">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Suggested Products Sidebar ── */}
                <div className="w-full xl:w-[280px] shrink-0">
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                        You May Also Like
                    </h2>
                    <div className="xl:max-h-[calc(100vh-160px)] xl:overflow-y-auto xl:pr-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent flex xl:flex-col gap-3 overflow-x-auto xl:overflow-x-hidden pb-2 xl:pb-0">
                        {suggestedProducts.map((item) => (
                            <Link
                                key={item.id}
                                href={`/Product-Details?id=${item.id}`}
                                className="group shrink-0 w-[220px] xl:w-full flex flex-col bg-white border border-gray-100 rounded-lg p-3 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
                            >
                                {/* Image */}
                                <div className="w-full aspect-square rounded-md bg-gray-50/50 flex items-center justify-center p-3 mb-2 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Info */}
                                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                                    {item.category}
                                </span>
                                <h3 className="text-[13px] font-semibold text-gray-900 leading-snug line-clamp-1 mt-0.5 group-hover:text-orange-500 transition-colors">
                                    {item.name}
                                </h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm font-bold text-gray-900">${item.price}</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                        <span className="text-[11px] font-semibold text-gray-600">{item.rating}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>

            {/* ── Specifications Section ── */}
            {product.detailedSpecs && (
                <div className="mt-20">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-lg font-bold text-gray-900 uppercase tracking-[0.2em]">Technical Specifications</h2>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {product.detailedSpecs.map((group, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-[#FDFDFD] border border-gray-100 rounded-2xl p-6 transition-all duration-500 hover:border-amber-200 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.1)] hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Decorative Gradient Background */}
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-500" />

                                <div className="flex items-center gap-3.5 mb-6 relative z-10">
                                    <div className="p-2.5 bg-gray-100 rounded-xl group-hover:bg-amber-500/10 group-hover:text-amber-600 transition-all duration-300">
                                        {getIcon(group.category)}
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-sm tracking-wide">{group.category}</h3>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    {group.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-start gap-4">
                                            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{item.label}</span>
                                            <span className="text-[13px] text-gray-700 font-semibold text-right leading-tight">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}