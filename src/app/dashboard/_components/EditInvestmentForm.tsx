import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getInvestmentData, updateInvestment } from "@/server/database";
import { fetchCoinList } from "@/server/coingecko";

type EditInvestmentFormProps = {
    investmentId: string;
};

export type InvestmentData = {
    buy_price: string,
    coin_amount: string,
    coin_name: string,
    created_at: string,
    id: number,
    total_spent: string,
    user_id: string
}

interface Coin {
    id: string;
    name: string;
  }

export function EditInvestmentForm({ investmentId }: EditInvestmentFormProps) {
    const [investmentData, setInvestmentData] = useState<InvestmentData | null>(null);
    const [coinsList, setCoinsList] = useState<Coin[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getInvestmentData({ investmentId });
            setInvestmentData(data);
        }

        async function fetchCoins() {
            const coins = await fetchCoinList()
            setCoinsList(coins);
        }

        fetchData();
        fetchCoins();
    }, [investmentId]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (investmentData) {
            updateInvestment({ investment: investmentData });
        }
    }

    if (!investmentData) {
        return <div>Loading...</div>;
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="block" htmlFor="coin-name">Date</label>
                <input
                    className="w-full border p-2"
                    id="coin-date"
                    type="date"
                    min="0"
                    value={
                        investmentData.created_at
                            ? new Date(investmentData.created_at).toISOString().split("T")[0]
                            : ""
                    }
                    onChange={(e) =>
                        setInvestmentData({ ...investmentData, created_at: e.target.value })
                    }
                />
            </div>

            <div>
                <label className="block" htmlFor="coin-name">Coin name</label>
                <select
                    className="w-full border p-2"
                    id="coin-name"
                    value={investmentData.coin_name || ""}
                    onChange={(e) => {
                        const selectedCoinId = e.target.value;
                        const coin = coinsList.find((coin) => coin.id === selectedCoinId) || null;
                        setInvestmentData({ ...investmentData, coin_name: coin ? coin.id : "" });
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
                <input
                    className="w-full border p-2"
                    id="coin-amount"
                    type="float"
                    min="0"
                    value={investmentData.coin_amount}
                    onChange={(e) =>
                        setInvestmentData({ ...investmentData, coin_amount: e.target.value })
                    }
                />
            </div>
            <div>
                <label className="block" htmlFor="coin-price">Buy price</label>
                <input
                    className="w-full border p-2"
                    id="coin-price"
                    type="float"
                    min="0"
                    value={investmentData.buy_price || ""}
                    onChange={(e) => 
                        setInvestmentData({ ...investmentData, buy_price: e.target.value })
                    }
                />
            </div>
            <div>
                <label className="block" htmlFor="total-spent">Total spent</label>
                <input
                    className="w-full border p-2"
                    id="total-spent"
                    type="number"
                    min="0"
                    value={investmentData.total_spent || ""}
                    onChange={(e) =>
                        setInvestmentData({ ...investmentData, total_spent: e.target.value })
                    }
                />
            </div>
            <Button type="submit">Save Changes</Button>
        </form>
    );
}
