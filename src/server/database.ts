import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';

dotenv.config()

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

export type User = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
  };

export async function saveUser(user: User) {
    console.log('user received in database.ts', user)
    try {
        await sql`
            INSERT INTO users (id, email, first_name, last_name)
            VALUES (${user.id}, ${user.email}, ${user.first_name}, ${user.last_name})
        `
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function saveInvestment(investment: Investment, userId: string) {
    console.log('investment', investment)
    const result = await sql`
        INSERT INTO investments 
        (coin_name, coin_amount, buy_price, total_spent, user_id)
        VALUES (
            ${investment.joinedValues.coinName}, 
            ${investment.joinedValues.coinAmount}, 
            ${investment.joinedValues.coinPrice}, 
            ${investment.joinedValues.totalSpent},
            ${userId || 1}
        )
    `
    // TODO: put real ID later 
    return result
}

export async function getUserInvestments(userId: string) {
    const result = await sql`
        SELECT * FROM investments WHERE user_id = ${userId || 1}
    `
    // TODO: put real ID later 
    return result
}