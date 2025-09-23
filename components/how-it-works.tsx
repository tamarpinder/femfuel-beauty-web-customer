"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar, Star, Heart, UserPlus } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/contexts/auth-context"

export function HowItWorks() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleCTAClick = () => {
    if (isAuthenticated) {
      // Navigate to services page for logged-in users
      router.push("/services")
    } else {
      // Show auth modal for logged-out users
      handleAuthClick("signup")
    }
  }

  // Extract first name from user's full name
  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0]
  }
  const steps = [
    {
      icon: Search,
      title: "Explora y Compara",
      description: "Busca entre cientos de servicios y profesionales verificados en tu área",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Calendar,
      title: "Reserva al Instante", 
      description: "Escoge tu horario preferido y reserva tu cita en segundos",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Heart,
      title: "Disfruta tu Experiencia",
      description: "Relájate mientras expertos locales realzan tu belleza natural",
      color: "bg-pink-100 text-pink-600"
    },
    {
      icon: Star,
      title: "Comparte y Evalúa",
      description: "Comparte tu transformación y ayuda a otros con tu reseña",
      color: "bg-yellow-100 text-yellow-600"
    }
  ]

  return (
    <section className="px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-4">
            Cómo Funciona FemFuel
          </h2>
          <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
            Descubre tu belleza en 4 simples pasos con los mejores profesionales de República Dominicana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="h-8 w-8" />
                </div>
                
                <div className="mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-femfuel-rose text-white rounded-full text-sm font-bold mb-3">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
                  {step.title}
                </h3>
                
                <p className="text-sm text-femfuel-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={handleCTAClick}
            className="femfuel-button-lg"
          >
            {isAuthenticated ? (
              <>
                <Calendar className="h-4 w-4" />
                <span>Hola {user?.name ? getFirstName(user.name) : 'hermosa'}, reserva tu próxima cita</span>
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                <span>Comenzar</span>
              </>
            )}
          </button>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </section>
  )
}