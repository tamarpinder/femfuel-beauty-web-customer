import * as React from "react"
import { cn } from "@/lib/utils"

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "femfuel" | "dots" | "pulse"
  className?: string
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12"
}

export function LoadingSpinner({ size = "md", variant = "default", className }: LoadingSpinnerProps) {
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-femfuel-rose animate-bounce",
              size === "sm" && "w-1.5 h-1.5",
              size === "md" && "w-2 h-2",
              size === "lg" && "w-3 h-3",
              size === "xl" && "w-4 h-4"
            )}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: "0.6s"
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", sizeMap[size], className)}>
        <div className="absolute inset-0 rounded-full bg-femfuel-rose/30 animate-ping" />
        <div className="relative rounded-full bg-femfuel-rose animate-pulse h-full w-full" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-200",
        variant === "femfuel"
          ? "border-t-femfuel-rose border-r-femfuel-rose"
          : "border-t-gray-900 border-r-gray-900",
        sizeMap[size],
        className
      )}
    />
  )
}
