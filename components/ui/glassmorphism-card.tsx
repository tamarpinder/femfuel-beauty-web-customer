import * as React from "react"
import { cn } from "@/lib/utils"

export interface GlassmorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blur?: "sm" | "md" | "lg" | "xl"
  opacity?: number
  gradient?: boolean
  border?: boolean
}

const blurMap = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl"
}

const GlassmorphismCard = React.forwardRef<HTMLDivElement, GlassmorphismCardProps>(
  ({ className, blur = "md", opacity = 90, gradient = false, border = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl",
          blurMap[blur],
          `bg-white/${opacity}`,
          border && "border border-white/40 shadow-xl",
          gradient && "bg-gradient-to-br from-white/95 to-white/80",
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
GlassmorphismCard.displayName = "GlassmorphismCard"

export { GlassmorphismCard }
