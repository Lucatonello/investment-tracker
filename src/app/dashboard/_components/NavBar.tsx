export function Navbar() {
    return <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Investment tracker</h1>
        <div className="flex space-x-4">
            {/* Placeholder navbar options for now */}
            <a href="/dashboard" className="hover:underline">Dashboard</a>
            <a href="/dashboard/stocks" className="hover:underline">Stocks</a>
            <a href="/dashboard/crypto" className="hover:underline">Crypto</a>
            
        </div>
    </nav>
}