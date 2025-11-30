'use client'

import { useState } from "react"
import { Search, MessageSquare, Mail, MessageCircle, Clock, ChevronDown, ChevronUp, Star, Heart, Shield, Users, Headphones, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"

const faqCategories = [
  {
    id: "reservas",
    title: "Reservas y Citas",
    icon: Clock,
    questions: [
      {
        question: "¿Cómo puedo hacer una reserva?",
        answer: "Puedes hacer una reserva de tres formas: 1) Busca el servicio que deseas en nuestra página principal, 2) Explora profesionales en tu área, o 3) Visita directamente el perfil de tu salón favorito. Selecciona el profesional, elige fecha y hora disponible, y confirma tu reserva."
      },
      {
        question: "¿Puedo cambiar o cancelar mi cita?",
        answer: "Sí, puedes cambiar o cancelar tu cita hasta 24 horas antes del servicio sin penalización. Ve a 'Mis Reservas' en tu perfil para gestionar tus citas. Para cancelaciones con menos de 24 horas, puede aplicar una tarifa."
      },
      {
        question: "¿Qué pasa si llego tarde a mi cita?",
        answer: "Si llegas tarde, el profesional intentará acomodarte, pero puede que tengas que esperar o que se reduzca el tiempo de servicio. Te recomendamos llegar 10 minutos antes de tu cita programada."
      },
      {
        question: "¿Puedo reservar múltiples servicios?",
        answer: "¡Por supuesto! Puedes reservar múltiples servicios en la misma sesión. Durante el proceso de reserva, selecciona 'Agregar otro servicio' y elige servicios adicionales con el mismo profesional o diferentes."
      }
    ]
  },
  {
    id: "pagos",
    title: "Pagos y Precios",
    icon: FileText,
    questions: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos tarjetas de crédito/débito (Visa, Mastercard), transferencias bancarias, y pago en efectivo directamente en el salón. Algunos profesionales también aceptan pagos móviles."
      },
      {
        question: "¿Los precios incluyen propinas?",
        answer: "Los precios mostrados no incluyen propinas. La propina es opcional y puedes añadirla al finalizar el servicio a través de la app o darla directamente al profesional."
      },
      {
        question: "¿Hay descuentos por servicios múltiples?",
        answer: "Muchos profesionales ofrecen paquetes con descuentos por múltiples servicios. Estos aparecerán automáticamente durante la reserva si están disponibles."
      },
      {
        question: "¿Qué pasa si no estoy satisfecha con el servicio?",
        answer: "Tu satisfacción es importante para nosotros. Si no estás conforme, contacta al profesional primero. Si no se resuelve, contáctanos y evaluaremos opciones como reembolso parcial o servicio correctivo gratuito."
      }
    ]
  },
  {
    id: "profesionales",
    title: "Profesionales y Salones",
    icon: Users,
    questions: [
      {
        question: "¿Cómo se seleccionan los profesionales?",
        answer: "Todos nuestros profesionales pasan por un proceso de verificación que incluye: licencias profesionales, portafolio de trabajos, referencias, y entrevista personal. Solo aceptamos profesionales con experiencia comprobada."
      },
      {
        question: "¿Puedo ver trabajos anteriores del profesional?",
        answer: "Sí, cada profesional tiene un portafolio con fotos de sus trabajos, reseñas de clientes anteriores, y detalles de su experiencia. También puedes ver sus especialidades y certificaciones."
      },
      {
        question: "¿Qué hago si mi profesional cancela?",
        answer: "Si un profesional cancela, te notificaremos inmediatamente y te ayudaremos a reprogramar con el mismo profesional u otro disponible en horarios similares, sin costo adicional."
      },
      {
        question: "¿Puedo solicitar un profesional específico?",
        answer: "¡Absolutamente! Puedes buscar y reservar directamente con profesionales específicos. También puedes marcarlos como favoritos para reservas futuras más fáciles."
      }
    ]
  },
  {
    id: "cuenta",
    title: "Mi Cuenta",
    icon: Heart,
    questions: [
      {
        question: "¿Cómo creo una cuenta?",
        answer: "Crear una cuenta es muy fácil. Haz clic en 'Registrarse', ingresa tu email y crea una contraseña, o regístrate usando Google/Facebook. Verificaremos tu email y listo."
      },
      {
        question: "¿Puedo cambiar mi información personal?",
        answer: "Sí, ve a 'Configuración' en tu perfil para actualizar tu información personal, foto de perfil, preferencias de notificaciones, y métodos de pago."
      },
      {
        question: "¿Cómo funcionan los favoritos?",
        answer: "Puedes marcar profesionales y salones como favoritos para encontrarlos rápidamente. Ve a tu perfil y selecciona 'Favoritos' para ver todos tus profesionales guardados."
      },
      {
        question: "¿Es segura mi información personal?",
        answer: "Absolutamente. Usamos encriptación SSL y seguimos estrictos protocolos de seguridad. Nunca compartimos tu información personal con terceros sin tu consentimiento."
      }
    ]
  },
  {
    id: "app",
    title: "Uso de la App",
    icon: Shield,
    questions: [
      {
        question: "¿La app es gratuita?",
        answer: "Sí, FemFuel Beauty es completamente gratuita para clientes. No hay tarifas de membresía ni costos ocultos. Solo pagas por los servicios de belleza que reserves."
      },
      {
        question: "¿Funciona en toda República Dominicana?",
        answer: "Actualmente operamos en las principales ciudades: Santo Domingo, Santiago, Puerto Plata, y La Romana. Estamos expandiéndonos constantemente a nuevas áreas."
      },
      {
        question: "¿Puedo usar la app sin internet?",
        answer: "Necesitas conexión a internet para hacer reservas y ver información actualizada. Sin embargo, puedes ver tus reservas confirmadas y información básica sin conexión."
      },
      {
        question: "¿Hay una app móvil?",
        answer: "¡Sí! Tenemos apps nativas para iOS y Android. Búscanos como 'FemFuel Beauty' en App Store o Google Play, o usa nuestra versión web optimizada para móviles."
      }
    ]
  }
]

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Chat en Vivo",
    description: "Respuesta inmediata",
    detail: "Lun-Dom: 8:00 AM - 10:00 PM",
    action: "Iniciar Chat",
    primary: true
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    description: "+1 (809) 555-0123",
    detail: "Lun-Dom: 9:00 AM - 9:00 PM",
    action: "WhatsApp",
    primary: false
  },
  {
    icon: Mail,
    title: "Email",
    description: "help@femfuelbeauty.com",
    detail: "Respuesta en 24 horas",
    action: "Enviar Email",
    primary: false
  }
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category =>
    selectedCategory === "all" ||
    category.id === selectedCategory ||
    category.questions.length > 0
  )

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const questionId = `${categoryId}-${questionIndex}`
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
  }

  const handleContact = (method: string) => {
    switch(method) {
      case "chat":
        // TODO: Implement chat functionality
        break
      case "whatsapp":
        window.open("https://wa.me/18095550123?text=Hola,%20necesito%20ayuda%20con%20FemFuel%20Beauty")
        break
      case "email":
        window.open("mailto:help@femfuelbeauty.com?subject=Necesito ayuda con FemFuel Beauty")
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative lg:pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Headphones className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Centro de Ayuda</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            ¿En qué podemos <span className="text-purple-600">ayudarte</span>?
          </h1>

          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Encuentra respuestas rápidas a tus preguntas o contáctanos directamente.
            Estamos aquí para hacer tu experiencia perfecta.
          </p>

          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar en FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-femfuel-rose min-h-[48px]"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-sm text-femfuel-medium">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-600" />
              <span>98% Problemas Resueltos</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span>Respuesta Promedio: 5 min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section id="contacto" className="py-16 px-4 bg-gradient-to-br from-purple-50/30 to-rose-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Contáctanos Directamente
            </h2>
            <p className="text-lg text-femfuel-medium">
              ¿Necesitas ayuda inmediata? Elige tu método preferido de contacto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className={`bg-white/80 backdrop-blur-md border-2 ${
                  method.primary ? 'border-femfuel-rose/20 ring-2 ring-femfuel-rose/20' : 'border-femfuel-rose/10'
                } shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 group cursor-pointer rounded-2xl`}
                onClick={() => handleContact(method.title.toLowerCase().includes('chat') ? 'chat' : method.title.toLowerCase().includes('whatsapp') ? 'whatsapp' : 'email')}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full shadow-md flex items-center justify-center ${
                    method.primary
                      ? 'bg-gradient-to-br from-femfuel-rose to-pink-600 text-white'
                      : method.title === 'WhatsApp'
                      ? 'bg-gradient-to-br from-green-100 to-green-50 text-green-600 group-hover:from-green-500 group-hover:to-green-600 group-hover:text-white'
                      : 'bg-gradient-to-br from-purple-100 to-purple-50 text-purple-600 group-hover:from-purple-500 group-hover:to-purple-600 group-hover:text-white'
                  } transition-all duration-300`}>
                    <method.icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-lg font-bold text-femfuel-dark mb-2">
                    {method.title}
                  </h3>

                  <p className="text-femfuel-medium mb-2">
                    {method.description}
                  </p>

                  <p className="text-sm text-gray-700 mb-4">
                    {method.detail}
                  </p>

                  <button className={`w-full min-h-[44px] py-2 px-4 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 ${
                    method.primary
                      ? 'bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white'
                      : method.title === 'WhatsApp'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                      : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
                  }`}>
                    {method.action}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories Filter */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? 'bg-femfuel-rose text-white shadow-lg'
                  : 'bg-white text-femfuel-medium hover:bg-rose-50 active:bg-rose-50 hover:text-femfuel-rose border border-gray-200'
              }`}
            >
              Todas las Categorías
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white text-femfuel-medium hover:bg-purple-50 active:bg-purple-50 hover:text-purple-600 border border-gray-200'
                }`}
              >
                <category.icon className="h-4 w-4" />
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-femfuel-medium">
              Encuentra respuestas a las preguntas más comunes sobre FemFuel Beauty
            </p>
          </div>

          <div className="space-y-8">
            {filteredFAQs.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-md flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark">
                    {category.title}
                  </h3>
                  <div className="text-sm text-femfuel-medium bg-gradient-to-br from-purple-50 to-rose-50 px-3 py-1 rounded-full">
                    {category.questions.length} preguntas
                  </div>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, index) => {
                    const questionId = `${category.id}-${index}`
                    const isExpanded = expandedQuestion === questionId

                    return (
                      <Card key={index} className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all duration-300 rounded-xl">
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleQuestion(category.id, index)}
                            className="w-full min-h-[44px] p-6 text-left flex items-center justify-between hover:bg-purple-50/50 active:bg-purple-50/50 transition-colors rounded-xl"
                          >
                            <h4 className="text-lg font-medium text-femfuel-dark pr-4">
                              {faq.question}
                            </h4>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-femfuel-medium flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-femfuel-medium flex-shrink-0" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="px-6 pb-6">
                              <div className="pt-4 border-t border-purple-100">
                                <p className="text-gray-700 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFAQs.every(category => category.questions.length === 0) && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-femfuel-dark mb-2">
                No encontramos resultados
              </h3>
              <p className="text-femfuel-medium mb-6">
                Intenta con otros términos de búsqueda o contáctanos directamente
              </p>
              <button
                onClick={() => handleContact('chat')}
                className="femfuel-button-lg min-h-[48px]"
              >
                Contactar Soporte
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-500/10 to-rose-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-rose-100 shadow-md flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            ¿Aún necesitas ayuda?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de soporte está listo para ayudarte. Contáctanos por chat,
            teléfono o email y resolveremos tu consulta rápidamente.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleContact('chat')}
              className="min-h-[48px] bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center gap-3 justify-center"
            >
              Iniciar Chat en Vivo
            </button>
            <button
              onClick={() => handleContact('email')}
              className="min-h-[48px] border-2 border-femfuel-rose/20 hover:border-femfuel-rose hover:bg-purple-50 active:bg-purple-50 px-8 py-4 rounded-full font-bold text-femfuel-dark transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-3 justify-center"
            >
              Enviar Email
            </button>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}