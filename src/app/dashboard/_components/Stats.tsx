import { useEffect, useState } from "react"
import { Investment } from "../page"
import InvestmentChart from "./charts/InvestmentCart"

type SumObj = {
    total: number
    coin: string
}

export default function Stats({ userInvestment }: { userInvestment: Investment[]}) {
    const [distribution, setDistribution] = useState<SumObj[]>([])

    useEffect(() => {
        function calculateDistribution() {
            const coinTotals: Record<string, number> = {}
        
            userInvestment.forEach((investment: Investment) => {
                const total = parseFloat(investment.coin_amount) * parseFloat(investment.buy_price)
                const coin = investment.coin_name
        
                if (coinTotals[coin]) {
                    coinTotals[coin] += total
                } else {
                    coinTotals[coin] = total
                }
            })
        
            const sumObj: SumObj[] = Object.entries(coinTotals).map(([coin, total]) => ({ coin, total }))
            setDistribution(sumObj)
            return sumObj
        }
        calculateDistribution()
    }, [])
    
    return <div>
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Investment Distribution</h2>
            <InvestmentChart userInvestment={distribution} />
        </div>
        <hr className="my-4"/>
    </div>
}