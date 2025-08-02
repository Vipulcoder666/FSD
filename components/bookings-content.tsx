"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Phone, Mail, Star, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { useState } from "react"
import Image from "next/image"

export function BookingsContent() {
  const { bookings, removeBooking } = useStore()
  const router = useRouter()
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleViewDetails = (bookingId: string) => {
    setSelectedBooking(selectedBooking === bookingId ? null : bookingId)
  }

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      removeBooking(bookingId)
      alert(`Booking ${bookingId} has been cancelled. You will receive a confirmation email shortly.`)
    }
  }

  const handleModifyBooking = (bookingId: string) => {
    alert(`Redirecting to modify booking ${bookingId}...`)
  }

  const handleBrowseHotels = () => {
    router.push("/")
  }

  if (bookings.length === 0) {
    return (
      <section className="py-16 bg-gray-50 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Calendar className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Bookings Yet</h2>
          <p className="text-xl text-gray-600 mb-8">Start planning your next adventure!</p>
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            My Bookings
          </h1>
          <p className="text-xl text-gray-600">Manage your hotel reservations and travel plans</p>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-80 h-48 lg:h-auto relative">
                    <Image
                      src={booking.hotel.image || "/placeholder.svg"}
                      alt={booking.hotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{booking.hotel.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{booking.hotel.location}</span>
                          <div className="flex items-center ml-4">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span>{booking.hotel.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Check-in</p>
                          <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-red-600" />
                        <div>
                          <p className="text-xs text-gray-500">Check-out</p>
                          <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">Guests</p>
                          <p className="font-medium">
                            {booking.guests} guests, {booking.rooms} room{booking.rooms > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="font-bold text-lg">₹{booking.totalPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" onClick={() => handleViewDetails(booking.id)}>
                        {selectedBooking === booking.id ? "Hide Details" : "View Details"}
                      </Button>
                      {booking.status !== "completed" && (
                        <>
                          <Button variant="outline" onClick={() => handleModifyBooking(booking.id)}>
                            Modify Booking
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                        </>
                      )}
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Contact Hotel
                      </Button>
                    </div>

                    {selectedBooking === booking.id && (
                      <Card className="mt-6 bg-blue-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-lg">Booking Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Booking Information</h4>
                              <p className="text-sm text-gray-600 mb-1">
                                Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600 mb-1">Confirmation: {booking.id}</p>
                              <p className="text-sm text-gray-600">Status: {booking.status}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Contact Information</h4>
                              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                                <Phone className="h-4 w-4" />
                                <span>+91 98765 43210</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Mail className="h-4 w-4" />
                                <span>support@stayease.com</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
