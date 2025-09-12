"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, User, UserPlus } from "lucide-react"
import { SmartSearch } from "@/components/smart-search"
import { AuthModal } from "@/components/auth-modal"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/contexts/auth-context"
import { getAllServices } from "@/lib/vendors-api"
import type { SearchSuggestion } from "@/lib/search-utils"

interface MobileHeaderProps {
  onSearch?: (query: string) => void
}

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [showSearch, setShowSearch] = useState(false)
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
    setShowSearch(false)
  }

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 md:hidden">
        {!showSearch ? (
          // Main Header Layout
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <img 
                  src="/femfuel-logo.png" 
                  alt="FemFuel Beauty"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-lg font-bold text-femfuel-dark">FemFuel</span>
              </Link>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSearch(true)}
                  className="icon-button-mobile"
                  aria-label="Buscar"
                >
                  <Search className="h-4 w-4" />
                </button>
                
                {!isAuthenticated ? (
                  <button 
                    onClick={() => handleAuthClick("login")}
                    className="glassmorphism-button-mobile"
                  >
                    <User className="h-3 w-3" />
                    <span>Entrar</span>
                  </button>
                ) : (
                  <UserMenu />
                )}
              </div>
            </div>
          </div>
        ) : (
          // Search Layout
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSearch(false)}
                className="text-femfuel-medium hover:text-femfuel-dark"
              >
                ←
              </button>
              <div className="flex-1">
                <SmartSearch
                  items={services}
                  onSearch={handleSmartSearch}
                  onSuggestionSelect={handleSuggestionSelect}
                  placeholder="Buscar servicios o salones..."
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onAuthSuccess={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  )
}
