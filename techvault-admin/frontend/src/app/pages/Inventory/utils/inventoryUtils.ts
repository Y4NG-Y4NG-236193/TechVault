"use client";

import { createClient } from '@/lib/supabase/client';

export const getAuthToken = async () => {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || '';
  } catch (e) {
    console.error('Error getting auth token', e);
    return '';
  }
};

export const uploadFile = async (file: File): Promise<string> => {
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
