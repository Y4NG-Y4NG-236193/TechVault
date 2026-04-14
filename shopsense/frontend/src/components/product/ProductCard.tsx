'use client';

import React, { useState } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/product';

const badgeColors: Record<string, string> = {
    New: 'text-emerald-700 bg-emerald-50',
    Trending: 'text-orange-700 bg-orange-50',
    Sale: 'text-red-700 bg-red-50',
    Premium: 'text-purple-700 bg-purple-50',
    Bestseller: 'text-blue-700 bg-blue-50',
};

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
    const [wishlisted, setWishlisted] = useState(false);

    return (
        <Link href={`/product-details?id=${product.id}`} className="group flex flex-col cursor-pointer transition-all duration-300 ease-out border border-transparent hover:border-gray-200 hover:shadow-sm hover:scale-[1.02] p-4 rounded-sm bg-white hover:bg-gray-50/10">

            {/* Image Canvas */}
            <div className="relative w-full aspect-square  rounded-sm overflow-hidden mb-5 flex items-center justify-center p-6 transition-all duration-500 ease-out">

                {/* Badge */}
                {product.badge && (
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md z-10 ${badgeColors[product.badge] ?? 'bg-gray-50 text-gray-600'}`}>
                        {product.badge}
                    </span>
                )}

                {/* Product Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
                />
            </div>

            {/* Content Details */}
            <div className="flex flex-col grow px-1">
                {/* Category */}
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">
                    {product.category}
                </span>

                {/* Product Name */}
                <h3 className="text-[15px] font-semibold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors line-clamp-1 mb-1">
                    {product.name}
                </h3>

                {/* Specs */}
                <p className="text-[13px] text-gray-500 font-normal truncate">
                    {product.specs}
                </p>

                {/* Flexible spacer to push price to bottom if names wrap */}
                <div className="grow"></div>

                {/* Price & Rating Row */}
                <div className="flex items-center justify-between mt-3 mb-4">
                    <span className="text-[17px] font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-[13px] font-semibold text-gray-700">{product.rating}</span>
                        <span className="text-[12px] font-medium text-gray-400">({product.reviews})</span>
                    </div>
                </div>

                {/* Fixed CTA Row below pricing */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted(w => !w); }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-100
                            ${wishlisted ? 'text-orange-500 border-orange-200' : 'text-gray-400 hover:text-orange-500'}`}
                        aria-label="Add to wishlist"
                    >
                        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-orange-500' : ''}`} />
                    </button>
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="flex-1 h-10 bg-gray-50 text-gray-900 hover:bg-orange-500 transition-colors hover:text-white border border-gray-100 hover:border-orange-500 text-sm font-semibold rounded-full flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
