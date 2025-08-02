"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Hotel, User, Heart, Calendar } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleWishlist = () => {
    router.push("/wishlist")
  }

  const handleBookings = () => {
    router.push("/bookings")
  }

  const handleSignIn = () => {
    alert("Sign In feature coming soon! 🔐")
  }

  const handleSignUp = () => {
    alert("Sign Up feature coming soon! ✨")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Hotel className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            StayEase
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/hotels" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Hotels
          </Link>
          <Link href="/destinations" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Destinations
          </Link>
          <Link href="/deals" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Deals
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleWishlist}>
            <Heart className="h-4 w-4 mr-2" />
            Wishlist
          </Button>
          <Button variant="ghost" size="sm" onClick={handleBookings}>
            <Calendar className="h-4 w-4 mr-2" />
            My Bookings
          </Button>
          <Button variant="outline" size="sm" onClick={handleSignIn}>
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/hotels" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Hotels
              </Link>
              <Link href="/destinations" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Destinations
              </Link>
              <Link href="/deals" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Deals
              </Link>
              <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={handleWishlist}>
                  <Heart className="h-4 w-4 mr-2" />
                  Wishlist
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={handleBookings}>
                  <Calendar className="h-4 w-4 mr-2" />
                  My Bookings
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handleSignUp}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
