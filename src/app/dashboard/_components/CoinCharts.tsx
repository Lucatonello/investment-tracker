import { fetchCoinChart } from "@/server/coingecko";
import { useEffect, useState } from "react";

type CoinChartsProps = {
    coins: string[];
};

type CoinData = {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
};

export function CoinCharts({ coins }: CoinChartsProps) {
    const [data, setData] = useState<CoinData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const allData = await Promise.all(coins.map(async (coin) => {
                const result = await fetchCoinChart(coin);
                return {
                    prices: result.prices,
                    market_caps: result.market_caps,
                    total_volumes: result.total_volumes,
                };
            }));
            setData(allData);
        }
        fetchData();
    }, [coins]);

    return (
        <div>
            {data.length > 0 ? (
                data.map((coinData, index) => (
                    <div key={index}>
                        <h3>{coins[index]}</h3>
                        <div>
                            <h4>Prices</h4>
                            {coinData.prices.map((price, i) => (
                                <div key={i}>{price[1]}</div>
                            ))}
                        </div>
                        <div>
                            <h4>Market Caps</h4>
                            {coinData.market_caps.map((marketCap, i) => (
                                <div key={i}>{marketCap[1]}</div>
                            ))}
                        </div>
                        <div>
                            <h4>Total Volumes</h4>
                            {coinData.total_volumes.map((volume, i) => (
                                <div key={i}>{volume[1]}</div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}