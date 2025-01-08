import { fetchCoinDatabyId } from "@/server/coingecko"
import { useEffect, useState } from "react"
import { CoinCharts } from "./charts/CoinCharts"

export function CoinPage({ coinId }: { coinId: string }) {
    const [coinData, setCoinData] = useState<any>(null)

    useEffect(() => {
        async function fetchCoinDatabyIdFunc() {
            const coinData = await fetchCoinDatabyId(coinId)
            setCoinData(coinData)
        }
        fetchCoinDatabyIdFunc()
    }, [coinId])

    return <div>
        {coinData ? <div className="bg-[#f0f9ff] p-8 rounded-sm shadow-md">
            <div className="flex items-center mb-4">
                <img src={coinData.image.small} alt={coinData.name} />
                <div className="flex">
                    <a className="ml-3 text-4xl underline" href={coinData.links.homepage[0]} target="_blank">{coinData.name}</a>
                    <p className="ml-2 text-4xl">({coinData.symbol})</p>
                </div>
            </div>
            <div className="flex w-full">
                <p className="text-lg leading-relaxed text-gray-700">{coinData.description?.en}</p>
            </div>
            <ul className="flex flex-wrap mt-4">
                {coinData.categories.map((category: string) => (
                    <li key={category} className="bg-gray-100 p-2 rounded-lg mr-2 mb-2 shadow-sm">
                        <p className="text-sm text-gray-600">{category}</p>
                    </li>
                ))}
            </ul>

            <h1 className="mt-6 text-3xl font-bold text-gray-800">More Data</h1>
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
    {coinData.country_origin && (
        <li className="border border-gray-200 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Country of Origin</p>
            <p className="text-lg text-gray-700 font-semibold mt-2">{coinData.country_origin}</p>
        </li>
    )}
    {coinData.genesis_date && (
        <li className="border border-gray-200 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
            <p className="text-sm text-gray-500 uppercase tracking-wide">Genesis Date</p>
            <p className="text-lg text-gray-700 font-semibold mt-2">{coinData.genesis_date}</p>
        </li>
    )}
    <li className="border border-gray-200 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Sentiment</p>
        <div className="mt-2">
            <p className="text-lg text-green-600 font-semibold">
                Positive: {coinData.sentiment_votes_up_percentage}%
            </p>
            <p className="text-lg text-red-600 font-semibold">
                Negative: {coinData.sentiment_votes_down_percentage}%
            </p>
        </div>
    </li>
    <li className="border border-gray-200 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Market Cap Rank</p>
        <p className="text-lg text-gray-700 font-semibold mt-2">#{coinData.market_cap_rank}</p>
    </li>
</ul>



            <h1 className="mt-6 mb-4 text-2xl font-semibold">Links</h1>
            <ul className="space-y-2 mb-12">
                <li>
                    <a
                        className="inline-block ml-4 px-4 w-[138px] text-center py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 hover:shadow-md transition-all duration-200"
                        style={{ maxWidth: "300px" }}
                        href={coinData.links.homepage[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Homepage
                    </a>
                </li>
                <li>
                    <a
                        className="inline-block ml-4 px-4 py-2 w-[138px] text-center bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 hover:shadow-md transition-all duration-200"
                        style={{ maxWidth: "300px" }}
                        href={coinData.links.blockchain_site?.[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Blockchain
                    </a>
                </li>
                {coinData.links.official_forum_url.length > 0 && (
                    <li>
                        <a
                            className="inline-block ml-4 w-[138px] text-center px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 hover:shadow-md transition-all duration-200"
                            style={{ maxWidth: "300px" }}
                            href={coinData.links.official_forum_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Official forum
                        </a>
                    </li>
                )}
                {coinData.links.announcement_url.length > 0 && (
                    <li>
                        <a
                            className="inline-block ml-4 px-4 py-2 w-[138px] text-center bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 hover:shadow-md transition-all duration-200"
                            style={{ maxWidth: "300px" }}
                            href={coinData.links.announcement_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Announcements site
                        </a>
                    </li>
                )}
                {coinData.links.subreddit_url.length > 0 && (
                    <li>
                        <a
                            className="inline-block ml-4 px-4 py-2 w-[138px] text-center bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 hover:shadow-md transition-all duration-200"
                            style={{ maxWidth: "300px" }}
                            href={coinData.links.subreddit_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Subreddit
                        </a>
                    </li>
                )}
                {coinData.links.repos_url?.github.length > 0 && (
                    <li className="">
                        <p className="mb-2 font-semibold text-gray-700">GitHub Repo/s:</p>
                        {coinData.links?.repos_url?.github?.map((repo: string) => (
                            <a
                                key={repo}
                                className="inline-block ml-4 px-4 py-2 my-1 mx-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 hover:shadow-md transition-all duration-200"
                                style={{ maxWidth: "300px" }}
                                href={repo}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {repo}
                            </a>
                        ))}
                    </li>
                )}
            </ul>

            <CoinCharts coins={[coinData.id]} />

            <p className="text-sm text-gray-500 italic">Last updated: {coinData.last_updated.toLocaleString()}</p>
        </div> : <p>Loading...</p>}
    </div>
}