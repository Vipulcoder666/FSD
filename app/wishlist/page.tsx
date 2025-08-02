import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WishlistContent } from "@/components/wishlist-content"

export default function WishlistPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <WishlistContent />
      </main>
      <Footer />
    </div>
  )
}
