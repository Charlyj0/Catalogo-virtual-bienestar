export type Product = {
  id: number
  titulo: string
  descripcion: string
  precio_aproximado: string
  imagen_destacada: string | null
  destacado?: boolean
  artesano: string
}