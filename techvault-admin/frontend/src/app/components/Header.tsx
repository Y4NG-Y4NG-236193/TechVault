"use client";

import React from "react";
import { Search, Bell, User, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#18181b] bg-[#09090b] px-8 backdrop-blur-md">
      {/* Left: Search Bar */}
      <div className="flex flex-1 items-center gap-6">
        {/* Logo (for mobile) */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#bef264] text-black">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <span className="text-lg font-black tracking-tighter text-[#fafafa] uppercase">TechVault</span>
        </div>

        <div className="relative w-full max-w-md hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border border-[#18181b] bg-[#18181b] py-2.5 pl-10 pr-3 text-sm text-[#fafafa] placeholder-zinc-500 outline-none transition-all focus:border-[#bef264] focus:ring-4 focus:ring-[#bef264]/10"
            placeholder="Search analytics, orders, or workflows..."
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* User Balance */}

        {/* Notifications */}
        <button className="relative rounded-xl border border-[#18181b] p-2 text-zinc-400 transition-all hover:bg-zinc-900 hover:text-[#fafafa]">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-rose-500"></span>
        </button>

        {/* Profile */}
        <button className="group flex items-center gap-3 rounded-xl border border-[#18181b] bg-[#18181b] p-1 pr-4 transition-all hover:bg-zinc-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#bef264] text-black shadow-sm transition-transform group-hover:scale-105">
            <User className="h-6 w-6" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-bold text-[#fafafa]">Adrian</span>
            <span className="text-[10px] font-medium text-zinc-500">Administrator</span>
          </div>
        </button>
      </div>
    </header>
  );
}
