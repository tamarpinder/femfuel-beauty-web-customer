"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MobileNavigation } from "@/components/mobile-navigation"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

interface Booking {
  id: string
  service: {
    name: string
    vendor: string
    price: string
    image?: string
    duration: number
  }
  date: Date
  time: string
  status: "upcoming" | "completed" | "cancelled"
  paymentMethod: string
  notes?: string
}

export default function BookingsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    // Mock bookings data
    const mockBookings: Booking[] = [
      {
        id: "1",
        service: {
          name: "Manicure Gel Premium",
          vendor: "Beauty Studio RD",
          price: "RD$1,200",
          image: "/premium-gel-manicure.png",
          duration: 60,
        },
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        time: "14:30",
        status: "upcoming",
        paymentMethod: "card",
        notes: "Prefiero colores neutros",
      },
      {
        id: "2",
        service: {
          name: "Tratamiento Facial",
          vendor: "Spa Paradise",
          price: "RD$3,500",
          image: "/facial-treatment-spa.png",
          duration: 75,
        },
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        time: "11:00",
        status: "completed",
        paymentMethod: "cash",
      },
      {
        id: "3",
        service: {
          name: "Maquillaje Profesional",
          vendor: "Glamour House",
          price: "RD$2,500",
          duration: 90,
        },
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        time: "16:00",
        status: "upcoming",
        paymentMethod: "card",
      },
    ]

    setBookings(mockBookings)
  }, [isAuthenticated, router])

  const upcomingBookings = bookings.filter((booking) => booking.status === "upcoming")
  const completedBookings = bookings.filter((booking) => booking.status === "completed")

  const handleBack = () => {
    router.back()
  }

  const handleReschedule = (bookingId: string) => {
    console.log("Reschedule booking:", bookingId)
    // TODO: Implement reschedule functionality
  }

  const handleCancel = (bookingId: string) => {
    console.log("Cancel booking:", bookingId)
    // TODO: Implement cancel functionality
  }

  const handleWhatsApp = (booking: Booking) => {
    const message = `Hola! Tengo una cita reservada para "${booking.service.name}" en ${booking.service.vendor} el ${booking.date.toLocaleDateString("es-DO")} a las ${booking.time}. ¿Podrían confirmarme los detalles?`
    const whatsappUrl = `https://wa.me/18095550123?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleReview = (bookingId: string) => {
    console.log("Leave review for booking:", bookingId)
    // TODO: Implement review functionality
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Próxima"
      case "completed":
        return "Completada"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-femfuel-dark">Mis Reservas</h1>
          </div>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Próximas ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="completed">Completadas ({completedBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={booking.service.image || "/placeholder.svg?height=64&width=64&query=beauty service"}
                        alt={booking.service.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-femfuel-dark">{booking.service.name}</h3>
                            <p className="text-sm text-femfuel-medium">{booking.service.vendor}</p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>{getStatusText(booking.status)}</Badge>
                        </div>

                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {booking.date.toLocaleDateString("es-DO", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Clock className="h-4 w-4" />
                            <span>
                              {booking.time} ({booking.service.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.service.vendor}</span>
                          </div>
                        </div>

                        {booking.notes && (
                          <p className="text-sm text-femfuel-medium mb-3 italic">Nota: {booking.notes}</p>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="font-bold text-femfuel-rose">{booking.service.price}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleWhatsApp(booking)}>
                              <Phone className="h-4 w-4 mr-1" />
                              WhatsApp
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleReschedule(booking.id)}>
                              Reprogramar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-femfuel-medium mb-4" />
                <h3 className="text-lg font-medium text-femfuel-dark mb-2">No tienes reservas próximas</h3>
                <p className="text-femfuel-medium mb-4">
                  Explora nuestros servicios y reserva tu próxima cita de belleza
                </p>
                <Button className="bg-femfuel-rose hover:bg-[#9f1853]" onClick={() => router.push("/")}>
                  Explorar Servicios
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedBookings.length > 0 ? (
              completedBookings.map((booking) => (
                <Card key={booking.id} className="shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={booking.service.image || "/placeholder.svg?height=64&width=64&query=beauty service"}
                        alt={booking.service.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-femfuel-dark">{booking.service.name}</h3>
                            <p className="text-sm text-femfuel-medium">{booking.service.vendor}</p>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>{getStatusText(booking.status)}</Badge>
                        </div>

                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Calendar className="h-4 w-4" />
                            <span>{booking.date.toLocaleDateString("es-DO")}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Clock className="h-4 w-4" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-bold text-femfuel-rose">{booking.service.price}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleReview(booking.id)}>
                              <Star className="h-4 w-4 mr-1" />
                              Reseñar
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => router.push("/")}>
                              Reservar de nuevo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Star className="h-12 w-12 mx-auto text-femfuel-medium mb-4" />
                <h3 className="text-lg font-medium text-femfuel-dark mb-2">No tienes reservas completadas</h3>
                <p className="text-femfuel-medium">Tus servicios completados aparecerán aquí</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="bookings" />
    </div>
  )
}
