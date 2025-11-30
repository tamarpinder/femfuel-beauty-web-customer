import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50/20 to-rose-50/10">
      <div className="text-center">
        {/* Animated Logo/Icon */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose to-pink-600 rounded-full animate-pulse opacity-20"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-femfuel-rose to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
            <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-spin" />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-xl sm:text-2xl font-bold text-femfuel-dark mb-2 px-4">
          Cargando...
        </h2>
        <p className="text-sm sm:text-base text-femfuel-medium font-medium px-4">
          Preparando tu experiencia de belleza
        </p>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-3 h-3 bg-femfuel-rose rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-3 h-3 bg-femfuel-rose rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-3 h-3 bg-femfuel-rose rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
