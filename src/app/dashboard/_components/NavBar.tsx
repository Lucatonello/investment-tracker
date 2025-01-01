import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export function Navbar() {
    return <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">
            <Link href="/">Investment tracker</Link>
        </h1>
        <div className="flex space-x-4">
            {/* Placeholder navbar options for now */}
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            <Link href="/dashboard/trending" className="hover:underline">Trending</Link>
            <Link href="/auth/logout" className="hover:underline">
                <div className="flex">
                    <LogOutIcon className="ml-5" />
                    <p className="pl-2">Logout</p>
                </div>
            </Link>
        </div>
    </nav>
}