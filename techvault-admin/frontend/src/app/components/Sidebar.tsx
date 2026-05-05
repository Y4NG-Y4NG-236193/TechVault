"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Box,
  BarChart3,
  User,
  Zap,
  Megaphone,
  Database,
  // Trello,
  FileSpreadsheet,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";

const mainNavItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Inventory", href: "/pages/Inventory", icon: Box },
  { name: "Customers", href: "/pages/Customers", icon: User },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Automation Workflows", href: "/automation", icon: Zap },
  { name: "Marketing", href: "/marketing", icon: Megaphone },
];

const integrationItems = [
  { name: "Supabase", href: "#supabase", icon: Database },
  // { name: "Trello", href: "#trello", icon: Trello },
  { name: "Google Sheets", href: "#sheets", icon: FileSpreadsheet },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-72 border-r border-[#18181b] bg-[#09090b] flex flex-col transition-all duration-300">
      {/* Brand Logo */}
      <div className="flex h-20 items-center gap-3 px-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#bef264] text-black shadow-sm">
          <Zap className="h-6 w-6 fill-current" />
        </div>
        <span className="text-xl font-black tracking-tighter text-[#fafafa] uppercase">
          TechVault
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-4 scrollbar-hide">
        <div className="space-y-1.5">
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            Main Menu
          </p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center justify-between rounded-md px-4 py-2.5 text-sm font-medium transition-all ${isActive
                  ? "bg-[#18181b] text-[#fafafa] border-l-2 border-[#bef264]"
                  : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-200"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`h-4.5 w-4.5 ${isActive ? "text-[#bef264]" : "text-zinc-600 group-hover:text-zinc-400"}`} />
                  {item.name}
                </div>
                {isActive && <ChevronRight className="h-4 w-4 text-[#bef264]" />}
              </Link>
            );
          })}
        </div>

        {/* Integrations */}
        <div className="space-y-1.5">
          <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            Integrations
          </p>
          {integrationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center justify-between rounded-md px-4 py-2.5 text-sm font-medium text-zinc-500 transition-all hover:bg-zinc-900/50 hover:text-zinc-200"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4.5 w-4.5 text-zinc-600 group-hover:text-zinc-400" />
                {item.name}
              </div>
              <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </nav>

      {/* User Actions Footer */}
      <div className="mx-4 mb-6 mt-auto space-y-1 pt-6 border-t border-[#18181b]">
        <Link
          href="/settings"
          className="group flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-zinc-500 transition-all hover:bg-zinc-900/50 hover:text-zinc-200"
        >
          <Settings className="h-4.5 w-4.5 text-zinc-600 group-hover:text-zinc-400" />
          Settings
        </Link>
        <button
          onClick={() => console.log("Logout triggered")}
          className="group flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium text-rose-500/80 transition-all hover:bg-rose-500/10 hover:text-rose-400"
        >
          <LogOut className="h-4.5 w-4.5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
