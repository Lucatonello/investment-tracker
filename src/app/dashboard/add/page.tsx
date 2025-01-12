"use client"

import { redirect } from "next/navigation"
import { NewCoinForm } from "../_components/NewCoinForm"
import { PageWithBackArrow } from "../_components/PageWithBackArrow"

const userId = localStorage.getItem('userId')
if (!userId) redirect('/auth/sign-in')

export default function AddCoin() {
    return <div>
        <PageWithBackArrow title="Add investment" href="/dashboard">
            <NewCoinForm  userId={userId}/>
        </PageWithBackArrow>
    </div>
}