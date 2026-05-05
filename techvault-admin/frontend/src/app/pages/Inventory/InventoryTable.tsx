"use client";

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Product } from './types';
import { getAuthToken } from './utils/inventoryUtils';
import { InventoryList } from './components/InventoryList';
import { ProductModal } from './components/ProductModal';

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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

  const handleOpenModal = (product?: Product) => {
    setEditingProduct(product || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveSuccess = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-brand-carbon tracking-tighter uppercase">Inventory Management</h1>
          <p className="text-zinc-500 mt-1 font-medium">Manage your product catalog, pricing, and stock levels.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-transparent hover:bg-[#bef264] text-brand-carbon border-2 border-brand-lime hover:border-transparent px-6 py-3 rounded-xl transition-all font-bold uppercase text-xs tracking-widest cursor-pointer"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <InventoryList
        products={products}
        loading={loading}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onEdit={handleOpenModal}
        onRefresh={fetchProducts}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingProduct={editingProduct}
        onSave={handleSaveSuccess}
        apiUrl={apiUrl}
      />
    </div>
  );
}
