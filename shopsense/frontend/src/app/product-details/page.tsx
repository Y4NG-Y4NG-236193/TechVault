import ProductDetails from "@/components/product/ProductDetails";
import { mockTrendingProducts } from "@/data/mockProducts";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function ProductDetailsPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    // Next.js 15+ requires awaiting searchParams
    const resolvedParams = await searchParams;
    const idParam = resolvedParams.id;
    const productId = idParam ? parseInt(idParam, 10) : 1;

    // Lookup the correct product
    const product = mockTrendingProducts.find(p => p.id === productId) || mockTrendingProducts[0];

    return (
        <>
            {/* Homepage Top Navbar */}
            <Navbar />
            {/* Product Details */}
            <ProductDetails product={product} />;
            {/* Footer */}
            <Footer />
        </>

    );

}
