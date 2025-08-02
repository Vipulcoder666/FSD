import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DestinationsHero } from "@/components/destinations-hero"
import { PopularDestinations } from "@/components/popular-destinations"
import { DestinationCategories } from "@/components/destination-categories"

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <DestinationsHero />
        <PopularDestinations />
        <DestinationCategories />
      </main>
      <Footer />
    </div>
  )
}
