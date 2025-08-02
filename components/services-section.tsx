import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, Headphones, CreditCard, MapPin, Star } from "lucide-react"

const services = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "Your personal and payment information is always protected with bank-level security.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get help anytime, anywhere. Our customer support team is available round the clock.",
  },
  {
    icon: CreditCard,
    title: "Best Price Guarantee",
    description: "Find a lower price elsewhere? We'll match it and give you an additional 10% off.",
  },
  {
    icon: MapPin,
    title: "Global Coverage",
    description: "Access to over 50,000 hotels and accommodations in 200+ countries worldwide.",
  },
  {
    icon: Star,
    title: "Quality Assured",
    description: "All our partner hotels are verified and rated by real guests for your peace of mind.",
  },
  {
    icon: Headphones,
    title: "Expert Assistance",
    description: "Our travel experts are here to help you plan the perfect trip and find the best deals.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose StayEase?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to making your hotel booking experience seamless and enjoyable
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
