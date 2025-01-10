import { neon } from "@neondatabase/serverless"
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { InvestmentData } from "../app/dashboard/_components/EditInvestmentForm"
import { Sells } from "@/app/dashboard/page"
import { fetchCoinPrice } from "./coingecko"

dotenv.config()

const DATABASE_URL = 'postgresql://neondb_owner:y2DMbfda5uiB@ep-young-cherry-a4zt15jb.us-east-1.aws.neon.tech/neondb?sslmode=require'

const sql = neon(DATABASE_URL)

export type Investment = {
    investment: {
        coinName: string
        coinAmount: number
        coinPrice: number
        totalSpent: number
    }
    userId: string | null
}

export type User = {
    email: string
    firstName: string
    lastName: string
    password: string
}

type EditInvestmentFormProps = {
    investmentId: string | number;
};

export async function saveUser(user: User) {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await sql`
            INSERT INTO users (email, first_name, last_name, password)
            VALUES (${user.email}, ${user.firstName}, ${user.lastName}, ${hashedPassword})
        `
        redirect('/auth/sign-in')
    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function logInUser(user: { email: string, password: string }) {
    const result = await sql`
        SELECT * FROM users WHERE email = ${user.email}
    `
    const userFromDb = result[0]
    if (!userFromDb) {
        throw new Error('User not found')
    }
    const passwordMatch = await bcrypt.compare(user.password, userFromDb.password)
    if (!passwordMatch) {
        throw new Error('Invalid password')
    }
    localStorage.setItem('userId', userFromDb.id.toString())
    redirect('/dashboard')
}

export async function saveInvestment(investment: Investment) {
    const result = await sql`
        INSERT INTO investments 
        (coin_name, coin_amount, buy_price, total_spent, user_id)
        VALUES (
            ${investment.investment.coinName}, 
            ${investment.investment.coinAmount}, 
            ${investment.investment.coinPrice}, 
            ${investment.investment.totalSpent},
            ${investment.userId}
        )
    `
    redirect('/dashboard')
}

export async function getUserInvestments(userId: string | null) {
    const result = await sql`
        SELECT * FROM investments WHERE user_id = ${userId || 1}
    `
    return result
}

export async function getInvestmentData({ investmentId }: EditInvestmentFormProps) {
    const result = await sql`
        SELECT * FROM investments WHERE id = ${investmentId}
    `
    return result[0]
}

export async function updateInvestment({ investment }: { investment: InvestmentData }) {
    const result = await sql`
        UPDATE investments
        SET coin_name = ${investment.coin_name},
            created_at = ${investment.created_at},
            coin_amount = ${investment.coin_amount},
            buy_price = ${investment.buy_price},
            total_spent = ${investment.total_spent}
        WHERE id = ${investment.id}
    `
    redirect('/dashboard')
}

export async function deleteInvestment(investmentid: number) {
    const result = await sql`
        DELETE FROM investments WHERE id = ${investmentid}
    `
    redirect('/dashboard')
}

export async function getUserSells(userId: string | null) {
    const result = await sql`
        SELECT * FROM sells WHERE user_id = ${userId}
    `
    return result
}

export async function saveUserSell(sell: Sells) {
    const result = await sql`
        INSERT INTO sells
        (coin_name, amount_sold, buy_price, sell_price, total_received)
        VALUES (${sell.coin_name, sell.amount_sold, sell.buy_price, sell.total_received})
    `
    redirect('/dashboard')
}

export async function sellInvestment({ investmentId, amountSold, fiatReceived, userId }
    :{ 
        investmentId: number, 
        amountSold: number, 
        fiatReceived: number,
        userId: string | null
    }) {

    const investmentData = await getInvestmentData({ investmentId })
    if (!investmentData) throw new Error("Investment not found.")

    const { coin_amount } = investmentData
    if (amountSold > coin_amount) throw new Error("Sold amount exceeds available quantity.")

    const coinCurrentPrice = await fetchCoinPrice(investmentData.coin_name)

    if (amountSold == coin_amount) {

        await sql`
            DELETE FROM investments WHERE id = ${investmentId}
        `

        await sql`
            INSERT INTO sells (coin_name, amount_sold, buy_price, sell_price, total_received, user_id)
            VALUES (${investmentData.coin_name}, ${amountSold}, ${investmentData.buy_price}, ${coinCurrentPrice}, ${fiatReceived}, ${userId})        
        `
    } else {
        const remainingQuantity = coin_amount - amountSold

        await sql`
            UPDATE investments
            SET coin_amount = ${remainingQuantity}
            WHERE id = ${investmentId}
        `

        await sql`
            INSERT INTO sells (coin_name, amount_sold, buy_price, sell_price, total_received, user_id)
            VALUES (${investmentData.coin_name}, ${amountSold}, ${investmentData.buy_price}, ${coinCurrentPrice}, ${fiatReceived}, ${userId})
        `
    }
    redirect('/dashboard')
}