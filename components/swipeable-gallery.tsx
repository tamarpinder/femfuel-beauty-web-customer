"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProgressiveImage } from "@/components/progressive-image"

interface GalleryItem {
  id: string | number
  image: string
  title?: string
  subtitle?: string
}

interface SwipeableGalleryProps {
  items: GalleryItem[]
  onItemClick?: (item: GalleryItem, index: number) => void
  className?: string
  itemClassName?: string
  showNavigation?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function SwipeableGallery({
  items,
  onItemClick,
  className = "",
  itemClassName = "",
  showNavigation = true,
  autoPlay = false,
  autoPlayInterval = 5000
}: SwipeableGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const itemsPerView = items.length <= 3 ? items.length : 3

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && items.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(items.length / itemsPerView))
      }, autoPlayInterval)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [autoPlay, autoPlayInterval, items.length, itemsPerView])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    if (autoPlay && autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      // Restart auto-play after user interaction
      setTimeout(() => {
        autoPlayRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % Math.ceil(items.length / itemsPerView))
        }, autoPlayInterval)
      }, 2000)
    }
  }

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % Math.ceil(items.length / itemsPerView))
  }

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + Math.ceil(items.length / itemsPerView)) % Math.ceil(items.length / itemsPerView))
  }

  // Touch/mouse handlers for swiping
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    setStartX(pageX)
    if (galleryRef.current) {
      setScrollLeft(galleryRef.current.scrollLeft)
    }
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !galleryRef.current) return
    e.preventDefault()
    
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX
    const walk = (pageX - startX) * 2
    galleryRef.current.scrollLeft = scrollLeft - walk
  }

  const handleEnd = () => {
    if (!isDragging || !galleryRef.current) return
    setIsDragging(false)
    
    const threshold = 50
    const distance = galleryRef.current.scrollLeft - scrollLeft
    
    if (distance > threshold) {
      nextSlide()
    } else if (distance < -threshold) {
      prevSlide()
    }
  }

  if (!items.length) return null

  return (
    <div className={`relative ${className}`}>
      {/* Gallery Container */}
      <div
        ref={galleryRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / Math.ceil(items.length / itemsPerView))}%)`
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`flex-shrink-0 w-full md:w-1/3 px-2 ${itemClassName}`}
              onClick={() => onItemClick?.(item, index)}
            >
              <div className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <ProgressiveImage
                  src={item.image}
                  alt={item.title || `Gallery item ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay with title/subtitle */}
                {(item.title || item.subtitle) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      {item.title && (
                        <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                      )}
                      {item.subtitle && (
                        <p className="text-xs opacity-90">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Loading shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && items.length > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-femfuel-rose/20 shadow-lg z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white border-femfuel-rose/20 shadow-lg z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Indicators */}
      {items.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(items.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-femfuel-rose w-8' 
                  : 'bg-femfuel-rose/30 hover:bg-femfuel-rose/50'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}