"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, MessageCircle, Star, User, Filter, SlidersHorizontal, Hand, Flower2, Palette, Scissors, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MobileNavigation } from "@/components/mobile-navigation"
import { BookingSkeletonList } from "@/components/booking-skeleton"
import { ChatButton } from "@/components/ui/chat-button"
import { useAuth } from "@/contexts/auth-context"
import { useBooking } from "@/contexts/booking-context"
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
  vendor: {
    id: string
    name: string
    rating: number
    reviewCount: number
    address: string
    phone: string
    professionalName: string
    professionalImage?: string
    isOnline?: boolean
    responseTime?: string
  }
  date: Date
  time: string
  status: "upcoming" | "completed" | "cancelled"
  paymentMethod: string
  notes?: string
}

export default function BookingsPage() {
  const { user, isAuthenticated } = useAuth()
  const { bookings: contextBookings, getUpcomingBookings, updateBooking, cancelBooking } = useBooking()
  const router = useRouter()
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  // Transform BookingContext bookings to the page format
  const transformBookings = (contextBookings: any[]): Booking[] => {
    return contextBookings.map(booking => ({
      id: booking.id,
      service: {
        name: booking.serviceName,
        vendor: booking.vendorName,
        price: `RD$${(booking.price + booking.addons.reduce((sum: number, addon: any) => sum + addon.price, 0)).toLocaleString()}`,
        image: booking.vendorLogo || "/vendors/logos/default-vendor-logo.png",
        duration: booking.duration,
      },
      vendor: {
        id: booking.vendorId,
        name: booking.vendorName,
        rating: booking.vendorRating || 4.5,
        reviewCount: 150,
        address: booking.vendorLocation || "Santo Domingo, RD",
        phone: "+1 809-555-0100",
        professionalName: booking.professionalName || "Profesional",
        professionalImage: "/professionals/portraits/aesthetician-ana.png",
        isOnline: true,
        responseTime: "Responde rápido"
      },
      date: booking.date,
      time: booking.time,
      status: booking.status === "confirmed" ? "upcoming" : booking.status,
      paymentMethod: booking.paymentMethod?.type || "card",
      notes: booking.notes
    }))
  }

  useEffect(() => {
    // Transform context bookings to page format
    const transformedBookings = transformBookings(contextBookings)
    setFilteredBookings(transformedBookings)
    setIsLoading(false)
  }, [contextBookings])

  // Filter and sort bookings
  useEffect(() => {
    const transformedBookings = transformBookings(contextBookings)
    let filtered = transformedBookings

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(booking => 
        booking.service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.vendor.professionalName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(booking => booking.status === filterStatus)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return filterStatus === "completed" ? 
            b.date.getTime() - a.date.getTime() : // Completed: newest first
            a.date.getTime() - b.date.getTime()   // Upcoming: soonest first
        case "service":
          return a.service.name.localeCompare(b.service.name)
        case "vendor":
          return a.vendor.name.localeCompare(b.vendor.name)
        case "price":
          const priceA = Number.parseInt(a.service.price.replace(/[^\d]/g, ""))
          const priceB = Number.parseInt(b.service.price.replace(/[^\d]/g, ""))
          return priceB - priceA
        default:
          return 0
      }
    })

    setFilteredBookings(filtered)
  }, [contextBookings, searchQuery, sortBy, filterStatus])

  const upcomingBookings = filteredBookings.filter((booking) => booking.status === "upcoming")
  const completedBookings = filteredBookings.filter((booking) => booking.status === "completed")
  const cancelledBookings = filteredBookings.filter((booking) => booking.status === "cancelled")

  const handleBack = () => {
    router.back()
  }

  const handleReschedule = (bookingId: string) => {
    const booking = filteredBookings.find(b => b.id === bookingId)
    if (booking) {
      setSelectedBooking(booking)
      setShowRescheduleModal(true)
    }
  }

  const handleCancel = (bookingId: string) => {
    if (cancelBooking) {
      cancelBooking(bookingId)
    }
  }

  const handleRescheduleSubmit = (newDate: Date, newTime: string) => {
    if (selectedBooking && updateBooking) {
      updateBooking(selectedBooking.id, {
        date: newDate,
        time: newTime
      })
      setShowRescheduleModal(false)
      setSelectedBooking(null)
    }
  }

  const handleChat = (booking: Booking) => {
    router.push(`/chat/${booking.vendor.id}?booking=${booking.id}`)
  }

  const handleReview = (bookingId: string) => {
    // TODO: Implement review functionality
  }

  // Helper function for responsive date formatting
  const formatDateResponsive = (date: Date, isUpcoming: boolean = false) => {
    if (isUpcoming) {
      // For upcoming bookings, show full format on all devices
      return date.toLocaleDateString("es-DO", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } else {
      // For completed bookings, show shorter format
      return date.toLocaleDateString("es-DO", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow-sm"
      case "completed":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-sm"
      case "cancelled":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 shadow-sm"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 shadow-sm"
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

  // TODO: Re-enable this check once auth is fully implemented
  // if (!isAuthenticated) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 lg:pt-24">

      <div className="px-2 sm:px-4 py-6 max-w-4xl mx-auto overflow-hidden">
        {/* Search and Filters - Enhanced */}
        <div className="mb-6 space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Buscar servicios o salones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-h-[44px] border-2 border-femfuel-rose/20 focus:border-femfuel-rose rounded-xl shadow-md bg-white/90 backdrop-blur-md transition-all duration-300 hover:shadow-lg"
            />
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="min-h-[44px] min-w-[44px] sm:min-w-[100px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose rounded-xl font-semibold transition-all duration-300 bg-white/90 backdrop-blur-md shadow-md hover:shadow-lg active:shadow-lg active:scale-95 text-sm px-3"
              aria-label="Filtros de búsqueda"
            >
              <SlidersHorizontal className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Filtros</span>
            </Button>
          </div>

          {showFilters && (
            <div className="p-3 bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-femfuel-dark whitespace-nowrap">Ordenar por:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="flex-1 min-h-[44px]">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date" className="min-h-[44px]">Fecha</SelectItem>
                    <SelectItem value="service" className="min-h-[44px]">Servicio</SelectItem>
                    <SelectItem value="vendor" className="min-h-[44px]">Salón</SelectItem>
                    <SelectItem value="price" className="min-h-[44px]">Precio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="flex w-full border-b-2 border-gray-200 bg-transparent p-0 h-auto">
            <TabsTrigger
              value="upcoming"
              className="flex-1 min-h-[48px] px-4 py-3 bg-transparent text-femfuel-medium font-semibold border-b-3 border-transparent data-[state=active]:border-b-3 data-[state=active]:border-femfuel-rose data-[state=active]:text-femfuel-dark transition-all duration-300"
            >
              Próximas ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex-1 min-h-[48px] px-4 py-3 bg-transparent text-femfuel-medium font-semibold border-b-3 border-transparent data-[state=active]:border-b-3 data-[state=active]:border-femfuel-rose data-[state=active]:text-femfuel-dark transition-all duration-300"
            >
              Completadas ({completedBookings.length})
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              className="flex-1 min-h-[48px] px-4 py-3 bg-transparent text-femfuel-medium font-semibold border-b-3 border-transparent data-[state=active]:border-b-3 data-[state=active]:border-femfuel-rose data-[state=active]:text-femfuel-dark transition-all duration-300"
            >
              Canceladas ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {isLoading ? (
              <BookingSkeletonList count={3} />
            ) : upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl active:shadow-xl transition-all duration-300">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={booking.service.image || "/placeholder.svg?height=64&width=64&query=beauty service"}
                        alt={booking.service.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-femfuel-dark text-sm sm:text-base truncate">{booking.service.name}</h3>
                            <p className="text-xs sm:text-sm text-femfuel-medium truncate">{booking.service.vendor}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-2">
                            <Badge className={`${getStatusColor(booking.status)} text-xs`}>{getStatusText(booking.status)}</Badge>
                            <span className="font-bold text-black text-sm sm:text-base">{booking.service.price}</span>
                          </div>
                        </div>

                        {/* Professional Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={booking.vendor.professionalImage || "/professionals/portraits/aesthetician-ana.png"}
                              alt={booking.vendor.professionalName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm text-femfuel-medium truncate">{booking.vendor.professionalName}</span>
                          </div>
                          <div className="flex items-center gap-1 ml-8 sm:ml-0">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-femfuel-medium">{booking.vendor.rating}</span>
                            <span className="text-xs text-femfuel-light">({booking.vendor.reviewCount})</span>
                          </div>
                        </div>

                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">
                              {formatDateResponsive(booking.date, true)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>
                              {booking.time} ({booking.service.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate" title={booking.vendor.address}>{booking.vendor.address}</span>
                          </div>
                        </div>

                        {booking.notes && (
                          <p className="text-sm text-femfuel-medium mb-3 italic">Nota: {booking.notes}</p>
                        )}

                        {/* Mobile-optimized buttons */}
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleChat(booking)}
                            className="relative flex-1 min-h-[44px] text-xs sm:text-sm px-3 bg-green-500 hover:bg-green-600 active:bg-green-600 text-white border-0 active:scale-95 transition-all"
                            aria-label="Chatear con profesional"
                          >
                            <MessageCircle className="h-4 w-4 mr-1" />
                            Chatear
                            {booking.vendor.isOnline && (
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full border border-white"></div>
                            )}
                          </Button>
                          <Button
                            onClick={() => handleReschedule(booking.id)}
                            className="glassmorphism-button-perfect flex-1 min-h-[44px] text-xs sm:text-sm px-3 active:scale-95 transition-all"
                            aria-label="Cambiar fecha y hora"
                          >
                            Cambiar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="py-16 md:py-24 px-4">
                <div className="max-w-lg mx-auto text-center">
                  {/* Icon and Text */}
                  <div className="mb-8 md:mb-12">
                    <Calendar className="h-16 w-16 md:h-20 md:w-20 mx-auto text-gray-300 mb-6" />
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                      Aún no tienes reservas programadas
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      ¡Toca consentirte! Agenda tu próximo servicio de belleza.
                    </p>
                  </div>

                  {/* Service Cards - Modern 2x2 Grid - Enhanced */}
                  <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                    <div
                      onClick={() => router.push("/category/unas")}
                      className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-femfuel-rose/30 active:scale-95 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-femfuel-light to-pink-50 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                        <Hand className="h-6 w-6 md:h-7 md:w-7 text-femfuel-rose transition-transform" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Manicure</h4>
                      <p className="text-sm text-gray-500">Uñas perfectas</p>
                    </div>

                    <div
                      onClick={() => router.push("/category/spa")}
                      className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-femfuel-rose/30 active:scale-95 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-femfuel-light to-pink-50 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                        <Flower2 className="h-6 w-6 md:h-7 md:w-7 text-femfuel-rose transition-transform" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Facial</h4>
                      <p className="text-sm text-gray-500">Cuidado de la piel</p>
                    </div>

                    <div
                      onClick={() => router.push("/category/maquillaje")}
                      className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-femfuel-rose/30 active:scale-95 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-femfuel-light to-pink-50 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                        <Palette className="h-6 w-6 md:h-7 md:w-7 text-femfuel-rose transition-transform" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Maquillaje</h4>
                      <p className="text-sm text-gray-500">Look perfecto</p>
                    </div>

                    <div
                      onClick={() => router.push("/category/peinados")}
                      className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:border-femfuel-rose/30 active:scale-95 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-femfuel-light to-pink-50 flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                        <Scissors className="h-6 w-6 md:h-7 md:w-7 text-femfuel-rose transition-transform" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Peinado</h4>
                      <p className="text-sm text-gray-500">Estilo único</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => router.push("/")}
                    className="w-full md:w-auto bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white px-8 py-4 text-base font-semibold rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
                  >
                    Explorar Todos los Servicios
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {isLoading ? (
              <BookingSkeletonList count={2} />
            ) : completedBookings.length > 0 ? (
              completedBookings.map((booking) => (
                <Card key={booking.id} className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98]">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={booking.service.image || "/placeholder.svg?height=64&width=64&query=beauty service"}
                        alt={booking.service.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-femfuel-dark text-sm sm:text-base truncate">{booking.service.name}</h3>
                            <p className="text-xs sm:text-sm text-femfuel-medium truncate">{booking.service.vendor}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-2">
                            <Badge className={`${getStatusColor(booking.status)} text-xs`}>{getStatusText(booking.status)}</Badge>
                            <span className="font-bold text-black text-sm sm:text-base">{booking.service.price}</span>
                          </div>
                        </div>

                        {/* Professional Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={booking.vendor.professionalImage || "/professionals/portraits/aesthetician-ana.png"}
                              alt={booking.vendor.professionalName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-sm text-femfuel-medium truncate">{booking.vendor.professionalName}</span>
                          </div>
                          <div className="flex items-center gap-1 ml-8 sm:ml-0">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-femfuel-medium">{booking.vendor.rating}</span>
                            <span className="text-xs text-femfuel-light">({booking.vendor.reviewCount})</span>
                          </div>
                        </div>

                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{formatDateResponsive(booking.date, false)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate" title={booking.vendor.address}>{booking.vendor.address}</span>
                          </div>
                        </div>

                        {/* Mobile-optimized buttons - no price here since it's in header */}
                        <div className="flex gap-1.5">
                          <Button
                            size="sm"
                            onClick={() => handleChat(booking)}
                            className="relative flex-1 text-xs py-1.5 px-2 bg-green-500 hover:bg-green-600 text-white border-0"
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Chatear
                            {booking.vendor.isOnline && (
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full border border-white"></div>
                            )}
                          </Button>
                          <Button variant="outline" onClick={() => handleReview(booking.id)} className="min-h-[44px] flex-1 text-sm px-3">
                            <Star className="h-4 w-4 mr-1.5" />
                            Reseñar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-femfuel-light to-pink-50 rounded-full mb-6 shadow-lg">
                  <Star className="h-10 w-10 text-femfuel-rose" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">Todavía no tienes servicios completados</h3>
                <p className="text-base md:text-lg text-femfuel-medium mb-6 max-w-md mx-auto">Una vez que completes tu primera cita, podrás dejar reseñas y reservar de nuevo</p>

                {/* Quick Service Access - Enhanced */}
                <div className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl p-6 max-w-sm mx-auto mb-6 shadow-lg">
                  <p className="text-sm text-femfuel-dark font-semibold mb-3">Servicios más populares:</p>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/category/unas")}
                      className="bg-white/90 backdrop-blur-sm border-2 border-femfuel-rose/20 hover:border-femfuel-rose hover:shadow-md transition-all"
                    >
                      Manicure
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push("/category/spa")}
                      className="bg-white/90 backdrop-blur-sm border-2 border-femfuel-rose/20 hover:border-femfuel-rose hover:shadow-md transition-all"
                    >
                      Facial
                    </Button>
                  </div>
                </div>

                <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300">
                  Reservar Mi Primera Cita
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4 mt-6">
            {isLoading ? (
              <BookingSkeletonList count={1} />
            ) : cancelledBookings.length > 0 ? (
              cancelledBookings.map((booking) => (
                <Card key={booking.id} className="bg-white/70 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg opacity-75">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={booking.service.image || "/placeholder.svg?height=64&width=64&query=beauty service"}
                        alt={booking.service.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover grayscale flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-femfuel-dark text-sm sm:text-base truncate">{booking.service.name}</h3>
                            <p className="text-xs sm:text-sm text-femfuel-medium truncate">{booking.service.vendor}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1 ml-2">
                            <Badge className="bg-red-100 text-red-800 text-xs">Cancelada</Badge>
                            <span className="font-bold text-femfuel-medium line-through text-sm sm:text-base">{booking.service.price}</span>
                          </div>
                        </div>

                        {/* Professional Info */}
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={booking.vendor.professionalImage || "/professionals/portraits/aesthetician-ana.png"}
                            alt={booking.vendor.professionalName}
                            className="w-6 h-6 rounded-full object-cover grayscale"
                          />
                          <span className="text-sm text-femfuel-medium truncate">{booking.vendor.professionalName}</span>
                        </div>

                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Calendar className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{formatDateResponsive(booking.date, false)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>{booking.time}</span>
                          </div>
                        </div>

                        {/* Mobile-optimized button - no price here since it's in header */}
                        <div className="flex">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => router.push("/search")}
                            className="flex-1 text-xs py-1.5 px-2"
                          >
                            Reservar de nuevo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-femfuel-light to-pink-50 rounded-full mb-6 shadow-lg">
                  <Calendar className="h-10 w-10 text-femfuel-rose" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">Aún no tienes reservas canceladas</h3>
                <p className="text-base md:text-lg text-femfuel-medium">Las citas canceladas aparecerán aquí</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Chat Widget */}
      <ChatButton
        variant="floating"
        className="shadow-lg hover:shadow-xl"
        unreadCount={3}
      />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="bookings" />
      
      {/* Reschedule/Cancel Modal - Enhanced */}
      <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
        <DialogContent className="w-[95%] max-w-md rounded-2xl bg-white/95 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-femfuel-dark">Cambiar Cita</DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              {/* Current Booking Info - Enhanced */}
              <div className="bg-gradient-to-br from-femfuel-light to-pink-50 rounded-xl p-4 border-2 border-femfuel-rose/10 shadow-md">
                <h4 className="font-semibold text-femfuel-dark mb-1">{selectedBooking.service.name}</h4>
                <p className="text-sm text-femfuel-medium mb-2">{selectedBooking.vendor.name}</p>
                <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedBooking.date.toLocaleDateString("es-DO")} - {selectedBooking.time}</span>
                </div>
              </div>

              {/* Action Buttons - Enhanced */}
              <div className="space-y-3">
                <div className="text-sm text-femfuel-medium font-medium">
                  ¿Qué te gustaría hacer?
                </div>

                <Button
                  onClick={() => {
                    // For now, just close modal - could implement date picker later
                    setShowRescheduleModal(false)
                    setSelectedBooking(null)
                  }}
                  className="w-full bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Reagendar Cita
                </Button>

                <Button
                  onClick={() => {
                    if (selectedBooking) {
                      handleCancel(selectedBooking.id)
                      setShowRescheduleModal(false)
                      setSelectedBooking(null)
                    }
                  }}
                  variant="outline"
                  className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar Cita
                </Button>

                <Button
                  onClick={() => {
                    setShowRescheduleModal(false)
                    setSelectedBooking(null)
                  }}
                  variant="ghost"
                  className="w-full hover:bg-femfuel-light rounded-xl transition-all"
                >
                  Volver
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Extra bottom padding for mobile to ensure content visibility */}
      <div className="md:hidden pb-6"></div>
    </div>
  )
}
