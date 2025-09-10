"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, MapPin, MessageCircle, Star, User, Filter, SlidersHorizontal, Hand, Flower2, Palette, Scissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { MobileNavigation } from "@/components/mobile-navigation"
import { BookingSkeletonList } from "@/components/booking-skeleton"
import { ChatButton } from "@/components/ui/chat-button"
import { UserFlowHeader } from "@/components/user-flow-header"
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
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Re-enable authentication once auth system is fully implemented
    // if (!isAuthenticated) {
    //   router.push("/")
    //   return
    // }

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
        vendor: {
          id: "vendor-1",
          name: "Beauty Studio RD",
          rating: 4.8,
          reviewCount: 156,
          address: "Plaza Central, Local 15, Naco",
          phone: "+1 809-555-0126",
          professionalName: "Patricia López",
          professionalImage: "/professionals/portraits/nail-artist-patricia.png",
          isOnline: true,
          responseTime: "Responde en 15 min"
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
        vendor: {
          id: "vendor-2",
          name: "Spa Paradise",
          rating: 4.7,
          reviewCount: 203,
          address: "Av. Máximo Gómez 67, Bella Vista",
          phone: "+1 809-555-0125",
          professionalName: "Gabriela Méndez",
          professionalImage: "/professionals/portraits/spa-therapist-gabriela.png",
          isOnline: false,
          responseTime: "Responde en 2 horas"
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
        vendor: {
          id: "vendor-3",
          name: "Glamour House",
          rating: 5.0,
          reviewCount: 89,
          address: "Calle José Reyes 45, Zona Colonial",
          phone: "+1 809-555-0124",
          professionalName: "Alejandra Santos",
          professionalImage: "/professionals/portraits/makeup-artist-alejandra.png",
          isOnline: true,
          responseTime: "Responde al instante"
        },
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        time: "16:00",
        status: "upcoming",
        paymentMethod: "card",
      },
    ]

    // Simulate loading (reduced for testing)
    setTimeout(() => {
      setBookings(mockBookings)
      setFilteredBookings(mockBookings)
      setIsLoading(false)
    }, 500)
  }, [router])

  // Filter and sort bookings
  useEffect(() => {
    let filtered = bookings

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
  }, [bookings, searchQuery, sortBy, filterStatus])

  const upcomingBookings = filteredBookings.filter((booking) => booking.status === "upcoming")
  const completedBookings = filteredBookings.filter((booking) => booking.status === "completed")
  const cancelledBookings = filteredBookings.filter((booking) => booking.status === "cancelled")

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
                              src={booking.vendor.professionalImage || "/placeholder-user.jpg"}
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
                          <Button variant="outline" size="sm" onClick={() => handleChat(booking)} className="relative flex-1 text-xs py-1.5 px-2">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Chat
                            {booking.vendor.isOnline && (
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                            )}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleReschedule(booking.id)} className="flex-1 text-xs py-1.5 px-2">
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
                              src={booking.vendor.professionalImage || "/placeholder-user.jpg"}
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
                          <Button variant="outline" size="sm" onClick={() => handleChat(booking)} className="relative flex-1 text-xs py-1.5 px-2">
                            <MessageCircle className="h-3 w-3 mr-1" />
                            Chat
                            {booking.vendor.isOnline && (
                              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
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
                            src={booking.vendor.professionalImage || "/placeholder-user.jpg"}
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
      
      {/* Extra bottom padding for mobile to ensure content visibility */}
      <div className="md:hidden pb-6"></div>
    </div>
  )
}
