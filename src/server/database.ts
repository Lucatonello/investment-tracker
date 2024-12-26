import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config()

console.log('DATABASE_URL:', process.env.DATABASE_URL)
const DATABASE_URL = 'postgresql://neondb_owner:y2DMbfda5uiB@ep-young-cherry-a4zt15jb.us-east-1.aws.neon.tech/neondb?sslmode=require'

const sql = neon(DATABASE_URL)

export type Investment = {
    joinedValues: {
        coinName: string
        coinAmount: number
        coinPrice: number
        totalSpent: number
    }
}

export async function saveInvestment(investment: Investment) {
    console.log('investment', investment)
    const result = await sql`
        INSERT INTO investments 
        (coin_name, coin_amount, buy_price, total_spent, user_id)
        VALUES (
            ${investment.joinedValues.coinName}, 
            ${investment.joinedValues.coinAmount}, 
            ${investment.joinedValues.coinPrice}, 
            ${investment.joinedValues.totalSpent},
            1
        )
    `
    console.log('result', result)
}