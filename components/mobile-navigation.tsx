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
    { id: "shop" as const, icon: ShoppingBag, label: "Tienda", path: "/shop" },
    { id: "bookings" as const, icon: Calendar, label: "Mis Citas", path: "/bookings" },
    { id: "profile" as const, icon: User, label: "Perfil", path: "/profile" },
  ]

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    onTabChange?.(tab.id)
    router.push(tab.path)
  }

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t-2 border-femfuel-rose/10 px-2 z-50 shadow-2xl pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around gap-2 py-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`
                flex flex-col items-center gap-1 relative transition-all duration-300
                min-h-[48px] min-w-[48px] flex-1 max-w-[80px]
                ${activeTab === tab.id
                  ? "text-femfuel-rose bg-femfuel-light rounded-xl"
                  : "text-femfuel-medium hover:text-femfuel-rose hover:bg-femfuel-light/50 rounded-xl"
                }
              `}
              onClick={() => handleTabClick(tab)}
            >
              <tab.icon className="h-5 w-5 transition-all duration-300 flex-shrink-0" />
              <span className={`text-xs font-medium leading-tight ${activeTab === tab.id ? 'font-bold' : ''}`}>{tab.label}</span>

              {/* Active indicator - larger and more visible */}
              {activeTab === tab.id && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-femfuel-rose to-pink-600 rounded-full shadow-md" />
              )}
            </Button>
          ))}
        </div>
      </nav>
      {/* Bottom Padding for Mobile Navigation - with safe area */}
      <div className="md:hidden h-[calc(4.5rem+env(safe-area-inset-bottom))]"></div>
    </>
  )
}
