import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "TechVault - Shop Smart",
    description: "Your ultimate shopping companion for trends and comparisons.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col font-sans bg-zinc-50 dark:bg-zinc-950">
                {/* Responsive Navigation Bar */}
                <Navbar />

                {/* Main Content Area */}
                <main className="grow">
                    {children}
                </main>

                {/* Footer */}
                <Footer />
            </body>
        </html>
    );
}
