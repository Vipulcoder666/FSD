import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Contact Information
          </h3>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">24/7 Customer Support</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-gray-600">support@stayease.com</p>
                <p className="text-sm text-gray-500">We'll respond within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Address</h4>
                <p className="text-gray-600">
                  123 Travel Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Business Hours</h4>
                <p className="text-gray-600">Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p className="text-gray-600">Weekend: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-red-50">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
            Follow Us
          </h3>
          <p className="text-gray-600 mb-6">
            Stay connected for the latest deals, travel tips, and destination inspiration!
          </p>
          <div className="flex space-x-4">
            <Button
              size="icon"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Facebook className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600"
            >
              <Twitter className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
            >
              <Instagram className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Need Immediate Help?</h3>
          <p className="text-gray-600 mb-6">
            Our travel experts are standing by to assist you with any urgent booking needs.
          </p>
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
            Start Live Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
