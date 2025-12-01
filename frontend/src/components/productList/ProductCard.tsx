import React from "react"
import Link from "next/link"

interface Product {
  id: number
  titulo: string
  precio_aproximado: string
  imagen_destacada: string
  artesano: string
  etiquetas?: string
  destacado?: number | boolean
  creado_en?: string
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/de8imj2cr/image/upload/v1762620371/artesanosmx/uluhiri32rzrpbxtpw69.jpg"

export default function ProductCard({ producto }: { producto: Product }) {
  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition overflow-hidden w-full max-w-sm mx-auto">
      {/* Imagen */}
      <div className="relative">
        <img
          src={producto.imagen_destacada || DEFAULT_IMAGE}
          alt={producto.titulo}
          className="w-full h-56 object-cover transition group-hover:scale-[1.03]"
        />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

      {producto.destacado === 1 && (
        <span className="absolute top-3 left-3 bg-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          Destacado
        </span>
      )}
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div className="mb-3">
          {/* Etiquetas como hashtags */}
          {producto.etiquetas && (
            <div className="mb-2 flex flex-wrap justify-center">
              {producto.etiquetas.split(", ").map((tag, i) => (
                <span
                  key={i}
                  className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mr-1 mb-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-800 leading-tight line-clamp-2 text-center mt-2">
            {producto.titulo}
          </h3>
          <p className="text-sm text-gray-500 text-center mt-1 line-clamp-1">
            {producto.artesano}
          </p>

          
        </div>

        <div className="text-center mb-3">
          <p className="text-base font-bold text-[#800000] bg-[#fdf2f2] inline-block px-3 py-1 rounded">
            Desde ${producto.precio_aproximado}
          </p>
        </div>

        <Link href={`/product/${producto.id}`} className="w-full">
          <button className="w-full bg-[#800000] text-white text-sm py-2 rounded-md hover:bg-[#a00000] hover:scale-[1.02] transition">
            Ver detalles
          </button>
        </Link>
      </div>
    </div>
  )
}
