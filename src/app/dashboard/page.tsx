"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { getUserInvestments, getUserSells } from "@/server/database"
import Link from "next/link"
import { fetchCurrentPrices } from '@/server/coingecko'
import { EditIcon, HandCoins, Trash2 } from 'lucide-react'
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
export type Sells = {
    id: number
    coin_name: string
    amount_sold: string
    buy_price: number
    sell_price: string
    total_received: number
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
    const [userInvestments, setUserInvestments] = useState<Investment[]>([])
    const [userSells, setUserSells] = useState<Sells[]>([])
    const [currentPrices, setCurrentPrices] = useState<{ [key: string]: { ars: number } }>({})

    useEffect(() => {
        async function fetchInvestments() {
            const investments = await getUserInvestments(userId) as Investment[];
            setUserInvestments(investments)
        }
        fetchInvestments()
    }, [])

    useEffect(() => {
        async function fetchSells() {
            const sells = await getUserSells(userId) as Sells[]
            setUserSells(sells)
        }
        fetchSells()
    }, [])

    useEffect(() => {
        async function updatePrices() {
            if (userInvestments.length > 0) {
                const coinIds = userInvestments.map((investment) => investment.coin_name)
                const prices = await fetchCurrentPrices(coinIds)
                if (prices) {
                    setCurrentPrices(prices)
                } else {
                    console.error('Failed to fetch current prices')
                }
            }
        }
        updatePrices();
    }, [userInvestments])

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
                    <h1 className='font-bold text-3xl mb-4 text-gray-800'>Your buys</h1>
                    <table className="table-auto border-collapse w-full font-sans text-gray-800">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Coin</th>
                            <th className="px-4 py-2 text-left">Amount</th>
                            <th className="px-4 py-2 text-left">Buy price</th>
                            <th className="px-4 py-2 text-left">Current price</th>
                            <th className="px-4 py-2 text-left">Total spent</th>
                            <th className="px-4 py-2 text-left">Profit</th>
                            <th className="px-4 py-2 text-left" style={{ width: '150px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userInvestments.map((investment, index) => (
                            <tr
                                key={investment.id}
                                className={`${
                                index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                } hover:bg-gray-300`}
                            >
                                <td className="border-t border-gray-300 px-4 py-2">
                                {new Intl.DateTimeFormat('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                }).format(new Date(investment.created_at))}
                                </td>
                                <td className="border-t border-gray-300 px-4 py-2">{investment.coin_name}</td>
                                <td className="border-t border-gray-300 px-4 py-2">{investment.coin_amount}</td>
                                <td className="border-t border-gray-300 px-4 py-2">{formatter.format(parseFloat(investment.buy_price))}</td>
                                <td className="border-t border-gray-300 px-4 py-2">
                                {currentPrices[investment.coin_name]
                                    ? formatter.format(currentPrices[investment.coin_name].ars)
                                    : 'Loading...'}
                                </td>
                                <td className="border-t border-gray-300 px-4 py-2">{formatter.format(investment.total_spent)}</td>
                                <td
                                className={`border-t border-gray-300 px-4 py-2 ${
                                    ((currentPrices[investment.coin_name]?.ars - parseFloat(investment.buy_price)) * parseFloat(investment.coin_amount)) > 0
                                    ? 'text-green-600'
                                    : ((currentPrices[investment.coin_name]?.ars - parseFloat(investment.buy_price)) * parseFloat(investment.coin_amount)) === 0
                                    ? ''
                                    : 'text-red-600'
                                }`}
                                >
                                {formatter.format(
                                    (currentPrices[investment.coin_name]?.ars - parseFloat(investment.buy_price)) * parseFloat(investment.coin_amount)
                                )}
                                </td>
                                <td className="border-t border-gray-300 px-4 py-2 flex space-x-3">
                                <Button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600" title="Edit">
                                    <Link href={`/dashboard/${investment.id}/edit`}>
                                    <EditIcon />
                                    </Link>
                                </Button>
                                <Button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600" title="Mark as sold">
                                    <Link href={`/dashboard/${investment.id}/sell`}>
                                    <HandCoins />
                                    </Link>
                                </Button>
                                <Button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500" title="Delete">
                                    <Link href={`/dashboard/${investment.id}/delete`}>
                                    <Trash2 />
                                    </Link>
                                </Button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex'>
                        <div className="mt-4 mr-4 p-4 border border-gray-300 w-64">
                            <p className="font-semibold">Total worth: {formatter.format(calculatedTotal)}</p>
                        </div>
                        <div className="mt-4 p-4 border border-gray-300 w-64">
                            {totalProfit ? (
                                <p className={`font-semibold ${totalProfit > 0 ? 'text-green-600' : totalProfit === 0 ? '' : 'text-red-600'}`}>
                                    Total Profit: {formatter.format(totalProfit)}
                                </p>
                            ) : 'Loading...'}
                        </div>
                    </div>
                
                    <Button className="mt-4">
                        <Link href="/dashboard/add">
                            Add investment
                        </Link>
                    </Button>
                    <hr className='mt-4 mb-4' style={{ borderColor: '#d0d5db' }} />
                    {userSells?.length > 0 && (
                        <div>
                            <h1 className='font-bold text-3xl mb-4 text-gray-800'>Your sells</h1>
                            <table className="table-auto border-collapse w-full font-sans text-gray-800">
                                <thead>
                                    <tr className="bg-gray-700 text-white">
                                    <th className="px-4 py-2 text-left">Date</th>
                                    <th className="px-4 py-2 text-left">Coin</th>
                                    <th className="px-4 py-2 text-left">Amount Sold</th>
                                    <th className="px-4 py-2 text-left">Buy price</th>
                                    <th className="px-4 py-2 text-left">Sell price</th>
                                    <th className="px-4 py-2 text-left">Total fiat received</th>
                                    <th className="px-4 py-2 text-left">Profit/loss</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userSells.map((sell, index) => (
                                    <tr
                                        key={sell.id}
                                        className={`${
                                        index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                                        } hover:bg-gray-300`}
                                    >
                                        <td className="border-t border-gray-300 px-4 py-2">
                                        {new Intl.DateTimeFormat('en-US', {
                                            month: '2-digit',
                                            day: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false,
                                        }).format(new Date(sell.created_at))}
                                        </td>
                                        <td className="border-t border-gray-300 px-4 py-2">{sell.coin_name}</td>
                                        <td className="border-t border-gray-300 px-4 py-2">{sell.amount_sold}</td>
                                        <td className="border-t border-gray-300 px-4 py-2">{formatter.format(parseFloat(sell.buy_price.toString()))}</td>
                                        <td className="border-t border-gray-300 px-4 py-2">{formatter.format(parseFloat(sell.sell_price.toString()))}</td>
                                        <td className="border-t border-gray-300 px-4 py-2">{formatter.format(parseFloat(sell.total_received.toString()))}</td>
                                        <td
                                        className={`border-t border-gray-300 px-4 py-2 ${
                                            (parseFloat(sell.sell_price) - parseFloat(sell.buy_price.toString())) * parseFloat(sell.amount_sold) < 0
                                            ? 'text-red-600'
                                            : 'text-green-600'
                                        }`}
                                        >
                                        {formatter.format(
                                            (parseFloat(sell.sell_price.toString()) - parseFloat(sell.buy_price.toString())) * parseFloat(sell.amount_sold.toString())
                                        )}
                                        </td>

                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value='Crypto'>
                    <h1 className='font-bold text-3xl mb-4 text-gray-800'>Your crypto</h1>
                    <CoinCharts coins={[...new Set(userInvestments.map((investment) => investment.coin_name))]} />
                </TabsContent>

                <TabsContent value='Stats'>
                    <Stats userInvestment={userInvestments}/>
                </TabsContent>
            </Tabs>
        </div>
    );
}