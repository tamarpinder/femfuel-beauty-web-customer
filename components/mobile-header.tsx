"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { Search, User, UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AuthModal } from "@/components/auth-modal"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/contexts/auth-context"

interface MobileHeaderProps {
  onSearch?: (query: string) => void
}

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [showSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    
    // Debounced callback with slight delay to prevent focus loss
    debounceRef.current = setTimeout(() => {
      onSearch?.(value)
    }, 500)  // Increased delay for smoother typing
  }, [onSearch])

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
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar servicios o salones..."
                  className="pl-10 h-10 rounded-xl border-gray-200 focus:border-[var(--femfuel-rose)] focus:ring-[var(--femfuel-rose)]"
                  value={searchValue}
                  onChange={handleSearch}
                  autoFocus
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
