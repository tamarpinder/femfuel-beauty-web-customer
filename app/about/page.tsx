'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Heart, Star, Users, Award, MapPin, TrendingUp, Globe, Sparkles, Target, Lightbulb, Zap, Quote, ArrowRight, Play, Calendar, ShieldCheck, Crown, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"
import { AuthModal } from "@/components/auth-modal"
import Image from "next/image"

const impactMetrics = [
  {
    icon: Users,
    number: "800+",
    label: "Mujeres Conectadas",
    description: "Clientas registradas en Santo Domingo y Santiago"
  },
  {
    icon: Crown,
    number: "25+",
    label: "Profesionales Verificados",
    description: "Especialistas certificados en 3 provincias"
  },
  {
    icon: Calendar,
    number: "500+",
    label: "Citas Completadas",
    description: "Servicios exitosos desde nuestro lanzamiento"
  },
  {
    icon: Heart,
    number: "97.5%",
    label: "Satisfacción Cliente",
    description: "Calificación promedio de nuestros servicios"
  },
  {
    icon: TrendingUp,
    number: "150%",
    label: "Crecimiento Mensual",
    description: "Expansión acelerada mes a mes"
  },
  {
    icon: Sparkles,
    number: "50+",
    label: "Productos Disponibles",
    description: "Productos de belleza especializados"
  }
]

const timelineEvents = [
  {
    year: "2025",
    title: "El Sueño Nace",
    description: "Dianna identifica la necesidad de una plataforma integral de belleza en República Dominicana.",
    icon: Lightbulb,
    color: "bg-purple-100 text-purple-600"
  },
  {
    year: "2025",
    title: "Primeros Pasos",
    description: "Lanzamiento del MVP con 25 profesionales en Santo Domingo y Santiago.",
    icon: Zap,
    color: "bg-blue-100 text-blue-600"
  },
  {
    year: "2026",
    title: "Expansión Nacional",
    description: "FemFuel se expande a 5 provincias clave, estableciendo presencia sólida en el mercado dominicano.",
    icon: Globe,
    color: "bg-green-100 text-green-600"
  },
  {
    year: "2027",
    title: "Liderazgo Regional",
    description: "Planes de expansión hacia el Caribe, posicionándose como referente regional en tecnología de belleza.",
    icon: Crown,
    color: "bg-amber-100 text-amber-600"
  }
]

const coreValues = [
  {
    icon: Heart,
    title: "Empoderamiento Femenino",
    description: "Creemos en el poder de las mujeres dominicanas para transformar la industria de la belleza y crear oportunidades económicas sostenibles."
  },
  {
    icon: ShieldCheck,
    title: "Calidad Garantizada",
    description: "Cada profesional en nuestra plataforma es verificado y certificado, asegurando la mejor experiencia para nuestras clientas."
  },
  {
    icon: Globe,
    title: "Acceso Universal",
    description: "Democratizamos el acceso a servicios de belleza premium en todo el territorio dominicano, desde las grandes ciudades hasta las comunidades más pequeñas."
  },
  {
    icon: Zap,
    title: "Innovación Continua",
    description: "Utilizamos tecnología de vanguardia para simplificar la experiencia de belleza y crear soluciones que realmente importen."
  }
]

const featuredStories = [
  {
    name: "María Fernanda García",
    role: "Estilista Profesional",
    location: "Santiago",
    image: "/testimonial-maria.jpg",
    quote: "FemFuel me ayudó a duplicar mis ingresos en 6 meses. Ahora tengo clientes de toda la región del Cibao.",
    impact: "Ingresos aumentaron 150%"
  },
  {
    name: "Ana Lucía Martínez",
    role: "Cliente Frecuente",
    location: "Puerto Plata",
    image: "/testimonial-ana.jpg",
    quote: "Antes tenía que viajar a Santiago para encontrar servicios de calidad. Ahora los mejores profesionales están a mi alcance.",
    impact: "Ahorra 3 horas por cita"
  },
  {
    name: "Carmen Rosario",
    role: "Propietaria de Spa",
    location: "La Romana",
    image: "/testimonial-carmen.jpg",
    quote: "Mi pequeño spa ahora compite con los grandes salones de la capital. FemFuel niveló el campo de juego.",
    impact: "400% más reservas"
  }
]

const recognitions = [
  {
    award: "Startup del Año 2025",
    organization: "Asociación de Emprendedores RD",
    description: "Reconocimiento por innovación en tecnología aplicada a la belleza"
  },
  {
    award: "Mejor Plataforma Digital",
    organization: "Premio Nacional de Tecnología",
    description: "Excelencia en experiencia de usuario y diseño"
  },
  {
    award: "Impacto Social Femenino",
    organization: "Ministerio de la Mujer RD",
    description: "Contribución al empoderamiento económico de la mujer dominicana"
  }
]

export default function AboutPage() {
  const router = useRouter()
  const [activeStory, setActiveStory] = useState(0)
  const [showAuthModal, setShowAuthModal] = useState(false)

  const handleJoinPlatform = () => {
    router.push("/services")
  }

  const handleBecomeProfessional = () => {
    window.open("https://femfuel-beauty-web-vendor.vercel.app/how-it-works", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative lg:pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-purple-600 font-medium text-sm">Fundadora</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
                La Visión de<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
                  Dianna Rincon
                </span>
              </h1>

              <p className="text-xl text-femfuel-medium mb-8 leading-relaxed">
                <strong className="text-femfuel-dark">"Toda mujer dominicana merece acceso a servicios de belleza de calidad,
                sin importar dónde viva."</strong> Desde esta convicción nació FemFuel Beauty,
                la primera plataforma que conecta a profesionales verificados con clientas
                en toda República Dominicana.
              </p>


              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="femfuel-button-lg min-h-[48px]"
                >
                  <Heart className="h-5 w-5" />
                  Únete a la Revolución
                </button>
                <button className="glassmorphism-button-lg min-h-[48px]">
                  <Play className="h-5 w-5" />
                  Ver Su Historia
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-rose-600/20 z-10"></div>
                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-200 to-rose-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Crown className="h-16 w-16 text-rose-600" />
                    </div>
                    <p className="text-femfuel-medium font-medium">Dianna Rincon</p>
                    <p className="text-sm text-rose-600">Fundadora, FemFuel Beauty</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}

            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              El Impacto de Nuestra Misión
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Cada número representa vidas transformadas, sueños cumplidos y comunidades fortalecidas
              a través del poder de la belleza y el emprendimiento femenino.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactMetrics.map((metric, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform">
                    <metric.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-femfuel-dark mb-2">
                    {metric.number}
                  </div>
                  <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-sm text-femfuel-medium">
                    {metric.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dianna's Story */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-femfuel-dark mb-6">
              De Frustración a Revolución
            </h2>
            <p className="text-xl text-femfuel-medium max-w-4xl mx-auto leading-relaxed">
              La historia de FemFuel comenzó con una experiencia personal que cambiaría
              para siempre la industria de la belleza en República Dominicana.
            </p>
          </div>

          <div className="space-y-12">
            {/* Personal Quote */}
            <div className="bg-gradient-to-r from-purple-50 to-rose-50 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

              <div className="relative">
                <Quote className="h-12 w-12 text-purple-600 mb-6" />
                <p className="text-xl lg:text-2xl text-femfuel-dark leading-relaxed mb-8 italic font-light">
                  "Era 2022, y yo, como miles de mujeres dominicanas, perdía horas buscando
                  servicios de belleza confiables. Tenía que llamar salón tras salón, preguntando precios,
                  disponibilidad, referencias... Era increíblemente frustrante, especialmente cuando vivía
                  en una provincia donde los productos específicos que necesitaba solo se conseguían en la capital.
                  Ahí me di cuenta: <strong className="text-purple-600">República Dominicana tenía profesionales
                  increíbles, pero no tenían las herramientas para llegar a quienes realmente los necesitaban.</strong>"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <Crown className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-purple-600">Dianna Rincon</div>
                    <div className="text-sm text-femfuel-medium">Fundadora, FemFuel Beauty</div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Journey Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Background & Inspiration */}
              <div className="space-y-6">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <User className="h-5 w-5 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-femfuel-dark">Los Primeros Años</h3>
                    </div>
                    <p className="text-femfuel-medium leading-relaxed">
                      Nacida y criada en República Dominicana, Dianna creció viendo cómo las mujeres de su familia
                      y comunidad luchaban por acceder a servicios de belleza de calidad. Su madre, una maestra de
                      provincia, tenía que viajar horas para encontrar productos especializados para su cabello rizado.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                        <Lightbulb className="h-5 w-5 text-rose-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-femfuel-dark">La Experiencia Clave</h3>
                    </div>
                    <p className="text-femfuel-medium leading-relaxed">
                      En 2022, Dianna necesitaba un servicio especializado de keratina para un evento importante.
                      Después de 6 horas de búsqueda telefónica y tres referencias fallidas, finalmente encontró
                      una profesional excepcional... que estaba a solo 15 minutos de su casa, pero sin presencia
                      digital alguna.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* The Solution Vision */}
              <div className="space-y-6">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                        <Target className="h-5 w-5 text-amber-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-femfuel-dark">La Visión Nace</h3>
                    </div>
                    <p className="text-femfuel-medium leading-relaxed mb-4">
                      "Si esto me pasaba a mí, con acceso a internet y tiempo para buscar, ¿qué les pasaba
                      a las mujeres trabajadoras que solo tenían una hora libre? ¿Y a las que vivían en pueblos
                      pequeños? República Dominicana merecía una solución real."
                    </p>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <p className="text-sm text-amber-800 font-medium">
                        "Decidí crear la plataforma que yo habría querido tener: transparente, accesible,
                        y que celebrara el talento dominicano desde Montecristi hasta Barahona."
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Zap className="h-5 w-5 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-femfuel-dark">De Idea a Realidad</h3>
                    </div>
                    <p className="text-femfuel-medium leading-relaxed">
                      Con su experiencia en marketing digital y una pasión inquebrantable por empoderar
                      a las mujeres dominicanas, Dianna invirtió sus ahorros y dejó su trabajo corporativo
                      para dedicarse completamente a construir FemFuel Beauty.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Impact Numbers */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-femfuel-dark mb-6 text-center">
                El Impacto Desde Nuestro Lanzamiento
              </h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
                  <div className="text-sm text-femfuel-medium">Profesionales Verificados</div>
                  <div className="text-xs text-femfuel-light mt-1">Especialistas certificados en Santo Domingo y Santiago</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-600 mb-2">800+</div>
                  <div className="text-sm text-femfuel-medium">Mujeres Conectadas</div>
                  <div className="text-xs text-femfuel-light mt-1">Clientas registradas en 3 provincias</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
                  <div className="text-sm text-femfuel-medium">Servicios Completados</div>
                  <div className="text-xs text-femfuel-light mt-1">Con 97.5% de satisfacción</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">RD$500K+</div>
                  <div className="text-sm text-femfuel-medium">Generados para Profesionales</div>
                  <div className="text-xs text-femfuel-light mt-1">Empoderando economías locales</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-purple-200"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Card className="border-none shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${event.color}`}>
                            <event.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-femfuel-dark">{event.year}</div>
                            <h3 className="font-semibold text-femfuel-dark">{event.title}</h3>
                          </div>
                        </div>
                        <p className="text-femfuel-medium">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10">
                    <div className="w-8 h-8 bg-white border-4 border-purple-600 rounded-full shadow-lg"></div>
                  </div>

                  <div className="flex-1 lg:block hidden"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50/50 to-rose-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Nuestros Valores Fundamentales
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Los principios que guían cada decisión y nos impulsan hacia nuestro objetivo
              de transformar la belleza en República Dominicana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-femfuel-dark mb-3">
                        {value.title}
                      </h3>
                      <p className="text-femfuel-medium leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Historias que Nos Inspiran
            </h2>
            <p className="text-lg text-femfuel-medium">
              Cada historia representa el impacto real de nuestra misión en las vidas de dominicanas emprendedoras.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-rose-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-femfuel-dark">{story.name}</h3>
                      <p className="text-sm text-purple-600">{story.role}</p>
                      <p className="text-xs text-femfuel-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {story.location}
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 mb-4">
                    <Quote className="h-5 w-5 text-purple-600 mb-2" />
                    <p className="text-sm text-femfuel-dark italic">
                      "{story.quote}"
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-sm font-semibold text-green-700">
                      {story.impact}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Reconocimiento Nacional
            </h2>
            <p className="text-lg text-femfuel-medium">
              Orgullosos de representar la innovación dominicana en el ámbito internacional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recognitions.map((recognition, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-femfuel-dark mb-2">
                    {recognition.award}
                  </h3>
                  <p className="text-sm text-purple-600 font-medium mb-3">
                    {recognition.organization}
                  </p>
                  <p className="text-sm text-femfuel-medium">
                    {recognition.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Únete a la Transformación de la Belleza Dominicana
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Ya sea como clienta buscando servicios excepcionales o como profesional
            queriendo expandir tu negocio, FemFuel Beauty es tu plataforma para crecer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleJoinPlatform}
              className="min-h-[48px] bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3 justify-center"
            >
              <Sparkles className="h-5 w-5" />
              Explorar Servicios
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleBecomeProfessional}
              className="min-h-[48px] border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 active:bg-white/20 transition-all duration-300 active:scale-95 flex items-center gap-3 justify-center"
            >
              <Crown className="h-5 w-5" />
              Ser Profesional
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-white/80">Soporte Disponible</div>
            </div>
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-white/80">Profesionales Verificados</div>
            </div>
            <div>
              <div className="text-2xl font-bold">15</div>
              <div className="text-sm text-white/80">Provincias Conectadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold">RD</div>
              <div className="text-sm text-white/80">Hecho con Orgullo</div>
            </div>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  )
}