"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Star, Wifi, Car, Coffee, Waves, Dumbbell, Utensils, Mountain, Building, Palmtree } from "lucide-react"

export function HotelFilters() {
  const [priceRange, setPriceRange] = useState([5000, 50000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<number[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const amenities = [
    { id: "wifi", label: "Free WiFi", icon: Wifi },
    { id: "parking", label: "Free Parking", icon: Car },
    { id: "breakfast", label: "Breakfast", icon: Coffee },
    { id: "pool", label: "Swimming Pool", icon: Waves },
    { id: "gym", label: "Fitness Center", icon: Dumbbell },
    { id: "restaurant", label: "Restaurant", icon: Utensils },
  ]

  const hotelTypes = [
    { id: "heritage", label: "Heritage Hotels", icon: Building },
    { id: "beach", label: "Beach Resorts", icon: Palmtree },
    { id: "mountain", label: "Hill Stations", icon: Mountain },
    { id: "business", label: "Business Hotels", icon: Building },
  ]

  const ratings = [5, 4, 3, 2, 1]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filters for Indian Hotels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold mb-3">Price per night (₹)</h3>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100000}
              min={1000}
              step={1000}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
              <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <h3 className="font-semibold mb-3">Star Rating</h3>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRating.includes(rating)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRating([...selectedRating, rating])
                      } else {
                        setSelectedRating(selectedRating.filter((r) => r !== rating))
                      }
                    }}
                  />
                  <label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 cursor-pointer">
                    <div className="flex">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm">& up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Hotel Types */}
          <div>
            <h3 className="font-semibold mb-3">Hotel Types</h3>
            <div className="space-y-2">
              {hotelTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedTypes([...selectedTypes, type.id])
                      } else {
                        setSelectedTypes(selectedTypes.filter((t) => t !== type.id))
                      }
                    }}
                  />
                  <label htmlFor={type.id} className="flex items-center space-x-2 cursor-pointer">
                    <type.icon className="h-4 w-4" />
                    <span className="text-sm">{type.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-semibold mb-3">Amenities</h3>
            <div className="space-y-2">
              {amenities.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={selectedAmenities.includes(amenity.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedAmenities([...selectedAmenities, amenity.id])
                      } else {
                        setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity.id))
                      }
                    }}
                  />
                  <label htmlFor={amenity.id} className="flex items-center space-x-2 cursor-pointer">
                    <amenity.icon className="h-4 w-4" />
                    <span className="text-sm">{amenity.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Clear All
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
