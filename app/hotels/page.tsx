import { HotelListings } from "@/components/hotel-listings"
import { HotelFilters } from "@/components/hotel-filters"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HotelsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Indian Hotel</h1>
            <p className="text-xl text-gray-600">Discover amazing accommodations across India</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <HotelFilters />
            </div>
            <div className="lg:col-span-3">
              <HotelListings />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
