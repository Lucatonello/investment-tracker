"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { fetchCoinList, fetchCoinPrice } from '@/server/coingecko';
import { saveInvestment } from '@/server/database';

interface Coin {
  id: string;
  name: string;
}

interface Investment {
  investment: {
    coinName: string;
    coinAmount: number;
    coinPrice: number;
    totalSpent: number;
  };
  userId: string | null;
}

export function NewCoinForm({ userId }: { userId: string | null }) {
  const [coinsList, setCoinsList] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [selectedCoinPrice, setSelectedCoinPrice] = useState<string | null>(null);

  useEffect(() => {
    async function getCoins() {
      const coins = await fetchCoinList();
      setCoinsList(coins);
    }
    getCoins();
  }, []);

  useEffect(() => {
    async function getSelectedCoinPrice() {
      if (selectedCoin) {
        const price = await fetchCoinPrice(selectedCoin.id);
        setSelectedCoinPrice(`${price} ARS`);
      }
    }
    getSelectedCoinPrice();
  }, [selectedCoin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const investment = {
      coinName: (form.elements.namedItem('coin-name') as HTMLSelectElement).value,
      coinAmount: parseFloat((form.elements.namedItem('coin-amount') as HTMLInputElement).value),
      coinPrice: parseFloat((form.elements.namedItem('coin-price') as HTMLInputElement).value),
      totalSpent: parseFloat((form.elements.namedItem('total-spent') as HTMLInputElement).value),
    };

    const investmentData: Investment = {
      investment,
      userId,
    };
    
    saveInvestment(investmentData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block" htmlFor="coin-name">Coin name</label>
        <select
          className="w-full border p-2"
          id="coin-name"
          onChange={(e) => {
            const selectedCoinId = e.target.value;
            const coin = coinsList.find((coin) => coin.id === selectedCoinId) || null;
            setSelectedCoin(coin);
          }}
        >
          <option value="">Select a coin</option>
          {coinsList.map((coin) => (
            <option key={coin.id} value={coin.id}>{coin.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block" htmlFor="coin-amount">Amount</label>
        <input className="w-full border p-2" id="coin-amount" type="float" min="0" />
      </div>
      <div>
        <label className="block" htmlFor="coin-price">Buy price</label>
        <input
          className="w-full border p-2"
          id="coin-price"
          type="text"
          value={selectedCoinPrice !== null ? selectedCoinPrice : ''}
          onChange={(e) => setSelectedCoinPrice(e.target.value)}
        />
      </div>
      <div>
        <label className="block" htmlFor="total-spent">Total spent</label>
        <input className="w-full border p-2" id="total-spent" type="float" min="0" />
      </div>
      <Button type='submit'>Add investment</Button>
    </form>
  );
}