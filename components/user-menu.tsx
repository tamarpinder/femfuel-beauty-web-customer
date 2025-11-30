"use client"

import { useState } from "react"
import { User, Settings, Heart, Calendar, LogOut, ChevronDown, UserPlus, Wallet, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"
import { AuthModal } from "@/components/auth-modal"
import { useRouter } from "next/navigation"

export function UserMenu() {
  const { user, isAuthenticated, signOut } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const router = useRouter()

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleNavigateToProfile = (section?: string) => {
    if (section) {
      router.push(`/profile?section=${section}`)
    } else {
      router.push('/profile')
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleAuthClick("login")}
            className="glassmorphism-button min-h-[44px]"
            aria-label="Iniciar Sesión"
          >
            <User className="h-4 w-4" />
            <span>Iniciar Sesión</span>
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => handleAuthClick("login")}
            className="icon-button-mobile min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Iniciar Sesión"
          >
            <User className="h-5 w-5" />
          </button>
        </div>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onAuthSuccess={() => setShowAuthModal(false)} initialMode={authMode} />
      </>
    )
  }

  // Get user initials from first and last name
  const getUserInitials = (name?: string) => {
    if (!name) return "U"
    const nameParts = name.trim().split(" ")
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase()
    }
    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 min-h-[44px] p-2 hover:bg-femfuel-light active:bg-femfuel-light active:scale-95 rounded-xl transition-all duration-300 hover:shadow-md"
          aria-label={`Menú de ${user?.name || "Usuario"}`}
        >
          <Avatar className="h-10 w-10 md:h-8 md:w-8 ring-2 ring-transparent hover:ring-femfuel-rose/30 transition-all duration-300">
            {user?.avatar && <AvatarImage src={user.avatar} alt={user?.name} />}
            <AvatarFallback className="bg-gradient-to-br from-femfuel-rose to-pink-600 text-white text-sm font-bold shadow-md">
              {getUserInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-bold font-serif text-femfuel-dark">{user?.name || "Usuario"}</p>
          </div>
          <ChevronDown className="hidden md:block h-4 w-4 text-femfuel-medium transition-transform duration-300 group-hover:translate-y-0.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-[10000] bg-white/95 backdrop-blur-md border-2 border-femfuel-rose/10 shadow-2xl rounded-xl">
        <DropdownMenuLabel className="font-serif font-bold text-femfuel-dark py-3">{user?.name || "Usuario"}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-femfuel-rose/10" />
        <DropdownMenuItem
          className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-femfuel-light active:bg-femfuel-light transition-all duration-200 font-medium min-h-[44px] py-3"
          onClick={() => handleNavigateToProfile('overview')}
        >
          <User className="h-5 w-5 md:h-4 md:w-4 text-femfuel-rose flex-shrink-0" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-femfuel-light active:bg-femfuel-light transition-all duration-200 font-medium min-h-[44px] py-3"
          onClick={() => handleNavigateToProfile('payment')}
        >
          <Wallet className="h-5 w-5 md:h-4 md:w-4 text-femfuel-rose flex-shrink-0" />
          <span>Métodos de Pago</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-femfuel-light active:bg-femfuel-light transition-all duration-200 font-medium min-h-[44px] py-3"
          onClick={() => handleNavigateToProfile('orders')}
        >
          <ShoppingBag className="h-5 w-5 md:h-4 md:w-4 text-femfuel-rose flex-shrink-0" />
          <span>Órdenes</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-femfuel-light active:bg-femfuel-light transition-all duration-200 font-medium min-h-[44px] py-3"
          onClick={() => handleNavigateToProfile('favoritos')}
        >
          <Heart className="h-5 w-5 md:h-4 md:w-4 text-femfuel-rose flex-shrink-0" />
          <span>Favoritos</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-3 cursor-pointer rounded-lg hover:bg-femfuel-light active:bg-femfuel-light transition-all duration-200 font-medium min-h-[44px] py-3"
          onClick={() => handleNavigateToProfile('settings')}
        >
          <Settings className="h-5 w-5 md:h-4 md:w-4 text-femfuel-rose flex-shrink-0" />
          <span>Configuración</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-femfuel-rose/10" />
        <DropdownMenuItem
          className="flex items-center gap-3 cursor-pointer text-red-600 focus:text-red-600 hover:bg-red-50 active:bg-red-50 rounded-lg transition-all duration-200 font-medium min-h-[44px] py-3"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 md:h-4 md:w-4 flex-shrink-0" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
