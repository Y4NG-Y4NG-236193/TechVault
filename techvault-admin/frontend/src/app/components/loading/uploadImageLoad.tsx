import React from 'react';
import { Loader2 } from 'lucide-react';

export const UploadImageLoader = () => {
    return (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative flex flex-col items-center">
                {/* Animated Glow Effect */}
                <div className="absolute -inset-8 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />

                {/* Spinner Container */}
                <div className="relative bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-indigo-50">
                    <Loader2 className="h-12 w-12 text-indigo-600 animate-spin stroke-[2.5px]" />
                </div>

                {/* Text Content */}
                <div className="mt-8 text-center space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Finalizing Product</h3>
                    <p className="text-sm font-semibold text-indigo-600/70 uppercase tracking-widest animate-pulse">
                        Uploading media and saving data
                    </p>
                </div>
            </div>
        </div>
    );
};
