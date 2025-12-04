/**
 * Micro-interactions Library
 * Subtle animations and interactions for enhanced UX
 */

/**
 * Button Press Animation Classes
 * Apply to buttons for tactile feedback
 */
export const buttonPress = {
  subtle: "active:scale-[0.98] transition-transform duration-100",
  medium: "active:scale-95 transition-transform duration-150",
  strong: "active:scale-90 transition-transform duration-150",
  bounce: "active:scale-95 transition-transform duration-200 ease-out"
}

/**
 * Card Hover Animation Classes
 * Apply to cards for interactive feedback
 */
export const cardHover = {
  lift: "transition-all duration-300 active:scale-[0.98] hover:shadow-xl",
  liftSubtle: "transition-all duration-300 active:scale-[0.98] hover:shadow-lg",
  scale: "transition-transform duration-300 active:scale-[0.98]",
  glow: "transition-all duration-300 hover:shadow-2xl hover:shadow-femfuel-rose/20",
  float: "transition-all duration-500 active:scale-95 hover:shadow-2xl animate-float"
}

/**
 * Input Focus Animation Classes
 * Apply to form inputs for better UX
 */
export const inputFocus = {
  ring: "focus:ring-2 focus:ring-femfuel-rose/50 focus:border-femfuel-rose transition-all duration-200",
  glow: "focus:shadow-lg focus:shadow-femfuel-rose/20 focus:border-femfuel-rose transition-all duration-300",
  scale: "focus:scale-[1.02] focus:ring-2 focus:ring-femfuel-rose/50 transition-all duration-200"
}

/**
 * Ripple Effect
 * Creates a Material Design-like ripple effect
 */
export function createRipple(event: React.MouseEvent<HTMLElement>) {
  const button = event.currentTarget
  const ripple = document.createElement("span")

  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2

  const rect = button.getBoundingClientRect()
  ripple.style.width = ripple.style.height = `${diameter}px`
  ripple.style.left = `${event.clientX - rect.left - radius}px`
  ripple.style.top = `${event.clientY - rect.top - radius}px`
  ripple.classList.add("ripple-effect")

  const existingRipple = button.getElementsByClassName("ripple-effect")[0]
  if (existingRipple) {
    existingRipple.remove()
  }

  button.appendChild(ripple)

  setTimeout(() => ripple.remove(), 600)
}

/**
 * Haptic Feedback (for supported devices)
 */
export function triggerHaptic(intensity: "light" | "medium" | "heavy" = "medium") {
  if (typeof window === "undefined") return
  if (!("vibrate" in navigator)) return

  const patterns = {
    light: [10],
    medium: [20],
    heavy: [30]
  }

  navigator.vibrate(patterns[intensity])
}

/**
 * Shake Animation
 * Triggers a shake animation on an element (useful for errors)
 */
export function shakeElement(elementId: string) {
  const element = document.getElementById(elementId)
  if (!element) return

  element.classList.add("animate-shake")
  setTimeout(() => element.classList.remove("animate-shake"), 500)
}

/**
 * Pulse Animation
 * Triggers a pulse animation on an element (useful for notifications)
 */
export function pulseElement(elementId: string) {
  const element = document.getElementById(elementId)
  if (!element) return

  element.classList.add("animate-pulse")
  setTimeout(() => element.classList.remove("animate-pulse"), 1000)
}

/**
 * Toast Notification Position Classes
 */
export const toastPosition = {
  topLeft: "fixed top-4 left-4 z-50",
  topCenter: "fixed top-4 left-1/2 -translate-x-1/2 z-50",
  topRight: "fixed top-4 right-4 z-50",
  bottomLeft: "fixed bottom-4 left-4 z-50",
  bottomCenter: "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
  bottomRight: "fixed bottom-4 right-4 z-50"
}

/**
 * Smooth Scroll to Element
 */
export function smoothScrollTo(elementId: string, offset: number = 0) {
  const element = document.getElementById(elementId)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.scrollY
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  })
}

/**
 * Copy to Clipboard with Animation Feedback
 */
export async function copyToClipboard(text: string, elementId?: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)

    if (elementId) {
      const element = document.getElementById(elementId)
      if (element) {
        element.classList.add("animate-bounce")
        setTimeout(() => element.classList.remove("animate-bounce"), 500)
      }
    }

    return true
  } catch (err) {
    console.error("Failed to copy:", err)
    return false
  }
}

/**
 * Number Counter Animation
 * Animates a number from start to end
 */
export function animateNumber(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number = 1000
) {
  const range = end - start
  const increment = range / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment

    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      element.textContent = Math.round(end).toString()
      clearInterval(timer)
    } else {
      element.textContent = Math.round(current).toString()
    }
  }, 16)
}

/**
 * Stagger Animation Classes
 * Apply to children for staggered entrance
 */
export function getStaggerDelay(index: number, baseDelay: number = 100): string {
  return `${index * baseDelay}ms`
}

/**
 * Loading State Classes
 */
export const loadingStates = {
  shimmer: "animate-shimmer bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-[length:200%_100%]",
  pulse: "animate-pulse bg-gray-200",
  skeleton: "bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded"
}

/**
 * Page Transition Classes
 */
export const pageTransitions = {
  fadeIn: "animate-in fade-in duration-500",
  fadeOut: "animate-out fade-out duration-300",
  slideInFromRight: "animate-in slide-in-from-right duration-500",
  slideInFromLeft: "animate-in slide-in-from-left duration-500",
  slideInFromBottom: "animate-in slide-in-from-bottom duration-500",
  zoomIn: "animate-in zoom-in duration-500",
  zoomOut: "animate-out zoom-out duration-300"
}
