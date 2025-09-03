"use client"

import { Star } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto text-center">

        {/* Logo */}
        <div className="mb-8">
          <div className="w-40 h-40 md:w-44 md:h-44 mx-auto flex items-center justify-center mb-6">
            <img 
              src="/femfuel-logo.png" 
              alt="FemFuel Beauty" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-2">Tu belleza, redefinida</h1>
          <p className="text-lg text-femfuel-medium mb-6">Conecta con los mejores profesionales</p>
          <div className="flex items-center justify-center gap-2 text-sm text-femfuel-medium">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.9/5</span>
            <span>•</span>
            <span>75,000+ usuarios</span>
          </div>
        </div>
      </div>
    </section>
  )
}
