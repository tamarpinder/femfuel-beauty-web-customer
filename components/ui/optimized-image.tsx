'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { getDefaultImage } from '@/lib/default-images'

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
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(!instant) // Skip loading state for instant images
  const [hasError, setHasError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  // Reset state when src changes
  useEffect(() => {
    setImageSrc(src)
    setIsLoading(!instant) // Skip loading state for instant images
    setHasError(false)
  }, [src, instant])

  const handleError = () => {
    const fallback = getDefaultImage(context)
    setImageSrc(fallback)
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
      {isLoading && !instant && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse pointer-events-none" />
      )}
      <Image
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        {...imageProps}
        quality={quality}
        priority={priority || instant}
        style={style}
        className={cn(
          instant ? 'transition-none' : 'transition-opacity duration-300',
          isLoading && !instant ? 'opacity-0' : 'opacity-100',
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