"use client"

import { redirect, useParams } from "next/navigation"
import { EditInvestmentForm } from "../../_components/EditInvestmentForm"
import { PageWithBackArrow } from "../../_components/PageWithBackArrow"

const userId = localStorage.getItem('userId')
if (!userId) redirect('/auth/sign-in')

export default function EditInvestment() {
    const { investmentId } = useParams<{ investmentId: string }>()
    
    if (!investmentId || Array.isArray(investmentId)) {
        return <div>Error: Invalid investment ID</div>
    }
    
    return (
        <PageWithBackArrow title="Edit Investment" href="/dashboard">
            <EditInvestmentForm investmentId={investmentId} />
        </PageWithBackArrow>
    )
}