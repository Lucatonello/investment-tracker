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
    <h1 className="text-xl font-bold">
        <Link href="/">Investment tracker</Link>
    </h1>
    <div className="flex space-x-4 items-center">
        <Link href="/" className="hover:underline align-center">Home</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/dashboard/trending" className="hover:underline">Trending</Link>
        <input 
            type="text" 
            placeholder="Search for a coin" 
            className="p-2 rounded-lg text-black focus:outline-none" 
            onChange={(e) => {
                if (e.target.value.length > 0) {
                    setShowSearchButton(true);
                    setKeyWord(e.target.value);
                } else {
                    setShowSearchButton(false);
                }
            }} 
        />
        {showSearchButton && <Button onClick={handleSearch}>Search</Button>}
        <Link href="/auth/logout" className="hover:underline flex items-center focus:outline-none">
            <LogOutIcon className="ml-5" />
            <p className="pl-2">Logout</p>
        </Link>
    </div>
</nav>
}