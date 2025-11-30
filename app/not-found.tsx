"use client"

import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-femfuel-rose to-pink-600 bg-clip-text text-transparent leading-none">
              404
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/20 to-pink-600/20 blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
          Página no encontrada
        </h2>
        <p className="text-lg text-femfuel-medium font-medium mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="femfuel" size="lg" className="w-full sm:w-auto">
              <Home className="h-5 w-5 mr-2" />
              Ir al inicio
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="femfuel-outline" size="lg" className="w-full sm:w-auto">
              <Search className="h-5 w-5 mr-2" />
              Explorar servicios
            </Button>
          </Link>
        </div>

        {/* Back Link */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-femfuel-medium hover:text-femfuel-rose transition-colors duration-300 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver atrás
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center gap-8 opacity-50">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-femfuel-rose to-transparent rounded-full"></div>
          <div className="w-2 h-2 bg-femfuel-rose rounded-full"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-femfuel-rose to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
