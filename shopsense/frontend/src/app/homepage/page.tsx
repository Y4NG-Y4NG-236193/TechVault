import HeroSection from "@/components/homepage/HeroSection";
import Categories from "@/components/product/Categories";
import TrendingProducts from "@/components/product/TrendingProducts";

export default function Homepage() {
    return (
        <>
            {/* Hero Section */}
            <HeroSection />
            {/* Categories Section */}
            <Categories />
            {/* Trending Products Section */}
            <TrendingProducts />

        </>
    );
}
