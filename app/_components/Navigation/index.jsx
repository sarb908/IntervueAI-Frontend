"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Menu, X, ChevronRight, LogOut, User } from "lucide-react";
import { usePathname, useRouter } from 'next/navigation'



const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  const router = useRouter();
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication status on component mount
    const token = localStorage.getItem("authToken");
    const displayName = localStorage.getItem("userDisplayName");

    if (token) {
      setIsAuthenticated(true);
      setUserDisplayName(displayName || "User");
    } else {
      setIsAuthenticated(false);
      setUserDisplayName("");
    }
  }, []);

  const leftNavItems = [
    { name: "Home", href: "/", isRoute: true },
    { name: "Pricing", href: "/#pricing", isRoute: false },
    { name: "AI Interview", href: "/ai-interview", isRoute: true },
  ];

  const handleNavClick = (item) => {
    if (item.isRoute) {
    // Standard page-to-page routing
    router.push(item.href);
  } else {
    // Handling a hash/section link (e.g., "/#pricing")
    // pathname is not defined

    if (pathname === "/") {
      // SCENARIO 1: User is ALREADY on the homepage.
      // Extract the ID (e.g., "#pricing") from "/#pricing"
      const targetId = item.href.replace("/", ""); 
      const element = document.querySelector(targetId);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without causing a page jump or double hash bug
        window.history.pushState(null, "", item.href);
      }
    } else {
      // SCENARIO 2: User is on another page (like "/ai-interview").
      // Just push the path with the hash. Next.js App Router and the browser 
      // will load the homepage and automatically scroll to the element for you.
      router.push(item.href);
    }
  }
  setIsOpen(false);
  };

  const handleMobileNavClick = (item) => {
    if (item.isRoute) {
      router.push(item.href);
    } else {
       // we need to scroll to the section with id matching item.href after navigating to the home page
      router.push("/").then(() => {
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      });
      // const element = document.querySelector(item.href);
      // if (element) {
      //                                                            
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userDisplayName");

    // Update state
    setIsAuthenticated(false);
    setUserDisplayName("");

    // Navigate to home and refresh
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Left Navigation */}
          <div className="flex items-center space-x-8" >
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
              {leftNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-gray-700">
                  <User size={20} />
                  <span className="font-medium">Hi, {userDisplayName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Signup
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {leftNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="flex items-center justify-between w-full text-left px-3 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors rounded-lg"
              >
                {item.name}
                <ChevronRight size={16} />
              </button>
            ))}

            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 px-3 py-3 text-gray-700 border-t border-gray-200 mt-4">
                  <User size={20} />
                  <span className="font-medium">Hi, {userDisplayName}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  router.push("/signup");
                  setIsOpen(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mt-4"
              >
                Signup
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;