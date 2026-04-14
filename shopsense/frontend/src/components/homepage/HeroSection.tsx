import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="relative w-full h-[600px] lg:h-[750px] bg-[#020617] text-white flex items-center overflow-hidden">
            {/* Background Image - Full Width */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-section/hero-laptop.jpg"
                    alt="Apex Pro 16 Laptop Background"
                    fill
                    className="object-cover object-center scale-105"
                    priority
                />
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-[#020617] via-[#020617]/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-transparent to-transparent opacity-60 z-10" />
            </div>

            {/* Ambient Animated Light */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-20">
                <div className="max-w-2xl">
                    {/* Description - Left Side */}
                    <div className="flex flex-col space-y-8 text-left">
                        <div className="space-y-6">
                            <span className="inline-block px-4 py-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm font-semibold rounded-full tracking-wider uppercase">
                                New Arrival
                            </span>
                            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] drop-shadow-2xl">
                                Apex Pro 16:<br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-zinc-500">
                                    Limitless Power.
                                </span>
                            </h1>
                            <p className="text-zinc-300 text-lg lg:text-xl font-medium tracking-wide max-w-xl leading-relaxed">
                                Experience the raw power of the M3 Pro Chip. Designed for those who define the future.
                                32GB Unified Memory, 16-core GPU, and a stunning 120Hz Liquid Retina display.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 pt-4">
                            <button className="bg-orange-500 hover:bg-orange-600 text-black font-extrabold py-4 px-12 rounded-xl transition-all flex items-center group shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-105 active:scale-95">
                                Buy Now
                                <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                            <button className="backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 px-12 rounded-xl transition-all hover:border-white/30">
                                View Specs
                            </button>
                        </div>

                        {/* Slider Progress Indicator */}
                        <div className="flex items-center space-x-4 pt-10">
                            <div className="group cursor-pointer">
                                <div className="w-16 h-1.5 bg-orange-500 rounded-full transition-all group-hover:w-20" />
                            </div>
                            <div className="w-4 h-1.5 bg-zinc-700/50 rounded-full hover:bg-zinc-600 transition-colors cursor-pointer" />
                            <div className="w-4 h-1.5 bg-zinc-700/50 rounded-full hover:bg-zinc-600 transition-colors cursor-pointer" />
                            <div className="w-4 h-1.5 bg-zinc-700/50 rounded-full hover:bg-zinc-600 transition-colors cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;