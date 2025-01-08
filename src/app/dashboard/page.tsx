"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { getUserInvestments } from "@/server/database"
import Link from "next/link"
import { fetchCurrentPrices } from '@/server/coingecko'
import { EditIcon, Trash2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { CoinCharts } from './_components/charts/CoinCharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Stats from './_components/Stats'

export type Investment = {
    id: number
    coin_name: string
    coin_amount: string
    coin_price: number
    total_spent: number
    buy_price: string
    created_at: string
}
type Prices = {
    [key: string]: {
      ars: number
    }
}

const userId = localStorage.getItem('userId')
if (!userId) redirect('/auth/sign-in')

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
});

export default function Dashboard() {
    const [userInvestments, setUserInvestments] = useState<Investment[]>([]);
    const [currentPrices, setCurrentPrices] = useState<{ [key: string]: { ars: number } }>({});

    useEffect(() => {
        async function fetchInvestments() {
            const investments = await getUserInvestments(userId) as Investment[];
            setUserInvestments(investments);
        }
        fetchInvestments();
    }, []);

    useEffect(() => {
        async function updatePrices() {
            if (userInvestments.length > 0) {
                const coinIds = userInvestments.map((investment) => investment.coin_name);
                const prices = await fetchCurrentPrices(coinIds);
                if (prices) {
                    setCurrentPrices(prices);
                } else {
                    console.error('Failed to fetch current prices');
                }
            }
        }
        updatePrices();
    }, [userInvestments]);

    const calculatedTotal = userInvestments.reduce((acc, investment) => {
        const currentPrice = currentPrices[investment.coin_name]?.ars || 0;
        const investmentValue = parseFloat(investment.coin_amount) * currentPrice;
        return acc + investmentValue;
    }, 0);

    const totalProfit = userInvestments.reduce((acc, investment) => {
        const currentPrice = currentPrices[investment.coin_name]?.ars || 0;
        const profit = (currentPrice - parseFloat(investment.buy_price)) * parseFloat(investment.coin_amount);
        return acc + profit;
    }, 0);

    return (
        <div>
            <Tabs defaultValue={'Table'}>
                <TabsList className="bg-background/60">
                    <TabsTrigger value={'Table'}>Your table</TabsTrigger>
                    <TabsTrigger value={'Crypto'}>Your crypto</TabsTrigger>
                    <TabsTrigger value={'Stats'}>Your stats</TabsTrigger>
                </TabsList>
                <TabsContent value='Table'>
                    <h1 className='font-bold text-3xl mb-4'>Your table</h1>
                    <table className="table-auto border-collapse w-full font-sans">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-2 py-1 text-left">Date</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Coin</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Amount</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Buy price</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Current price</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Total spent</th>
                                <th className="border border-gray-300 px-2 py-1 text-left">Profit</th>
                                <th className="border border-gray-300 px-2 py-1 text-left" style={{ width: '150px' }}>Actions</th>
                            </tr>
                        </thead>
                        {userInvestments.map((investment) => (
                            <tbody key={investment.id}>
                                <tr className="bg-gray-200">
                                    <td className="border border-gray-300 px-2 py-1">
                                        {new Intl.DateTimeFormat('en-US', {
                                            month: '2-digit',
                                            day: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false,
                                        }).format(new Date(investment.created_at))}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">{investment.coin_name}</td>
                                    <td className="border border-gray-300 px-2 py-1">{investment.coin_amount}</td>
                                    <td className="border border-gray-300 px-2 py-1">{formatter.format(parseFloat(investment.buy_price))}</td>
                                    <td className="border border-gray-300 px-2 py-1">
                                        {currentPrices[investment.coin_name]
                                            ? formatter.format(currentPrices[investment.coin_name].ars)
                                            : 'Loading...'}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1">{formatter.format(investment.total_spent)}</td>
                                    <td
                                        className={`border border-gray-300 px-2 py-1 ${
                                            ((currentPrices[investment.coin_name]?.ars - parseFloat(investment.buy_price)) * parseFloat(investment.coin_amount)) > 0
                                                ? 'text-green-600'
                                                : ((currentPrices[investment.coin_name]?.ars - parseFloat(investment.buy_price)) * parseFloat(investment.coin_amount)) === 0 ? ''
                                                : 'text-red-600'
                                        }`}
                                    >
                                        {formatter.format(
                                            (currentPrices[investment.coin_name]?.ars - parseFloat(investment.buy_price)) * parseFloat(investment.coin_amount)
                                        )}
                                    </td>
                                    <td className="border border-gray-300 px-2 py-1 flex space-x-2">
                                        <Button className="bg-#424246 text-black px-4 py-2 rounded hover:bg-[#d1d1d3]">
                                            <Link href={`/dashboard/${investment.id}/edit`}>
                                                <EditIcon />
                                            </Link>
                                        </Button>
                                        <Button className="text-white px-4 py-2 rounded">
                                            <Link href={`/dashboard/${investment.id}/delete`}>
                                                <Trash2 />
                                            </Link>
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                    <div className='flex'>
                        <div className="mt-4 mr-4 p-4 border border-gray-300 w-64">
                            <p className="font-semibold">Total worth: {formatter.format(calculatedTotal)}</p>
                        </div>
                        <div className="mt-4 p-4 border border-gray-300 w-64">
                            <p className={`font-semibold ${totalProfit > 0 ? 'text-green-600' : totalProfit === 0 ? '' : 'text-red-600'}`}>
                                Total Profit: {formatter.format(totalProfit)}
                            </p>
                        </div>
                    </div>
                
                    <Button className="mt-4">
                        <Link href="/dashboard/add">
                            Add investment
                        </Link>
                    </Button>
                    <hr className='mt-4 mb-4' style={{ borderColor: '#d0d5db' }} />
                </TabsContent>

                <TabsContent value='Crypto'>
                    <h1 className='font-bold text-3xl mb-4'>Your crypto</h1>
                    <CoinCharts coins={[...new Set(userInvestments.map((investment) => investment.coin_name))]} />
                </TabsContent>

                <TabsContent value='Stats'>
                    <Stats userInvestment={userInvestments}/>
                </TabsContent>
            </Tabs>
        </div>
    );
}