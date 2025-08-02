"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { BookingModal } from "@/components/booking-modal"
import { useStore } from "@/lib/store"
import Image from "next/image"

const hotels = [
  {
    id: 1,
    name: "Taj Lake Palace",
    location: "Udaipur, Rajasthan",
    rating: 4.9,
    reviews: 1247,
    price: 25000,
    originalPrice: 35000,
    image: "/images/hotel-1.png",
    amenities: ["Free WiFi", "Lake View", "Spa", "Heritage Architecture"],
    badge: "Heritage Palace",
  },
  {
    id: 2,
    name: "The Oberoi Shimla",
    location: "Shimla, Himachal Pradesh",
    rating: 4.8,
    reviews: 892,
    price: 18000,
    originalPrice: 24000,
    image: "/images/hotel-2.png",
    amenities: ["Mountain View", "Spa", "Restaurant", "Colonial Architecture"],
    badge: "Hill Station",
  },
  {
    id: 3,
    name: "The Leela Palace",
    location: "New Delhi",
    rating: 4.7,
    reviews: 2156,
    price: 15000,
    originalPrice: 20000,
    image: "/images/hotel-3.png",
    amenities: ["Business Center", "Gym", "Multiple Restaurants", "Airport Transfer"],
    badge: "Luxury Hotel",
  },
  {
    id: 4,
    name: "Alila Diwa Resort",
    location: "Goa",
    rating: 4.9,
    reviews: 1543,
    price: 12000,
    originalPrice: 16000,
    image: "/images/hotel-4.png",
    amenities: ["Beach Access", "Pool", "Spa", "Water Sports"],
    badge: "Beach Resort",
  },
  {
    id: 5,
    name: "ITC Grand Chola",
    location: "Chennai, Tamil Nadu",
    rating: 4.8,
    reviews: 967,
    price: 22000,
    originalPrice: 28000,
    image: "/images/hotel-5.png",
    amenities: ["Business Facilities", "Pool", "Spa", "Fine Dining"],
    badge: "Business Hotel",
  },
  {
    id: 6,
    name: "Wildflower Hall",
    location: "Mashobra, Himachal Pradesh",
    rating: 4.6,
    reviews: 734,
    price: 30000,
    originalPrice: 40000,
    image: "/images/hotel-6.png",
    amenities: ["Mountain View", "Adventure Sports", "Spa", "Nature Walks"],
    badge: "Mountain Resort",
  },
]

export function FeaturedHotels() {
  const router = useRouter()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [selectedHotel, setSelectedHotel] = useState<(typeof hotels)[0] | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleBookNow = (hotel: (typeof hotels)[0]) => {
    setSelectedHotel(hotel)
    setIsBookingModalOpen(true)
  }

  const handleWishlistToggle = (hotel: (typeof hotels)[0]) => {
    if (isInWishlist(hotel.id)) {
      removeFromWishlist(hotel.id)
    } else {
      addToWishlist(hotel)
    }
  }

  const handleViewAll = () => {
    router.push("/hotels")
  }

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Hotels & Resorts in India</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover India's most luxurious hotels and heritage properties across the country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative">
                <Image
                  src={hotel.image || "/placeholder.svg"}
                  alt={hotel.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                  {hotel.badge}
                </Badge>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className={`absolute bottom-4 right-4 bg-white/90 hover:bg-white ${
                    isInWishlist(hotel.id) ? "text-red-500" : "text-gray-600"
                  }`}
                  onClick={() => handleWishlistToggle(hotel)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(hotel.id) ? "fill-red-500" : ""}`} />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {hotel.name}
                  </h3>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">{hotel.reviews} reviews</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{hotel.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">₹{hotel.price.toLocaleString("en-IN")}</span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{hotel.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-600">/ night</span>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                    onClick={() => handleBookNow(hotel)}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent" onClick={handleViewAll}>
            View All Indian Hotels
          </Button>
        </div>
      </div>

      {selectedHotel && (
        <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} hotel={selectedHotel} />
      )}
    </section>
  )
}
