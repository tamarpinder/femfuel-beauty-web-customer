"use client"

import { useState } from "react"
import { User, Settings, Heart, Calendar, LogOut, ChevronDown, UserPlus, Wallet } from "lucide-react"
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
            className="glassmorphism-button"
          >
            <User className="h-4 w-4" />
            <span>Iniciar Sesión</span>
          </button>
          <button 
            onClick={() => handleAuthClick("signup")}
            className="femfuel-button-lg"
          >
            <UserPlus className="h-4 w-4" />
            <span>Comenzar</span>
          </button>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center gap-2">
          <button 
            onClick={() => handleAuthClick("login")}
            className="glassmorphism-button-mobile"
          >
            <User className="h-3 w-3" />
            <span>Entrar</span>
          </button>
        </div>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onAuthSuccess={() => setShowAuthModal(false)} initialMode={authMode} />
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback className="bg-femfuel-rose text-white text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-femfuel-dark">{user?.name}</p>
            <p className="text-xs text-femfuel-medium">{user?.email}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-femfuel-medium" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigateToProfile('overview')}
        >
          <User className="h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigateToProfile('payment')}
        >
          <Wallet className="h-4 w-4" />
          <span>Métodos de Pago</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigateToProfile('favoritos')}
        >
          <Heart className="h-4 w-4" />
          <span>Favoritos</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavigateToProfile('settings')}
        >
          <Settings className="h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
