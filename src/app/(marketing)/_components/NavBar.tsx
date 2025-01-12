
export function Navbar() {
    return <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
        <h1 className="text-xl font-bold text-yellow-400">Track My Crypto</h1>
        <div className="flex space-x-4">
                <a href="/dashboard" className="hover:underline text-yellow-400">Dashboard</a>
       </div>
    </nav>
}