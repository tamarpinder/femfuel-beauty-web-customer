"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { auth } from "@/lib/api"
import type { User as SupabaseUser, Session } from "@supabase/supabase-js"

export interface PaymentMethod {
  id: string
  type: "card" | "apple_pay" | "cash"
  cardNumber?: string // Last 4 digits for display
  expiryDate?: string
  cardHolderName?: string
  brand?: "visa" | "mastercard" | "amex" | "discover"
  isDefault?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  paymentMethods?: PaymentMethod[]
}

interface AuthContextType {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, userData?: any) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  isAuthenticated: boolean
  addPaymentMethod: (paymentMethod: Omit<PaymentMethod, "id">) => void
  removePaymentMethod: (paymentMethodId: string) => void
  setDefaultPaymentMethod: (paymentMethodId: string) => void
  getDefaultPaymentMethod: () => PaymentMethod | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // LIVE INTEGRATION DISABLED - Using mock authentication for demo
    // TODO: Replace with real Supabase authentication
    // Get initial session
    // auth.getSession().then(({ session }) => {
    //   setSession(session)
    //   if (session?.user) {
    //     setUser(mapSupabaseUserToUser(session.user))
    //   }
    //   setIsLoading(false)
    // })

    // Mock session check - check localStorage for demo user
    const mockUser = localStorage.getItem('mockCustomerUser');
    if (mockUser) {
      setUser(JSON.parse(mockUser));
    }
    setIsLoading(false);

    // Listen for auth changes - COMMENTED OUT FOR DEMO
    // const { data: { subscription } } = auth.onAuthStateChange(async (event, session) => {
    //   setSession(session)
    //   if (session?.user) {
    //     setUser(mapSupabaseUserToUser(session.user))
    //   } else {
    //     setUser(null)
    //   }
    //   setIsLoading(false)
    // })

    // return () => subscription.unsubscribe()
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

  // LIVE INTEGRATION DISABLED - Mock auth methods for demo
  const signUp = async (email: string, password: string, userData?: any) => {
    setIsLoading(true)
    // TODO: Replace with real Supabase auth
    // const result = await auth.signUp(email, password, userData)
    
    // Mock signup - always successful
    const mockUser = {
      id: 'customer-' + Date.now(),
      name: userData?.name || 'Nuevo Usuario',
      email: email,
      phone: userData?.phone || '',
      avatar: ''
    };
    setUser(mockUser);
    localStorage.setItem('mockCustomerUser', JSON.stringify(mockUser));
    setIsLoading(false)
    return { data: { user: mockUser }, error: null }
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    // TODO: Replace with real Supabase auth
    // const result = await auth.signIn(email, password)

    // Mock signin - always successful with test payment method
    const mockUser = {
      id: 'customer-001',
      name: 'María González',
      email: email,
      phone: '+1 809 555 0101',
      avatar: '',
      paymentMethods: [
        {
          id: 'pm-001',
          type: 'card' as const,
          cardNumber: '4242',
          expiryDate: '12/27',
          cardHolderName: 'María González',
          brand: 'visa' as const,
          isDefault: true
        }
      ]
    };
    setUser(mockUser);
    localStorage.setItem('mockCustomerUser', JSON.stringify(mockUser));
    setIsLoading(false)
    return { data: { user: mockUser }, error: null }
  }

  const signOut = async () => {
    setIsLoading(true)
    // TODO: Replace with real Supabase auth
    // const result = await auth.signOut()
    
    // Mock signout
    setUser(null);
    setSession(null);
    localStorage.removeItem('mockCustomerUser');
    setIsLoading(false)
    return { error: null }
  }

  const addPaymentMethod = (paymentMethodData: Omit<PaymentMethod, "id">) => {
    if (!user) return;

    const newPaymentMethod: PaymentMethod = {
      id: 'pm-' + Date.now(),
      ...paymentMethodData
    };

    // If this is the first payment method, make it default
    if (!user.paymentMethods || user.paymentMethods.length === 0) {
      newPaymentMethod.isDefault = true;
    }

    const updatedUser = {
      ...user,
      paymentMethods: [...(user.paymentMethods || []), newPaymentMethod]
    };

    setUser(updatedUser);
    localStorage.setItem('mockCustomerUser', JSON.stringify(updatedUser));
  };

  const removePaymentMethod = (paymentMethodId: string) => {
    if (!user || !user.paymentMethods) return;

    const updatedPaymentMethods = user.paymentMethods.filter(pm => pm.id !== paymentMethodId);

    // If we removed the default payment method, make the first remaining one default
    const removedMethod = user.paymentMethods.find(pm => pm.id === paymentMethodId);
    if (removedMethod?.isDefault && updatedPaymentMethods.length > 0) {
      updatedPaymentMethods[0].isDefault = true;
    }

    const updatedUser = {
      ...user,
      paymentMethods: updatedPaymentMethods
    };

    setUser(updatedUser);
    localStorage.setItem('mockCustomerUser', JSON.stringify(updatedUser));
  };

  const setDefaultPaymentMethod = (paymentMethodId: string) => {
    if (!user || !user.paymentMethods) return;

    const updatedPaymentMethods = user.paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === paymentMethodId
    }));

    const updatedUser = {
      ...user,
      paymentMethods: updatedPaymentMethods
    };

    setUser(updatedUser);
    localStorage.setItem('mockCustomerUser', JSON.stringify(updatedUser));
  };

  const getDefaultPaymentMethod = (): PaymentMethod | null => {
    if (!user || !user.paymentMethods) return null;
    return user.paymentMethods.find(pm => pm.isDefault) || user.paymentMethods[0] || null;
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    getDefaultPaymentMethod
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
