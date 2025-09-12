"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"
import { SmartSearch } from "@/components/smart-search"
import { UserMenu } from "@/components/user-menu"
import { getAllServices } from "@/lib/vendors-api"
import type { SearchSuggestion } from "@/lib/search-utils"

interface DesktopHeaderProps {
  onSearch?: (query: string) => void
}

export function DesktopHeader({ onSearch }: DesktopHeaderProps) {
  const router = useRouter()
  const [services, setServices] = useState<any[]>([])

  // Load services for search
  useEffect(() => {
    async function loadServices() {
      try {
        const allServices = await getAllServices()
        setServices(allServices)
      } catch (error) {
        console.error('Error loading services:', error)
      }
    }
    loadServices()
  }, [])

  const handleSmartSearch = (query: string, suggestions: SearchSuggestion[]) => {
    // Just handle suggestions display, no navigation
    console.log('Searching:', query, 'Found:', suggestions.length, 'results')
  }

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    // Navigate only when user selects a suggestion
    router.push(`/search?q=${encodeURIComponent(suggestion.name)}`)
  }

  return (
    <header className="hidden md:block border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <img 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty"
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
              <span className="text-xl font-bold text-femfuel-dark">FemFuel Beauty</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-femfuel-medium">
              <MapPin className="h-4 w-4" />
              <span>Santo Domingo</span>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <Link 
              href="/services" 
              className="relative px-2 py-1 text-sm font-medium transition-all duration-300 text-femfuel-medium hover:text-femfuel-dark hover:scale-105 group"
            >
              Servicios
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
            </Link>
            <Link 
              href="/bookings" 
              className="relative px-2 py-1 text-sm font-medium transition-all duration-300 text-femfuel-medium hover:text-femfuel-dark hover:scale-105 group"
            >
              Mis Citas
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
            </Link>
            <Link 
              href="/shop" 
              className="relative px-2 py-1 text-sm font-bold transition-all duration-300 text-femfuel-dark hover:text-femfuel-rose hover:scale-105 group"
            >
              TIENDA
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
            </Link>
            <Link 
              href="/blog" 
              className="relative px-2 py-1 text-sm font-medium transition-all duration-300 text-femfuel-medium hover:text-femfuel-dark hover:scale-105 group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
            </Link>
            <UserMenu />
          </nav>
        </div>
        <SmartSearch
          items={services}
          onSearch={handleSmartSearch}
          onSuggestionSelect={handleSuggestionSelect}
          placeholder="Buscar servicios o salones..."
          className="w-full"
        />
      </div>
    </header>
  )
}
