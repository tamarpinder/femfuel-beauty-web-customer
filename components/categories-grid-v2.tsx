"use client"

import { Hand, Palette, User, Flower2, Scissors, Eye, ArrowRight } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export interface CategoryV2 {
  id?: string
  name: string
  icon: LucideIcon
  count: string
  bannerImage: string
  description?: string
}

interface CategoriesGridV2Props {
  categories: CategoryV2[]
}

export function CategoriesGridV2({ categories }: CategoriesGridV2Props) {
  const router = useRouter()

  // Map category names to IDs
  const categoryNameToId: Record<string, string> = {
    'Uñas': 'nails',
    'Cabello': 'hair',
    'Maquillaje': 'makeup',
    'Spa y Cuerpo': 'spa',
    'Pestañas y Cejas': 'lashes'
  }

  const handleCategoryClick = (category: CategoryV2) => {
    const categoryId = category.id || categoryNameToId[category.name] || category.name.toLowerCase()
    router.push(`/services?category=${categoryId}`)
  }

  return (
    <section className="px-4 md:px-6 py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-femfuel-dark mb-3 md:mb-4">
            Categorías Populares
          </h2>
          <p className="text-base md:text-lg text-femfuel-medium max-w-2xl mx-auto px-4">
            Explora nuestros servicios de belleza más solicitados
          </p>
        </div>

        {/* Categories Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category)}
                className="group relative h-56 md:h-60 lg:h-64 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl min-h-[48px]"
              >
                {/* Background Image with Overlay */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url('${category.bannerImage}')`,
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/50" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-4 md:p-5 lg:p-6">
                  {/* Icon */}
                  <div className="absolute top-4 left-4 md:top-5 md:left-5 lg:top-6 lg:left-6">
                    <div className="w-12 h-12 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-femfuel-rose group-hover:border-femfuel-rose">
                      <Icon className="h-6 w-6 md:h-6.5 md:w-6.5 lg:h-7 lg:w-7 text-femfuel-dark transition-colors duration-500 group-hover:text-white" />
                    </div>
                  </div>

                  {/* Category Info */}
                  <div className="space-y-1.5 md:space-y-2">
                    <h3 className="text-xl md:text-xl lg:text-2xl font-bold text-white transition-transform duration-500 group-hover:translate-x-1">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-white/80 text-sm font-medium">
                        {category.count} servicios
                      </p>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-500 group-hover:bg-femfuel-rose group-hover:w-32">
                        <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:mr-2">
                          Ver Todo
                        </span>
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-8 md:mt-10 lg:mt-12">
          <button
            onClick={() => router.push('/services')}
            className="group inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-femfuel-rose text-white rounded-xl font-medium text-base md:text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-h-[48px] w-full sm:w-auto"
          >
            <span>Explorar Todos los Servicios</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
          </button>
        </div>
      </div>
    </section>
  )
}
