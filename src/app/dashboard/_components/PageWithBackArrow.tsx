import Link from "next/link"

export function PageWithBackArrow({ children, title, href }: { children: React.ReactNode, title: string, href: string }) {
    return <div className="flex flex-col h-screen">
        <div className="flex items-center p-4 pb-0">
            <Link href={href === 'dynamic' ? '#' : href} onClick={href === 'dynamic' ? () => router.back() : undefined} className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
            </Link>
        </div>
        <main className="flex-1 p-4">
            <h1 className="text-3xl mb-6">{title}</h1>
            {children}
        </main>
    </div>
}