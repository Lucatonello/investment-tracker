import { Navbar } from "./_components/NavBar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <main className="flex-1 p-4">
                {children}
            </main>
        </div>
    )
}