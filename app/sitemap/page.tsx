'use client'

import { ExternalLink, MapPin, Search, Users, Heart, Calendar, HelpCircle, Briefcase, Shield, Eye } from "lucide-react"
import { CustomerFooter } from "@/components/customer-footer"
import { MobileNavigation } from "@/components/mobile-navigation"

export default function SitemapPage() {
  const sitePages = [
    {
      category: "Principal",
      icon: MapPin,
      pages: [
        { name: "Inicio", href: "/", description: "Página principal de FemFuel Beauty" },
        { name: "Sobre Nosotros", href: "/about", description: "Conoce nuestra historia y misión" },
        { name: "Carreras", href: "/careers", description: "Únete a nuestro equipo" }
      ]
    },
    {
      category: "Servicios",
      icon: Search,
      pages: [
        { name: "Buscar Servicios", href: "/services", description: "Explora todos los servicios de belleza" },
        { name: "Manicure y Pedicure", href: "/services?category=nails", description: "Servicios de uñas profesionales" },
        { name: "Maquillaje", href: "/services?category=makeup", description: "Maquillaje para eventos y diario" },
        { name: "Tratamientos Faciales", href: "/services?category=facial", description: "Cuidado facial profesional" },
        { name: "Peinados", href: "/services?category=hair", description: "Cortes, color y peinados" },
        { name: "Spa y Masajes", href: "/services?category=spa", description: "Relajación y bienestar" }
      ]
    },
    {
      category: "Profesionales",
      icon: Users,
      pages: [
        { name: "Todos los Salones", href: "/vendors", description: "Directorio completo de salones" },
        { name: "Salones Cercanos", href: "/nearby", description: "Encuentra salones cerca de ti" },
        { name: "Profesionales Top", href: "/professionals", description: "Los mejores profesionales de belleza" },
        { name: "Únete como Profesional", href: "https://femfuel-beauty-web-vendor.vercel.app/how-it-works", description: "Registra tu salón en FemFuel", external: true }
      ]
    },
    {
      category: "Mi Cuenta",
      icon: Heart,
      pages: [
        { name: "Mis Reservas", href: "/bookings", description: "Gestiona tus citas programadas" },
        { name: "Favoritos", href: "/profile?section=favoritos", description: "Tus salones y servicios favoritos" },
        { name: "Configuración", href: "/settings", description: "Ajustes de tu cuenta" }
      ]
    },
    {
      category: "Ayuda y Soporte",
      icon: HelpCircle,
      pages: [
        { name: "Centro de Ayuda", href: "/help", description: "Respuestas a preguntas frecuentes" },
        { name: "Cómo Reservar", href: "/how-to-book", description: "Guía paso a paso para reservar" },
        { name: "Política de Cancelación", href: "/cancellation-policy", description: "Términos de cancelación" },
        { name: "Contacto", href: "/help#contacto", description: "Ponte en contacto con nosotros" },
        { name: "FAQs", href: "/help#faqs", description: "Preguntas frecuentes" }
      ]
    },
    {
      category: "Empresa",
      icon: Briefcase,
      pages: [
        { name: "Blog de Belleza", href: "/blog", description: "Tips y tendencias de belleza" },
        { name: "Términos de Servicio", href: "/terms-of-service", description: "Condiciones de uso" },
        { name: "Política de Privacidad", href: "/privacy-policy", description: "Cómo protegemos tus datos" },
        { name: "Mapa del Sitio", href: "/sitemap", description: "Navegación completa del sitio" }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative lg:pt-32 pb-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-rose-500/5 to-amber-500/5"></div>

        <div className="max-w-4xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <MapPin className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Mapa del Sitio</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-6 leading-tight">
            Navegación Completa de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-600">
              FemFuel Beauty
            </span>
          </h1>

          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Encuentra fácilmente cualquier página de nuestra plataforma.
            Todo lo que necesitas para tu experiencia de belleza está aquí.
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8">
            {sitePages.map((section, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl shadow-md flex items-center justify-center">
                    <section.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-femfuel-dark">{section.category}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.pages.map((page, pageIndex) => (
                    <a
                      key={pageIndex}
                      href={page.href}
                      target={page.external ? "_blank" : "_self"}
                      rel={page.external ? "noopener noreferrer" : undefined}
                      className="group block p-4 rounded-xl border-2 border-gray-100 hover:border-femfuel-rose/20 hover:bg-gradient-to-br hover:from-purple-50/30 hover:to-rose-50/20 hover:shadow-md active:scale-95 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-femfuel-dark group-hover:text-purple-600 transition-colors">
                          {page.name}
                        </h3>
                        {page.external && (
                          <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-femfuel-medium group-hover:text-purple-700 transition-colors">
                        {page.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-rose-50 border-2 border-femfuel-rose/20 rounded-2xl shadow-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-femfuel-dark mb-2">
                Plataforma en Crecimiento
              </h3>
              <p className="text-gray-700">
                FemFuel Beauty conecta la comunidad de belleza dominicana
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">25+</div>
                <div className="text-sm text-femfuel-medium">Páginas Activas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-600 mb-1">6</div>
                <div className="text-sm text-femfuel-medium">Categorías de Servicios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 mb-1">3</div>
                <div className="text-sm text-femfuel-medium">Provincias Cubiertas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                <div className="text-sm text-femfuel-medium">Móvil Responsive</div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 rounded-2xl shadow-xl p-8 text-center">
            <h3 className="text-xl font-bold text-femfuel-dark mb-4">
              ¿No encuentras lo que buscas?
            </h3>
            <p className="text-gray-700 mb-6">
              Nuestro equipo de soporte está aquí para ayudarte a navegar FemFuel Beauty
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/help"
                className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <HelpCircle className="h-4 w-4" />
                Centro de Ayuda
              </a>
              <a
                href="/help#contacto"
                className="bg-white border-2 border-femfuel-rose/20 hover:border-femfuel-rose hover:bg-purple-50 text-femfuel-dark px-6 py-3 rounded-full font-bold flex items-center gap-2 justify-center transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                Contactar Soporte
              </a>
            </div>
          </div>
        </div>
      </section>

      <CustomerFooter />
      <MobileNavigation />
    </div>
  )
}