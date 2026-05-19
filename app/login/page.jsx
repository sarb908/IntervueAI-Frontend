import React from "react";
import Link from "next/link"; 

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 flex items-center justify-center px-4 py-8 sm:py-12 overflow-x-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left Section - Welcome Message */}
        <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left lg:pr-8">
          {/* CTA Button */}
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center lg:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
            <span className="text-xl sm:text-2xl">🚀</span>
            <span className="hidden sm:inline">
              Welcome Back: Continue Your AI Interview
            </span>
            <span className="sm:hidden">Welcome Back: Continue Interviews</span>
            <span className="text-xl sm:text-2xl">🚀</span>
          </button>

          {/* Welcome Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Welcome Back to
            </h1>
            <div className="flex flex-col sm:flex-row items-center lg:items-baseline gap-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight">
                Your Success
              </h1>
              <div className="w-12 sm:w-16 h-1 bg-blue-600 rounded-full ml-0 sm:ml-2"></div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full max-w-md mx-auto lg:max-w-sm flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <form className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Enter your password"
                />
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign in
              </button>
            </form>

            {/* Signup Link */}
            <div className="text-center mt-4 sm:mt-6">
              <span className="text-gray-600 text-sm sm:text-base">
                Don't have an account?{" "}
              </span>
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
              >
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
