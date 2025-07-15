// Update the import path to the correct relative location if needed
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">LeadCompass</h1>
      <p className="text-gray-600 mb-4">AI-powered Sales Intelligence Platform</p>
      <a href="/dashboard" className="">
      <Button></Button>
      </a>
    </main>
  )
}