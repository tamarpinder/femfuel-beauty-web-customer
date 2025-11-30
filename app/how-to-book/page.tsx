'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar, Users, CheckCircle, Star, Play, ArrowRight, Smartphone, CreditCard, Clock, Shield, Award, Zap, Heart, BookOpen, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/contexts/auth-context"

const bookingSteps = [
  {
    id: 1,
    title: "Explora y Descubre",
    subtitle: "Encuentra tu servicio perfecto",
    description: "Busca entre cientos de servicios de belleza y compara precios, reseñas y disponibilidad en tiempo real.",
    icon: Search,
    color: "from-purple-500 to-purple-600",
    details: [
      "Más de 50 tipos de servicios disponibles",
      "Filtros avanzados por precio, ubicación y horario",
      "Fotos reales de trabajos anteriores",
      "Reseñas verificadas de clientes reales"
    ],
    demoAction: "Buscar 'manicure gel'"
  },
  {
    id: 2,
    title: "Elige tu Profesional",
    subtitle: "Conecta con expertos verificados",
    description: "Selecciona entre profesionales certificados con portafolios completos y reseñas auténticas.",
    icon: Users,
    color: "from-rose-500 to-pink-600",
    details: [
      "Todos los profesionales están verificados",
      "Portafolios con trabajos reales",
      "Calificaciones y reseñas detalladas",
      "Información de experiencia y especialidades"
    ],
    demoAction: "Ver perfil de María C."
  },
  {
    id: 3,
    title: "Selecciona Fecha y Hora",
    subtitle: "Agenda cuando te convenga",
    description: "Elige el momento perfecto con nuestro calendario inteligente que muestra disponibilidad en tiempo real.",
    icon: Calendar,
    color: "from-amber-500 to-orange-600",
    details: [
      "Disponibilidad en tiempo real",
      "Recordatorios automáticos",
      "Fácil reprogramación hasta 24h antes",
      "Sincronización con tu calendario personal"
    ],
    demoAction: "Agendar para mañana 2:00 PM"
  },
  {
    id: 4,
    title: "Confirma los Detalles",
    subtitle: "Revisa y personaliza tu reserva",
    description: "Añade preferencias especiales, confirma la ubicación y completa el pago de forma segura.",
    icon: CreditCard,
    color: "from-emerald-500 to-teal-600",
    details: [
      "Pago 100% seguro y encriptado",
      "Múltiples métodos de pago aceptados",
      "Agregar notas especiales o preferencias",
      "Confirmación instantánea por WhatsApp"
    ],
    demoAction: "Pagar RD$ 850"
  },
  {
    id: 5,
    title: "¡Listo! Prepárate para Brillar",
    subtitle: "Disfruta tu experiencia de belleza",
    description: "Recibe confirmación inmediata, recordatorios automáticos y prepárate para una experiencia increíble.",
    icon: Star,
    color: "from-violet-500 to-purple-600",
    details: [
      "Confirmación instantánea por WhatsApp",
      "Recordatorios 24h y 2h antes",
      "Información de contacto del profesional",
      "Guía de preparación personalizada"
    ],
    demoAction: "¡Reserva confirmada!"
  }
]

const bookingBenefits = [
  {
    icon: Clock,
    title: "Reserva en 2 Minutos",
    description: "Proceso optimizado para la máxima rapidez"
  },
  {
    icon: Shield,
    title: "100% Seguro",
    description: "Pagos encriptados y profesionales verificados"
  },
  {
    icon: Zap,
    title: "Confirmación Instantánea",
    description: "Recibe confirmación inmediata por WhatsApp"
  },
  {
    icon: Heart,
    title: "Satisfacción Garantizada",
    description: "98% de nuestros clientes repiten la experiencia"
  }
]

const bookingTips = [
  {
    question: "¿Cuánto tiempo antes debo reservar?",
    answer: "Recomendamos reservar con al menos 24 horas de anticipación para mayor disponibilidad. Sin embargo, muchos profesionales tienen horarios disponibles el mismo día."
  },
  {
    question: "¿Qué pasa si necesito cambiar mi cita?",
    answer: "Puedes cambiar o cancelar tu cita hasta 24 horas antes sin penalización. Desde tu perfil en 'Mis Reservas' o contactando directamente al profesional."
  },
  {
    question: "¿Cómo sé si un profesional es bueno?",
    answer: "Todos nuestros profesionales están verificados. Revisa su portafolio, lee las reseñas de otros clientes y verifica sus calificaciones antes de reservar."
  },
  {
    question: "¿Qué incluye el precio mostrado?",
    answer: "El precio incluye el servicio completo. Las propinas son opcionales. Algunos servicios pueden tener cargos adicionales por productos premium que se informan antes del pago."
  }
]

const successStories = [
  {
    name: "María José",
    service: "Manicure Gel",
    rating: 5,
    comment: "Súper fácil de usar! En menos de 3 minutos ya tenía mi cita agendada. La profesional fue increíble.",
    time: "Reservó en 2:30 min"
  },
  {
    name: "Ana Patricia",
    service: "Maquillaje para Evento",
    rating: 5,
    comment: "El proceso de reserva fue muy intuitivo. Me encantó poder ver el portafolio antes de decidir.",
    time: "Reservó en 1:45 min"
  },
  {
    name: "Carmen Elena",
    service: "Tratamiento Facial",
    rating: 5,
    comment: "Primera vez usando la app y quedé enamorada. Todo muy claro y la confirmación fue instantánea.",
    time: "Reservó en 2:15 min"
  }
]

export default function HowToBookPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [activeStep, setActiveStep] = useState(1)
  const [expandedTip, setExpandedTip] = useState<number | null>(null)
  const [bookingTime, setBookingTime] = useState("2:30")
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-rotate booking time display
  useEffect(() => {
    const interval = setInterval(() => {
      setBookingTime(prev => {
        const times = ["2:30", "1:45", "2:15", "1:58", "2:42"]
        const currentIndex = times.indexOf(prev)
        return times[(currentIndex + 1) % times.length]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Auto-rotate steps every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveStep(prev => {
          const nextStep = prev >= bookingSteps.length ? 1 : prev + 1
          return nextStep
        })
      }, 5000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])

  const handleStartBooking = () => {
    if (isAuthenticated) {
      router.push("/services")
    } else {
      setShowAuthModal(true)
    }
  }

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId)
    // Pause auto-rotation when user manually selects a step
    setIsPaused(true)
    // Resume after 10 seconds
    setTimeout(() => setIsPaused(false), 10000)
  }

  const toggleTip = (index: number) => {
    setExpandedTip(expandedTip === index ? null : index)
  }

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
    router.push("/services")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative lg:pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        {/* Floating Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-rose-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-amber-200 rounded-full opacity-25 animate-pulse delay-2000"></div>

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <BookOpen className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Guía Completa de Reservas</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-femfuel-dark mb-6 leading-tight">
            Tu Belleza, a Solo{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600 inline-block animate-pulse">
              {bookingTime} Minutos
            </span>{" "}
            de Distancia
          </h1>

          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Descubre lo fácil que es reservar con los mejores profesionales de belleza en República Dominicana.
            Un proceso simple, rápido y completamente seguro.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mb-12 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-femfuel-medium">98% Tasa de Éxito</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-femfuel-medium">500+ Profesionales</span>
            </div>
            <span className="text-gray-300">•</span>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-600" />
              <span className="text-femfuel-medium">Confirmación Instantánea</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleStartBooking}
              className="femfuel-button-lg group"
            >
              <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
              Comenzar a Reservar Ahora
            </button>
            <button className="glassmorphism-button-lg">
              <Clock className="h-5 w-5" />
              Ver Demo en Vivo
            </button>
          </div>

          {/* Hero Demo Cards */}
          <div className="relative max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Demo Card 1 */}
              <Card className="transform hover:scale-105 transition-all duration-300 border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Search className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-femfuel-dark text-sm">Buscar Servicio</h3>
                      <p className="text-xs text-femfuel-medium">Manicure gel</p>
                    </div>
                  </div>
                  <div className="text-xs text-femfuel-medium">23 profesionales cerca</div>
                </CardContent>
              </Card>

              {/* Demo Card 2 */}
              <Card className="transform hover:scale-105 transition-all duration-300 delay-150 border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-rose-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-femfuel-dark text-sm">Seleccionar Fecha</h3>
                      <p className="text-xs text-femfuel-medium">Mañana 2:00 PM</p>
                    </div>
                  </div>
                  <div className="text-xs text-femfuel-medium">Disponible ✓</div>
                </CardContent>
              </Card>

              {/* Demo Card 3 */}
              <Card className="transform hover:scale-105 transition-all duration-300 delay-300 border-none shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-femfuel-dark text-sm">Confirmado</h3>
                      <p className="text-xs text-femfuel-medium">RD$ 850</p>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-medium">¡Reserva exitosa!</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Step Guide */}
      <section className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              El Proceso Perfecto en 5 Pasos
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Cada paso está diseñado para ser intuitivo, rápido y completamente seguro.
              Haz clic en cada paso para ver los detalles.
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {bookingSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeStep === step.id
                    ? 'bg-gradient-to-r ' + step.color + ' text-white shadow-lg scale-105'
                    : 'bg-white text-femfuel-medium hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <step.icon className="h-4 w-4" />
                  Paso {step.id}
                </span>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          {bookingSteps.map((step) => (
            <div
              key={step.id}
              className={`transition-all duration-500 ${
                activeStep === step.id ? 'opacity-100 block' : 'opacity-0 hidden'
              }`}
            >
              <Card className="border-none shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${step.color} p-8 text-white`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <step.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{step.title}</h3>
                        <p className="text-white/90">{step.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-lg text-white/95 mb-6">{step.description}</p>

                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Smartphone className="h-4 w-4" />
                        <span className="font-medium">Demo:</span>
                      </div>
                      <p className="text-white/90">{step.demoAction}</p>
                    </div>
                  </div>

                  <div className="p-8">
                    <h4 className="text-lg font-semibold text-femfuel-dark mb-4">
                      Características destacadas:
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.details.map((detail, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-femfuel-medium">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Step Progress Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              {bookingSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeStep === step.id ? 'bg-femfuel-rose scale-125' : 'bg-gray-300'
                    }`}
                  />
                  {index < bookingSteps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-200 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/5 to-rose-500/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              ¿Por Qué Elegir FemFuel para Reservar?
            </h2>
            <p className="text-lg text-femfuel-medium">
              Experiencia optimizada para tu comodidad y tranquilidad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingBenefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-femfuel-medium text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Tips */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Tips para una Reserva Perfecta
            </h2>
            <p className="text-lg text-femfuel-medium">
              Respuestas a las preguntas más frecuentes sobre el proceso de reserva
            </p>
          </div>

          <div className="space-y-4">
            {bookingTips.map((tip, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleTip(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-femfuel-dark pr-4">
                      {tip.question}
                    </h3>
                    {expandedTip === index ? (
                      <ChevronUp className="h-5 w-5 text-femfuel-medium flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-femfuel-medium flex-shrink-0" />
                    )}
                  </button>

                  {expandedTip === index && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-femfuel-medium leading-relaxed">
                          {tip.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50/50 to-rose-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Historias de Éxito
            </h2>
            <p className="text-lg text-femfuel-medium">
              Lo que dicen nuestras clientas sobre el proceso de reserva
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-femfuel-medium mb-4 italic">
                    "{story.comment}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-femfuel-dark text-sm">
                        {story.name}
                      </h4>
                      <p className="text-xs text-femfuel-medium">
                        {story.service}
                      </p>
                    </div>
                    <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {story.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Lista para Tu Primera Reserva?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Únete a miles de mujeres que ya descubrieron la forma más fácil
            de reservar servicios de belleza en República Dominicana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartBooking}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 justify-center"
            >
              <Search className="h-5 w-5" />
              Reservar Ahora
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-3 justify-center">
              <BookOpen className="h-5 w-5" />
              Ver Más Guías
            </button>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode="signup"
      />
    </div>
  )
}