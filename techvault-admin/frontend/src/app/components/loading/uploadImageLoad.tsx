import React from 'react';
import { Loader2 } from 'lucide-react';

export const UploadImageLoader = () => {
    return (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-brand-carbon/40 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative flex flex-col items-center">
                {/* Animated Glow Effect */}
                <div className="absolute -inset-8 bg-[#bef264]/20 rounded-full blur-3xl animate-pulse" />

                {/* Spinner Container */}
                <div className="relative bg-white p-8 rounded-[2.5rem] shadow-2xl border border-zinc-100">
                    <Loader2 className="h-12 w-12 text-brand-lime animate-spin stroke-[2.5px]" />
                </div>

                {/* Text Content */}
                <div className="mt-8 text-center space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Securing the Vault</h3>
                    <p className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.2em] animate-pulse">
                        Syncing media and inventory data
                    </p>
                </div>
            </div>
        </div>
    );
};
