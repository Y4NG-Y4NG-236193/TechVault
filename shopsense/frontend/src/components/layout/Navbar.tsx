'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Home,
  LayoutGrid,
  Repeat,
  TrendingUp
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/homepage', icon: Home },
    { name: 'Categories', href: '/categories', icon: LayoutGrid },
    { name: 'Compare', href: '/compare', icon: Repeat },
    { name: 'Trending', href: '/trending', icon: TrendingUp },
  ];

  interface ActionIcon {
    name: string;
    icon: React.ElementType;
    count?: number;
  }

  const actionIcons: ActionIcon[] = [
    { name: 'Wishlist', icon: Heart, count: 0 },
    { name: 'Cart', icon: ShoppingCart, count: 0 },
    { name: 'Profile', icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#14213d] text-white shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo Area */}
          <div className="shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-xl italic text-white shadow-inner">
              S
            </div>
            <span className="hidden md:block font-bold text-2xl tracking-tight text-white">
              Tech<span className="text-orange-500">Vault</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-transparent rounded-full leading-5 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 focus:ring-2 focus:ring-orange-500 sm:text-sm transition-all duration-200"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Desktop Right Icons/Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-4 border-r border-white/10 pr-6 mr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-5">
              {actionIcons.map((action) => (
                <button
                  key={action.name}
                  className="relative p-2 text-gray-300 hover:text-orange-400 hover:bg-white/5 rounded-full transition-all duration-200"
                  aria-label={action.name}
                >
                  <action.icon className="h-6 w-6" />
                  {action.count !== undefined && action.count > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange-600 rounded-full">
                      {action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center lg:hidden space-x-2">
            <button className="p-2 text-gray-300 hover:text-white">
              <Search className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-300 hover:text-white relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-7 w-7" aria-hidden="true" />
              ) : (
                <Menu className="block h-7 w-7" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 shadow-2xl' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-6 space-y-1 bg-[#1d2d44] border-t border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="p-2 bg-white/5 rounded-lg group-hover:bg-orange-500/20">
                <link.icon className="h-5 w-5 text-orange-400" />
              </div>
              <span>{link.name}</span>
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-white/5 space-y-1">
            <Link
              href="/profile"
              className="flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="p-2 bg-white/5 rounded-lg">
                <User className="h-5 w-5 text-orange-400" />
              </div>
              <span>My Profile</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <div className="p-2 bg-white/5 rounded-lg">
                <Heart className="h-5 w-5 text-orange-400" />
              </div>
              <span>Wishlist</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
