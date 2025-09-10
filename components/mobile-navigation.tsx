"use client"

import { useRouter } from "next/navigation"
import { Home, Search, Calendar, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavigationProps {
  activeTab?: "home" | "search" | "bookings" | "shop" | "profile" | "chat"
  onTabChange?: (tab: "home" | "search" | "bookings" | "shop" | "profile" | "chat") => void
}

export function MobileNavigation({ activeTab = "home", onTabChange }: MobileNavigationProps) {
  const router = useRouter()

  const tabs = [
    { id: "home" as const, icon: Home, label: "Inicio", path: "/" },
    { id: "search" as const, icon: Search, label: "Servicios", path: "/services" },
    { id: "bookings" as const, icon: Calendar, label: "Mis Citas", path: "/bookings" },
    { id: "shop" as const, icon: ShoppingBag, label: "Tienda", path: "/shop" },
    { id: "profile" as const, icon: User, label: "Perfil", path: "/profile" },
  ]

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    onTabChange?.(tab.id)
    router.push(tab.path)
  }

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 ${
                activeTab === tab.id ? "text-femfuel-rose" : "text-femfuel-medium"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </nav>
      {/* Bottom Padding for Mobile Navigation */}
      <div className="md:hidden h-24"></div>
    </>
  )
}
