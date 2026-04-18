"use client";

import { createClient } from '@/lib/supabase/client';

/**
 * Returns the current Supabase session access token.
 * Shared across all API hooks that need Bearer auth.
 */
export const getAuthToken = async (): Promise<string> => {
    try {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        return session?.access_token || '';
    } catch (e) {
        console.error('Error getting auth token', e);
        return '';
    }
};
