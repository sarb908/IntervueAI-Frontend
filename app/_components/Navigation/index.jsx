"use client";
import Link from 'next/link'
import React, { useState } from 'react'

import { Menu, X } from "lucide-react";



const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Left Navigation */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                IntervueAI
              </span>
            </Link>

            {/* Desktop Left Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/pricing"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Pricing
              </Link>
              <Link
                href="/interview"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                AI Interview
              </Link>
            </div>
          </div>

          {/* Right Side - Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Signup
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/pricing"
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/interview"
              className="block px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Interview
            </Link>
            <Link
              href="/signup"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;