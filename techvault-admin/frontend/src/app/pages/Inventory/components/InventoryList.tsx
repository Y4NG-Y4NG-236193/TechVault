"use client";

import React from 'react';
import { Search, Edit2, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { handleDelete } from '@/app/components/buttons/Delete-Button';

interface InventoryListProps {
  products: Product[];
  loading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export function InventoryList({
  products,
  loading,
  searchTerm,
  onSearchChange,
  onEdit,
  onRefresh,
}: InventoryListProps) {
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-brand-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-white">
        <div className="relative w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime/20 focus:border-brand-lime transition-all text-sm font-medium"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-brand-carbon text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
            <tr>
              <th className="px-6 py-5">Product Name</th>
              <th className="px-6 py-5">Brand</th>
              <th className="px-6 py-5">Price</th>
              <th className="px-6 py-5">Stock</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 bg-white">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400 italic">Loading inventory...</td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400">
                  {searchTerm ? 'No matches found in the vault.' : 'The vault is empty. Start adding products.'}
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.product_id} className="hover:bg-zinc-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-brand-carbon">{product.name}</div>
                    <div className="text-zinc-500 text-xs truncate max-w-xs">{product.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] border-b border-zinc-100 pb-0.5">
                      {product.brand || 'GENERIC'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-brand-carbon">₱{Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center h-7 px-3 rounded-r-md border-l-4 bg-zinc-50/80 transition-all ${Number(product.stock) > 10
                      ? 'border-[#bef264]'
                      : Number(product.stock) > 0
                        ? 'border-amber-400'
                        : 'border-rose-500'
                      }`}>
                      <span className="text-[10px] font-black text-brand-carbon uppercase tracking-[0.15em]">
                        {Number(product.stock) === 0 ? 'DEPLETED' : `${product.stock} ITEMS`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-zinc-400 hover:text-brand-lime hover:bg-[#bef264]/10 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete('products', product.product_id, onRefresh)}
                        className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
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
  );
}
