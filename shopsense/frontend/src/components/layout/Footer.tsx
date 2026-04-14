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

const Footer = () => {


  return (
    <>
      {/* Modern Footer */}
      <footer className="bg-[#14213d] text-white py-12 px-6 sm:px-8 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center font-bold text-sm italic">
                  S
                </div>
                <h3 className="text-2xl font-bold tracking-tight">Tech<span className="text-orange-500">Vault</span></h3>
              </div>
              <p className="text-gray-400 text-sm max-w-sm text-center md:text-left">
                Revolutionizing how you discover, compare, and shop for your favorite products online.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <div>&copy; {new Date().getFullYear()} TechVault Inc. All rights reserved.</div>
            <div className="flex gap-4">
              <span>Built with Next.js & Tailwind</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
