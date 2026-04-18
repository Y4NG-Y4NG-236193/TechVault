"use client";

import { getAuthToken } from './useAuthToken';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface UseSaveOptions<T extends Record<string, unknown>> {
    /** API resource path, e.g. "products" → /api/products */
    endpoint: string;
    /**
     * The ID of the record being edited.
     * - Present  → PUT  /api/<endpoint>/<editingId>
     * - Absent   → POST /api/<endpoint>
     */
    editingId?: string;
    /** Form data payload to send as the request body */
    formData: T;
    /** Called after a successful create or update */
    onSuccess?: () => void;
    /** Called to close the form / modal after success */
    onClose?: () => void;
}

/**
 * useSave
 *
 * Returns an onSubmit handler that POSTs (create) or PUTs (update)
 * to /api/<endpoint> using the current Supabase session token.
 *
 * Fully generic — works with any data shape and any REST resource.
 *
 * @example
 *   const handleSave = useSave({
 *     endpoint: 'products',
 *     editingId: editingProduct?.product_id,
 *     formData,
 *     onSuccess: fetchProducts,
 *     onClose: handleCloseModal,
 *   });
 *
 *   <form onSubmit={handleSave}>...</form>
 */
export function useSave<T extends Record<string, unknown>>({
    endpoint,
    editingId,
    formData,
    onSuccess,
    onClose,
}: UseSaveOptions<T>) {
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = await getAuthToken();

        try {
            if (editingId) {
                // UPDATE existing record
                const res = await fetch(`${apiUrl}/api/${endpoint}/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });

                if (res.ok) {
                    onSuccess?.();
                    onClose?.();
                } else {
                    const errData = await res.json().catch(() => ({}));
                    console.error('Update failed:', res.status, errData);
                    alert(`Update failed: ${(errData as { error?: string }).error || res.statusText}`);
                }
            } else {
                // CREATE new record
                const res = await fetch(`${apiUrl}/api/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });

                if (res.ok) {
                    onSuccess?.();
                    onClose?.();
                } else {
                    const errData = await res.json().catch(() => ({}));
                    console.error('Create failed:', res.status, errData);
                    alert(`Create failed: ${(errData as { error?: string }).error || res.statusText}`);
                }
            }
        } catch (error) {
            console.error(`Error saving ${endpoint}:`, error);
        }
    };

    return handleSave;
}
