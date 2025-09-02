'use client'

import { useState } from "react"
import Link from "next/link"
import { UserPlus, Mail, Lock, User, Phone, Eye, EyeOff, Heart, Star, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function CustomerRegistrationPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    if (!acceptTerms) {
      alert("Debes aceptar los términos y condiciones")
      setIsLoading(false)
      return
    }

    // Mock registration - in real app this would call your auth API
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API call
      
      // Show success message and redirect
      alert("¡Registro exitoso! Te hemos enviado un email de confirmación.")
      // In real app: window.location.href = '/welcome' or similar
      
    } catch (error) {
      alert("Error al crear la cuenta. Por favor intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    {
      icon: Star,
      title: "Acceso a Profesionales Verificados",
      description: "Conecta con los mejores especialistas en belleza de RD"
    },
    {
      icon: Zap,
      title: "Reservas Instantáneas",
      description: "Agenda citas en segundos, 24/7"
    },
    {
      icon: Heart,
      title: "Recompensas Exclusivas",
      description: "Gana puntos y descuentos especiales"
    },
    {
      icon: Shield,
      title: "Garantía de Satisfacción",
      description: "Tu satisfacción está protegida en cada servicio"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-purple-500/5 to-orange-500/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 px-4 py-2 rounded-full mb-6">
            <UserPlus className="h-4 w-4 text-rose-600" />
            <span className="text-rose-600 font-medium text-sm">Crear Cuenta</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-6 leading-tight">
            Únete a <span className="text-rose-600">FemFuel Beauty</span>
          </h1>
          
          <p className="text-lg text-femfuel-medium max-w-2xl mx-auto mb-8">
            Descubre un mundo de belleza a tu alcance. Conecta con los mejores profesionales, 
            agenda citas fácilmente y obtén recompensas exclusivas.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Registration Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-femfuel-dark mb-2">
                  Crear Tu Cuenta
                </h2>
                <p className="text-femfuel-medium">
                  ¿Ya tienes cuenta? 
                  <Link href="/login" className="text-rose-600 hover:text-rose-700 font-medium ml-1">
                    Iniciar Sesión
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <div className="relative">
                      <User className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="Tu nombre"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <div className="relative">
                      <User className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Tu apellido"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 809 555 0123"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Lock className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repite tu contraseña"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={setAcceptTerms}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      Acepto los{" "}
                      <Link href="/terms-of-service" className="text-rose-600 hover:text-rose-700">
                        Términos y Condiciones
                      </Link>{" "}
                      y la{" "}
                      <Link href="/privacy-policy" className="text-rose-600 hover:text-rose-700">
                        Política de Privacidad
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={acceptMarketing}
                      onCheckedChange={setAcceptMarketing}
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      Quiero recibir ofertas especiales y novedades por correo
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full femfuel-button-lg h-12"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creando cuenta...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Crear Mi Cuenta
                    </div>
                  )}
                </Button>

                {/* Social Login */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-femfuel-medium">O continúa con</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="h-10">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📧</span>
                      <span>Google</span>
                    </div>
                  </Button>
                  <Button variant="outline" type="button" className="h-10">
                    <div className="flex items-center gap-2">
                      <span className="text-base">📘</span>
                      <span>Facebook</span>
                    </div>
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-8">
              <h3 className="text-2xl font-bold text-femfuel-dark mb-8">
                ¿Por qué elegir FemFuel Beauty?
              </h3>
              
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-rose-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-femfuel-dark mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-femfuel-medium">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-12 p-6 bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-femfuel-dark mb-4">
                  Únete a nuestra comunidad
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-rose-600">10K+</div>
                    <div className="text-sm text-femfuel-medium">Usuarios</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-600">500+</div>
                    <div className="text-sm text-femfuel-medium">Profesionales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-600">4.9</div>
                    <div className="text-sm text-femfuel-medium">⭐ Calificación</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}