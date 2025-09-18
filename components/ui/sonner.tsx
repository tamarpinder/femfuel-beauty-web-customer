"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        style: {
          background: "white",
          border: "1px solid #f1f5f9",
          color: "#334155",
          borderRadius: "12px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        className: "femfuel-toast",
        duration: 4000,
      }}
      style={
        {
          "--normal-bg": "white",
          "--normal-text": "#334155",
          "--normal-border": "#f1f5f9",
          "--success-bg": "#be185d",
          "--success-text": "white",
          "--error-bg": "#dc2626", 
          "--error-text": "white",
          "--info-bg": "#7c3aed",
          "--info-text": "white",
          "--warning-bg": "#f59e0b",
          "--warning-text": "#92400e",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
