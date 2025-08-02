import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    comment:
      "StayEase made our honeymoon planning so easy! We found the perfect beachfront resort in Maldives at an amazing price. The booking process was smooth and customer service was exceptional.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    comment:
      "I travel frequently for business and StayEase has become my go-to platform. The variety of hotels and the ability to filter by business amenities saves me so much time.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emma Rodriguez",
    location: "Madrid, Spain",
    rating: 5,
    comment:
      "The family vacation we booked through StayEase exceeded all expectations. The hotel recommendations were spot-on and the kids loved the resort facilities. Will definitely use again!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "David Thompson",
    location: "London, UK",
    rating: 5,
    comment:
      "Outstanding service! When our original hotel had issues, StayEase's support team found us an even better alternative within hours. They really go above and beyond.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Lisa Park",
    location: "Seoul, South Korea",
    rating: 5,
    comment:
      "The best price guarantee is real! I found a lower price elsewhere and they not only matched it but gave me the extra discount as promised. Incredible value!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "James Wilson",
    location: "Sydney, Australia",
    rating: 5,
    comment:
      "Been using StayEase for 3 years now. The loyalty program benefits and exclusive deals make every trip more affordable. Highly recommend to all travelers!",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from thousands of satisfied travelers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-blue-600 mr-2" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.comment}"</p>

                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
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
