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
}

export function UserFlowHeader({ 
  title, 
  showBackButton = true, 
  onBack,
  className = ""
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
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-100 ${className}`}>
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Navigation */}
          <div className="flex items-center gap-3 flex-1">
            {showBackButton && (
              <Button variant="ghost" size="sm" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <h1 className="text-lg font-semibold text-femfuel-dark truncate">
              {title}
            </h1>
          </div>

          {/* Right side - User Profile */}
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}