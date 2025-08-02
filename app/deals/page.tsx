import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DealsHero } from "@/components/deals-hero"
import { FeaturedDeals } from "@/components/featured-deals"
import { LastMinuteDeals } from "@/components/last-minute-deals"

export default function DealsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <DealsHero />
        <FeaturedDeals />
        <LastMinuteDeals />
      </main>
      <Footer />
    </div>
  )
}
