"use client"

import Link from "next/link"
import {
  Hand,
  Palette,
  Scissors,
  Flower2,
  Eye,
  User,
  TrendingUp,
  Sparkles,
  MapPin,
  ArrowRight
} from "lucide-react"

interface ServicesMegaMenuProps {
  onClose?: () => void
}

export function ServicesMegaMenu({ onClose }: ServicesMegaMenuProps) {
  const categories = [
    {
      name: "Uñas",
      slug: "nails",
      icon: Hand,
      count: "37 servicios",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      name: "Maquillaje",
      slug: "makeup",
      icon: Palette,
      count: "36 servicios",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      name: "Peinados",
      slug: "hair",
      icon: Scissors,
      count: "53 servicios",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      name: "Spa",
      slug: "spa",
      icon: Flower2,
      count: "26 servicios",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      name: "Pestañas",
      slug: "lashes",
      icon: Eye,
      count: "35 servicios",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      name: "Cuerpo",
      slug: "body",
      icon: User,
      count: "Próximamente",
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ]

  const featuredSections = [
    {
      title: "Más Populares",
      icon: TrendingUp,
      description: "Los servicios más reservados",
      link: "/services?sort=popular",
      color: "text-femfuel-rose",
      bgColor: "bg-femfuel-rose/5"
    },
    {
      title: "Nuevos Servicios",
      icon: Sparkles,
      description: "Descubre lo más reciente",
      link: "/services?sort=new",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Cerca de Ti",
      icon: MapPin,
      description: "Profesionales en tu área",
      link: "/nearby",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    }
  ]

  return (
    <div className="grid grid-cols-[2fr_1fr] gap-8">
      {/* Left Column: Categories */}
      <div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-femfuel-dark uppercase tracking-wide mb-1">
            Categorías
          </h3>
          <p className="text-xs text-femfuel-medium">
            Explorar servicios
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.slug}
                href={`/services?category=${category.slug}`}
                onClick={onClose}
                className="group relative flex items-center gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-femfuel-light/50 border-2 border-gray-100 hover:border-femfuel-rose/40 transition-all duration-300 hover:shadow-2xl active:scale-[0.98] cursor-pointer"
              >
                {/* Icon Container */}
                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md
                  transition-all duration-300 group-hover:shadow-lg
                  ${category.bgColor}
                `}>
                  <Icon className={`h-6 w-6 ${category.color} transition-transform duration-300`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-femfuel-dark group-hover:text-femfuel-rose transition-colors duration-300">
                    {category.name}
                  </h4>
                  <p className="text-xs text-femfuel-medium font-medium">
                    {category.count}
                  </p>
                </div>

                {/* Arrow indicator on hover */}
                <ArrowRight className="h-4 w-4 text-femfuel-rose opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            )
          })}
        </div>

        {/* View All Categories CTA */}
        <Link
          href="/services"
          onClick={onClose}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-femfuel-rose/10 to-pink-500/10 hover:from-femfuel-rose hover:to-pink-600 text-femfuel-rose hover:text-white border-2 border-femfuel-rose/30 hover:border-femfuel-rose transition-all duration-300 hover:shadow-xl active:scale-95 group cursor-pointer"
        >
          <span className="text-sm font-bold">Ver Todos los Servicios</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Right Column: Featured Sections */}
      <div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-femfuel-dark uppercase tracking-wide mb-1">
            Destacados
          </h3>
          <p className="text-xs text-femfuel-medium">
            Colecciones especiales
          </p>
        </div>

        <div className="space-y-3">
          {featuredSections.map((section) => {
            const Icon = section.icon
            return (
              <Link
                key={section.link}
                href={section.link}
                onClick={onClose}
                className={`
                  group block p-4 rounded-xl border-2 border-gray-100 hover:border-femfuel-rose/40
                  transition-all duration-300 hover:shadow-2xl active:scale-[0.98] cursor-pointer
                  ${section.bgColor} hover:brightness-95
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md
                    transition-all duration-300 group-hover:shadow-lg
                  `}>
                    <Icon className={`h-5 w-5 ${section.color} transition-transform duration-300`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-bold mb-1 transition-colors duration-300 ${section.color} group-hover:opacity-80`}>
                      {section.title}
                    </h4>
                    <p className="text-xs text-femfuel-medium font-medium">
                      {section.description}
                    </p>
                  </div>

                  <ArrowRight className={`h-4 w-4 ${section.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300`} />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-br from-femfuel-light to-pink-50 border-2 border-femfuel-rose/10 shadow-lg">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <div className="text-2xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">152+</div>
              <div className="text-xs text-femfuel-medium font-semibold">Servicios</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md">
              <div className="text-2xl font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent">20+</div>
              <div className="text-xs text-femfuel-medium font-semibold">Salones</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
