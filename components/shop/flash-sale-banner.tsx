"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"

export function FlashSaleBanner() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden rounded-2xl mb-8">
      {/* Gradient Background */}
      <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 px-8 py-12">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Icon + Heading */}
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 shadow-lg">
              <Tag className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-1">
                Ofertas Especiales
              </h2>
              <p className="text-lg text-white/90">
                Ahorra hasta un 50% en productos seleccionados.
              </p>
            </div>
          </div>

          {/* Right: CTA Button */}
          <Button
            onClick={() => router.push("/shop/ofertas")}
            size="lg"
            className="bg-white text-rose-600 hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-full shadow-2xl hover:scale-105 transition-all duration-300 whitespace-nowrap"
          >
            Ver Todas las Ofertas
          </Button>
        </div>
      </div>
    </section>
  )
}
