export function Navbar() {
    return <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Investment tracker</h1>
        <div className="flex space-x-4">
            <a href="/dashboard" className="hover:underline">Dashboard</a>
       </div>
    </nav>
}