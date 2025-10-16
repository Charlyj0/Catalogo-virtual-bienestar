export type Product = {
  id: number
  name: string
  image: string
  images?: string[] // opcional si no siempre hay múltiples imágenes
  price: number
  originalPrice?: number
  discount?: number
  featured?: boolean
  artisan: string
  artisanId?: string // si lo usas en rutas
  location: string
  rating: number
  reviews: number
  category?: string
  description?: string
  materials?: string[]
  dimensions?: string
  weight?: string
  inStock?: boolean
  stockQuantity?: number
}