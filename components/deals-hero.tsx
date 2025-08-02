import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Percent, Clock, Star } from "lucide-react"
import Image from "next/image"

export function DealsHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero-hotel.png" alt="Hotel Deals" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 via-orange-900/50 to-yellow-900/70" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg px-6 py-2 mb-6">
          <Percent className="mr-2 h-5 w-5" />
          Up to 70% OFF
        </Badge>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Unbeatable
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Hotel Deals
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Save big on your next getaway with our exclusive hotel deals and limited-time offers
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg"
          >
            <Clock className="mr-2 h-5 w-5" />
            Limited Time Offers
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
          >
            <Star className="mr-2 h-5 w-5" />
            Premium Deals
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
          <div>
            <div className="text-3xl font-bold text-yellow-400">70%</div>
            <div className="text-gray-300">Max Discount</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">500+</div>
            <div className="text-gray-300">Hotels on Sale</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-400">24h</div>
            <div className="text-gray-300">Flash Deals</div>
          </div>
        </div>
      </div>
    </section>
  )
}
