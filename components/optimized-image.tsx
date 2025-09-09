"use client"

import Image from 'next/image'
import { useState } from 'react'
import { createPlaceholder } from '@/lib/image-utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fallback?: string
  fill?: boolean
  sizes?: string
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
  priority = false,
  fallback,
  fill = false,
  sizes,
  quality = 85
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    
    if (fallback) {
      setImgSrc(fallback)
    } else {
      // Generate contextual placeholder
      const placeholderText = alt.split(' ').slice(0, 2).join(' ')
      setImgSrc(createPlaceholder(width, height, placeholderText))
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (fill) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={imgSrc}
          alt={alt}
          fill
          priority={priority}
          quality={quality}
          sizes={sizes}
          onError={handleError}
          onLoad={handleLoad}
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {isLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="text-xs text-gray-400 font-medium">Loading...</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="text-xs text-gray-400 font-medium">Loading...</div>
        </div>
      )}
      {hasError && (
        <div className="absolute top-1 right-1 bg-red-100 text-red-600 text-xs px-1 py-0.5 rounded">
          placeholder
        </div>
      )}
    </div>
  )
}

// Specific components for common use cases
export function VendorLogo({ vendorId, vendorName, size = 80 }: {
  vendorId: string
  vendorName: string
  size?: number
}) {
  return (
    <OptimizedImage
      src={`/vendors/logos/${vendorId}-logo.webp`}
      alt={`${vendorName} logo`}
      width={size}
      height={size}
      className="rounded-lg"
      fallback="/placeholder-logo.svg"
    />
  )
}

export function ServiceImage({ category, serviceName, className = "" }: {
  category: string
  serviceName: string
  className?: string
}) {
  const serviceSlug = serviceName.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
  
  return (
    <OptimizedImage
      src={`/services/${category}/${serviceSlug}.webp`}
      alt={`${serviceName} service`}
      width={300}
      height={200}
      className={`rounded-xl ${className}`}
      fallback="/placeholder.svg"
    />
  )
}

export function ProfessionalAvatar({ professionalId, professionalName, size = 60 }: {
  professionalId: string
  professionalName: string
  size?: number
}) {
  return (
    <OptimizedImage
      src={`/professionals/portraits/${professionalId}-avatar.webp`}
      alt={`${professionalName} avatar`}
      width={size}
      height={size}
      className="rounded-full"
      fallback="/placeholder-user.jpg"
    />
  )
}

export function ProductImage({ productSlug, productName, size = 200 }: {
  productSlug: string
  productName: string
  size?: number
}) {
  return (
    <OptimizedImage
      src={`/products/${productSlug}.webp`}
      alt={productName}
      width={size}
      height={size}
      className="rounded-lg"
      fallback="/placeholder.svg"
    />
  )
}