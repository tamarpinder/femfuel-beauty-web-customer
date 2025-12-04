import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerifiedBadgeProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showTooltip?: boolean
}

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5"
}

export function VerifiedBadge({
  size = "md",
  className,
  showTooltip = false
}: VerifiedBadgeProps) {
  return (
    <ShieldCheck
      className={cn(
        "text-femfuel-rose flex-shrink-0",
        sizeClasses[size],
        className
      )}
      aria-label="Verificado"
    />
  )
}
