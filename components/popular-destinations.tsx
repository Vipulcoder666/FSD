import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Plane } from "lucide-react"
import Image from "next/image"

const destinations = [
  {
    id: 1,
    name: "Rajasthan",
    description: "Land of Kings with magnificent palaces, forts and desert landscapes",
    image: "/images/destination-rajasthan.png",
    hotels: 847,
    rating: 4.8,
    startingPrice: 8000,
    badge: "Heritage State",
    highlights: ["Udaipur Palaces", "Jaisalmer Fort", "Jodhpur Blue City"],
  },
  {
    id: 2,
    name: "Kerala",
    description: "God's Own Country with backwaters, hill stations and spice plantations",
    image: "/images/destination-kerala.png",
    hotels: 692,
    rating: 4.9,
    startingPrice: 6000,
    badge: "Backwaters",
    highlights: ["Alleppey Houseboats", "Munnar Hills", "Kochi Heritage"],
  },
  {
    id: 3,
    name: "Goa",
    description: "Beach paradise with Portuguese heritage and vibrant nightlife",
    image: "/images/destination-goa.png",
    hotels: 534,
    rating: 4.7,
    startingPrice: 5000,
    badge: "Beach Destination",
    highlights: ["Pristine Beaches", "Portuguese Churches", "Beach Shacks"],
  },
  {
    id: 4,
    name: "Himachal Pradesh",
    description: "Mountain state with hill stations, adventure sports and scenic beauty",
    image: "/images/destination-himachal.png",
    hotels: 456,
    rating: 4.8,
    startingPrice: 7000,
    badge: "Hill Stations",
    highlights: ["Shimla Mall Road", "Manali Adventures", "Dharamshala Monasteries"],
  },
]

export function PopularDestinations() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Popular Indian Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore India's most sought-after travel destinations and cultural heritage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 bg-white/80 backdrop-blur-sm"
            >
              <div className="relative h-64">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
                  {destination.badge}
                </Badge>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{destination.hotels} hotels available</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">{destination.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Hotels from</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{destination.startingPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm text-gray-600">/ night</span>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Plane className="mr-2 h-4 w-4" />
                    Explore
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
