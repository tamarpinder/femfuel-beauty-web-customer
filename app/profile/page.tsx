"use client"

import { useAuth } from "@/contexts/auth-context"
import { MobileNavigation } from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PaymentMethodsSettings } from "@/components/payment-methods-settings"
import {
  User,
  Phone,
  Mail,
  MapPin,
  Settings,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  Edit3,
  Heart,
  ShoppingBag,
  Star
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

// Mock favorites data - in a real app this would come from context/API
const mockFavoriteServices = [
  {
    id: "1",
    name: "Manicure Dominicana",
    vendor: "Nails & Beauty Studio",
    image: "/services/manicure-dominicana.jpg",
    price: "RD$800",
    rating: 4.8
  },
  {
    id: "2",
    name: "Alisado Dominicano",
    vendor: "Salon Eleganza",
    image: "/services/alisado-dominicano.jpg",
    price: "RD$1,200",
    rating: 4.9
  }
]

const mockFavoriteSalons = [
  {
    id: "1",
    name: "Salon Eleganza",
    location: "Piantini",
    image: "/vendors/salon-eleganza.jpg",
    rating: 4.9,
    services: "Cabello, Maquillaje"
  },
  {
    id: "2",
    name: "Beauty Express",
    location: "Naco",
    image: "/vendors/beauty-express.jpg",
    rating: 4.7,
    services: "Uñas, Spa"
  }
]

export default function ProfilePage() {
  const { user, signOut, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeSection, setActiveSection] = useState<"overview" | "payment" | "settings" | "favoritos" | "orders">("overview")

  useEffect(() => {
    const section = searchParams.get('section')
    if (section && ['overview', 'payment', 'settings', 'favoritos', 'orders'].includes(section)) {
      setActiveSection(section as "overview" | "payment" | "settings" | "favoritos" | "orders")
    }
  }, [searchParams])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold text-femfuel-dark">Inicia sesión para ver tu perfil</h2>
          <Button onClick={() => router.push("/login")} className="bg-femfuel-rose hover:bg-femfuel-rose/90">
            Iniciar Sesión
          </Button>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const handleTabChange = (tab: "home" | "search" | "bookings" | "shop" | "profile" | "chat") => {
    if (tab === "home") {
      router.push("/")
    } else if (tab === "search") {
      router.push("/services")
    } else if (tab === "shop") {
      router.push("/shop")
    } else if (tab === "bookings") {
      router.push("/bookings")
    } else if (tab === "chat") {
      router.push("/chat")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
      {/* Main Content */}
      <div className="lg:pt-24 pb-20 sm:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Profile Header */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-femfuel-rose/10 p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="h-24 w-24 border-4 border-femfuel-rose/30 shadow-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-femfuel-light to-pink-50 text-femfuel-rose text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-femfuel-dark">{user.name}</h1>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mt-2">
                  <div className="flex items-center gap-1 text-femfuel-medium">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-1 text-femfuel-medium">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{user.phone}</span>
                    </div>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full mt-3 shadow-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-bold text-green-700">Cuenta Verificada</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="flex items-center gap-2 min-h-[44px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose active:scale-95 transition-all duration-300 text-sm md:text-base px-4"
                aria-label="Editar Perfil"
              >
                <Edit3 className="h-4 w-4" />
                <span className="hidden sm:inline">Editar Perfil</span>
                <span className="sm:hidden">Editar</span>
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6 bg-white/80 backdrop-blur-md rounded-xl p-1 shadow-lg border border-femfuel-rose/10">
            <button
              onClick={() => setActiveSection("overview")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 min-h-[48px] rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeSection === "overview"
                  ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg"
                  : "text-femfuel-medium hover:text-femfuel-dark active:text-femfuel-dark hover:bg-femfuel-light/50 active:bg-femfuel-light"
              }`}
              aria-label="Información Personal"
              aria-current={activeSection === "overview" ? "page" : undefined}
            >
              <User className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Información</span>
            </button>
            <button
              onClick={() => setActiveSection("payment")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 min-h-[48px] rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeSection === "payment"
                  ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg"
                  : "text-femfuel-medium hover:text-femfuel-dark active:text-femfuel-dark hover:bg-femfuel-light/50 active:bg-femfuel-light"
              }`}
              aria-label="Métodos de Pago"
              aria-current={activeSection === "payment" ? "page" : undefined}
            >
              <CreditCard className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Pago</span>
            </button>
            <button
              onClick={() => setActiveSection("orders")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 min-h-[48px] rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeSection === "orders"
                  ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg"
                  : "text-femfuel-medium hover:text-femfuel-dark active:text-femfuel-dark hover:bg-femfuel-light/50 active:bg-femfuel-light"
              }`}
              aria-label="Órdenes"
              aria-current={activeSection === "orders" ? "page" : undefined}
            >
              <ShoppingBag className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Órdenes</span>
            </button>
            <button
              onClick={() => setActiveSection("favoritos")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 min-h-[48px] rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeSection === "favoritos"
                  ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg"
                  : "text-femfuel-medium hover:text-femfuel-dark active:text-femfuel-dark hover:bg-femfuel-light/50 active:bg-femfuel-light"
              }`}
              aria-label="Favoritos"
              aria-current={activeSection === "favoritos" ? "page" : undefined}
            >
              <Heart className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Favoritos</span>
            </button>
            <button
              onClick={() => setActiveSection("settings")}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 min-h-[48px] rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 ${
                activeSection === "settings"
                  ? "bg-gradient-to-r from-femfuel-rose to-pink-600 text-white shadow-lg"
                  : "text-femfuel-medium hover:text-femfuel-dark active:text-femfuel-dark hover:bg-femfuel-light/50 active:bg-femfuel-light"
              }`}
              aria-label="Configuración"
              aria-current={activeSection === "settings" ? "page" : undefined}
            >
              <Settings className="h-5 w-5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Config</span>
            </button>
          </div>

          {/* Content Sections */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-femfuel-dark">
                    <User className="h-5 w-5" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-femfuel-dark">Nombre Completo</label>
                      <p className="text-femfuel-medium mt-1">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-femfuel-dark">Correo Electrónico</label>
                      <p className="text-femfuel-medium mt-1">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-femfuel-dark">Teléfono</label>
                      <p className="text-femfuel-medium mt-1">{user.phone || "No especificado"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-femfuel-dark">Ubicación</label>
                      <p className="text-femfuel-medium mt-1">Santo Domingo, RD</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-femfuel-light to-pink-50 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-femfuel-dark">Estadísticas de Uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                      <div className="text-3xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">3</div>
                      <div className="text-sm text-femfuel-medium mt-1">Servicios Reservados</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                      <div className="text-3xl font-bold text-femfuel-dark">RD$8,500</div>
                      <div className="text-sm text-femfuel-medium mt-1">Total Gastado</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                      <div className="text-3xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">2</div>
                      <div className="text-sm text-femfuel-medium mt-1">Favoritos</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md">
                      <div className="text-3xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">4.8</div>
                      <div className="text-sm text-femfuel-medium mt-1">Calificación Promedio</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "payment" && (
            <PaymentMethodsSettings />
          )}

          {activeSection === "orders" && (
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-femfuel-dark">
                    <ShoppingBag className="h-5 w-5" />
                    Historial de Órdenes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16 px-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-femfuel-light rounded-full mb-6">
                      <ShoppingBag className="h-10 w-10 text-femfuel-medium" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">
                      No tienes órdenes aún
                    </h3>
                    <p className="text-base md:text-lg text-femfuel-medium mb-6 max-w-md mx-auto">
                      Cuando realices tu primera compra, aparecerá aquí
                    </p>
                    <Button
                      onClick={() => router.push('/shop')}
                      className="min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose active:from-pink-600 active:to-femfuel-rose text-white px-8 py-3 md:py-4 text-sm md:text-base font-semibold rounded-full shadow-lg hover:shadow-xl active:shadow-xl active:scale-95 transition-all duration-300"
                    >
                      Ir a la Tienda
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "favoritos" && (
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-femfuel-dark">
                    <Heart className="h-5 w-5" />
                    Servicios Favoritos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockFavoriteServices.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockFavoriteServices.map((service) => (
                        <div key={service.id} className="bg-white border-2 border-femfuel-rose/20 rounded-xl p-4 hover:border-femfuel-rose active:border-femfuel-rose hover:shadow-lg active:shadow-lg transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-femfuel-dark text-sm md:text-base">{service.name}</h4>
                              <p className="text-xs md:text-sm text-femfuel-medium">{service.vendor}</p>
                            </div>
                            <Button
                              variant="ghost"
                              className="min-w-[44px] min-h-[44px] text-femfuel-rose hover:bg-femfuel-rose/10 active:bg-femfuel-rose/10 flex-shrink-0"
                              aria-label="Quitar de favoritos"
                            >
                              <Heart className="h-5 w-5 fill-current" />
                            </Button>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-yellow-400" />
                              <span className="text-sm font-bold">{service.rating}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-femfuel-dark">{service.price}</span>
                              <Button className="min-h-[44px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose active:from-pink-600 active:to-femfuel-rose text-white rounded-full px-4 text-sm shadow-md hover:shadow-lg active:shadow-lg active:scale-95 transition-all duration-300">
                                Reservar
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 px-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-femfuel-light rounded-full mb-6">
                        <Heart className="h-10 w-10 text-femfuel-medium" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">
                        No tienes servicios favoritos aún
                      </h3>
                      <p className="text-base md:text-lg text-femfuel-medium mb-6 max-w-md mx-auto">
                        Agrega servicios a tus favoritos para encontrarlos fácilmente
                      </p>
                      <Button
                        onClick={() => router.push('/services')}
                        className="min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose active:from-pink-600 active:to-femfuel-rose text-white px-8 py-3 md:py-4 text-sm md:text-base font-semibold rounded-full shadow-lg hover:shadow-xl active:shadow-xl active:scale-95 transition-all duration-300"
                      >
                        Explorar Servicios
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-femfuel-dark">
                    <Heart className="h-5 w-5" />
                    Salones Favoritos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockFavoriteSalons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockFavoriteSalons.map((salon) => (
                        <div key={salon.id} className="bg-white border-2 border-femfuel-rose/20 rounded-xl p-4 hover:border-femfuel-rose active:border-femfuel-rose hover:shadow-lg active:shadow-lg transition-all duration-300">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-femfuel-dark text-sm md:text-base">{salon.name}</h4>
                              <p className="text-xs md:text-sm text-femfuel-medium flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {salon.location}
                              </p>
                              <p className="text-xs text-femfuel-medium mt-1">{salon.services}</p>
                            </div>
                            <Button
                              variant="ghost"
                              className="min-w-[44px] min-h-[44px] text-femfuel-rose hover:bg-femfuel-rose/10 active:bg-femfuel-rose/10 flex-shrink-0"
                              aria-label="Quitar de favoritos"
                            >
                              <Heart className="h-5 w-5 fill-current" />
                            </Button>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-current text-yellow-400" />
                              <span className="text-sm font-bold">{salon.rating}</span>
                            </div>
                            <Button
                              variant="outline"
                              className="min-h-[44px] border-2 border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose active:bg-femfuel-rose hover:text-white active:text-white rounded-full px-4 text-sm transition-all duration-300"
                            >
                              Ver Servicios
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 px-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-femfuel-light rounded-full mb-6">
                        <Heart className="h-10 w-10 text-femfuel-medium" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-3">
                        No tienes salones favoritos aún
                      </h3>
                      <p className="text-base md:text-lg text-femfuel-medium mb-6 max-w-md mx-auto">
                        Guarda tus salones preferidos para acceso rápido
                      </p>
                      <Button
                        onClick={() => router.push('/services')}
                        className="min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose active:from-pink-600 active:to-femfuel-rose text-white px-8 py-3 md:py-4 text-sm md:text-base font-semibold rounded-full shadow-lg hover:shadow-xl active:shadow-xl active:scale-95 transition-all duration-300"
                      >
                        Buscar Salones
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-femfuel-dark">
                    <Bell className="h-5 w-5" />
                    Notificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-femfuel-rose/10">
                    <div>
                      <p className="font-bold text-femfuel-dark">Confirmaciones de Citas</p>
                      <p className="text-sm text-femfuel-medium">Recibe notificaciones cuando tu cita sea confirmada</p>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                      <span className="text-sm font-bold text-green-700">Activado</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-femfuel-rose/10">
                    <div>
                      <p className="font-bold text-femfuel-dark">Recordatorios</p>
                      <p className="text-sm text-femfuel-medium">Recordatorios 24 horas antes de tu cita</p>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                      <span className="text-sm font-bold text-green-700">Activado</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-femfuel-rose/10">
                    <div>
                      <p className="font-bold text-femfuel-dark">Ofertas Especiales</p>
                      <p className="text-sm text-femfuel-medium">Recibe ofertas y promociones exclusivas</p>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full">
                      <span className="text-sm font-bold text-gray-600">Desactivado</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-femfuel-rose/10 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-femfuel-dark">
                    <Shield className="h-5 w-5" />
                    Privacidad y Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start min-h-[48px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose transition-all duration-300 font-semibold text-sm md:text-base"
                  >
                    Cambiar Contraseña
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start min-h-[48px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose transition-all duration-300 font-semibold text-sm md:text-base"
                  >
                    Verificación en Dos Pasos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start min-h-[48px] border-2 border-femfuel-rose/20 hover:bg-femfuel-light active:bg-femfuel-light hover:border-femfuel-rose transition-all duration-300 font-semibold text-sm md:text-base"
                  >
                    Descargar Mis Datos
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border-2 border-red-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-red-600 font-bold">Zona de Peligro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 min-h-[48px] bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 active:from-red-600 active:to-red-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl active:shadow-xl active:scale-95 transition-all duration-300 text-sm md:text-base"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full min-h-[48px] text-red-600 border-2 border-red-200 hover:bg-red-50 active:bg-red-50 hover:border-red-400 font-semibold rounded-full transition-all duration-300 text-sm md:text-base"
                  >
                    Eliminar Cuenta
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation activeTab="profile" onTabChange={handleTabChange} />
    </div>
  )
}