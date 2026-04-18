"use client";

import { getAuthToken } from '@/app/hooks/useAuthToken';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * handleDelete
 *
 * Generic delete handler for any REST resource.
 *
 * @param endpoint  API resource path, e.g. "products" → DELETE /api/products/:id
 * @param id        The record's unique identifier
 * @param callback  Optional callback invoked after a successful deletion (e.g. refetch list)
 *
 * @example
 *   <button onClick={() => handleDelete('products', product.product_id, fetchProducts)} />
 */
export const handleDelete = async (
    endpoint: string,
    id: string,
    callback?: () => void
): Promise<void> => {
    console.log(`Attempting to delete ${endpoint} with ID: ${id}`);
    if (!confirm(`Delete this ${endpoint.replace(/-/g, ' ')}?`)) {
        console.log('Delete cancelled by user');
        return;
    }

    const token = await getAuthToken();
    console.log('Auth token retrieved');

    try {
        const url = `${apiUrl}/api/${endpoint}/${id}`;
        console.log(`DELETE request to: ${url}`);
        
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(`Response status: ${res.status}`);

        if (res.ok) {
            console.log('Delete successful');
            callback?.();
        } else {
            const errData = await res.json().catch(() => ({}));
            console.error('Delete failed details:', errData);
            alert(`Delete failed: ${(errData as { error?: string }).error || res.statusText}`);
        }
    } catch (error) {
        console.error(`Error deleting ${endpoint}:`, error);
    }
};
