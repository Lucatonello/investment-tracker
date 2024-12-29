import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation'

dotenv.config();

const DATABASE_URL = 'postgresql://neondb_owner:y2DMbfda5uiB@ep-young-cherry-a4zt15jb.us-east-1.aws.neon.tech/neondb?sslmode=require';

const sql = neon(DATABASE_URL);

export type Investment = {
    joinedValues: {
        coinName: string;
        coinAmount: number;
        coinPrice: number;
        totalSpent: number;
    };
};

export type User = {
    email: string
    firstName: string
    lastName: string
    password: string
};

export async function saveUser(user: User) {
    console.log(user)
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        await sql`
            INSERT INTO users (email, first_name, last_name, password)
            VALUES (${user.email}, ${user.firstName}, ${user.lastName}, ${hashedPassword})
        `;
        redirect('/dashboard')
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function logInUser(user: { email: string, password: string }) {
    const result = await sql`
        SELECT * FROM users WHERE email = ${user.email}
    `;
    const userFromDb = result[0];
    if (!userFromDb) {
        throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(user.password, userFromDb.password);
    if (!passwordMatch) {
        throw new Error('Invalid password');
    }
    redirect('/dashboard')
}

export async function saveInvestment(investment: Investment, userId: string) {
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
    `;
    // TODO: put real ID later 
    return result;
}

export async function getUserInvestments(userId: string) {
    const result = await sql`
        SELECT * FROM investments WHERE user_id = ${userId || 1}
    `;
    // TODO: put real ID later 
    return result;
}