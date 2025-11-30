'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  context?: string
  style?: CSSProperties
  onError?: () => void
  onLoad?: () => void
  instant?: boolean // For carousel images that need instant transitions
  loading?: 'lazy' | 'eager'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  context = 'general',
  style,
  onError,
  onLoad,
  instant = false,
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(!instant && !priority) // Skip loading state for instant/priority images
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  // Reset state when src changes
  useEffect(() => {
    setImageSrc(src)
    setIsLoading(!instant && !priority) // Skip loading state for instant/priority images
    setHasError(false)
  }, [src, instant, priority])

  const handleError = () => {
    setHasError(true)
    onError?.()
  }

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const imageProps = fill
    ? { fill: true, sizes: sizes || '100vw' }
    : { width: width || 600, height: height || 400 }

  return (
    <div className={cn('relative overflow-hidden', fill && 'w-full h-full', className)}>
      {isLoading && !instant && !priority && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-femfuel-light/20 animate-pulse pointer-events-none rounded-lg" />
      )}
      <Image
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        {...imageProps}
        quality={quality}
        priority={priority || instant}
        loading={priority || instant ? 'eager' : loading}
        style={style}
        className={cn(
          instant ? 'transition-none' : 'transition-opacity duration-300',
          isLoading && !instant && !priority ? 'opacity-0' : 'opacity-100',
          fill && 'object-cover',
          hasError && 'filter grayscale opacity-80'
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}