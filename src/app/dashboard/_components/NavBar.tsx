import { UserButton } from "@clerk/nextjs";
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
            <Link href="/dashboard/crypto" className="hover:underline">Crypto</Link>
            <UserButton />  
        </div>
    </nav>
}