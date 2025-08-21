"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { auth } from "@/lib/api"
import type { User as SupabaseUser, Session } from "@supabase/supabase-js"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    auth.getSession().then(({ session }) => {
      setSession(session)
      if (session?.user) {
        setUser(mapSupabaseUserToUser(session.user))
      }
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      if (session?.user) {
        setUser(mapSupabaseUserToUser(session.user))
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Helper function to map Supabase user to our User interface
  const mapSupabaseUserToUser = (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'Usuario',
      email: supabaseUser.email || '',
      phone: supabaseUser.user_metadata?.phone || supabaseUser.phone || '',
      avatar: supabaseUser.user_metadata?.avatar_url || ''
    }
  }

  const signUp = async (email: string, password: string, userData?: any) => {
    setIsLoading(true)
    const result = await auth.signUp(email, password, userData)
    setIsLoading(false)
    return result
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    const result = await auth.signIn(email, password)
    setIsLoading(false)
    return result
  }

  const signOut = async () => {
    setIsLoading(true)
    const result = await auth.signOut()
    setIsLoading(false)
    return result
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!session?.user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
