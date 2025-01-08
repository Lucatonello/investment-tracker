"use client"

import { fetchCoinsMarketData, fetchPopularCoins } from "@/server/coingecko"
import { act, SetStateAction, useEffect, useState } from "react"
import { CoinSmallChart } from "../_components/CoinSmallChart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { fetchNews } from "@/server/newsData"

export default function TrendingPage() {
    const [topTenCoins, setTopTenCoins] = useState<any[]>([])
    const [popularCoins, setPopularCoins] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<string>('Top movers (7D)')
    const [selectedCoin, setSelectedCoin] = useState<string | null>(null)
    const [news, setNews] = useState<any>([])

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

    useEffect(() => {
      if (activeTab === 'Most popular') {
        async function getMostPopularCoins() {
          const response = await fetchPopularCoins()
          setPopularCoins(response)
        }
        getMostPopularCoins()
      } else if (activeTab === 'News') {
        async function getNews() {
          const response = await fetchNews()
          setNews(response.results)
          console.log(response.results)
        }
        getNews()
      }
    }, [activeTab])

    return <div>
              <Tabs defaultValue={'Top movers (7D)'} onValueChange={(value) => setActiveTab(value)}>
                  <TabsList className="bg-background/60">
                    <TabsTrigger value={'Top movers (7D)'}>Top Movers (7D)</TabsTrigger>
                    <TabsTrigger value={'Most popular'}>Most Popular</TabsTrigger>
                    <TabsTrigger value={'News'}>News</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Top movers (7D)">
                      <h1 className="font-bold text-4xl mt-4 mb-4">Top Coins by 7-Day Price Change</h1>        
                      <ul>
                          {topTenCoins?.map((coin) => (
                            <li key={coin.id} className="flex flex-col bg-[#f0f9ff] p-5 m-10 rounded-lg shadow-lg mb-6 hover:shadow-1xl transition-shadow h-[717px]">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                  <img src={coin.image} alt="Coin image" className="w-14 h-14 rounded-full mr-4" />
                                  <a href={`/dashboard/details/${coin.id}`} className="text-2xl font-semibold text-gray-800">{coin.name} ({coin.symbol})</a>
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
                            
                            {selectedCoin === coin.id ? (
                            <CoinSmallChart coin={coin.id} />
                            ) : (
                                <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center">
                                    <Button onClick={() => setSelectedCoin(coin.id)}>Show Chart</Button>
                                </div>
                            )}
                            </li>
                          ))}
                      </ul>
                  </TabsContent>
                  <TabsContent value="Most popular">
                    <h1 className="font-bold text-4xl mt-4 mb-4">Most popular coins in the last 24hs</h1>
                    <ul>
                      {popularCoins?.map((coin) => (
                        <li key={coin.id} className="flex flex-col bg-[#f0f9ff] p-5 m-10 rounded-lg shadow-lg mb-6 hover:shadow-1xl transition-shadow">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <img src={coin.image} alt="Coin image" className="w-14 h-14 rounded-full mr-4" />
                              <a href={`/dashboard/details/${coin.id}`} className="text-2xl font-semibold text-gray-800">{coin.name} ({coin.symbol})</a>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-medium text-gray-900">
                                ARS ${coin.current_price.toLocaleString()}
                              </p>
                              <p className={`text-lg font-medium ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {coin.price_change_percentage_24h.toFixed(2)}% in the last 24 hours
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
                          {selectedCoin === coin.id ? (
                            <CoinSmallChart coin={coin.id} />
                            ) : (
                                <div className="w-full h-[449px] rounded-lg bg-gray-200 flex items-center justify-center">
                                    <Button onClick={() => setSelectedCoin(coin.id)}>Show Chart</Button>
                                </div>
                            )}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="News">
                    <h1 className="font-bold text-4xl mt-4 mb-4">News</h1>
                    {news ? (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((newsItem: any) => (
                          <li 
                            key={newsItem.article_id} 
                            className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
                          >
                            <div className="flex items-center gap-3 p-4 border-b">
                              <img 
                                src={newsItem.source_icon} 
                                alt="Source icon" 
                                className="w-8 h-8 rounded-full" 
                              />
                              <a 
                                href={newsItem.source_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-blue-600 hover:underline truncate"
                              >
                                {newsItem.source_name}
                              </a>
                            </div>

                            <div className="relative h-40 bg-gray-100">
                              <img 
                                src={newsItem.image_url} 
                                alt="News" 
                                className="object-cover w-full h-full"
                              />
                            </div>

                            <div className="p-4 flex-grow flex flex-col">
                              <a 
                                href={newsItem.link} 
                                target="_blank"
                                className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate"
                              >
                                {newsItem.title}
                              </a>
                              <p className="text-sm text-gray-600 mt-3 flex-grow line-clamp-3">
                                {newsItem.description?.length > 150
                                  ? `${newsItem.description.substring(0, 150)}...`
                                  : newsItem.description}
                              </p>
                            </div>

                            <div className="p-4 border-t">
                              {newsItem.creator && (
                                <p className="text-xs text-gray-600 mb-2">By {newsItem.creator[0]}</p>
                              )}
                              <ul className="flex flex-wrap gap-2">
                                {newsItem.category.map((cate: any) => (
                                  <li 
                                    key={cate} 
                                    className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
                                  >
                                    {cate}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-center text-gray-500">Loading...</p>
                    )}

              </TabsContent>
              </Tabs>

   </div>
}
