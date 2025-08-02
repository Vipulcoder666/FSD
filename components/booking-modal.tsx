"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, CreditCard, User, Mail, Phone, X } from "lucide-react"
import { format } from "date-fns"
import { useStore } from "@/lib/store"
import Image from "next/image"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  hotel: {
    id: number
    name: string
    location: string
    price: number
    image: string
    rating: number
  }
}

export function BookingModal({ isOpen, onClose, hotel }: BookingModalProps) {
  const { addBooking } = useStore()
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState("2")
  const [rooms, setRooms] = useState("1")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isBooking, setIsBooking] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showEmailPreview, setShowEmailPreview] = useState(false)
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [smsSent, setSmsSent] = useState(false)

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    return 0
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    const roomCount = Number.parseInt(rooms)
    return nights * hotel.price * roomCount
  }

  const sendAdminNotification = async (bookingDetails: any) => {
    try {
      const response = await fetch("/api/send-booking-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingDetails.bookingId,
          bookingDate: bookingDetails.bookingDate,
          status: bookingDetails.status,
          guestName: `${firstName} ${lastName}`,
          guestEmail: email,
          guestPhone: phone,
          hotel: {
            name: hotel.name,
            location: hotel.location,
            rating: hotel.rating,
          },
          checkIn: checkIn?.toISOString(),
          checkOut: checkOut?.toISOString(),
          guests: Number.parseInt(guests),
          rooms: Number.parseInt(rooms),
          totalPrice: bookingDetails.totalPrice,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send admin notification")
      }

      console.log("✅ Admin notification sent successfully")
    } catch (error) {
      console.error("❌ Failed to send admin notification:", error)
    }
  }

  const sendEmailConfirmation = async (bookingDetails: any) => {
    // Simulate email sending
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setEmailSent(true)
    return true
  }

  const sendSMSConfirmation = async (bookingDetails: any) => {
    // Simulate SMS sending
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSmsSent(true)
    return true
  }

  const handleBooking = async () => {
    if (!checkIn || !checkOut || !firstName || !lastName || !email) {
      alert("Please fill in all required fields!")
      return
    }

    if (checkIn >= checkOut) {
      alert("Check-out date must be after check-in date!")
      return
    }

    setIsBooking(true)

    // Simulate booking process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const bookingId = `BK${Math.random().toString(36).substr(2, 6).toUpperCase()}`

    const newBooking = {
      id: bookingId,
      hotel: {
        name: hotel.name,
        location: hotel.location,
        image: hotel.image,
        rating: hotel.rating,
      },
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      guests: Number.parseInt(guests),
      rooms: Number.parseInt(rooms),
      totalPrice: calculateTotal(),
      status: "confirmed",
      bookingDate: new Date().toISOString(),
    }

    const bookingDetails = { ...newBooking, bookingId }

    // Send notifications
    try {
      await Promise.all([
        sendEmailConfirmation(bookingDetails),
        phone ? sendSMSConfirmation(bookingDetails) : Promise.resolve(true),
        sendAdminNotification(bookingDetails), // Send notification to admin email
      ])
    } catch (error) {
      console.error("Error sending confirmations:", error)
    }

    addBooking(newBooking)
    setConfirmedBooking(bookingDetails)
    setIsBooking(false)
    onClose()
    setShowConfirmation(true)

    // Reset form
    setCheckIn(undefined)
    setCheckOut(undefined)
    setGuests("2")
    setRooms("1")
    setFirstName("")
    setLastName("")
    setEmail("")
    setPhone("")
  }

  const EmailPreview = () => (
    <Dialog open={showEmailPreview} onOpenChange={setShowEmailPreview}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">📧 Email Confirmation Preview</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowEmailPreview(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="bg-white border rounded-lg p-6">
          {/* Email Header */}
          <div className="border-b pb-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <p className="font-semibold">StayEase Hotels</p>
                <p className="text-sm text-gray-600">bookings@stayease.com</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>To:</strong> {email}
              </p>
              <p>
                <strong>Subject:</strong> Booking Confirmation - {hotel.name}
              </p>
              <p>
                <strong>Date:</strong> {new Date().toLocaleString()}
              </p>
            </div>
          </div>

          {/* Email Body */}
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-green-600 mb-2">🎉 Booking Confirmed!</h1>
              <p className="text-gray-600">Thank you for choosing StayEase. Your reservation is confirmed.</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Booking Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Booking ID</p>
                  <p className="font-semibold">{confirmedBooking?.bookingId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Guest Name</p>
                  <p className="font-semibold">
                    {firstName} {lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hotel</p>
                  <p className="font-semibold">{hotel.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold">{hotel.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-semibold">{checkIn ? format(checkIn, "EEEE, MMMM dd, yyyy") : ""}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-semibold">{checkOut ? format(checkOut, "EEEE, MMMM dd, yyyy") : ""}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Guests</p>
                  <p className="font-semibold">{guests} guests</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rooms</p>
                  <p className="font-semibold">{rooms} room(s)</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Room rate (per night)</span>
                  <span>₹{hotel.price.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of nights</span>
                  <span>{calculateNights()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Number of rooms</span>
                  <span>{rooms}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{confirmedBooking?.totalPrice?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">🏨 Check-in Information</h3>
              <ul className="space-y-2 text-sm">
                <li>• Check-in time: 3:00 PM onwards</li>
                <li>• Check-out time: 12:00 PM</li>
                <li>• Please carry a valid photo ID for check-in</li>
                <li>• Early check-in subject to availability</li>
                <li>• Hotel contact: +91 98765 43210</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">📞 Need Help?</h3>
              <p className="text-sm mb-2">Our customer support team is available 24/7 to assist you:</p>
              <ul className="space-y-1 text-sm">
                <li>📧 Email: support@stayease.com</li>
                <li>📱 Phone: +91 1800-123-4567</li>
                <li>💬 Live Chat: Available on our website</li>
              </ul>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>Thank you for choosing StayEase!</p>
              <p>We look forward to hosting you at {hotel.name}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button onClick={() => setShowEmailPreview(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
            Close Email Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Book Your Stay
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hotel Info */}
            <div>
              <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
              <p className="text-gray-600 mb-4">{hotel.location}</p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nights:</span>
                    <span>{calculateNights()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rooms:</span>
                    <span>{rooms}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              {/* Dates and Guests */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Check-in Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkIn ? format(checkIn, "MMM dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Check-out Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkOut ? format(checkOut, "MMM dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue />
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

                <div>
                  <Label>Rooms</Label>
                  <Select value={rooms} onValueChange={setRooms}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Room</SelectItem>
                      <SelectItem value="2">2 Rooms</SelectItem>
                      <SelectItem value="3">3 Rooms</SelectItem>
                      <SelectItem value="4">4 Rooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Guest Information */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Guest Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name *</Label>
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Last Name *</Label>
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div>
                    <Label>Email Address * (for confirmation)</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label>Phone Number (for SMS updates)</Label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Communication Preferences */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-blue-600" />
                  Confirmation Details
                </h4>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>✅ Email confirmation will be sent to your email address</p>
                  <p>✅ SMS updates will be sent to your phone (if provided)</p>
                  <p>✅ Booking voucher and check-in details included</p>
                </div>
              </div>

              {/* Payment Info */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Information
                </h4>
                <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                  💳 Secure payment processing will be handled on the next step. Your booking will be confirmed
                  instantly and notifications sent immediately.
                </p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={handleBooking}
                  disabled={isBooking}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {isBooking ? "Processing & Sending..." : `Book Now - ₹${calculateTotal().toLocaleString()}`}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl">
          <div className="text-center space-y-6 p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600">Your reservation has been successfully confirmed</p>
            </div>

            {confirmedBooking && (
              <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-bold text-lg">{hotel.name}</h3>
                  <p className="text-gray-600">{hotel.location}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Booking ID:</span>
                    <p className="font-semibold">{confirmedBooking.bookingId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Guest Name:</span>
                    <p className="font-semibold">
                      {firstName} {lastName}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-semibold">{email}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-semibold">{phone || "Not provided"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-in:</span>
                    <p className="font-semibold">{checkIn ? format(checkIn, "MMM dd, yyyy") : ""}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-out:</span>
                    <p className="font-semibold">{checkOut ? format(checkOut, "MMM dd, yyyy") : ""}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Guests:</span>
                    <p className="font-semibold">{guests} guests</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Rooms:</span>
                    <p className="font-semibold">{rooms} room(s)</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ₹{confirmedBooking.totalPrice?.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-blue-800">
                        {emailSent ? "✅ Email confirmation sent to:" : "📧 Sending email to:"} <strong>{email}</strong>
                      </span>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setShowEmailPreview(true)} className="text-xs">
                      View Email
                    </Button>
                  </div>
                  {phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">
                        {smsSent ? "✅ SMS confirmation sent to:" : "📱 Sending SMS to:"} <strong>{phone}</strong>
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-gray-600 mt-2 pt-2 border-t border-blue-200">
                    <p>📄 Booking voucher and check-in instructions included in email</p>
                    <p>🏨 Hotel contact: +91 98765 43210 | support@stayease.com</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={() => {
                setShowConfirmation(false)
                setEmailSent(false)
                setSmsSent(false)
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <EmailPreview />
    </div>
  )
}
