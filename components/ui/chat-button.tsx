"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatButtonProps {
  vendorId?: string
  vendorName?: string
  variant?: "floating" | "inline" | "card"
  size?: "sm" | "md" | "lg"
  className?: string
  serviceContext?: string
  children?: React.ReactNode
  unreadCount?: number
}

export function ChatButton({
  vendorId,
  vendorName,
  variant = "inline",
  size = "md",
  className,
  serviceContext,
  children,
  unreadCount = 0
}: ChatButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleChatClick = async () => {
    setIsLoading(true)
    
    if (!vendorId) {
      // Floating chat button without vendor goes to messages page
      router.push('/chat')
      setIsLoading(false)
      return
    }
    
    // Build chat URL with context for specific vendor
    let chatUrl = `/chat/${vendorId}`
    const queryParams = []
    
    if (serviceContext) {
      queryParams.push(`service=${encodeURIComponent(serviceContext)}`)
    }
    
    if (queryParams.length > 0) {
      chatUrl += `?${queryParams.join('&')}`
    }
    
    router.push(chatUrl)
    setIsLoading(false)
  }

  const getButtonContent = () => {
    if (children) return children
    
    switch (variant) {
      case "floating":
        return <MessageCircle className="h-6 w-6" />
      case "card":
        return (
          <>
            <MessageCircle className="h-4 w-4" />
            <span>Chatear con {vendorName || "el proveedor"}</span>
          </>
        )
      default:
        return (
          <>
            <MessageCircle className="h-4 w-4" />
            <span>Chatear</span>
          </>
        )
    }
  }

  const getButtonSize = () => {
    switch (size) {
      case "sm":
        return "min-h-[44px] px-3 text-xs"
      case "lg":
        return "min-h-[48px] px-6 text-base"
      default:
        return "min-h-[44px] px-4 text-sm"
    }
  }

  const getButtonStyles = () => {
    const baseStyles = "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold transition-all duration-300 active:scale-95"

    switch (variant) {
      case "floating":
        return cn(
          baseStyles,
          "w-14 h-14 rounded-full shadow-xl hover:shadow-2xl",
          "flex items-center justify-center transform",
          "border-2 border-white/20",
          className
        )
      case "card":
        return cn(
          baseStyles,
          "w-full justify-center gap-2 shadow-lg hover:shadow-xl rounded-xl",
          getButtonSize(),
          className
        )
      default:
        return cn(
          baseStyles,
          "rounded-xl gap-2 shadow-lg hover:shadow-xl transform",
          getButtonSize(),
          className
        )
    }
  }

  return (
    <div className={cn(
      variant === "floating"
        ? "fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50"
        : "relative w-full"
    )}>
      <Button
        onClick={handleChatClick}
        disabled={isLoading}
        className={getButtonStyles()}
        variant="ghost"
      >
        {getButtonContent()}
      </Button>

      {/* Notification Badge for Floating Variant */}
      {variant === "floating" && unreadCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold border-2 border-white shadow-lg animate-pulse z-[60] px-1.5">
          {unreadCount > 99 ? '99+' : unreadCount}
        </div>
      )}
    </div>
  )
}