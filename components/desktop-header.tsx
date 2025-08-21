"use client"

import type React from "react"

import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UserMenu } from "@/components/user-menu"

interface DesktopHeaderProps {
  onSearch?: (query: string) => void
}

export function DesktopHeader({ onSearch }: DesktopHeaderProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value)
  }

  return (
    <header className="hidden md:block border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-femfuel-rose rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-femfuel-dark">FemFuel</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-femfuel-medium">
              <MapPin className="h-4 w-4" />
              <span>Santo Domingo</span>
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-femfuel-medium hover:text-femfuel-dark">
              Servicios
            </a>
            <a href="#" className="text-femfuel-medium hover:text-femfuel-dark">
              Categorías
            </a>
            <a href="#" className="text-femfuel-medium hover:text-femfuel-dark">
              Salones
            </a>
            <a href="#" className="text-femfuel-medium hover:text-femfuel-dark">
              Ofertas
            </a>
            <UserMenu />
          </nav>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar servicios o salones..."
            className="pl-12 h-14 rounded-xl border-gray-200 focus:border-[var(--femfuel-rose)] focus:ring-[var(--femfuel-rose)]"
            onChange={handleSearch}
          />
        </div>
      </div>
    </header>
  )
}
