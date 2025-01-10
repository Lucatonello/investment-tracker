"use client"

import { sellInvestment } from "@/server/database";
import { useParams } from "next/navigation"
import { useState } from "react";
import { PageWithBackArrow } from "../../_components/PageWithBackArrow";
import { Button } from "@/components/ui/button";

export default function Sell() {
    const { investmentId } = useParams();
    const investmentIdNumber = Number(investmentId)
    const [amountSold, setAmountSold] = useState<number>(0)
    const [fiatReceived, setFiatReceived] = useState<number>(0)
    const userId = localStorage.getItem('userId')

    async function handleSell() {
        if (!amountSold || !fiatReceived) {
            alert("Please fill in all fields.")
            return
        }

        try {
            await sellInvestment({ investmentId: investmentIdNumber, amountSold, fiatReceived, userId })
        } catch (err) {
            console.error(err)
        }

    }
    return (
        <PageWithBackArrow
          title="Are you sure you want to mark as sold?"
          href='/dashboard'
        >
          <form onSubmit={() => handleSell}>
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
        </PageWithBackArrow>
      )
}