'use client';

import { ArrowRight } from 'lucide-react';
import { mockTrendingProducts } from '@/data/mockProducts';
import ProductCard from './ProductCard';

const TrendingProducts = () => {
    return (
        <section className="bg-[#fafafa] py-16 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
                            Featured Products
                        </h2>
                        <p className="text-[15px] text-gray-500 leading-relaxed font-normal">
                            Discover our curated collection of the most sought-after tech devices, ready to ship locally.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[13px] font-medium uppercase tracking-wider text-gray-400">
                        <button className="hover:text-gray-900 transition-colors">New Arrivals</button>
                        <button className="hover:text-gray-900 transition-colors">Bestsellers</button>
                        <button className="text-gray-900 border-b-2 border-orange-500 pb-1">Trending</button>
                        <button className="hidden sm:flex items-center gap-1 text-orange-500 hover:text-orange-600 transition-colors ml-2">
                            View All <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mockTrendingProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrendingProducts;