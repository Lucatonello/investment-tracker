"use client"

import { useParams } from "next/navigation"
import { PageWithBackArrow } from "../../_components/PageWithBackArrow"
import { CoinPage } from "../../_components/CoinPage"

export default function CoinsPage() {
    const { coinId } = useParams()
    const coinIdTyped = Array.isArray(coinId) ? coinId[0] : coinId || "Unknown Coin"

    return <div>
        <PageWithBackArrow title="Coin Details" href={'/dashboard'}>
            <CoinPage coinId={coinIdTyped} />
        </PageWithBackArrow>
    </div>
}