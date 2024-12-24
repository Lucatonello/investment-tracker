import { Navbar } from "./_components/NavBar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className="selection:bg-[hsl(30,100%,70%)]">
      <Navbar />
      {children}
    </div>
}