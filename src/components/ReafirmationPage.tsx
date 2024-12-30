import { Button } from "./ui/button";

import { MouseEventHandler } from 'react';

export default function ReafirmationPage({ title, action }: { title: string, action: MouseEventHandler<HTMLButtonElement> }) {
    return <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
    <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
        <h1 className="mb-20 text-2xl">{title}</h1>
        <div className="flex justify-end space-x-4">
            <Button onClick={action}>Yes</Button>
            <Button asChild>
                <a href="/dashboard">No, go back</a>
            </Button>
        </div>
    </div>
</div>
}