"use client"

import { Sparkles, Eye, TrendingUp } from "lucide-react"
import { TransformationCarousel } from "@/components/transformation-carousel"

export function HeroSectionV2() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] bg-femfuel-light overflow-hidden">
      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:pt-32 pb-12 md:pb-16 lg:pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-[40%_60%] gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Headline */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-femfuel-dark leading-tight">
                Tu belleza,
                <br />
                <span className="text-femfuel-rose">a un solo clic</span>
              </h1>
              <p className="text-base md:text-lg text-femfuel-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Reserva rápido y transforma tu look hoy mismo.
              </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 lg:flex lg:items-center lg:gap-6 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border-2 border-femfuel-rose/20 shadow-md flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-femfuel-rose" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-bold text-femfuel-dark">1000+</p>
                  <p className="text-xs text-femfuel-medium">Reservas</p>
                </div>
              </div>

              <div className="hidden lg:block h-12 w-px bg-gray-200" />

              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border-2 border-femfuel-rose/20 shadow-md flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-femfuel-rose" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-bold text-femfuel-dark">20+</p>
                  <p className="text-xs text-femfuel-medium">Salones</p>
                </div>
              </div>

              <div className="hidden lg:block h-12 w-px bg-gray-200" />

              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border-2 border-femfuel-rose/20 shadow-md flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">⭐</span>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-bold text-femfuel-dark">4.9</p>
                  <p className="text-xs text-femfuel-medium">Rating</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4 w-full max-w-md mx-auto lg:mx-0">
              {/* Primary CTA */}
              <button
                onClick={() => scrollToSection('categories-section')}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-pink-600 hover:to-femfuel-rose text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-105 w-full sm:w-auto min-h-[48px]"
              >
                <Sparkles className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 flex-shrink-0" />
                <span className="text-sm md:text-base">Explorar Categorías</span>
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => scrollToSection('transformations-section')}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white/90 backdrop-blur-md border-2 border-femfuel-rose/20 hover:border-femfuel-rose/40 text-femfuel-dark rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 hover:scale-105 w-full sm:w-auto min-h-[48px]"
              >
                <Eye className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0" />
                <span className="text-sm md:text-base">Ver Transformaciones</span>
              </button>
            </div>
          </div>

          {/* Right: Visual Showcase */}
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <TransformationCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
