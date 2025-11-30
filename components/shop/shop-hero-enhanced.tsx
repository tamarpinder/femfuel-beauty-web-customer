"use client"

import { useState, useEffect } from "react"
import { Sparkles, ShoppingBag, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function ShopHeroEnhanced() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden h-[60vh] md:h-[60vh] bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: `translateY(${scrollY * 0.3}px) scale(1.05)`,
        }}
      >
        <source src="/shop-hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>

      {/* Additional rose/pink overlay to maintain brand colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-femfuel-rose/20 via-pink-500/10 to-purple-500/5 mix-blend-overlay"></div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          opacity: Math.max(0, 1 - scrollY / 500)
        }}
      >
        {/* Seasonal Badge */}
        <Badge className="mb-6 px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-femfuel-dark border border-white/60 shadow-xl hover:scale-105 transition-transform duration-300">
          <span className="font-semibold">Nueva Colección Verano 2026</span>
        </Badge>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl font-serif leading-tight">
          Descubre Tu Belleza
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl drop-shadow-lg font-medium">
          Productos premium de belleza seleccionados por expertos. Entrega en Santo Domingo.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            onClick={() => router.push("/shop#categories")}
            className="bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-femfuel-rose/50 hover:scale-105 transition-all duration-300"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Explorar Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/shop#trending")}
            className="bg-white/90 backdrop-blur-md hover:bg-white text-femfuel-dark font-semibold px-8 py-6 text-lg rounded-full border-2 border-white shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Ver Tendencias
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/90">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">500+ Productos</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Envío 2-4 Horas</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">100% Auténtico</span>
          </div>
        </div>
      </div>
    </div>
  )
}
