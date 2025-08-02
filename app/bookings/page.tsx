import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingsContent } from "@/components/bookings-content"

export default function BookingsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <BookingsContent />
      </main>
      <Footer />
    </div>
  )
}
