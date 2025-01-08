import React from "react"
import { Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale
} from "chart.js"

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale)

type SumObj = {
    total: number
    coin: string
}

type InvestmentChartProps = {
    userInvestment: SumObj[]
}

const InvestmentChart: React.FC<InvestmentChartProps> = ({ userInvestment }) => {
    console.log('Prop received in chart: ', userInvestment)
    // Prepare data for Chart.js (raw investment amounts)
    const chartData = {
        labels: userInvestment.map((obj) => obj.coin),
        datasets: [
            {
                data: userInvestment.map((obj) => obj.total),
                backgroundColor: ["#ff7700", "#ffffdb", "#f3a2a1", "#5c72e2", "#42d29d"],
                hoverBackgroundColor: ["#ff7700", "#ffffdb", "#f3a2a1", "#5c72e2", "#42d29d"]
            }
        ]
    }

    // Options to format the tooltips and labels as percentages
    const chartOptions = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const value = context.raw
                        const total = context.dataset.data.reduce((acc: number, curr: number) => acc + curr, 0)
                        const percentage = ((value / total) * 100).toFixed(2)
                        return `${context.label}: ${percentage}%`
                    }
                }
            },
            legend: {
                position: "top" as const
            }
        }
    }

    return (
        <div style={{ width: '400px', height: '400px' }}>
            <Pie data={chartData} options={chartOptions} />
        </div>
    )
}

export default InvestmentChart
