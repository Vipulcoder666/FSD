import { Mail, Phone, MessageCircle } from "lucide-react"

export function ContactHero() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="container px-4 mx-auto text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-blue-100">
          We're here to help you plan your perfect getaway. Contact our travel experts today!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
              <Phone className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-blue-100">24/7 Support Available</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-blue-100">Quick Response Guaranteed</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mb-4">
              <MessageCircle className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-blue-100">Instant Help Available</p>
          </div>
        </div>
      </div>
    </section>
  )
}
