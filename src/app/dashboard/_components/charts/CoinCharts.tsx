import { useEffect, useState, useRef } from "react"
import { fetchCoinChart } from "@/server/coingecko"
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController } from "chart.js"

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController
)

type CoinChartsProps = {
  coins: string[]
}

type CoinData = {
  prices: number[][]
  market_caps: number[][]
  total_volumes: number[][]
}

export function CoinCharts({ coins }: CoinChartsProps) {
  const [data, setData] = useState<CoinData[]>([])
  const chartRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const chartInstances = useRef<(Chart | null)[]>([])

  useEffect(() => {
    async function fetchData() {
      const allData = await Promise.all(
        coins.map(async (coin) => {
          const result = await fetchCoinChart(coin)
          if (result) {
            return {
              prices: result.prices,
              market_caps: result.market_caps,
              total_volumes: result.total_volumes,
            }
          } else {
            return {
              prices: [],
              market_caps: [],
              total_volumes: [],
            }
          }
        })
      )
      setData(allData)
    }
    fetchData()
  }, [coins])

  const chartColor = (priceData: number[][]) => {
    const firstPrice = priceData && priceData[0]?.[1] || 0
    const lastPrice =  priceData && priceData[priceData.length - 1]?.[1] || 0
    return lastPrice > firstPrice ? "green" : "red"
  }

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((coinData, index) => {
        const canvas = chartRefs.current[index]
        if (canvas) {
          if (chartInstances.current[index]) {
            chartInstances.current[index]?.destroy()
          }

          // Create a new chart instance
          const chart = new Chart(canvas, {
            type: "line",
            data: {
              labels: coinData.prices?.map((price) => new Date(price[0]).toLocaleString()), 
              datasets: [
                {
                  label: "Price (ARS)",
                  data: coinData.prices?.map((price) => price[1]),
                  borderColor: chartColor(coinData.prices),
                  fill: false,
                },
                {
                  label: "Market Cap (ARS)",
                  data: coinData.market_caps?.map((marketCap) => marketCap[1]),
                  borderColor: "rgba(153, 102, 255, 1)",
                  fill: false,
                  hidden: true,
                },
                {
                  label: "Total Volume (ARS)",
                  data: coinData.total_volumes?.map((volume) => volume[1]),
                  borderColor: "rgba(255, 159, 64, 1)",
                  fill: false,
                  hidden: true,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  mode: "nearest",
                  intersect: false,
                },
              },
              scales: {
                x: {
                  type: "category", 
                  title: {
                    display: true,
                    text: "Time",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Value (ARS)",
                  },
                },
              },
            },
          })

          chartInstances.current[index] = chart
        }
      })
    }
  }, [data])

  return (
    <div>
      {data.length > 0 ? (
        data.map((coinData, index) => (
          <div key={index}>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 pb-2 border-b-4 border-[#1f2a38] uppercase">{coins[index]}</h2>
            <div className="p-8 mr-16 ml-16">
              <canvas ref={(el) => (chartRefs.current[index] = el)} />
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
