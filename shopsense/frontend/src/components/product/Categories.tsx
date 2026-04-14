import React from 'react';
import {
    Laptop,
    Smartphone,
    Tablet,
    Monitor,
    Cpu,
    CircuitBoard,
    MemoryStick,
    HardDrive,
    Keyboard,
    Mouse,
    Headphones,
    Video,
    Wifi,
    Zap,
    Wind,
    Usb
} from 'lucide-react';

const categoriesData = [
    { name: 'Laptops', icon: Laptop },
    { name: 'Smartphones', icon: Smartphone },
    { name: 'Tablets', icon: Tablet },
    { name: 'Desktops', icon: Monitor },
    { name: 'GPUs', icon: Cpu },
    { name: 'CPUs', icon: Cpu },
    { name: 'Motherboards', icon: CircuitBoard },
    { name: 'RAM', icon: MemoryStick },
    { name: 'Storage', icon: HardDrive },
    { name: 'Monitors', icon: Monitor },
    { name: 'Keyboards', icon: Keyboard },
    { name: 'Mice', icon: Mouse },
    { name: 'Headsets', icon: Headphones },
    { name: 'Webcams', icon: Video },
    { name: 'Networking', icon: Wifi },
    { name: 'Power', icon: Zap },
    { name: 'Cooling', icon: Wind },
    { name: 'Accessories', icon: Usb },
];

const Categories = () => {
    return (
        <section className="bg-[#020617] py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <h2 className="text-2xl font-bold text-white mb-8">Shop by Category</h2>

                <div className="relative group">
                    <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-hide snap-x select-none">
                        {categoriesData.map((category, index) => (
                            <div
                                key={index}
                                className="flex-none snap-start group/item cursor-pointer"
                            >
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#14213d] rounded-2xl flex flex-col items-center justify-center gap-3 border border-white/5 transition-all duration-300 hover:border-orange-500/50 group/card"
                                >
                                    <category.icon className="w-8 h-8 md:w-10 md:h-10 text-white transition-all duration-300 group-hover/card:text-orange-500" />
                                    <span className="text-[10px] md:text-xs font-semibold text-white uppercase tracking-wider text-center px-2 transition-colors duration-300 group-hover/card:text-orange-500">
                                        {category.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Categories;
