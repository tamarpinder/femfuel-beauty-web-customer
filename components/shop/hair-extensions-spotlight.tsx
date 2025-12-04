"use client"

import { useRouter } from "next/navigation"
import { Check, Sparkles } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HairExtensionsSpotlight() {
  const router = useRouter()

  const features = [
    "100% Cabello Humano Virgen",
    "Textura Natural Dominicana",
    "Múltiples Largos y Colores",
    "Fácil Instalación"
  ]

  const colorSwatches = [
    { name: "Negro Azabache", color: "#1a1a1a" },
    { name: "Castaño Oscuro", color: "#3d2817" },
    { name: "Castaño Medio", color: "#6f4e37" },
    { name: "Castaño Claro", color: "#a0826d" },
    { name: "Rubio Miel", color: "#d4a76a" }
  ]

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
      <div className="max-w-7xl mx-auto">
        {/* Main Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Left: Hero Image (60%) */}
          <div className="lg:col-span-3">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/hair-extensions/hero-section.png"
                alt="Extensiones de Cabello Natural"
                fill
                className="object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right: Content (40%) */}
          <div className="lg:col-span-2 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
            {/* Badge */}
            <Badge className="w-fit mb-4 px-4 py-2 bg-gradient-to-r from-femfuel-rose to-pink-600 text-white border-0 shadow-lg">
              Lo Más Popular
            </Badge>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-3 font-serif">
              Cabello 100% Natural
            </h2>

            {/* Subheading */}
            <p className="text-xl text-femfuel-medium mb-6">
              Transforma tu Look en Minutos
            </p>

            {/* Features List */}
            <div className="mb-8 w-full flex justify-center lg:justify-start">
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-femfuel-rose to-pink-600 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-femfuel-dark font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Swatches Preview */}
            <div className="mb-8 flex flex-col items-center lg:items-start">
              <p className="text-sm font-bold text-femfuel-dark mb-3 uppercase tracking-wide">
                Colores Disponibles
              </p>
              <div className="flex gap-2 justify-center lg:justify-start">
                {colorSwatches.map((swatch, index) => (
                  <div
                    key={index}
                    className="group relative"
                    title={swatch.name}
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md active:scale-95 transition-transform cursor-pointer"
                      style={{ backgroundColor: swatch.color }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push("/shop/hair-extensions")}
                className="flex-1 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose-hover hover:to-pink-700 text-white rounded-full px-6 py-6 font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
              >
                Ver Colección
              </Button>
              <Button
                onClick={() => router.push("/help#hair-extensions")}
                variant="outline"
                className="flex-1 border-2 border-femfuel-rose/20 text-femfuel-dark hover:bg-femfuel-light rounded-full px-6 py-6 font-semibold active:scale-95 transition-all duration-300"
              >
                Guía de Instalación
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
