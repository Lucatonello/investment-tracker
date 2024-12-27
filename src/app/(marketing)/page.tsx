import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return <div className="flex flex-col items-center justify-center min-h-screen">
  <h1 className="text-7xl font-bold text-gray-800 tracking-tight">Welcome to the investment tracker</h1>
  <p className="mt-4 text-2xl">This is a simple investment tracker that helps you keep track of your crypto investments</p>
  <SignedIn>
    <Button className="mt-4">
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  </SignedIn>
  <SignedOut>
    <SignInButton>Login</SignInButton>
  </SignedOut>
</div>
}
