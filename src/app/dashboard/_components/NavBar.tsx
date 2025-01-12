"use client"

import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Navbar() {
    const [showSearchButton, setShowSearchButton] = useState(false)
    const [keyWord, setKeyWord] = useState("")
    const router = useRouter()

    const handleSearch = () => {
        if (router) {
            router.push(`/search/${keyWord}`)
        } else console.log('router not found')
    }

    return <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 className="text-xl font-bold text-yellow-400">
      <Link href="/">Track My Crypto</Link>
    </h1>
    <div className="flex items-center space-x-6">
      <Link href="/" className="hover:underline text-yellow-400">Home</Link>
      <Link href="/dashboard" className="hover:underline text-yellow-400">Dashboard</Link>
      <Link href="/dashboard/trending" className="hover:underline text-yellow-400">Trending</Link>
      
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search for a coin" 
          className="p-2 rounded-lg text-black focus:outline-none w-52 md:w-64"
          onChange={(e) => {
            if (e.target.value.length > 0) {
              setShowSearchButton(true);
              setKeyWord(e.target.value);
            } else {
              setShowSearchButton(false);
            }
          }} 
        />
        {showSearchButton && (
          <button 
            onClick={handleSearch} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-500 transition duration-200"
          >
            Search
          </button>
        )}
      </div>
  
      <Link href="/auth/logout" className="hover:underline flex items-center focus:outline-none">
        <LogOutIcon className="ml-5" />
        <p className="pl-2">Logout</p>
      </Link>
    </div>
  </nav>
}