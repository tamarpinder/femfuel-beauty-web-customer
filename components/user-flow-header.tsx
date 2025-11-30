"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { useRouter } from "next/navigation"

interface UserFlowHeaderProps {
  title: string
  showBackButton?: boolean
  onBack?: () => void
  className?: string
  rightElement?: React.ReactNode
}

export function UserFlowHeader({ 
  title, 
  showBackButton = true, 
  onBack,
  className = "",
  rightElement
}: UserFlowHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-femfuel-rose/10 shadow-sm ${className}`}>
      <div className="px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation */}
          <div className="flex items-center gap-2 md:gap-3 flex-1">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="min-w-[44px] min-h-[44px] hover:bg-femfuel-light/50 active:bg-femfuel-light active:scale-95 transition-all duration-300"
                aria-label="Volver"
              >
                <ArrowLeft className="h-5 w-5 md:h-4 md:w-4" />
              </Button>
            )}
            <h1 className="text-base md:text-lg font-semibold text-femfuel-dark truncate">
              {title}
            </h1>
          </div>

          {/* Right side - Custom element or User Profile */}
          <div className="flex items-center gap-2">
            {rightElement}
            {!rightElement && <UserMenu />}
          </div>
        </div>
      </div>
    </header>
  )
}