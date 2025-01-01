"use client"

import { fetchCoinsMarketData } from "@/server/coingecko"
import { SetStateAction, useEffect, useState } from "react"
import { CoinCharts } from "../_components/CoinCharts"
import { Button } from "@/components/ui/button"
import { CoinSmallChart } from "../_components/CoinSmallChart"

export default function TrendingPage() {
    const [topTenCoins, setTopTenCoins] = useState<any[]>([])
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null)

    useEffect(() => {
        async function getCoinsMarketData() {
            // Get the 10 coins with the most drastic price changes
            const topTenCoinsArr: SetStateAction<any[]> = []
            const response = await fetchCoinsMarketData()

            // Sort the coins by price change with Sorting Algorithm
            const sortedCoins = response.sort((a: any, b: any) => {
                return Math.abs(b.price_change_percentage_7d_in_currency) - Math.abs(a.price_change_percentage_7d_in_currency)
            })

            // Push top 10 to the array
            for (let i = 0; i < 10; i++) {
                topTenCoinsArr.push(sortedCoins[i])
            }
            setTopTenCoins(topTenCoinsArr)
        }
        getCoinsMarketData()
    }, [])

    return <div>
        <h1 className="font-bold text-4xl mt-4 mb-4">Top Coins by 7-Day Price Change</h1>
        {/* <hr className="mt-4 mb-4" /> */}
        
        <ul>
        {topTenCoins?.map((coin) => (
  <li key={coin.id} className="flex flex-col bg-[#f0f9ff] p-5 m-10 rounded-lg shadow-lg mb-6 hover:shadow-1xl transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <img src={coin.image} alt="Coin image" className="w-14 h-14 rounded-full mr-4" />
        <h2 className="text-2xl font-semibold text-gray-800">{coin.name} ({coin.symbol})</h2>
      </div>
      <div className="text-right">
        <p className="text-xl font-medium text-gray-900">
          ARS ${coin.current_price.toLocaleString()}
        </p>
        <p className={`text-lg font-medium ${coin.price_change_percentage_7d_in_currency > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {coin.price_change_percentage_7d_in_currency.toFixed(2)}% in the last 7 days
        </p>
      </div>
    </div>

    <div className="mb-4">
      <ul className="text-gray-700 text-lg">
        <li className="mb-1">Market cap: ARS ${coin.market_cap.toLocaleString()}</li>
        <li className="mb-1">High (24h): ARS ${coin.high_24h.toLocaleString()}</li>
        <li className="mb-1">Low (24h): ARS ${coin.low_24h.toLocaleString()}</li>
      </ul>
    </div>

    <div className="mb-4">
      <p className="text-gray-700 text-lg">
        All-time high: ARS ${coin.ath.toLocaleString()}{' | '}
        <span className={coin.ath_change_percentage > 0 ? 'text-green-500' : 'text-red-500'}>
          {coin.ath_change_percentage.toFixed(2)}% from current price
        </span>
      </p>
    </div>

    <CoinSmallChart coin={coin.id} />
  </li>
))}

        </ul>

    </div>
}
