import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export function Navbar() {
    return <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Investment tracker</h1>
        <div className="flex space-x-4">
            <SignedIn>
                <a href="/dashboard" className="hover:underline">Dashboard</a>
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
       </div>
    </nav>
}