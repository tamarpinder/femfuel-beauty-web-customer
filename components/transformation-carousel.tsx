"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const transformations = [
  {
    id: 1,
    before: "/transformations/before/manicure-gel-before.png",
    after: "/transformations/after/manicure-gel-after.png",
    title: "Manicura Premium",
    category: "Uñas"
  },
  {
    id: 2,
    before: "/transformations/before/maquillaje-novia-before.png",
    after: "/transformations/after/maquillaje-novia-after.png",
    title: "Maquillaje de Novia",
    category: "Maquillaje"
  },
  {
    id: 3,
    before: "/transformations/before/peinado-evento-before.png",
    after: "/transformations/after/peinado-evento-after.png",
    title: "Peinado Profesional",
    category: "Cabello"
  }
]

export function TransformationCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % transformations.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [isPlaying])

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left
      goToNext()
    }
    if (touchStartX.current - touchEndX.current < -50) {
      // Swiped right
      goToPrevious()
    }
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 8000) // Resume auto-play after 8 seconds
  }

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + transformations.length) % transformations.length)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 8000)
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % transformations.length)
    setIsPlaying(false)
    setTimeout(() => setIsPlaying(true), 8000)
  }

  return (
    <div
      className="relative h-full touch-pan-x"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Transformations Slides */}
      <div className="relative h-full overflow-hidden rounded-2xl">
        {transformations.map((transformation, index) => (
          <div
            key={transformation.id}
            className={`absolute inset-0 transition-all duration-700 ${
              index === activeIndex
                ? 'opacity-100 translate-x-0'
                : index < activeIndex
                ? 'opacity-0 -translate-x-full'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Before/After Split */}
            <div className="relative h-full grid grid-cols-2 gap-0.5 md:gap-1">
              {/* Before */}
              <div className="relative bg-gray-100 overflow-hidden">
                <div className="absolute top-2 left-2 md:top-4 md:left-4 z-10 px-2 py-1 md:px-3 md:py-1.5 bg-black/60 backdrop-blur-md text-white text-xs font-medium rounded-lg">
                  Antes
                </div>
                <Image
                  src={transformation.before}
                  alt={`${transformation.title} - Antes`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1440px) 50vw, 720px"
                  priority={index === 0}
                  unoptimized
                />
              </div>

              {/* After */}
              <div className="relative bg-gray-100 overflow-hidden">
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10 px-2 py-1 md:px-3 md:py-1.5 bg-femfuel-rose/90 backdrop-blur-md text-white text-xs font-medium rounded-lg">
                  Después
                </div>
                <Image
                  src={transformation.after}
                  alt={`${transformation.title} - Después`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1440px) 50vw, 720px"
                  priority={index === 0}
                  unoptimized
                />
              </div>
            </div>

            {/* Transformation Info */}
            <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 p-3 md:p-4 bg-white/80 backdrop-blur-md rounded-xl border-2 border-femfuel-rose/10 shadow-lg">
              <p className="text-xs text-femfuel-medium font-medium">{transformation.category}</p>
              <h3 className="text-base md:text-lg font-bold text-femfuel-dark">{transformation.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 flex items-center justify-center text-femfuel-dark hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl min-w-[40px] min-h-[40px]"
        aria-label="Previous transformation"
      >
        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md border-2 border-femfuel-rose/10 flex items-center justify-center text-femfuel-dark hover:bg-gradient-to-r hover:from-femfuel-rose hover:to-pink-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl min-w-[40px] min-h-[40px]"
        aria-label="Next transformation"
      >
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-2 z-10">
        {transformations.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full shadow-lg min-w-[32px] min-h-[32px] flex items-center justify-center ${
              index === activeIndex
                ? 'bg-gradient-to-r from-femfuel-rose to-pink-600'
                : 'bg-white/60 hover:bg-white backdrop-blur-md'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <span className={`rounded-full ${
              index === activeIndex
                ? 'w-4 h-1.5 md:w-6 md:h-2 bg-white'
                : 'w-2 h-2 bg-femfuel-rose/60'
            }`} />
          </button>
        ))}
      </div>
    </div>
  )
}
