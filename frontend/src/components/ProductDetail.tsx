"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"

interface Producto {
  id: number
  titulo: string
  descripcion: string
  precio_aproximado: string
  imagen_destacada: string | null
  imagenes?: { id: number; url_imagen: string }[]
  destacado?: boolean
  artesano: string
  artesano_id?: number 
  categoria_nombre?: string
  etiquetas?: { id: number; nombre: string }[]
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/de8imj2cr/image/upload/v1762620371/artesanosmx/uluhiri32rzrpbxtpw69.jpg"

export function ProductDetail({ product }: { product: Producto }) {
  // Estado para la imagen seleccionada
  const [selectedImage, setSelectedImage] = useState(
    product.imagen_destacada ||
      (product.imagenes && product.imagenes.length > 0
        ? product.imagenes[0].url_imagen
        : DEFAULT_IMAGE)
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Imagen principal + galería */}
        <div>
          {/* Imagen principal */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted border shadow-md">
            <img
              src={selectedImage}
              alt={product.titulo}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Miniaturas */}
          {product.imagenes && product.imagenes.length > 1 && (
            <div className="flex gap-2 mt-4">
              {product.imagenes.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url_imagen)}
                  className={`w-20 h-20 rounded-md overflow-hidden border ${
                    selectedImage === img.url_imagen
                      ? "ring-2 ring-[#800000]"
                      : "hover:ring-2 hover:ring-[#800000]/50"
                  }`}
                >
                  <img
                    src={img.url_imagen}
                    alt={`Imagen ${img.id}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información */}
        <div className="space-y-6">
          <div>
            {product.destacado && (
              <Badge className="bg-[#800000]/80 text-white mb-2">Destacado</Badge>
            )}

            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-[#800000] mb-2">
              {product.titulo}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <span>por</span>
              <span className="text-[#800000] font-medium">{product.artesano}</span>
              {product.categoria_nombre && (
                <>
                  <span className="mx-2">•</span>
                  <Badge className="bg-gray-200 text-[#800000]">
                    {product.categoria_nombre}
                  </Badge>
                </>
              )}
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-[#800000]">
                Desde ${product.precio_aproximado}
              </span>
              <span className="text-muted-foreground">MXN</span>
            </div>
          </div>

          <Separator className="bg-[#800000]/20" />

          <div>
            <h3 className="font-heading font-semibold text-lg text-[#800000] mb-3">
              Descripción
            </h3>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {product.descripcion ||
                "Este producto artesanal aún no tiene descripción detallada."}
            </p>

            {product.etiquetas && product.etiquetas.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {product.etiquetas.map((tag) => (
                  <Badge key={tag.id} className="bg-[#800000]/10 text-[#800000]">
                    {tag.nombre}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator className="bg-[#800000]/20" />

          {/* Botones */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/artisan/${product.artesano_id}`} className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-[#800000] hover:bg-[#800000]/90 text-white"
                >
                  Ver Más del Artesano
                </Button>
              </Link>

              <Button variant="outline" size="lg">
                <Heart className="mr-2 h-4 w-4" />
                Favoritos
              </Button>

              <Button variant="outline" size="lg">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-5 w-5 text-[#800000]" />
              <div>
                <div className="font-medium">Información disponible</div>
                <div className="text-muted-foreground">Contacto directo</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-5 w-5 text-[#800000]" />
              <div>
                <div className="font-medium">Producto auténtico</div>
                <div className="text-muted-foreground">100% artesanal</div>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="h-5 w-5 text-[#800000]" />
              <div>
                <div className="font-medium">Garantía</div>
                <div className="text-muted-foreground">Calidad artesanal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
