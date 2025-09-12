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
        return "h-8 px-3 text-xs"
      case "lg":
        return "h-12 px-6 text-base"
      default:
        return "h-10 px-4 text-sm"
    }
  }

  const getButtonStyles = () => {
    const baseStyles = "bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-md"
    
    switch (variant) {
      case "floating":
        return cn(
          baseStyles,
          "fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:scale-110",
          "flex items-center justify-center transform",
          "md:bottom-6 md:right-6",
          className
        )
      case "card":
        return cn(
          baseStyles,
          "w-full justify-center gap-2 hover:shadow-lg",
          getButtonSize(),
          className
        )
      default:
        return cn(
          baseStyles,
          "rounded-lg gap-2 hover:shadow-lg transform",
          getButtonSize(),
          className
        )
    }
  }

  return (
    <div className="relative">
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
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center font-bold border-2 border-white">
          {unreadCount > 99 ? '99+' : unreadCount}
        </div>
      )}
    </div>
  )
}