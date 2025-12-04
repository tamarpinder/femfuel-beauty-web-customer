/**
 * FemFuel Beauty Design System
 * Centralized design tokens, utilities, and helpers
 */

// Shadow Presets
export const shadows = {
  femfuel: {
    sm: "shadow-sm hover:shadow-md",
    md: "shadow-md hover:shadow-lg",
    lg: "shadow-lg hover:shadow-xl",
    xl: "shadow-xl hover:shadow-2xl",
    rose: "shadow-lg shadow-femfuel-rose/20 hover:shadow-2xl hover:shadow-femfuel-rose/30"
  },
  depth: {
    1: "shadow-sm",
    2: "shadow-md",
    3: "shadow-lg",
    4: "shadow-xl",
    5: "shadow-2xl"
  }
}

// Typography System
export const typography = {
  fluid: {
    xs: "text-xs md:text-sm",
    sm: "text-sm md:text-base",
    base: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
    xl: "text-xl md:text-2xl",
    "2xl": "text-2xl md:text-3xl",
    "3xl": "text-3xl md:text-4xl lg:text-5xl",
    "4xl": "text-4xl md:text-5xl lg:text-6xl",
    "5xl": "text-5xl md:text-6xl lg:text-7xl"
  },
  shadow: {
    sm: "drop-shadow-sm",
    md: "drop-shadow-md",
    lg: "drop-shadow-lg",
    xl: "drop-shadow-2xl",
    glow: "drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
  },
  spacing: {
    tight: "tracking-tight",
    normal: "tracking-normal",
    wide: "tracking-wide",
    wider: "tracking-wider",
    widest: "tracking-widest"
  }
}

// Animation Presets
export const animations = {
  fadeIn: "animate-in fade-in",
  fadeOut: "animate-out fade-out",
  slideInFromTop: "animate-in slide-in-from-top",
  slideInFromBottom: "animate-in slide-in-from-bottom",
  slideInFromLeft: "animate-in slide-in-from-left",
  slideInFromRight: "animate-in slide-in-from-right",
  scaleIn: "animate-in zoom-in",
  scaleOut: "animate-out zoom-out"
}

// Gradient Presets
export const gradients = {
  femfuel: {
    rose: "bg-gradient-to-r from-femfuel-rose to-pink-600",
    light: "bg-gradient-to-r from-femfuel-light to-pink-100",
    purple: "bg-gradient-to-r from-purple-500 to-pink-500",
    warm: "bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50"
  },
  glass: {
    white: "bg-gradient-to-br from-white/95 to-white/80",
    rose: "bg-gradient-to-br from-femfuel-rose/10 to-pink-500/10"
  }
}

// Border Utilities
export const borders = {
  femfuel: {
    light: "border border-femfuel-rose/10",
    medium: "border-2 border-femfuel-rose/20",
    strong: "border-2 border-femfuel-rose",
    gradient: "border-2 border-transparent bg-gradient-to-r from-femfuel-rose to-pink-600"
  }
}

// Hover Effects
export const hover = {
  lift: {
    sm: "active:scale-[0.98]",
    md: "active:scale-[0.98]",
    lg: "active:scale-95"
  },
  scale: {
    sm: "active:scale-95",
    md: "active:scale-95",
    lg: "active:scale-90"
  },
  glow: "hover:shadow-2xl hover:shadow-femfuel-rose/30"
}

// Glassmorphism Presets
export const glassmorphism = {
  light: "bg-white/80 backdrop-blur-sm",
  medium: "bg-white/90 backdrop-blur-md",
  strong: "bg-white/95 backdrop-blur-lg",
  dark: "bg-black/80 backdrop-blur-md"
}

// Spacing System
export const spacing = {
  section: "py-12 md:py-16 lg:py-20",
  container: "px-4 sm:px-6 lg:px-8",
  card: "p-4 md:p-6 lg:p-8"
}

// Color Opacity Utilities
export function withOpacity(color: string, opacity: number): string {
  return `${color}/${opacity}`
}

// Combine utilities helper
export function combine(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ")
}
