"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { MapPin } from "lucide-react"
import { SmartSearch } from "@/components/smart-search"
import { UserMenu } from "@/components/user-menu"
import { getAllServices } from "@/lib/vendors-api"
import { mockProducts, searchProducts } from "@/data/products"
import { getAllProfessionals } from "@/lib/getAllProfessionals"
import type { SearchSuggestion } from "@/lib/search-utils"

export type SearchType = 'service' | 'product' | 'professional' | 'none'
export type HeaderVariant = 'full' | 'minimal' | 'none'

interface DesktopHeaderProps {
  onSearch?: (query: string) => void
  showSearch?: boolean
  searchType?: SearchType
  variant?: HeaderVariant
  className?: string
}

export function DesktopHeader({
  onSearch,
  showSearch = true,
  searchType = 'service',
  variant = 'full',
  className = ''
}: DesktopHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [services, setServices] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [professionals, setProfessionals] = useState<any[]>([])

  // Helper function to check if a path is active
  const isActivePath = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  // Load data for search based on search type
  useEffect(() => {
    async function loadData() {
      try {
        if (searchType === 'service') {
          const allServices = await getAllServices()
          setServices(allServices)
        } else if (searchType === 'product') {
          setProducts(mockProducts)
        } else if (searchType === 'professional') {
          const allProfessionals = getAllProfessionals()
          setProfessionals(allProfessionals)
        }
      } catch (error) {
      }
    }
    loadData()
  }, [searchType])

  const handleSmartSearch = (query: string, suggestions: SearchSuggestion[]) => {
    // Just handle suggestions display, no navigation
  }

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    // Navigate based on search type
    if (searchType === 'service') {
      router.push(`/search?q=${encodeURIComponent(suggestion.name)}`)
    } else if (searchType === 'product') {
      router.push(`/shop?search=${encodeURIComponent(suggestion.name)}`)
    } else if (searchType === 'professional') {
      router.push(`/professionals?search=${encodeURIComponent(suggestion.name)}`)
    }
  }

  // Get appropriate data source and placeholder for current search type
  const getSearchData = () => {
    switch (searchType) {
      case 'service':
        return { items: services, placeholder: "Buscar servicios o salones..." }
      case 'product':
        return { items: products, placeholder: "Buscar productos de belleza..." }
      case 'professional':
        return { items: professionals, placeholder: "Buscar profesionales..." }
      default:
        return { items: [], placeholder: "Buscar..." }
    }
  }

  // Don't render anything if variant is 'none'
  if (variant === 'none') {
    return null
  }

  return (
    <header className={`hidden md:block border-b border-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className={`flex items-center justify-between ${showSearch ? 'mb-4' : ''}`}>
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img
                src="/femfuel-logo.png"
                alt="FemFuel Beauty"
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
              <span className="text-xl font-bold text-femfuel-dark">FemFuel Beauty</span>
            </Link>
            {variant === 'full' && (
              <div className="flex items-center gap-2 text-sm text-femfuel-medium">
                <MapPin className="h-4 w-4" />
                <span>Santo Domingo</span>
              </div>
            )}
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                isActivePath('/')
                  ? 'text-femfuel-rose'
                  : 'text-femfuel-medium hover:text-femfuel-dark'
              }`}
            >
              Inicio
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 ${
                isActivePath('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link
              href="/services"
              className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                isActivePath('/services')
                  ? 'text-femfuel-rose'
                  : 'text-femfuel-medium hover:text-femfuel-dark'
              }`}
            >
              Servicios
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 ${
                isActivePath('/services') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link
              href="/bookings"
              className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                isActivePath('/bookings')
                  ? 'text-femfuel-rose'
                  : 'text-femfuel-medium hover:text-femfuel-dark'
              }`}
            >
              Mis Citas
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 ${
                isActivePath('/bookings') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link
              href="/shop"
              className={`relative px-2 py-1 text-sm font-bold transition-all duration-300 hover:scale-105 group ${
                isActivePath('/shop')
                  ? 'text-femfuel-rose'
                  : 'text-femfuel-dark hover:text-femfuel-rose'
              }`}
            >
              TIENDA
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 ${
                isActivePath('/shop') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <Link
              href="/blog"
              className={`relative px-2 py-1 text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                isActivePath('/blog')
                  ? 'text-femfuel-rose'
                  : 'text-femfuel-medium hover:text-femfuel-dark'
              }`}
            >
              Blog
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 ${
                isActivePath('/blog') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
            <UserMenu />
          </nav>
        </div>
        {showSearch && searchType !== 'none' && (
          <SmartSearch
            items={getSearchData().items}
            onSearch={handleSmartSearch}
            onSuggestionSelect={handleSuggestionSelect}
            placeholder={getSearchData().placeholder}
            className="w-full"
          />
        )}
      </div>
    </header>
  )
}
