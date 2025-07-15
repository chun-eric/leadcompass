// Update the import path to the correct relative location if needed
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default function Home() {
  // click handler

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">LeadCompass</h1>
      <p className="text-gray-600 mb-4">AI-powered Sales Intelligence Platform</p>
      <Link href="/dashboard" className="">
      <Button variant="primary" >Go to Dashboard</Button>
      </Link>
    </main>
  )
}