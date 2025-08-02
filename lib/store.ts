"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Hotel {
  id: number
  name: string
  location: string
  rating: number
  reviews: number
  price: number
  originalPrice: number
  image: string
  amenities: string[]
  badge: string
}

interface Booking {
  id: string
  hotel: {
    name: string
    location: string
    image: string
    rating: number
  }
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  totalPrice: number
  status: string
  bookingDate: string
}

interface Store {
  wishlist: Hotel[]
  bookings: Booking[]
  addToWishlist: (hotel: Hotel) => void
  removeFromWishlist: (hotelId: number) => void
  isInWishlist: (hotelId: number) => boolean
  addBooking: (booking: Booking) => void
  removeBooking: (bookingId: string) => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      wishlist: [],
      bookings: [],

      addToWishlist: (hotel) => {
        const { wishlist } = get()
        if (!wishlist.find((item) => item.id === hotel.id)) {
          set({ wishlist: [...wishlist, hotel] })
        }
      },

      removeFromWishlist: (hotelId) => {
        const { wishlist } = get()
        set({ wishlist: wishlist.filter((item) => item.id !== hotelId) })
      },

      isInWishlist: (hotelId) => {
        const { wishlist } = get()
        return wishlist.some((item) => item.id === hotelId)
      },

      addBooking: (booking) => {
        const { bookings } = get()
        set({ bookings: [...bookings, booking] })
      },

      removeBooking: (bookingId) => {
        const { bookings } = get()
        set({ bookings: bookings.filter((booking) => booking.id !== bookingId) })
      },
    }),
    {
      name: "hotel-booking-storage",
    },
  ),
)
