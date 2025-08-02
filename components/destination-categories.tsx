import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mountain, Waves, Building, TreePine, Palmtree, Castle } from "lucide-react"

const categories = [
  {
    icon: Waves,
    title: "Beach Destinations",
    description: "Relax on pristine beaches with crystal clear waters",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    count: "150+ destinations",
  },
  {
    icon: Mountain,
    title: "Mountain Retreats",
    description: "Escape to scenic mountain ranges and fresh air",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    count: "120+ destinations",
  },
  {
    icon: Building,
    title: "City Breaks",
    description: "Explore vibrant cities and urban attractions",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    count: "200+ destinations",
  },
  {
    icon: TreePine,
    title: "Nature & Wildlife",
    description: "Discover amazing wildlife and natural wonders",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
    count: "80+ destinations",
  },
  {
    icon: Palmtree,
    title: "Tropical Islands",
    description: "Paradise islands with exotic beaches and culture",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    count: "90+ destinations",
  },
  {
    icon: Castle,
    title: "Historic Sites",
    description: "Step back in time at historic landmarks",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50",
    count: "110+ destinations",
  },
]

export function DestinationCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your perfect destination based on your travel style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className={`hover:shadow-xl transition-all duration-300 group border-0 ${category.bgColor}`}
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{category.description}</p>
                <p className="text-sm font-medium text-gray-500 mb-6">{category.count}</p>
                <Button
                  variant="outline"
                  className={`bg-gradient-to-r ${category.color} text-white border-0 hover:opacity-90`}
                >
                  Explore Category
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
