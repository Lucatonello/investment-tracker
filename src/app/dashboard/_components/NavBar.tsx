import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
    return <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 className="text-xl font-bold">
        <Link href="/">Investment tracker</Link>
    </h1>
    <div className="flex space-x-4 items-center">
        <Link href="/" className="hover:underline align-center">Home</Link>
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/dashboard/trending" className="hover:underline">Trending</Link>
        <input type="text" placeholder="Search" className="p-2 rounded-lg text-black focus:outline-none" />
        <Link href="/auth/logout" className="hover:underline flex items-center focus:outline-none">
            <LogOutIcon className="ml-5" />
            <p className="pl-2">Logout</p>
        </Link>
    </div>
</nav>
}