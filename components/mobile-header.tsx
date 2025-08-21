"use client"

import type React from "react"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface MobileHeaderProps {
  onSearch?: (query: string) => void
}

export function MobileHeader({ onSearch }: MobileHeaderProps) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch?.(e.target.value)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 md:hidden">
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar servicios o salones..."
            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[var(--femfuel-rose)] focus:ring-[var(--femfuel-rose)]"
            onChange={handleSearch}
          />
        </div>
      </div>
    </header>
  )
}
