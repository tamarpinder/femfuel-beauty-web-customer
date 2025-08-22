"use client"

import { useState } from "react"
import { Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AuthGuard } from "@/components/auth-guard"
import { BookingModal } from "@/components/booking-modal"

export interface Service {
  id: number
  name: string
  vendor: string
  price: string
  rating: number
  reviews: number
  duration: number
  image?: string
  category?: string
}

interface ServiceCardProps {
  service: Service
  layout?: "horizontal" | "vertical"
  onBook?: (serviceId: number) => void
}

export function ServiceCard({ service, layout = "vertical", onBook }: ServiceCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false)

  const handleBook = () => {
    setShowBookingModal(true)
    onBook?.(service.id)
  }

  const handleBookingComplete = (booking: any) => {
    console.log("Booking completed:", booking)
    // TODO: Handle booking completion (update state, show success message, etc.)
  }

  if (layout === "horizontal") {
    return (
      <>
        <Card className="p-4 shadow-sm border-0 hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="flex items-center gap-4">
              <img
                src={service.image || "/placeholder.svg?height=64&width=64&query=beauty service"}
                alt={service.name}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-femfuel-dark text-sm">{service.name}</h3>
                    <p className="text-xs text-femfuel-medium">{service.vendor}</p>
                  </div>
                  <span className="font-bold text-femfuel-rose text-sm">{service.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-femfuel-medium">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.duration}min</span>
                    </div>
                  </div>
                  <AuthGuard requireAuth={true}>
                    <Button
                      size="sm"
                      className="bg-femfuel-rose hover:bg-[#9f1853] text-white h-8 px-4 text-xs"
                      onClick={handleBook}
                    >
                      Reservar
                    </Button>
                  </AuthGuard>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          service={service}
          onBookingComplete={handleBookingComplete}
        />
      </>
    )
  }

  return (
    <>
      <Card className="overflow-hidden shadow-sm border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer">
        <CardContent className="p-0">
          <img
            src={service.image || "/placeholder.svg?height=192&width=320&query=beauty service"}
            alt={service.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="font-semibold text-femfuel-dark mb-1">{service.name}</h3>
            <p className="text-femfuel-medium text-sm mb-3">{service.vendor}</p>
            <div className="flex items-center gap-4 text-sm text-femfuel-medium mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{service.rating}</span>
                <span>({service.reviews})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{service.duration} min</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-femfuel-rose">{service.price}</span>
              <AuthGuard requireAuth={true}>
                <Button className="bg-femfuel-rose hover:bg-[#9f1853] text-white h-12 px-6" onClick={handleBook}>
                  Reservar
                </Button>
              </AuthGuard>
            </div>
          </div>
        </CardContent>
      </Card>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        service={service}
        onBookingComplete={handleBookingComplete}
      />
    </>
  )
}
