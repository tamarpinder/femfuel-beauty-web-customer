"use client"

import { useState, useEffect } from "react"

interface ProgressiveImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  onLoad?: () => void
}

export function ProgressiveImage({ 
  src, 
  alt, 
  className = "", 
  placeholder = "/placeholder.jpg",
  onLoad 
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const image = new Image()
    image.onload = () => {
      setCurrentSrc(src)
      setIsLoaded(true)
      setIsLoading(false)
      onLoad?.()
    }
    image.onerror = () => {
      setIsLoading(false)
    }
    image.src = src
  }, [src, onLoad])

  return (
    <div className="relative overflow-hidden">
      <img
        src={currentSrc}
        alt={alt}
        className={`transition-all duration-500 ${className} ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-70 scale-105'
        } ${isLoading ? 'blur-sm' : 'blur-0'}`}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-femfuel-light/50 to-pink-100/50 animate-pulse" />
      )}
      
      {isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-femfuel-light/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
    </div>
  )
}