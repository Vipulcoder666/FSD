import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Zap } from "lucide-react"
import Image from "next/image"

const deals = [
  {
    id: 1,
    name: "Taj Mahal Palace",
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    reviews: 1847,
    originalPrice: 45000,
    salePrice: 18000,
    discount: 60,
    image: "/images/hotel-1.png",
    timeLeft: "2 days left",
    badge: "Heritage Deal",
    amenities: ["Sea View", "Heritage Architecture", "Spa", "Fine Dining"],
  },
  {
    id: 2,
    name: "The Oberoi Udaivilas",
    location: "Udaipur, Rajasthan",
    rating: 4.8,
    reviews: 1292,
    originalPrice: 55000,
    salePrice: 22000,
    discount: 60,
    image: "/images/hotel-2.png",
    timeLeft: "5 hours left",
    badge: "Palace Deal",
    amenities: ["Lake View", "Royal Treatment", "Spa", "Cultural Shows"],
  },
  {
    id: 3,
    name: "ITC Maurya",
    location: "New Delhi",
    rating: 4.7,
    reviews: 2156,
    originalPrice: 25000,
    salePrice: 8750,
    discount: 65,
    image: "/images/hotel-3.png",
    timeLeft: "1 day left",
    badge: "Capital Deal",
    amenities: ["Business Center", "Multiple Restaurants", "Spa", "Airport Transfer"],
  },
]

export function FeaturedDeals() {
  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Featured Deals on Indian Hotels
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't miss these incredible limited-time offers on India's luxury hotels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white"
            >
              <div className="relative">
                <Image
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold animate-pulse">
                  <Zap className="mr-1 h-3 w-3" />
                  {deal.badge}
                </Badge>

                <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full font-bold text-lg">
                  -{deal.discount}%
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{deal.rating}</span>
                      <span className="text-sm">({deal.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-red-500 px-2 py-1 rounded-full text-xs font-medium">
                      <Clock className="h-3 w-3" />
                      {deal.timeLeft}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {deal.name}
                </h3>

                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{deal.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {deal.amenities.slice(0, 2).map((amenity, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                      {amenity}
                    </Badge>
                  ))}
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    +{deal.amenities.length - 2} more
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600">₹{deal.salePrice.toLocaleString("en-IN")}</span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{deal.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">per night</span>
                  </div>
                  <Button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
