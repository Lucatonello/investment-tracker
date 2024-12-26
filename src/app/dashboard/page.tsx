import { Button } from "@/components/ui/button";
import { getUserInvestments } from "@/server/database";
import Link from "next/link";

export default async function Page() {
    const userInvestments = await getUserInvestments('1')
    console.log('userInvestments', userInvestments)
    return (
        <div>
            <table className="table-auto border-collapse w-full font-sans">
                <thead>
                    <tr>
                    <th className="border border-gray-300 px-2 py-1 text-left">Coin</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Amount</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Buy price</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Current price</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Total spent</th>
                    <th className="border border-gray-300 px-2 py-1 text-left">Profit</th>
                    </tr>
                </thead>
                {userInvestments.map((investment) => (
                    <tbody key={investment.id}>
                        <tr className="bg-gray-200">
                        <td className="border border-gray-300 px-2 py-1">{investment.coin_name}</td>
                        <td className="border border-gray-300 px-2 py-1">{investment.coin_amount}</td>
                        <td className="border border-gray-300 px-2 py-1">{investment.buy_price}</td>
                        {/* TODO: fetch current price */}
                        <td className="border border-gray-300 px-2 py-1">X</td> 
                        <td className="border border-gray-300 px-2 py-1">{investment.total_spent}</td>
                        {/* TODO: calculate profit */}
                        <td className="border border-gray-300 px-2 py-1 text-green-600">X</td> 
                        </tr>
                    </tbody>
                ))}
                
            </table>
            <Button className="mt-4">
                <Link href="/dashboard/add">
                    Add investment
                </Link>
            </Button>
        </div>
    )
}