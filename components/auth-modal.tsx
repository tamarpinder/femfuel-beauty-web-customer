"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Mail, Lock, User, Phone, Eye, EyeOff, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/contexts/auth-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess?: (user: any) => void
  initialMode?: "login" | "signup"
}

export function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { signIn, signUp } = useAuth()

  // Demo customer credentials
  const demoCredentials = {
    email: "customer1@example.com",
    password: "CustomerLogin2025!",
    name: "María García"
  }

  // Update mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const handleFillTestCredentials = () => {
    setFormData(prev => ({
      ...prev,
      email: demoCredentials.email,
      password: demoCredentials.password
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (mode === "login") {
        const { data, error: authError } = await signIn(formData.email, formData.password)
        if (authError) {
          setError(authError.message || "Error al iniciar sesión")
        } else {
          onAuthSuccess?.(data.user);
          onClose();
        }
      } else {
        const { data, error: authError } = await signUp(formData.email, formData.password, {
          name: formData.name,
          phone: formData.phone
        })
        if (authError) {
          setError(authError.message || "Error al crear cuenta")
        } else {
          onAuthSuccess?.(data.user);
          onClose();
        }
      }
    } catch (error: any) {
      setError(error.message || "Error de conexión")
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsLoading(true)
    setError(null)

    try {
      // For now, social login is not implemented
      // In a real app, you would call Supabase social auth here
      setError(`${provider === "google" ? "Google" : "Facebook"} login no está disponible aún. Usa email y contraseña.`)
    } catch (error: any) {
      setError(error.message || "Error con login social")
      console.error("Social login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ email: "", password: "", name: "", phone: "" })
    setShowPassword(false)
  }

  const switchMode = (newMode: "login" | "signup") => {
    setMode(newMode)
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-femfuel-dark">
            {mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
          </DialogTitle>
          <DialogDescription className="text-center text-femfuel-medium">
            {mode === "login"
              ? "Accede a tu cuenta para reservar servicios"
              : "Únete a FemFuel Beauty y descubre los mejores profesionales"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continuar con Facebook
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-femfuel-medium">O continúa con email</span>
            </div>
          </div>

          {/* Test Credentials Notice - Only in Login Mode */}
          {mode === "login" && (
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Credenciales de Demostración</h4>
                    <p className="text-sm text-blue-700 mb-2">Para pruebas, usa la cuenta de {demoCredentials.name}:</p>
                    <div className="text-sm font-mono bg-white rounded px-2 py-1 border">
                      <div>📧 {demoCredentials.email}</div>
                      <div>🔒 {demoCredentials.password}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleFillTestCredentials}
                className="glassmorphism-button w-full"
                disabled={isLoading}
              >
                <User className="h-4 w-4" />
                <span>Usar Credenciales de Prueba</span>
              </button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-femfuel-dark">
                  Nombre completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-[var(--femfuel-rose)] focus:ring-[var(--femfuel-rose)]"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-femfuel-dark">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-[var(--femfuel-rose)] focus:ring-[var(--femfuel-rose)]"
                  required
                />
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-femfuel-dark">
                  Teléfono
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 809 555 0123"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-[var(--femfuel-rose)] focus:ring-[var(--femfuel-rose)]"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-femfuel-dark">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-[var(--femfuel-rose)] focus:ring-[var(--femfuel-rose)]"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-femfuel-rose hover:bg-[#9f1853] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : mode === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="text-center text-sm">
            <span className="text-femfuel-medium">
              {mode === "login" ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
            </span>
            <button
              type="button"
              className="ml-1 text-femfuel-rose hover:underline font-medium"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Regístrate" : "Inicia sesión"}
            </button>
          </div>

          {mode === "login" && (
            <div className="text-center">
              <button type="button" className="text-sm text-femfuel-rose hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
