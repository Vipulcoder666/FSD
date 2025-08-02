import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, Flame } from "lucide-react"

const lastMinuteDeals = [
  {
    id: 1,
    name: "Rambagh Palace",
    location: "Jaipur, Rajasthan",
    rating: 4.6,
    originalPrice: 35000,
    salePrice: 14000,
    discount: 60,
    hoursLeft: 8,
    available: 3,
  },
  {
    id: 2,
    name: "Grand Hyatt",
    location: "Mumbai, Maharashtra",
    rating: 4.5,
    originalPrice: 20000,
    salePrice: 9000,
    discount: 55,
    hoursLeft: 12,
    available: 2,
  },
  {
    id: 3,
    name: "The Lalit",
    location: "New Delhi",
    rating: 4.7,
    originalPrice: 18000,
    salePrice: 7200,
    discount: 60,
    hoursLeft: 6,
    available: 1,
  },
  {
    id: 4,
    name: "Vivanta by Taj",
    location: "Bangalore, Karnataka",
    rating: 4.4,
    originalPrice: 15000,
    salePrice: 6000,
    discount: 60,
    hoursLeft: 15,
    available: 4,
  },
]

export function LastMinuteDeals() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="h-8 w-8 text-red-500 mr-2" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Last Minute Deals - Indian Hotels
            </h2>
            <Flame className="h-8 w-8 text-red-500 ml-2" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book now and save big on these expiring deals - limited availability across India!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lastMinuteDeals.map((deal) => (
            <Card
              key={deal.id}
              className="hover:shadow-xl transition-all duration-300 border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold">
                    -{deal.discount}%
                  </Badge>
                  <div className="flex items-center space-x-1 text-red-600 font-medium text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{deal.hoursLeft}h left</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{deal.name}</h3>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{deal.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{deal.rating}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">₹{deal.salePrice.toLocaleString("en-IN")}</span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{deal.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">per night</span>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Only {deal.available} rooms left!</span>
                    <span className="text-red-600 font-medium">Hurry!</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${100 - deal.available * 20}%` }}
                    ></div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
          >
            View All Last Minute Deals
          </Button>
        </div>
      </div>
    </section>
  )
}
