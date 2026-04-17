"use client";

import React from "react";
import { Search, Bell, User, Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-8 backdrop-blur-md">
      {/* Left: Search Bar */}
      <div className="flex flex-1 items-center gap-6">
        {/* Logo (as requested in topbar) */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <span className="text-lg font-bold text-gray-900">TechVault</span>
        </div>

        <div className="relative w-full max-w-md hidden sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-2xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-3 text-sm placeholder-gray-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            placeholder="Search analytics, orders, or workflows..."
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* User Balance (inspired by image) */}
        <div className="hidden md:flex flex-col items-end mr-4">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Your Balance</span>
          <span className="text-sm font-bold text-indigo-600">$12,450.00</span>
        </div>

        {/* Notifications */}
        <button className="relative rounded-xl border border-gray-100 p-2 text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 border-2 border-white"></span>
        </button>

        {/* Profile */}
        <button className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-1 pr-4 transition-all hover:border-indigo-100 hover:bg-indigo-50/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 shadow-sm transition-transform group-hover:scale-105">
            <User className="h-6 w-6" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-bold text-gray-900">Adrian</span>
            <span className="text-[10px] text-gray-500">Administrator</span>
          </div>
        </button>
      </div>
    </header>
  );
}
