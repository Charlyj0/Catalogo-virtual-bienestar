// src/components/NuestrosProductos.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star } from "lucide-react";
import { mockProducts } from "@/data/mockproduct";
import Image from "next/image";
import Link from "next/link";

export default function ProductSection({
  onProductSelect,
}: {
  onProductSelect?: (id: string) => void;
}) {
  return (
    <section className="w-full px-6 py-12">
      <h2 className="text-2xl font-semibold text-[#800000] mb-8">Nuestros productos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mockProducts.length > 0 ? (
          mockProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 rounded-xl overflow-hidden"
              onClick={() => onProductSelect?.(product.id.toString())}
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={224}
                  className="w-full h-56 object-cover p-[10px] group-hover:scale-105 transition-transform duration-300"
                />
                {product.featured && (
                  <Badge className="absolute top-3 left-3 z-10 bg-[#800000] text-white">
                    Destacado
                  </Badge>
                )}
                {product.discount && (
                  <Badge className="absolute top-3 right-3 z-10 bg-red-600 text-white">
                    -{product.discount}%
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Heart className="w-4 h-4 text-[#800000]" />
                </Button>
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#800000] transition-colors mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{product.artisan} • {product.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-semibold text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link href={`/product/${product.id}`}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="group-hover:bg-[#800000] group-hover:text-white transition-colors"
                  >
                    Ver más
                  </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No hay productos disponibles.</p>
        )}
      </div>
    </section>
  );
}
