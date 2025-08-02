"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart } from "lucide-react"
import { useStore } from "@/lib/store"
import { BookingModal } from "@/components/booking-modal"
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
    amenities: ["Lake View", "Heritage Architecture", "Spa", "Fine Dining"],
    distance: "City Palace - 2 km",
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
    amenities: ["Mountain View", "Colonial Architecture", "Spa", "Restaurant"],
    distance: "Mall Road - 1 km",
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
    amenities: ["Business Center", "Multiple Restaurants", "Spa", "Airport Transfer"],
    distance: "India Gate - 3 km",
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
    distance: "Candolim Beach - 0.5 km",
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
    amenities: ["Business Facilities", "Multiple Restaurants", "Spa", "Pool"],
    distance: "Airport - 8 km",
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
    distance: "Shimla - 13 km",
    badge: "Mountain Resort",
  },
  {
    id: 7,
    name: "Taj Mahal Palace",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    reviews: 1847,
    price: 28000,
    originalPrice: 38000,
    image: "/images/hotel-1.png",
    amenities: ["Sea View", "Heritage Architecture", "Spa", "Fine Dining"],
    distance: "Gateway of India - 0.1 km",
    badge: "Heritage Hotel",
  },
  {
    id: 8,
    name: "The Oberoi Udaivilas",
    location: "Udaipur, Rajasthan",
    rating: 4.8,
    reviews: 1292,
    price: 45000,
    originalPrice: 60000,
    image: "/images/hotel-2.png",
    amenities: ["Lake View", "Royal Treatment", "Spa", "Cultural Shows"],
    distance: "City Palace - 1.5 km",
    badge: "Palace Hotel",
  },
  {
    id: 9,
    name: "ITC Maurya",
    location: "New Delhi",
    rating: 4.7,
    reviews: 2156,
    price: 16000,
    originalPrice: 22000,
    image: "/images/hotel-3.png",
    amenities: ["Business Center", "Multiple Restaurants", "Spa", "Airport Transfer"],
    distance: "Red Fort - 12 km",
    badge: "Business Hotel",
  },
  {
    id: 10,
    name: "Grand Hyatt Goa",
    location: "Bambolim, Goa",
    rating: 4.6,
    reviews: 1156,
    price: 14000,
    originalPrice: 19000,
    image: "/images/hotel-4.png",
    amenities: ["Beach Access", "Golf Course", "Spa", "Multiple Pools"],
    distance: "Panaji - 7 km",
    badge: "Beach Resort",
  },
  {
    id: 11,
    name: "Rambagh Palace",
    location: "Jaipur, Rajasthan",
    rating: 4.8,
    reviews: 1543,
    price: 32000,
    originalPrice: 42000,
    image: "/images/hotel-5.png",
    amenities: ["Palace Architecture", "Royal Dining", "Spa", "Heritage Tours"],
    distance: "Hawa Mahal - 4 km",
    badge: "Royal Palace",
  },
  {
    id: 12,
    name: "The Lalit New Delhi",
    location: "New Delhi",
    rating: 4.5,
    reviews: 967,
    price: 13000,
    originalPrice: 18000,
    image: "/images/hotel-6.png",
    amenities: ["Business Center", "Rooftop Restaurant", "Spa", "Art Gallery"],
    distance: "Connaught Place - 2 km",
    badge: "Art Hotel",
  },
]

export function HotelListings() {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [selectedHotel, setSelectedHotel] = useState<(typeof hotels)[0] | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState("recommended")

  const handleWishlistToggle = (hotel: (typeof hotels)[0]) => {
    if (isInWishlist(hotel.id)) {
      removeFromWishlist(hotel.id)
      alert(`💔 ${hotel.name} removed from your wishlist!`)
    } else {
      addToWishlist(hotel)
      alert(`❤️ ${hotel.name} added to your wishlist!`)
    }
  }

  const handleBookNow = (hotel: (typeof hotels)[0]) => {
    setSelectedHotel(hotel)
    setIsBookingModalOpen(true)
  }

  const handleViewDetails = (hotel: (typeof hotels)[0]) => {
    alert(
      `🏨 ${hotel.name}\n📍 ${hotel.location}\n⭐ ${hotel.rating} (${hotel.reviews} reviews)\n💰 ₹${hotel.price.toLocaleString("en-IN")}/night\n\nAmenities: ${hotel.amenities.join(", ")}\n\nFull details page coming soon!`,
    )
  }

  const sortedHotels = [...hotels].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">Showing {hotels.length} Indian hotels</p>
        <select
          className="border rounded-md px-3 py-2 bg-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recommended">Sort by: Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>

      <div className="space-y-6">
        {sortedHotels.map((hotel) => (
          <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-80 h-48 md:h-auto">
                  <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                    {hotel.badge}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{hotel.location}</span>
                        <span className="mx-2">•</span>
                        <span className="text-sm">{hotel.distance}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <span className="text-sm text-gray-600">({hotel.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">₹{hotel.price.toLocaleString("en-IN")}</span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{hotel.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-gray-600">/ night</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" onClick={() => handleViewDetails(hotel)}>
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`${
                          isInWishlist(hotel.id)
                            ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                            : "bg-transparent hover:bg-gray-50"
                        }`}
                        onClick={() => handleWishlistToggle(hotel)}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(hotel.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        onClick={() => handleBookNow(hotel)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedHotel && (
        <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} hotel={selectedHotel} />
      )}
    </div>
  )
}
