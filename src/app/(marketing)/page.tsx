"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const userId = localStorage.getItem('userId')
  return (
    <div className="bg-gradient-to-b from-indigo-600 to-purple-800 text-white">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-center">
          Welcome to <span className="text-yellow-400">Track My Crypto</span>
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-center max-w-2xl">
          Monitor your crypto investments effortlessly with our simple and intuitive platform. Stay updated and in control!
        </p>
        <div className="mt-8">
          <Button className="px-6 py-3 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 rounded-md shadow-md transition">
            <Link href="/dashboard" className="text-indigo-900">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
  
        {/* Features Section */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-50 text-gray-900 px-4" id="features">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Why Use Investment Tracker?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mb-16">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Real-Time Insights</h3>
            <p className="text-gray-700">
              Track your crypto portfolio in real-time with updated prices and performance metrics.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Customizable Dashboard</h3>
            <p className="text-gray-700">
              Set up your dashboard the way you like with easy-to-use tools.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-indigo-600 mb-4">Discover new coins</h3>
            <p className="text-gray-700">
              Browse the most popular coins and explore new opportunities in the cryptocurrency market.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <span className="text-indigo-600 text-3xl font-bold">1</span>
              <p className="text-lg text-gray-700 text-left">
                Sign up or log in to your account to get started.
              </p>
            </div>
            <div className="flex items-start space-x-6">
              <span className="text-indigo-600 text-3xl font-bold">2</span>
              <p className="text-lg text-gray-700 text-left">
                Add your cryptocurrency holdings and watch your portfolio grow.
              </p>
            </div>
            <div className="flex items-start space-x-6">
              <span className="text-indigo-600 text-3xl font-bold">3</span>
              <p className="text-lg text-gray-700 text-left">
                Explore your dashboard for detailed analytics and insights.
              </p>
            </div>
          </div>
        </div>
      </div>
  
      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6 mb-6">
            {/* Logo and Tagline */}
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl font-bold text-yellow-400">Track My Crypto</h2>
              <p className="text-sm text-gray-400 mt-2">
                Simplifying crypto portfolio management.
              </p>
            </div>
            {/* Navigation Links */}
            <nav className="flex space-x-6">
              <Link href="/dashboard" className="text-gray-400 hover:text-yellow-400 transition">
                Dashboard
              </Link>
              <Link href="#features" className="text-gray-400 hover:text-yellow-400 transition">
                Features
              </Link>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media Icons */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://github.com/Lucatonello/investment-tracker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.531 1.031 1.531 1.031.892 1.528 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.338-2.22-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.983 1.03-2.682-.103-.253-.447-1.27.098-2.645 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.846a9.564 9.564 0 012.5.337c1.91-1.294 2.75-1.025 2.75-1.025.545 1.375.201 2.392.099 2.645.64.7 1.03 1.591 1.03 2.682 0 3.842-2.337 4.687-4.565 4.935.36.31.678.921.678 1.855 0 1.339-.012 2.422-.012 2.75 0 .268.18.579.688.481A10.005 10.005 0 0022 12c0-5.523-4.477-10-10-10z" />
              </svg>
              </a>

              <a href="https://linkedin.com/in/luca-tonello-b70377285" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.23 0H1.77C.79 0 0 .774 0 1.729v20.542C0 23.228.79 24 1.77 24h20.46c.98 0 1.77-.772 1.77-1.729V1.729C24 .774 23.21 0 22.23 0zM7.12 20.452H3.56V9.035h3.56v11.417zM5.34 7.503c-1.138 0-1.916-.817-1.916-1.83C3.424 4.66 4.211 3.87 5.34 3.87c1.13 0 1.916.791 1.916 1.803 0 1.014-.786 1.83-1.916 1.83zm15.113 12.949h-3.56v-5.56c0-1.392-.028-3.183-1.94-3.183-1.941 0-2.238 1.514-2.238 3.08v5.664h-3.56V9.035h3.415v1.561h.048c.475-.901 1.635-1.852 3.366-1.852 3.601 0 4.269 2.318 4.269 5.334v6.374z" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              © {new Date().getFullYear()} Track My Crypto. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
