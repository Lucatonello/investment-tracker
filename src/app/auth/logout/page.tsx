"use client"

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

function LogoutClient() {
    localStorage.removeItem('userId');
    window.location.href = '/auth/sign-in';
}

export default function LogOut() {
    useEffect(() => {
        document.body.style.overflow = 'hidden'; // Prevent scrolling when the pop-up is open
        return () => {
            document.body.style.overflow = 'auto'; // Restore scrolling when the pop-up is closed
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
                <h1 className="mb-20 text-2xl">Are you sure you want to log out?</h1>
                <div className="flex justify-end space-x-4">
                    <Button onClick={LogoutClient}>Yes</Button>
                    <Button asChild>
                        <a href="/dashboard">No, go back</a>
                    </Button>
                </div>
            </div>
        </div>
    );
}