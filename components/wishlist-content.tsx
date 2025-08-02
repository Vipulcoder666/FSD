"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Heart, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { BookingModal } from "@/components/booking-modal"
import { useState } from "react"
import Image from "next/image"

export function WishlistContent() {
  const { wishlist, removeFromWishlist } = useStore()
  const router = useRouter()
  const [selectedHotel, setSelectedHotel] = useState<any>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleRemoveFromWishlist = (hotelId: number) => {
    removeFromWishlist(hotelId)
  }

  const handleBookNow = (hotel: any) => {
    setSelectedHotel(hotel)
    setIsBookingModalOpen(true)
  }

  const handleBrowseHotels = () => {
    router.push("/")
  }

  if (wishlist.length === 0) {
    return (
      <section className="py-16 bg-gray-50 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-xl text-gray-600 mb-8">Start adding hotels you love to your wishlist!</p>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={handleBrowseHotels}
          >
            Browse Hotels
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
            My Wishlist
          </h1>
          <p className="text-xl text-gray-600">
            {wishlist.length} hotel{wishlist.length !== 1 ? "s" : ""} saved for later
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((hotel) => (
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
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveFromWishlist(hotel.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {hotel.name}
                </h3>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">{hotel.reviews} reviews</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">₹{hotel.price.toLocaleString()}</span>
                    <span className="text-lg text-gray-500 line-through">₹{hotel.originalPrice.toLocaleString()}</span>
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
      </div>

      {selectedHotel && (
        <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} hotel={selectedHotel} />
      )}
    </section>
  )
}
