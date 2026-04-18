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
    <aside className="fixed inset-y-0 left-0 z-40 w-72 border-r border-gray-100 bg-white flex flex-col transition-all duration-300">
      {/* Brand Logo */}
      <div className="flex h-20 items-center gap-3 px-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
          <Zap className="h-6 w-6 fill-current" />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900">
          TechVault
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-6 py-4 scrollbar-hide">
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                  {item.name}
                </div>
                {isActive && <div className="h-1.5 w-1.5 rounded-full bg-indigo-600" />}
              </Link>
            );
          })}
        </div>

        {/* Integrations */}
        <div className="space-y-1">
          <p className="px-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Integrations
          </p>
          {integrationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900"
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                {item.name}
              </div>
              <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </nav>

      {/* User Actions Footer */}
      <div className="mx-6 mb-6 mt-auto space-y-1 pt-6 border-t border-gray-100">
        <Link
          href="/settings"
          className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900"
        >
          <Settings className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
          Settings
        </Link>
        <button
          onClick={() => console.log("Logout triggered")}
          className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-rose-500 transition-all hover:bg-rose-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
