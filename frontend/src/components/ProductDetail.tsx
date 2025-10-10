"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/lib/products-data"
import { Heart, Share2, Truck, Shield, RotateCcw, Star, Eye } from "lucide-react"
import Link from "next/link"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const hasImages = product.images && product.images.length > 0
  const displayImage = hasImages ? product.images[selectedImage] : product.image

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {hasImages && (
            <div className="grid grid-cols-4 gap-2">
              {product.images!.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImage === index ? "border-[#800000]" : "border-transparent"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Vista ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.category && <Badge className="bg-[#800000] text-white">{product.category}</Badge>}
              {product.featured && <Badge className="bg-[#800000]/80 text-white">Destacado</Badge>}
            </div>

            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-[#800000] mb-2">{product.name}</h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <span>por</span>
              <Link
                href={`/artesanos/${product.artisanId ?? "#"}`}
                className="text-[#800000] hover:underline font-medium"
              >
                {product.artisan}
              </Link>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{product.rating}</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-[#800000]">{product.price}</span>
              <span className="text-muted-foreground">MXN</span>
            </div>
          </div>

          <Separator className="bg-[#800000]/20" />

          <div>
            <h3 className="font-heading font-semibold text-lg text-[#800000] mb-3">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {product.description ?? "Este producto artesanal aún no tiene descripción detallada."}
            </p>
          </div>

          <Separator className="bg-[#800000]/20" />

          {/* Product Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-2 border-[#800000]">
              <CardContent className="p-4">
                <h4 className="font-semibold text-[#800000] mb-2">Materiales</h4>
                {product.materials && product.materials.length > 0 ? (
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {product.materials.map((material, index) => (
                      <li key={index}>• {material}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No especificado</p>
                )}
              </CardContent>
            </Card>

            <Card className="border-2 border-[#800000]">
              <CardContent className="p-4">
                <h4 className="font-semibold text-[#800000] mb-2">Especificaciones</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>Dimensiones: {product.dimensions ?? "No especificado"}</div>
                  <div>Peso: {product.weight ?? "No especificado"}</div>
                  <div className="flex items-center gap-2">
                    <span>Stock:</span>
                    <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                      {product.inStock
                        ? `${product.stockQuantity ?? "N/A"} disponibles`
                        : "Agotado"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="bg-[#800000]/20" />

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 bg-[#800000] hover:bg-[#800000]/90 text-white" asChild>
                <Link href={`/artesanos/${product.artisanId ?? "#"}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Más del Artesano
                </Link>
              </Button>

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
