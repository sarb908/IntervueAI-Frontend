"use client";
import React from 'react'
import { Play, ArrowRight } from "lucide-react";

const Banner = () => {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden"
    >
      {/* Background Pattern */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
        {/* Centered Layout */}
        <div className="text-center space-y-12 w-full">
          {/* Hero Content */}
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Ace Your Next{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Interview
                </span>{" "}
                with AI
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Simulate real interviews, get instant AI feedback, and prepare
                with confidence. Master any interview with our intelligent
                practice platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 flex items-center gap-3 group"
              >
                Start Practicing
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-xl flex items-center gap-3 group">
                <Play
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                Watch Demo
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-gray-600">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Free to start</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Instant feedback</span>
              </div>
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-medium">AI-powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;