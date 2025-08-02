"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Play } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export function HeroSection() {
  const router = useRouter()

  const handleExploreHotels = () => {
    router.push("/hotels")
  }

  const handleWatchVideo = () => {
    alert("🎥 Video tour coming soon! Experience our amazing hotels virtually.")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero-hotel.png" alt="Luxury Hotel Resort" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-purple-900/40 to-pink-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">Rated #1 Hotel Booking Platform</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your Perfect
          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Stay
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Discover amazing hotels, resorts, and unique stays around the world. Book with confidence and create
          unforgettable memories.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            onClick={handleExploreHotels}
          >
            Explore Hotels
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
            onClick={handleWatchVideo}
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Video
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
          <div>
            <div className="text-3xl font-bold">50K+</div>
            <div className="text-gray-300">Hotels Worldwide</div>
          </div>
          <div>
            <div className="text-3xl font-bold">2M+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold">4.9</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}
