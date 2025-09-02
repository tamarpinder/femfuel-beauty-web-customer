"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Search, User, UserPlus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/contexts/auth-context"

interface MobileHeaderProps {
  onSearch?: (query: string) => void
}

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  const { user, isAuthenticated, login } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value)
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
                  <>
                    <button 
                      onClick={() => handleAuthClick("login")}
                      className="glassmorphism-button-mobile"
                    >
                      <User className="h-3 w-3" />
                      <span className="hidden xs:inline">Entrar</span>
                    </button>
                    <button 
                      onClick={() => handleAuthClick("signup")}
                      className="femfuel-button-mobile"
                    >
                      <UserPlus className="h-3 w-3" />
                      <span>Comenzar</span>
                    </button>
                  </>
                ) : (
                  <button className="icon-button-mobile">
                    <div className="w-6 h-6 bg-femfuel-rose rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-medium">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </button>
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
        onAuthSuccess={login}
        initialMode={authMode}
      />
    </>
  )
}
