"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { Metadata } from "next"
import { useState } from "react"
import "./globals.css"
import { Inter } from "next/font/google"


// configure font
const inter = Inter({
  subsets:["latin"],
  variable: "--font-inter",
})

// export const metadata = Metadata = {
//   title: "Leadcompass",
//   description: "Finding companies ready to buy"
// }


export default function RootLayout({
  children }: {
    children: React.ReactNode;
  }) {
    const [queryClient] = useState(() => new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
          retry: 1
        }
      },
    }))

    return (
      <html lang="en">
        <body className={inter.variable}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </body>
      </html>
    )
  }