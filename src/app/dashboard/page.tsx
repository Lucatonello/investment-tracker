import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
    
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
                <tbody>
                    <tr className="bg-gray-200">
                    <td className="border border-gray-300 px-2 py-1">ETH</td>
                    <td className="border border-gray-300 px-2 py-1">0.00911843</td>
                    <td className="border border-gray-300 px-2 py-1">3,457</td>
                    <td className="border border-gray-300 px-2 py-1">3,540</td>
                    <td className="border border-gray-300 px-2 py-1">37,500</td>
                    <td className="border border-gray-300 px-2 py-1 text-green-600">+120</td>
                    </tr>
                </tbody>
            </table>
            <Button className="mt-4">
                <Link href="/dashboard/add">
                    Add investment
                </Link>
            </Button>
        </div>
    )
}