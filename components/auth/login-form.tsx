"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RsiLogo } from "@/components/rsi-logo"
import MockData from "@/lib/mock-data"

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // In a real implementation, this would call the API
      // For now, we'll use mock data
      const mockUser = MockData.getUserByCredentials(email, password)

      if (!mockUser) {
        throw new Error("Invalid email or password")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Logged in with mock data:", mockUser)

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "An error occurred during login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 flex flex-col items-center">
        <RsiLogo size={48} />
        <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
        <CardDescription>Enter your credentials to access the client portal</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {error && <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-muted-foreground mt-4 p-2 bg-muted rounded-md">
          <p className="font-medium">Development Mode Credentials:</p>
          <p>Admin: admin@example.com / password</p>
          <p>Client: client@example.com / password</p>
        </div>
      </CardFooter>
    </Card>
  )
}
