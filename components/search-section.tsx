"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, MapPin, Users, Search } from "lucide-react"
import { format } from "date-fns"

export function SearchSection() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [destination, setDestination] = useState("")
  const [guests, setGuests] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (!destination) {
      alert("Please enter a destination!")
      return
    }
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates!")
      return
    }

    // Simulate search and redirect to hotels page
    alert(
      `🔍 Searching for hotels in ${destination} from ${format(checkIn, "MMM dd")} to ${format(checkOut, "MMM dd")} for ${guests || "2"} guests!`,
    )
    router.push("/hotels")
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Search & Book Your Perfect Stay</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the best deals on hotels, resorts, and vacation rentals worldwide
          </p>
        </div>

        <Card className="max-w-6xl mx-auto shadow-xl">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Destination */}
              <div className="lg:col-span-2">
                <Label htmlFor="destination" className="text-sm font-medium text-gray-700 mb-2 block">
                  Where are you going?
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="destination"
                    placeholder="City, hotel, or landmark"
                    className="pl-10 h-12"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              {/* Check-in */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Check-in</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkIn ? format(checkIn, "MMM dd") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Check-out</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-12 justify-start text-left font-normal bg-transparent"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOut ? format(checkOut, "MMM dd") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Guests</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="h-12">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="2 guests" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4 Guests</SelectItem>
                    <SelectItem value="5">5+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button size="lg" className="px-12 py-6 text-lg bg-blue-600 hover:bg-blue-700" onClick={handleSearch}>
                <Search className="mr-2 h-5 w-5" />
                Search Hotels
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
