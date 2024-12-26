"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Coin, fetchCoinList } from "@/server/coingecko";

export function NewCoinForm() {
    const [coinsList, setCoinsList] = useState<Coin[]>([]);

    useEffect(() => {
        async function getCoins() {
          const coins = await fetchCoinList();
          setCoinsList(coins);
        }
        getCoins();
      }, []);

    return <form className="space-y-4">
        <div>
            <label className="block" htmlFor="coin-name">Coin name</label>
            <select className="w-full border p-2" id="coin-name">
                {coinsList.map((coin) => <option key={coin.id} value={coin.id}>{coin.name}</option>)}
            </select>
        </div>
        <div>
            <label className="block" htmlFor="coin-amount">Amount</label>
            <input className="w-full border p-2" id="coin-amount" type="number" />
        </div>
        <div>
            {/* default to actual price */}
            <label className="block" htmlFor="coin-price">Buy price</label>
            <input className="w-full border p-2" id="coin-price" type="number" />
        </div>
        <div>
            <label className="block" htmlFor="coin-price">Total spent</label>
            <input className="w-full border p-2" id="coin-price" type="number" />
        </div>
        <Button>Add investment</Button>
    </form>
}