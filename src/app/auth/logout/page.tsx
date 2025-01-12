"use client"

import ReafirmationPage from "@/components/ReafirmationPage"
import { useEffect } from "react"

const LogoutClient = () => {
    localStorage.removeItem("userId")
    window.location.href = "/auth/sign-in"
}

export default function LogOut() {


    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])

    return (
        <ReafirmationPage
            title="Are you sure you want to log out?"
            action={LogoutClient}
        />
    )
}
