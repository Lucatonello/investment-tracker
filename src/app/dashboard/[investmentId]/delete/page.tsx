"use client"

import ReafirmationPage from "@/components/ReafirmationPage"
import { deleteInvestment } from "@/server/database"
import { useParams } from "next/navigation"

export default function DeleteInvestment() {
    const { investmentId } = useParams()
    const investmentIdNumber = Number(investmentId)

    function handleDelete() {
        deleteInvestment(investmentIdNumber)
    }

    return <ReafirmationPage title="Are you sure you want to delete this investment?" action={handleDelete} />
}