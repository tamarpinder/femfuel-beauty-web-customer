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
    <section className="px-4 py-16 bg-gradient-to-b from-white via-femfuel-light/10 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-femfuel-rose via-pink-600 to-femfuel-rose bg-clip-text text-transparent mb-3">
            Cómo Funciona FemFuel
          </h2>
          <p className="text-base md:text-lg text-femfuel-medium font-medium max-w-2xl mx-auto">
            Descubre tu belleza en 4 simples pasos con los mejores profesionales de República Dominicana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="text-center p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl active:scale-[0.98] transition-all duration-300 border-2 border-femfuel-rose/10 hover:border-femfuel-rose/30">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <IconComponent className="h-8 w-8" />
                </div>

                <div className="mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-femfuel-rose to-pink-600 text-white rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300">
                    {index + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-femfuel-dark mb-3 font-serif">
                  {step.title}
                </h3>

                <p className="text-sm text-femfuel-medium leading-relaxed font-medium">
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300 border-2 border-white/20"
          >
            {isAuthenticated ? (
              <>
                <Calendar className="h-5 w-5" />
                <span>Hola {user?.name ? getFirstName(user.name) : 'hermosa'}, Reserva Tu Próxima Cita</span>
              </>
            ) : (
              <>
                <UserPlus className="h-5 w-5" />
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