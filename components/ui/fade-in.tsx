import * as React from "react"
import { cn } from "@/lib/utils"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  triggerOnce?: boolean
}

const directionMap = {
  up: "translate-y-8",
  down: "-translate-y-8",
  left: "translate-x-8",
  right: "-translate-x-8",
  none: ""
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 700,
  direction = "up",
  triggerOnce = true,
  ...props
}: FadeInProps) {
  const { ref, isVisible } = useScrollAnimation({ triggerOnce })

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-all ease-out",
        !isVisible && `opacity-0 ${directionMap[direction]}`,
        isVisible && "opacity-100 translate-y-0 translate-x-0",
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`
      }}
      {...props}
    >
      {children}
    </div>
  )
}
