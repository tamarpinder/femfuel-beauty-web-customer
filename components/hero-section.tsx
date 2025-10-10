"use client"

import { Star } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"

export function HeroSection() {
  return (
    <section className="relative px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto text-center">

        {/* Logo */}
        <div className="mb-8">
          <div className="w-40 h-40 md:w-44 md:h-44 mx-auto mb-6 relative">
            <OptimizedImage
              src="/femfuel-logo.png"
              alt="FemFuel Beauty"
              fill
              sizes="(max-width: 768px) 160px, 176px"
              className="object-contain"
              priority={true}
              context="logo"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-2">
            Vive la experiencia de belleza exclusiva junto a los mejores especialistas de República Dominicana
          </h1>
          <p className="text-lg text-femfuel-medium mb-4">
            Reserva servicios de belleza verificados al instante
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-femfuel-medium mb-6">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.9/5</span>
            </div>
            <span>•</span>
            <span>20+ salones verificados</span>
            <span>•</span>
            <span>10+ profesionales</span>
          </div>
          
          {/* Value propositions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-femfuel-medium max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-femfuel-light rounded-full flex items-center justify-center mb-2">
                ✓
              </div>
              <span>Profesionales Verificados</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-femfuel-light rounded-full flex items-center justify-center mb-2">
                ⚡
              </div>
              <span>Reserva Instantánea</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-femfuel-light rounded-full flex items-center justify-center mb-2">
                🏆
              </div>
              <span>Mejor Precio</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-femfuel-light rounded-full flex items-center justify-center mb-2">
                💎
              </div>
              <span>Expertos Locales</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
