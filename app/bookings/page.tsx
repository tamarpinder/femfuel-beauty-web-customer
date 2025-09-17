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
import { UserFlowHeader } from "@/components/user-flow-header"
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
    console.log("Open chat with vendor:", booking.vendor.id)
    router.push(`/chat/${booking.vendor.id}?booking=${booking.id}`)
  }

  const handleReview = (bookingId: string) => {
    console.log("Leave review for booking:", bookingId)
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

  // TODO: Re-enable this check once auth is fully implemented
  // if (!isAuthenticated) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <UserFlowHeader 
        title="Mis Citas" 
        onBack={handleBack}
      />

      <div className="px-2 sm:px-4 py-4 max-w-4xl mx-auto overflow-hidden">
        {/* Search and Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Buscar servicios o salones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
          
          {showFilters && (
            <div className="flex flex-col sm:flex-row gap-2 p-3 bg-gray-50 rounded-lg">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Fecha</SelectItem>
                  <SelectItem value="service">Servicio</SelectItem>
                  <SelectItem value="vendor">Salón</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="upcoming">Próximas</SelectItem>
                  <SelectItem value="completed">Completadas</SelectItem>
                  <SelectItem value="cancelled">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
            <TabsTrigger value="upcoming" className="truncate">Próximas ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="completed" className="truncate">Completadas ({completedBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled" className="truncate">Canceladas ({cancelledBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {isLoading ? (
              <BookingSkeletonList count={3} />
            ) : upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <Card key={booking.id} className="shadow-sm">
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
                            <span className="font-bold text-femfuel-rose text-sm sm:text-base">{booking.service.price}</span>
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
                          <Button
                            size="sm"
                            onClick={() => handleReschedule(booking.id)}
                            className="glassmorphism-button-perfect flex-1 text-xs py-1.5 px-2"
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
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-femfuel-medium mb-4" />
                <h3 className="text-lg font-medium text-femfuel-dark mb-2">No tienes reservas próximas</h3>
                <p className="text-femfuel-medium mb-4">
                  ¡Es hora de consentirte! Explora nuestros servicios de belleza premium
                </p>
                
                {/* Personalized Recommendations */}
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-6">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push("/category/unas")}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <Hand className="h-5 w-5 mb-1 text-femfuel-medium" />
                    <span className="text-xs">Manicure</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push("/category/spa")}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <Flower2 className="h-5 w-5 mb-1 text-femfuel-medium" />
                    <span className="text-xs">Facial</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push("/category/maquillaje")}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <Palette className="h-5 w-5 mb-1 text-femfuel-medium" />
                    <span className="text-xs">Maquillaje</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push("/category/peinados")}
                    className="flex flex-col items-center p-3 h-auto"
                  >
                    <Scissors className="h-5 w-5 mb-1 text-femfuel-medium" />
                    <span className="text-xs">Peinado</span>
                  </Button>
                </div>

                <Button className="bg-femfuel-rose hover:bg-[#9f1853]" onClick={() => router.push("/")}>
                  Ver Todos los Servicios
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {isLoading ? (
              <BookingSkeletonList count={2} />
            ) : completedBookings.length > 0 ? (
              completedBookings.map((booking) => (
                <Card key={booking.id} className="shadow-sm">
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
                            <span className="font-bold text-femfuel-rose text-sm sm:text-base">{booking.service.price}</span>
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
                          <Button variant="outline" size="sm" onClick={() => handleReview(booking.id)} className="flex-1 text-xs py-1.5 px-2">
                            <Star className="h-3 w-3 mr-1" />
                            Reseñar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <Star className="h-12 w-12 mx-auto text-femfuel-medium mb-4" />
                <h3 className="text-lg font-medium text-femfuel-dark mb-2">Aún no tienes servicios completados</h3>
                <p className="text-femfuel-medium mb-6">Una vez que completes tu primera cita, podrás dejar reseñas y reservar de nuevo</p>
                
                {/* Quick Service Access */}
                <div className="bg-femfuel-purple rounded-lg p-4 max-w-sm mx-auto mb-4">
                  <p className="text-sm text-femfuel-dark mb-3">Servicios más populares:</p>
                  <div className="flex justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push("/category/unas")}
                      className="bg-white"
                    >
                      Manicure
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push("/category/spa")}
                      className="bg-white"
                    >
                      Facial
                    </Button>
                  </div>
                </div>

                <Button className="bg-femfuel-rose hover:bg-[#9f1853]" onClick={() => router.push("/")}>
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
                <Card key={booking.id} className="shadow-sm opacity-75">
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
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-femfuel-medium mb-4" />
                <h3 className="text-lg font-medium text-femfuel-dark mb-2">No tienes reservas canceladas</h3>
                <p className="text-femfuel-medium">Las citas canceladas aparecerán aquí</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Chat Widget */}
      <ChatButton
        variant="floating"
        className="shadow-lg hover:shadow-xl"
      />

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="bookings" />
      
      {/* Reschedule/Cancel Modal */}
      <Dialog open={showRescheduleModal} onOpenChange={setShowRescheduleModal}>
        <DialogContent className="w-[95%] max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Cambiar Cita</DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              {/* Current Booking Info */}
              <div className="bg-femfuel-purple rounded-lg p-3">
                <h4 className="font-medium text-femfuel-dark mb-1">{selectedBooking.service.name}</h4>
                <p className="text-sm text-femfuel-medium">{selectedBooking.vendor.name}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-femfuel-medium">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedBooking.date.toLocaleDateString("es-DO")} - {selectedBooking.time}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="text-sm text-femfuel-medium">
                  ¿Qué te gustaría hacer?
                </div>

                <Button
                  onClick={() => {
                    // For now, just close modal - could implement date picker later
                    setShowRescheduleModal(false)
                    setSelectedBooking(null)
                  }}
                  className="w-full bg-femfuel-rose hover:bg-[#9f1853] text-white"
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
                  className="w-full border-red-200 text-red-600 hover:bg-red-50"
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
                  className="w-full"
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
