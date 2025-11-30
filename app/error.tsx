"use client"

import { useEffect } from "react"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <AlertTriangle className="h-12 w-12 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
          ¡Oops! Algo salió mal
        </h2>
        <p className="text-lg text-femfuel-medium font-medium mb-2 max-w-md mx-auto">
          Lo sentimos, ha ocurrido un error inesperado.
        </p>

        {process.env.NODE_ENV === "development" && (
          <p className="text-sm text-red-600 font-mono mb-8 p-4 bg-red-50 rounded-lg max-w-md mx-auto break-all">
            {error.message}
          </p>
        )}

        {!process.env.NODE_ENV && (
          <p className="text-sm text-femfuel-medium mb-8">
            Nuestro equipo ha sido notificado y estamos trabajando en solucionarlo.
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="femfuel"
            size="lg"
            onClick={reset}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Intentar de nuevo
          </Button>
          <Button
            variant="femfuel-outline"
            size="lg"
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto"
          >
            <Home className="h-5 w-5 mr-2" />
            Ir al inicio
          </Button>
        </div>

        {/* Support Info */}
        <div className="mt-8 p-4 bg-white/80 backdrop-blur-md rounded-2xl border-2 border-femfuel-rose/10 shadow-lg max-w-md mx-auto">
          <p className="text-sm text-femfuel-dark font-medium mb-1">
            ¿Necesitas ayuda?
          </p>
          <p className="text-sm text-femfuel-medium">
            Contacta a nuestro equipo de soporte en{" "}
            <a
              href="mailto:soporte@femfuelbeauty.com"
              className="text-femfuel-rose hover:underline font-semibold"
            >
              soporte@femfuelbeauty.com
            </a>
          </p>
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
