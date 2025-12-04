'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, Users, MapPin, Clock, Globe, Sparkles, Mail, ChevronRight, Star, TrendingUp, Zap, Award, Coffee, Laptop, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"

const jobOpenings = [
  {
    title: "Marketing Digital",
    department: "Marketing",
    location: "Remote / Santo Domingo",
    type: "Tiempo Completo",
    description: "Ayuda a hacer crecer nuestra presencia digital y conectar con más mujeres dominicanas. Gestiona redes sociales, campañas digitales y análisis de mercado.",
    requirements: [
      "Experiencia en redes sociales y marketing digital",
      "Conocimiento del mercado dominicano",
      "Creatividad para contenido visual y escrito",
      "Familiaridad con Google Ads y Facebook Ads"
    ],
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Desarrollador Frontend",
    department: "Tecnología",
    location: "Remote",
    type: "Tiempo Completo",
    description: "Mejora la experiencia de nuestras usuarias desarrollando funcionalidades que realmente importen. Trabaja con React, Next.js y diseño responsivo.",
    requirements: [
      "3+ años experiencia con React/Next.js",
      "Conocimiento en TypeScript y Tailwind CSS",
      "Experiencia con APIs REST",
      "Pasión por UX/UI y experiencia móvil"
    ],
    icon: Laptop,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Community Manager",
    department: "Marketing",
    location: "Santo Domingo",
    type: "Tiempo Completo",
    description: "Construye relaciones sólidas con nuestros profesionales y clientas. Representa la voz de FemFuel en eventos, redes sociales y la comunidad.",
    requirements: [
      "Experiencia en gestión de comunidades",
      "Excelentes habilidades de comunicación",
      "Conocimiento de la industria de la belleza",
      "Capacidad para eventos presenciales"
    ],
    icon: Users,
    color: "bg-rose-100 text-rose-600"
  },
  {
    title: "Pasante de Marketing",
    department: "Marketing",
    location: "Santo Domingo / Remote",
    type: "Medio Tiempo",
    description: "Oportunidad perfecta para estudiantes que quieren aprender marketing digital en una startup en crecimiento. Apoyas campañas, análisis y contenido.",
    requirements: [
      "Estudiante de Marketing, Comunicación o afín",
      "Conocimientos básicos de redes sociales",
      "Proactividad y ganas de aprender",
      "Disponibilidad de 20 horas semanales"
    ],
    icon: BookOpen,
    color: "bg-amber-100 text-amber-600"
  }
]

const benefits = [
  {
    icon: Heart,
    title: "Salario Competitivo",
    description: "Compensación justa según el mercado dominicano con revisiones regulares"
  },
  {
    icon: TrendingUp,
    title: "Crecimiento Acelerado",
    description: "Crece profesionalmente mientras la empresa se expande por el Caribe"
  },
  {
    icon: Laptop,
    title: "Trabajo Remoto",
    description: "Flexibilidad para trabajar desde casa o nuestra oficina en Santo Domingo"
  },
  {
    icon: Award,
    title: "Equidad Temprana",
    description: "Oportunidad de equity como miembro fundacional del equipo"
  },
  {
    icon: Coffee,
    title: "Horarios Flexibles",
    description: "Balance vida-trabajo con horarios adaptados a tu productividad"
  },
  {
    icon: Users,
    title: "Mentorización Directa",
    description: "Aprende directamente de Dianna y el equipo fundador"
  }
]

const teamValues = [
  {
    title: "Impacto Real",
    description: "Cada línea de código y cada campaña impacta directamente a miles de mujeres dominicanas",
    icon: Sparkles
  },
  {
    title: "Transparencia Total",
    description: "Compartimos métricas, desafíos y decisiones abiertamente con todo el equipo",
    icon: Globe
  },
  {
    title: "Crecimiento Conjunto",
    description: "Tu crecimiento profesional está directamente ligado al éxito de FemFuel",
    icon: TrendingUp
  },
  {
    title: "Diversidad e Inclusión",
    description: "Celebramos la diversidad y creamos un espacio seguro para todas las identidades",
    icon: Heart
  }
]

export default function CareersPage() {
  const router = useRouter()
  const [selectedJob, setSelectedJob] = useState<number | null>(null)

  const handleApply = (jobTitle: string) => {
    const subject = `Aplicación para ${jobTitle} - FemFuel Beauty`
    const body = `Hola equipo de FemFuel,

Estoy interesado/a en la posición de ${jobTitle}.

[Adjunta tu CV y cuéntanos por qué quieres revolucionar la belleza en República Dominicana]

Saludos,
[Tu nombre]`

    window.open(`mailto:jobs@femfuelbeauty.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative lg:pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        <div className="max-w-6xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Únete al Equipo</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Construye el Futuro de la{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
              Belleza Dominicana
            </span>
          </h1>

          <p className="text-xl text-femfuel-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            Somos un equipo apasionado de <strong className="text-femfuel-dark">8 personas</strong> revolucionando
            como las mujeres dominicanas acceden a servicios de belleza. Únete a nosotros y ayuda a
            construir algo que realmente impacte a miles de vidas.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-femfuel-medium">Miembros del Equipo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">2025</div>
              <div className="text-sm text-femfuel-medium">Año de Fundación</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">∞</div>
              <div className="text-sm text-femfuel-medium">Potencial de Crecimiento</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50/30 to-rose-50/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Posiciones Abiertas
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Cada rol tiene un impacto directo en el crecimiento de FemFuel y el empoderamiento
              de la mujer dominicana. ¿Cuál es tu superpoder?
            </p>
          </div>

          <div className="grid gap-6">
            {jobOpenings.map((job, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-300 cursor-pointer rounded-2xl"
                onClick={() => setSelectedJob(selectedJob === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl shadow-md flex items-center justify-center ${job.color}`}>
                        <job.icon className="h-6 w-6" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-femfuel-dark">{job.title}</h3>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                            {job.type}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-femfuel-medium mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {job.department}
                          </div>
                        </div>

                        <p className="text-femfuel-medium leading-relaxed">
                          {job.description}
                        </p>

                        {selectedJob === index && (
                          <div className="mt-6 pt-6 border-t border-gray-100">
                            <h4 className="font-semibold text-femfuel-dark mb-3">¿Qué buscamos?</h4>
                            <ul className="space-y-2 mb-6">
                              {job.requirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="flex items-start gap-2 text-femfuel-medium">
                                  <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                                  {req}
                                </li>
                              ))}
                            </ul>

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleApply(job.title)
                              }}
                              className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center gap-2"
                            >
                              <Mail className="h-4 w-4" />
                              Aplicar a {job.title}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <ChevronRight
                      className={`h-5 w-5 text-femfuel-medium transition-transform ${
                        selectedJob === index ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Culture */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              ¿Por Qué Elegir FemFuel?
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              No somos una startup más. Somos una misión con personas increíbles construyendo
              el futuro de la belleza en República Dominicana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl shadow-md flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-purple-600" />
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

          {/* Team Values */}
          <div className="bg-gradient-to-r from-purple-50 to-rose-50 border-2 border-femfuel-rose/20 rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-femfuel-dark mb-4">
                Nuestros Valores
              </h3>
              <p className="text-gray-700">
                Lo que nos define como equipo y guía cada decisión que tomamos
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {teamValues.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center flex-shrink-0">
                    <value.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-femfuel-dark mb-2">
                      {value.title}
                    </h4>
                    <p className="text-femfuel-medium text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50/30 to-rose-50/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-6">
            Proceso de Aplicación
          </h2>

          <div className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl p-8 shadow-xl mb-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full shadow-md flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-femfuel-dark mb-2">Envía tu CV</h3>
                <p className="text-sm text-femfuel-medium">
                  Cuéntanos tu historia y por qué quieres unirte a nuestra misión
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-50 rounded-full shadow-md flex items-center justify-center mx-auto mb-4">
                  <span className="text-rose-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-femfuel-dark mb-2">Conversación</h3>
                <p className="text-sm text-gray-700">
                  Dianna y el equipo revisarán tu aplicación personalmente
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full shadow-md flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-femfuel-dark mb-2">¡Bienvenido/a!</h3>
                <p className="text-sm text-femfuel-medium">
                  Comienza a construir el futuro de la belleza dominicana
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-rose-50 border-2 border-femfuel-rose/20 rounded-2xl shadow-lg p-6 mb-8">
            <p className="text-femfuel-dark font-medium mb-2">
              📧 Envía tu aplicación a: <span className="text-purple-600">jobs@femfuelbeauty.com</span>
            </p>
            <p className="text-sm text-gray-700">
              Incluye tu CV y cuéntanos por qué quieres revolucionar la industria de la belleza en República Dominicana.
              Dianna revisa personalmente cada aplicación.
            </p>
          </div>

          <button
            onClick={() => handleApply("Posición General")}
            className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <Mail className="h-5 w-5" />
            Enviar Aplicación
          </button>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}