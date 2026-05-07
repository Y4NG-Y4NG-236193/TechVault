'use client'

import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/login');

  return (
    <body className={`min-h-full flex ${isAuthPage ? 'bg-[#09090b]' : 'bg-gray-50/50'}`}>
      {!isAuthPage && <Sidebar />}
      <div className={`flex flex-col flex-1 ${!isAuthPage ? 'pl-64' : ''}`}>
        {!isAuthPage && <Header />}
        <main className={`${!isAuthPage ? 'p-8' : ''} flex-1`}>
          {children}
        </main>
      </div>
    </body>
  );
}
