"use client"

import { use, useEffect, useState } from "react"
import { PageWithBackArrow } from "../../dashboard/_components/PageWithBackArrow"
import { fetchMatches } from "@/server/coingecko"

type Matches = {
    id: string | null
    name: string | null
    symbol: string | null
}

type Params = {
    keyword?: string
}
export default function SearchPage({ params }: { params: Params }) {
    const { keyWord } = use(params)
    const [matches, setMatches] = useState<Matches[]>([])
    const [newKeyWord, setNewKeyWord] = useState(keyWord || "")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!keyWord && !newKeyWord) return

        const debounceTimeout = setTimeout(() => {
            async function getMatches() {
                setLoading(true)
                if (typeof newKeyWord === "string" && newKeyWord.trim()) {
                    const result = await fetchMatches(newKeyWord.toLowerCase())
                    setMatches(result)
                    setLoading(false)
                }
            }
            getMatches()
        }, 300)

        return () => clearTimeout(debounceTimeout)
    }, [newKeyWord])

    return <div className="p-4 bg-white rounded-lg shadow-md">
        <PageWithBackArrow title="Search" href="/dashboard">
            <input
                type="text"
                placeholder="Search for a coin"
                onChange={(e) => setNewKeyWord(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="mt-4">
                <ul className="space-y-2">
                    {matches && matches.map((match) => (
                        <li key={match.id} className="border-b border-gray-200 pb-2">
                            <a
                                href={`/dashboard/details/${match.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                {match.name} ({match.symbol})
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </PageWithBackArrow>
    </div>
}