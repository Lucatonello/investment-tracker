"use client"

import { sellInvestment } from "@/server/database";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sell() {
    const { investmentId } = useParams();
    const investmentIdNumber = Number(investmentId)
    const [amountSold, setAmountSold] = useState<number>(0)
    const [fiatReceived, setFiatReceived] = useState<number>(0)
    const [userId, setUserId] = useState<string | null>(null)
    
    useEffect(() => {
      if (typeof window != "undefined") {
        const storedUserId = localStorage.getItem('userId')
        setUserId(storedUserId)
      }
    }, [])

    function handleSell(e: any) {
      console.log('function has been hit')

      e.preventDefault()

        if (!amountSold || !fiatReceived) {
            alert("Please fill in all fields.")
            return
        }

        try {
          sellInvestment({ investmentId: investmentIdNumber, amountSold, fiatReceived, userId })
        } catch (err) {
            console.error(err)
        }

    }
    return (
      <div className="p-4 flex justify-center">
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
            <Link
                href="/dashboard"
                className="flex items-center text-grey-800 hover:text-grey-800"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                <span>Back</span>
            </Link>
        </div>
        <form
            onSubmit={handleSell}
            className="space-y-6"
        >
            <div className="space-y-2">
                <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                >
                    How much did you sell?
                </label>
                <input
                    type="number"
                    id="amount"
                    value={amountSold}
                    onChange={(e) => setAmountSold(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="received"
                    className="block text-sm font-medium text-gray-700"
                >
                    How much did you receive in fiat?
                </label>
                <input
                    type="float"
                    id="received"
                    value={fiatReceived}
                    onChange={(e) => setFiatReceived(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
            </div>

            <div>
                <Button
                    type="submit"
                    className="w-full py-2 px-4 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Mark as sold
                </Button>
            </div>
        </form>
    </div>
</div>

      )
}