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
}

export function ChatButton({
  vendorId,
  vendorName,
  variant = "inline",
  size = "md",
  className,
  serviceContext,
  children
}: ChatButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleChatClick = async () => {
    if (!vendorId) return
    
    setIsLoading(true)
    
    // Build chat URL with context
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
            <span>Chat</span>
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
    const baseStyles = "bg-green-500 hover:bg-green-600 text-white font-medium transition-all duration-200"
    
    switch (variant) {
      case "floating":
        return cn(
          baseStyles,
          "fixed bottom-20 right-4 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl",
          "flex items-center justify-center",
          "md:bottom-6 md:right-6",
          className
        )
      case "card":
        return cn(
          baseStyles,
          "w-full justify-center gap-2",
          getButtonSize(),
          className
        )
      default:
        return cn(
          baseStyles,
          "rounded-lg gap-2",
          getButtonSize(),
          className
        )
    }
  }

  return (
    <Button
      onClick={handleChatClick}
      disabled={!vendorId || isLoading}
      className={getButtonStyles()}
      variant="ghost"
    >
      {getButtonContent()}
    </Button>
  )
}