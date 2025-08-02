"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Gift, Bell, Plane } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleSubscribe = async () => {
    if (!email) {
      alert("Please enter your email address!")
      return
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address!")
      return
    }

    setIsSubscribing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert(`🎉 Thank you for subscribing! Welcome to StayEase, ${email}! Check your inbox for your 15% discount code.`)
    setEmail("")
    setIsSubscribing(false)
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container px-4 mx-auto">
        <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Gift className="h-6 w-6 text-purple-600" />
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Bell className="h-6 w-6 text-green-600" />
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Plane className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Exclusive Travel Deals</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about special offers, new destinations, and insider
              travel tips. Plus, get 15% off your first booking!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubscribe()}
              />
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 px-8"
                onClick={handleSubscribe}
                disabled={isSubscribing}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2">
                <Gift className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Exclusive Deals</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Price Alerts</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Plane className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">Travel Tips</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              No spam, unsubscribe at any time. By subscribing, you agree to our Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
