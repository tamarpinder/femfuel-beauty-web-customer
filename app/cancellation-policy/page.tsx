'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Clock, XCircle, AlertCircle, CheckCircle, Shield, CreditCard, RefreshCw, FileText, MessageSquare, ChevronDown, ChevronUp, Calendar, DollarSign, Info, Zap, Phone, Mail, AlertTriangle, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"

const cancellationTiers = [
  {
    id: "free",
    title: "Cancelación Gratuita",
    timeframe: "24+ horas antes",
    icon: CheckCircle,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "text-green-600",
    refund: "100%",
    fee: "RD$ 0",
    features: [
      "Reembolso completo garantizado",
      "Sin penalizaciones",
      "Opción de reprogramar ilimitada",
      "Sin afectar tu reputación"
    ],
    description: "Cancela con total tranquilidad con más de 24 horas de anticipación."
  },
  {
    id: "late",
    title: "Cancelación Tardía",
    timeframe: "2-24 horas antes",
    icon: AlertCircle,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    iconColor: "text-amber-600",
    refund: "50%",
    fee: "50% del servicio",
    features: [
      "50% de reembolso o crédito",
      "Opción de crédito completo para futura reserva",
      "Una reprogramación gratuita",
      "Afectación mínima a tu historial"
    ],
    description: "Se aplica una tarifa del 50% para cancelaciones con poca anticipación."
  },
  {
    id: "lastminute",
    title: "Cancelación de Última Hora",
    timeframe: "Menos de 2 horas",
    icon: XCircle,
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    iconColor: "text-red-600",
    refund: "0%",
    fee: "100% del servicio",
    features: [
      "Sin reembolso disponible",
      "Cargo completo del servicio",
      "Excepciones por emergencias médicas",
      "Afecta tu puntuación de cliente"
    ],
    description: "El cargo completo se aplica para proteger el tiempo del profesional."
  }
]

const specialCircumstances = [
  {
    icon: Shield,
    title: "Emergencias Médicas",
    description: "Con certificado médico, reembolso completo sin importar el tiempo.",
    action: "Requiere documentación"
  },
  {
    icon: AlertTriangle,
    title: "Desastres Naturales",
    description: "Cancelación gratuita en caso de huracanes, terremotos o emergencias nacionales.",
    action: "Automático"
  },
  {
    icon: XCircle,
    title: "Cancelación del Profesional",
    description: "Reembolso completo + 20% de crédito adicional para tu próxima reserva.",
    action: "Compensación incluida"
  },
  {
    icon: Zap,
    title: "Errores de la Plataforma",
    description: "Reembolso inmediato si el error es de nuestro sistema.",
    action: "Resolución prioritaria"
  }
]

const howToCancel = [
  {
    step: 1,
    title: "Accede a tus Reservas",
    description: "Ve a 'Mis Reservas' en tu perfil o desde el menú principal.",
    icon: Calendar
  },
  {
    step: 2,
    title: "Selecciona la Cita",
    description: "Encuentra la reserva que deseas cancelar y haz clic en ella.",
    icon: CheckCircle
  },
  {
    step: 3,
    title: "Elige Cancelar",
    description: "Presiona el botón 'Cancelar Reserva' y selecciona el motivo.",
    icon: XCircle
  },
  {
    step: 4,
    title: "Confirma y Recibe Reembolso",
    description: "Confirma la cancelación y recibe tu reembolso según la política aplicable.",
    icon: CreditCard
  }
]

const faqs = [
  {
    question: "¿Qué pasa si el profesional llega tarde?",
    answer: "Si el profesional llega más de 15 minutos tarde, puedes cancelar sin penalización y recibir un reembolso completo, además de un 10% de crédito adicional para tu próxima reserva."
  },
  {
    question: "¿Puedo transferir mi reserva a otra persona?",
    answer: "Sí, puedes transferir tu reserva a otra persona hasta 2 horas antes del servicio. Solo necesitas actualizar los datos del cliente en la reserva."
  },
  {
    question: "¿Cómo funciona el crédito vs. reembolso?",
    answer: "Puedes elegir entre un reembolso en efectivo (3-5 días hábiles) o un crédito instantáneo en tu cuenta FemFuel con un 10% adicional de bonus."
  },
  {
    question: "¿Qué pasa si no me presento sin avisar?",
    answer: "Los 'no-shows' se cobran al 100% y afectan negativamente tu puntuación como cliente. Después de 3 no-shows, tu cuenta puede ser suspendida temporalmente."
  },
  {
    question: "¿Puedo cancelar servicios múltiples?",
    answer: "Cada servicio en una reserva múltiple puede cancelarse individualmente, aplicando la política correspondiente a cada uno según su horario."
  },
  {
    question: "¿Hay excepciones para clientes frecuentes?",
    answer: "Los clientes VIP (más de 10 reservas completadas) tienen una cancelación gratuita adicional al mes, sin importar el tiempo de anticipación."
  }
]

export default function CancellationPolicyPage() {
  const router = useRouter()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [selectedTier, setSelectedTier] = useState("free")

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const handleManageBookings = () => {
    router.push("/bookings")
  }

  const handleContactSupport = () => {
    router.push("/help#contacto")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative lg:pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <FileText className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Política Actualizada - Enero 2025</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">Cancelación</span> y Reembolsos
          </h1>

          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            En FemFuel Beauty entendemos que los planes pueden cambiar.
            Nuestra política está diseñada para ser justa tanto para ti como para nuestros profesionales.
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">24h</div>
              <div className="text-sm text-femfuel-medium">Cancelación Gratuita</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-sm text-femfuel-medium">Clientes Satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-600">3-5</div>
              <div className="text-sm text-femfuel-medium">Días para Reembolso</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Visual */}
      <section className="py-16 px-4 bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-12 text-center">
            Ventanas de Cancelación
          </h2>

          {/* Timeline */}
          <div className="relative mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-2 bg-gradient-to-r from-green-400 via-amber-400 to-red-400 rounded-full"></div>
            </div>

            <div className="relative grid grid-cols-3 gap-4">
              {cancellationTiers.map((tier, index) => (
                <div
                  key={tier.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setSelectedTier(tier.id)}
                >
                  <div className={`w-16 h-16 ${tier.bgColor} rounded-full flex items-center justify-center mb-3 transition-transform ${selectedTier === tier.id ? 'ring-4 ring-offset-2 ring-purple-500' : ''}`}>
                    <tier.icon className={`h-8 w-8 ${tier.iconColor}`} />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-femfuel-dark text-sm">{tier.timeframe}</h3>
                    <p className="text-xs text-femfuel-medium">{tier.refund} reembolso</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {cancellationTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`bg-white/80 backdrop-blur-md border-2 ${tier.borderColor} ${selectedTier === tier.id ? 'shadow-2xl scale-105' : 'shadow-lg'} hover:shadow-xl active:scale-95 transition-all duration-300 cursor-pointer rounded-2xl`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex p-3 rounded-lg ${tier.bgColor} mb-4`}>
                    <tier.icon className={`h-6 w-6 ${tier.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-bold text-femfuel-dark mb-2">
                    {tier.title}
                  </h3>

                  <p className="text-sm text-femfuel-medium mb-4">
                    {tier.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-femfuel-dark">Reembolso:</span>
                      <span className={`font-bold ${tier.id === 'free' ? 'text-green-600' : tier.id === 'late' ? 'text-amber-600' : 'text-red-600'}`}>
                        {tier.refund}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-femfuel-dark">Cargo:</span>
                      <span className="font-bold text-femfuel-dark">{tier.fee}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className={`h-4 w-4 ${tier.iconColor} mt-0.5 flex-shrink-0`} />
                        <span className="text-xs text-femfuel-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Circumstances */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50/50 to-rose-50/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4 text-center">
            Circunstancias Especiales
          </h2>
          <p className="text-lg text-femfuel-medium text-center mb-12 max-w-2xl mx-auto">
            Entendemos que hay situaciones excepcionales. Aquí están nuestras políticas especiales.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialCircumstances.map((circumstance, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 rounded-2xl">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-md flex items-center justify-center mb-4">
                    <circumstance.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-femfuel-dark mb-2">
                    {circumstance.title}
                  </h3>
                  <p className="text-sm text-femfuel-medium mb-3">
                    {circumstance.description}
                  </p>
                  <div className="inline-flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    <Info className="h-3 w-3" />
                    {circumstance.action}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to Cancel */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-12 text-center">
            ¿Cómo Cancelar tu Reserva?
          </h2>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {howToCancel.map((step, index) => (
              <div key={step.step} className="relative h-full">
                {index < howToCancel.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-purple-200"></div>
                )}
                <div className="relative bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl p-6 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 text-center h-full flex flex-col min-h-[280px]">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-rose-100 rounded-full shadow-md flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full text-sm font-bold mb-3 mx-auto">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-femfuel-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-femfuel-medium flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-rose-50 border-2 border-femfuel-rose/20 rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-xl font-semibold text-femfuel-dark mb-4">
              ¿Necesitas Cancelar Ahora?
            </h3>
            <p className="text-gray-700 mb-6">
              Accede a tus reservas y gestiona tus citas fácilmente
            </p>
            <button
              onClick={handleManageBookings}
              className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <Calendar className="h-5 w-5" />
              Gestionar Mis Reservas
            </button>
          </div>
        </div>
      </section>

      {/* Refund Process */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-12 text-center">
            Proceso de Reembolso
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-50 rounded-full shadow-md flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-femfuel-dark">Reembolso en Efectivo</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-femfuel-dark">3-5 días hábiles</p>
                      <p className="text-sm text-femfuel-medium">Para tarjetas de crédito/débito</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-femfuel-dark">1-2 días hábiles</p>
                      <p className="text-sm text-femfuel-medium">Para transferencias bancarias</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-femfuel-dark">Notificación por email</p>
                      <p className="text-sm text-femfuel-medium">Confirmación cuando se procese</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full shadow-md flex items-center justify-center">
                    <RefreshCw className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-femfuel-dark">Crédito FemFuel</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-femfuel-dark">Instantáneo</p>
                      <p className="text-sm text-femfuel-medium">Disponible inmediatamente en tu cuenta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-femfuel-dark">+10% bonus adicional</p>
                      <p className="text-sm text-femfuel-medium">Recibe más valor por elegir crédito</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-femfuel-dark">Sin vencimiento</p>
                      <p className="text-sm text-femfuel-medium">Úsalo cuando quieras</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50/50 to-rose-50/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4 text-center">
            Preguntas Frecuentes sobre Cancelaciones
          </h2>
          <p className="text-lg text-femfuel-medium text-center mb-12">
            Respuestas a las dudas más comunes sobre nuestra política
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all duration-300 rounded-xl">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-medium text-femfuel-dark pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-femfuel-medium flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-femfuel-medium flex-shrink-0" />
                    )}
                  </button>

                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-femfuel-medium leading-relaxed">
                          {faq.answer}
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

      {/* Contact Support CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md shadow-xl flex items-center justify-center mx-auto mb-6">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Estamos Aquí para Ayudarte
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Si tienes alguna situación especial o necesitas asistencia con tu cancelación,
            nuestro equipo de soporte está disponible para ayudarte.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContactSupport}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3 justify-center"
            >
              <MessageSquare className="h-5 w-5" />
              Contactar Soporte
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3 justify-center">
              <FileText className="h-5 w-5" />
              Descargar Política PDF
            </button>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}