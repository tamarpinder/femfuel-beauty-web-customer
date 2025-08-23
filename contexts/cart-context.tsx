"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { toast } from "sonner"
import { getProductById } from "@/data/products"
import { calculateDeliveryFee } from "@/data/warehouses"
import { CartItem, Cart, Product } from "@/types/product"
import { UserLocation } from "@/types/delivery"

interface CartContextType {
  cart: Cart | null
  itemCount: number
  subtotal: number
  deliveryFee: number
  total: number
  isLoading: boolean
  addToCart: (productId: string, quantity?: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  setUserLocation: (location: UserLocation | null) => void
  userLocation: UserLocation | null
  getCartItems: () => Array<CartItem & { product: Product }>
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

const CART_STORAGE_KEY = "femfuel-cart"
const LOCATION_STORAGE_KEY = "femfuel-user-location"

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Initialize cart and location from localStorage
  useEffect(() => {
    const initializeCart = () => {
      try {
        // Load cart from localStorage
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (savedCart) {
          const parsedCart: Cart = JSON.parse(savedCart)
          // Check if cart hasn't expired
          if (new Date(parsedCart.expiresAt) > new Date()) {
            setCart(parsedCart)
          } else {
            // Cart expired, clear it
            localStorage.removeItem(CART_STORAGE_KEY)
          }
        }

        // Load user location from localStorage
        const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY)
        if (savedLocation) {
          setUserLocation(JSON.parse(savedLocation))
        }
      } catch (error) {
        console.error("Error initializing cart:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeCart()
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart && !isLoading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart, isLoading])

  // Save user location to localStorage
  useEffect(() => {
    if (userLocation && !isLoading) {
      localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(userLocation))
    }
  }, [userLocation, isLoading])

  // Calculate cart totals
  const calculateTotals = useCallback((cartItems: CartItem[], location: UserLocation | null) => {
    let subtotal = 0
    let deliveryFee = 0

    // Calculate subtotal
    for (const item of cartItems) {
      const product = getProductById(item.productId)
      if (product) {
        subtotal += product.price * item.quantity
      }
    }

    // Calculate delivery fee if location is available
    if (location?.deliveryZone) {
      deliveryFee = calculateDeliveryFee(location.deliveryZone.id, subtotal)
    }

    const total = subtotal + deliveryFee

    return { subtotal, deliveryFee, total }
  }, [])

  // Update cart totals
  const updateCartTotals = useCallback((updatedCart: Cart) => {
    const { subtotal, deliveryFee, total } = calculateTotals(updatedCart.items, userLocation)
    
    return {
      ...updatedCart,
      subtotal,
      deliveryFee,
      total,
      updatedAt: new Date().toISOString()
    }
  }, [calculateTotals, userLocation])

  // Create new cart if none exists
  const createNewCart = useCallback((location: UserLocation | null): Cart => {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours from now

    return {
      id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: undefined, // Will be set when user logs in
      items: [],
      subtotal: 0,
      deliveryFee: 0,
      discount: 0,
      total: 0,
      deliveryZoneId: location?.deliveryZone?.id || "",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString()
    }
  }, [])

  // Add item to cart
  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      const product = getProductById(productId)
      if (!product) {
        toast.error("Producto no encontrado")
        return
      }

      if (!product.availability.inStock) {
        toast.error("Producto agotado")
        return
      }

      if (quantity > product.availability.stockQuantity) {
        toast.error(`Solo hay ${product.availability.stockQuantity} unidades disponibles`)
        return
      }

      // Check if product is available in user's delivery zone
      if (userLocation?.deliveryZone && product.availability.warehouseId) {
        const isAvailableInZone = userLocation.deliveryZone.warehouseId === product.availability.warehouseId
        if (!isAvailableInZone) {
          toast.error("Este producto no está disponible en tu área")
          return
        }
      }

      let updatedCart = cart || createNewCart(userLocation)

      // Check if item already exists in cart
      const existingItemIndex = updatedCart.items.findIndex(item => item.productId === productId)
      
      if (existingItemIndex >= 0) {
        const existingItem = updatedCart.items[existingItemIndex]
        const newQuantity = existingItem.quantity + quantity
        
        if (newQuantity > product.availability.stockQuantity) {
          toast.error(`No puedes agregar más de ${product.availability.stockQuantity} unidades`)
          return
        }
        
        updatedCart.items[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity
        }
      } else {
        // Add new item
        const newItem: CartItem = {
          productId,
          quantity,
          addedAt: new Date().toISOString()
        }
        updatedCart.items.push(newItem)
      }

      // Update totals and save
      updatedCart = updateCartTotals(updatedCart)
      setCart(updatedCart)
      
      toast.success(`${product.name} agregado al carrito`)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast.error("Error al agregar producto al carrito")
    }
  }, [cart, userLocation, createNewCart, updateCartTotals])

  // Remove item from cart
  const removeFromCart = useCallback(async (productId: string) => {
    try {
      if (!cart) return

      const product = getProductById(productId)
      const updatedItems = cart.items.filter(item => item.productId !== productId)
      
      let updatedCart = {
        ...cart,
        items: updatedItems
      }

      updatedCart = updateCartTotals(updatedCart)
      setCart(updatedCart)

      if (product) {
        toast.success(`${product.name} removido del carrito`)
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
      toast.error("Error al remover producto del carrito")
    }
  }, [cart, updateCartTotals])

  // Update item quantity
  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    try {
      if (!cart || quantity < 0) return

      const product = getProductById(productId)
      if (!product) {
        toast.error("Producto no encontrado")
        return
      }

      if (quantity === 0) {
        await removeFromCart(productId)
        return
      }

      if (quantity > product.availability.stockQuantity) {
        toast.error(`Solo hay ${product.availability.stockQuantity} unidades disponibles`)
        return
      }

      const updatedItems = cart.items.map(item => 
        item.productId === productId 
          ? { ...item, quantity }
          : item
      )

      let updatedCart = {
        ...cart,
        items: updatedItems
      }

      updatedCart = updateCartTotals(updatedCart)
      setCart(updatedCart)
    } catch (error) {
      console.error("Error updating quantity:", error)
      toast.error("Error al actualizar cantidad")
    }
  }, [cart, removeFromCart, updateCartTotals])

  // Clear entire cart
  const clearCart = useCallback(async () => {
    try {
      setCart(null)
      localStorage.removeItem(CART_STORAGE_KEY)
      toast.success("Carrito vaciado")
    } catch (error) {
      console.error("Error clearing cart:", error)
      toast.error("Error al vaciar carrito")
    }
  }, [])

  // Get cart items with product details
  const getCartItems = useCallback(() => {
    if (!cart) return []
    
    return cart.items.map(item => {
      const product = getProductById(item.productId)
      return {
        ...item,
        product: product!
      }
    }).filter(item => item.product) // Filter out items where product wasn't found
  }, [cart])

  // Update user location and recalculate cart totals
  const handleSetUserLocation = useCallback((location: UserLocation | null) => {
    setUserLocation(location)
    
    if (cart && location) {
      const updatedCart = updateCartTotals({
        ...cart,
        deliveryZoneId: location.deliveryZone?.id || ""
      })
      setCart(updatedCart)
    }
  }, [cart, updateCartTotals])

  // Computed values
  const itemCount = cart?.items.reduce((count, item) => count + item.quantity, 0) || 0
  const subtotal = cart?.subtotal || 0
  const deliveryFee = cart?.deliveryFee || 0
  const total = cart?.total || 0

  const value: CartContextType = {
    cart,
    itemCount,
    subtotal,
    deliveryFee,
    total,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setUserLocation: handleSetUserLocation,
    userLocation,
    getCartItems,
    isCartOpen,
    setIsCartOpen
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}