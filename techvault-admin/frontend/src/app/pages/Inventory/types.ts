"use client";

export type ProductFormData = {
  name: string;
  description: string;
  price: number | string;
  brand: string;
  stock: number | string;
  rating: number;
  thumbnailUrl: string;
  galleryUrls: string[];
  specs: { key: string; value: string }[];
};

export interface ProductImage {
  image_id: string;
  product_id: string;
  image_url: string;
  is_main: boolean;
}

export interface ProductSpec {
  spec_id: string;
  product_id: string;
  spec_key: any;
}

export interface Product {
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
