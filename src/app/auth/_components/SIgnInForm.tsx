"use client"

import { logInUser } from "@/server/database";
import { useState } from "react"

export function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            
            await logInUser(formData)
    };

    return <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg flex flex-col space-y-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <h2 className="text-xl font-bold text-gray-800 text-center">Sign In</h2>
    
    <label className="flex flex-col">
        <span className="text-gray-600 font-medium">Email</span>
        <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />
    </label>

    <label className="flex flex-col">
        <span className="text-gray-600 font-medium">Password</span>
        <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />
    </label>

    <button 
        type="submit"
        className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-400 focus:outline-none">
        Sign In
    </button>

    <p className="text-sm text-gray-500 text-center">
        Don't have an account? <a href="/auth/sign-up" className="text-orange-500 hover:underline">Sign up</a>
    </p>
</form>
}