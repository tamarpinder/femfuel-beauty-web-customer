"use client"

import { useAuth } from "@/contexts/auth-context"
import { MobileHeader } from "@/components/mobile-header"
import { DesktopHeader } from "@/components/desktop-header"
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
  ShoppingBag
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

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
    <div className="min-h-screen bg-gray-50">
      {/* Headers */}
      <MobileHeader />
      <DesktopHeader />

      {/* Main Content */}
      <div className="pt-14 sm:pt-16 pb-20 sm:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="h-20 w-20 border-4 border-femfuel-rose/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-femfuel-light text-femfuel-rose text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-femfuel-dark">{user.name}</h1>
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
                <Badge variant="secondary" className="mt-3 bg-green-100 text-green-800">
                  Cuenta Verificada
                </Badge>
              </div>

              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Edit3 className="h-4 w-4" />
                Editar Perfil
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveSection("overview")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === "overview"
                  ? "bg-femfuel-rose text-white"
                  : "text-femfuel-medium hover:text-femfuel-dark"
              }`}
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Información</span>
            </button>
            <button
              onClick={() => setActiveSection("payment")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === "payment"
                  ? "bg-femfuel-rose text-white"
                  : "text-femfuel-medium hover:text-femfuel-dark"
              }`}
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Métodos de Pago</span>
            </button>
            <button
              onClick={() => setActiveSection("orders")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === "orders"
                  ? "bg-femfuel-rose text-white"
                  : "text-femfuel-medium hover:text-femfuel-dark"
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Órdenes</span>
            </button>
            <button
              onClick={() => setActiveSection("favoritos")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === "favoritos"
                  ? "bg-femfuel-rose text-white"
                  : "text-femfuel-medium hover:text-femfuel-dark"
              }`}
            >
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favoritos</span>
            </button>
            <button
              onClick={() => setActiveSection("settings")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === "settings"
                  ? "bg-femfuel-rose text-white"
                  : "text-femfuel-medium hover:text-femfuel-dark"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configuración</span>
            </button>
          </div>

          {/* Content Sections */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-femfuel-dark">Nombre Completo</label>
                      <p className="text-femfuel-medium">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-femfuel-dark">Correo Electrónico</label>
                      <p className="text-femfuel-medium">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-femfuel-dark">Teléfono</label>
                      <p className="text-femfuel-medium">{user.phone || "No especificado"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-femfuel-dark">Ubicación</label>
                      <p className="text-femfuel-medium">Santo Domingo, RD</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Uso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-femfuel-rose">3</div>
                      <div className="text-sm text-femfuel-medium">Servicios Reservados</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-femfuel-rose">RD$8,500</div>
                      <div className="text-sm text-femfuel-medium">Total Gastado</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-femfuel-rose">2</div>
                      <div className="text-sm text-femfuel-medium">Favoritos</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-femfuel-rose">4.8</div>
                      <div className="text-sm text-femfuel-medium">Calificación Promedio</div>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Historial de Órdenes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-femfuel-dark mb-2">
                      No tienes órdenes aún
                    </h3>
                    <p className="text-femfuel-medium mb-4">
                      Cuando realices tu primera compra, aparecerá aquí
                    </p>
                    <Button
                      onClick={() => router.push('/shop')}
                      className="bg-femfuel-rose hover:bg-femfuel-rose/90"
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Servicios Favoritos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-femfuel-dark mb-2">
                      No tienes servicios favoritos aún
                    </h3>
                    <p className="text-femfuel-medium mb-4">
                      Agrega servicios a tus favoritos para encontrarlos fácilmente
                    </p>
                    <Button
                      onClick={() => router.push('/services')}
                      className="bg-femfuel-rose hover:bg-femfuel-rose/90"
                    >
                      Explorar Servicios
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Salones Favoritos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-femfuel-dark mb-2">
                      No tienes salones favoritos aún
                    </h3>
                    <p className="text-femfuel-medium mb-4">
                      Guarda tus salones preferidos para acceso rápido
                    </p>
                    <Button
                      onClick={() => router.push('/services')}
                      variant="outline"
                      className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white"
                    >
                      Buscar Salones
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "settings" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notificaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Confirmaciones de Citas</p>
                      <p className="text-sm text-femfuel-medium">Recibe notificaciones cuando tu cita sea confirmada</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Activado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Recordatorios</p>
                      <p className="text-sm text-femfuel-medium">Recordatorios 24 horas antes de tu cita</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Activado</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ofertas Especiales</p>
                      <p className="text-sm text-femfuel-medium">Recibe ofertas y promociones exclusivas</p>
                    </div>
                    <Badge variant="outline">Desactivado</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacidad y Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Cambiar Contraseña
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Verificación en Dos Pasos
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Descargar Mis Datos
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    variant="destructive"
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                  <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
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