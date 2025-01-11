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
      <div>
         <div className="flex items-center p-4 pb-0">
            <Link href="/dashboard" className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back</span>
            </Link>
        </div>
          <form onSubmit={handleSell}>
            <label htmlFor="amount">How much did you sell?</label>
            <input
              type="number"
              id="amount"
              value={amountSold}
              onChange={(e) => setAmountSold(Number(e.target.value))}
            />
    
            <label htmlFor="received">How much did you receive in fiat?</label>
            <input
              type="float"
              id="received"
              value={fiatReceived}
              onChange={(e) => setFiatReceived(Number(e.target.value))}
            />
            <Button type="submit">Mark as sold</Button>
          </form>
      </div>
      )
}