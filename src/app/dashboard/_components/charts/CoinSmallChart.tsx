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

type CoinSmallChartProps = {
  coin: string
}

type CoinData = {
  prices: number[][]
  market_caps: number[][]
  total_volumes: number[][]
}

export function CoinSmallChart({ coin }: CoinSmallChartProps) {
  const [data, setData] = useState<CoinData | null>(null)
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    async function fetchData() {
      const result = await fetchCoinChart(coin)
      if (result) {
        setData({
          prices: result.prices,
          market_caps: result.market_caps,
          total_volumes: result.total_volumes,
        })
      }
    }
    fetchData()
  }, [coin])

  const chartColor = (priceData: number[][]) => {
    const firstPrice = priceData && priceData[0]?.[1] || 0
    const lastPrice =  priceData && priceData[priceData.length - 1]?.[1] || 0
    return lastPrice > firstPrice ? "green" : "red"
  }

  useEffect(() => {
    if (data && chartRef.current) {
      // Destroy previous chart instance if exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Create a new chart instance
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: data.prices?.map((price) => new Date(price[0]).toLocaleString()),
          datasets: [
            {
              label: "Price (ARS)",
              data: data.prices?.map((price) => price[1]),
              borderColor: chartColor(data.prices),
              fill: false,
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
    }

    return () => {
      // Cleanup chart instance when component is unmounted
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="w-full sm:w-2/3 md:w-1/2 p-4">
      {data ? (
        <div>
          <div className="p-4">
            <canvas ref={chartRef}  />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
