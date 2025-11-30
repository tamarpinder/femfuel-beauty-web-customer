"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface ExtensionType {
  id: string
  title: string
  description: string
  imageUrl: string
  subcategory: string
}

const extensionTypes: ExtensionType[] = [
  {
    id: "tape-in",
    title: "Extensiones con Cinta",
    description: "Aplicación semi-permanente, duración 6-8 semanas",
    imageUrl: "/hair-extensions/tape-in-extensions.png",
    subcategory: "Extensiones con Cinta"
  },
  {
    id: "clip-in",
    title: "Extensiones con Clip",
    description: "Fácil de poner y quitar, perfectas para eventos",
    imageUrl: "/hair-extensions/clip-in-extensions.png",
    subcategory: "Extensiones con Clip"
  },
  {
    id: "bundles",
    title: "Paquetes/Mallas",
    description: "Cabello virgen premium, ideal para profesionales",
    imageUrl: "/hair-extensions/hair-bundles.png",
    subcategory: "Paquetes/Mallas"
  },
  {
    id: "ponytail",
    title: "Colas de Caballo",
    description: "Volumen instantáneo, múltiples estilos",
    imageUrl: "/hair-extensions/ponytail-extension.png",
    subcategory: "Colas de Caballo"
  }
]

export function HairExtensionsGrid() {
  const router = useRouter()

  const handleClick = (subcategory: string) => {
    router.push(`/shop/hair-extensions?subcategory=${encodeURIComponent(subcategory)}`)
  }

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-3 font-serif">
            Tipos de Extensiones
          </h3>
          <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
            Encuentra el tipo perfecto para tu estilo y necesidades
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {extensionTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleClick(type.subcategory)}
              className="group relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border-2 border-femfuel-rose/10 hover:border-femfuel-rose/30"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={type.imageUrl}
                  alt={type.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 text-center lg:text-left">
                <h4 className="text-xl font-bold text-femfuel-dark mb-2 group-hover:text-femfuel-rose transition-colors">
                  {type.title}
                </h4>
                <p className="text-sm text-femfuel-medium mb-4">
                  {type.description}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-center lg:justify-start gap-2 text-femfuel-rose font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>Explorar</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-femfuel-rose/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
