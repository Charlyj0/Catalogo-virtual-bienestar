"use client"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Calendar, Package } from "lucide-react"
import { Facebook, Instagram, MessageCircle } from "lucide-react"

interface Artesano {
  id: number
  nombre_comercial?: string
  nombres?: string
  primer_apellido?: string
  segundo_apellido?: string
  fecha_registro?: string
  categorias?: { id: number; nombre: string }[]
  imagen?: string | null
  contacto?: {
    correo?: string
    celular?: string
  }
  redes?: {
    instagram?: string
    facebook?: string
    whatsapp?: string
  }
  productos?: number // total de productos
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/de8imj2cr/image/upload/v1762620371/artesanosmx/uluhiri32rzrpbxtpw69.jpg"

export function ArtesanoDetail({ artesano }: { artesano: Artesano }) {
  const displayName =
    artesano.nombre_comercial ||
    `${artesano.nombres ?? ""} ${artesano.primer_apellido ?? ""} ${artesano.segundo_apellido ?? ""}`

  const totalProductos = artesano.productos || 0

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8">
        {/* Imagen estilo avatar */}
        <div className="flex-shrink-0">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-[#800000]/40 shadow-md">
            <img
              src={artesano.imagen || DEFAULT_IMAGE}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Información principal */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-[#800000] mb-2">
              {displayName}
            </h1>

             {/* Nombre completo */}
              {(artesano.nombres || artesano.primer_apellido || artesano.segundo_apellido) && (
                <h2 className="text-xl text-muted-foreground mb-4">
                  {[artesano.nombres, artesano.primer_apellido, artesano.segundo_apellido]
                    .filter(Boolean)
                    .join(" ")}
                </h2>
              )}

            {/* Categorías */}
            <div className="flex flex-wrap gap-2 mb-4">
              {artesano.categorias &&
                artesano.categorias.map((cat) => (
                  <Badge key={cat.id} className="bg-gray-200 text-[#800000]">
                    {cat.nombre}
                  </Badge>
                ))}
            </div>

            {/* Contacto */}
            <div className="space-y-2 text-muted-foreground">
              {artesano.contacto?.correo && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#800000]" />
                  <span>{artesano.contacto.correo}</span>
                </div>
              )}
              {artesano.contacto?.celular && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#800000]" />
                  <span>{artesano.contacto.celular}</span>
                </div>
              )}
              {artesano.fecha_registro && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#800000]" />
                  <span>
                    Registrado el{" "}
                    {new Date(artesano.fecha_registro).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-[#800000]/20" />

          {/* Redes sociales */}
          <div className="flex gap-4">
            {artesano.redes?.facebook && (
              <a
                href={artesano.redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#800000] hover:underline"
              >
                <Facebook className="h-5 w-5" /> Facebook
              </a>
            )}
            {artesano.redes?.instagram && (
              <a
                href={artesano.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#800000] hover:underline"
              >
                <Instagram className="h-5 w-5" /> Instagram
              </a>
            )}
            {artesano.redes?.whatsapp && (
              <a
                href={`https://wa.me/${artesano.redes.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#800000] hover:underline"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            )}
          </div>

          <Separator className="bg-[#800000]/20" />

          {/* Total de productos */}
          <div className="bg-[#800000]/10 border border-[#800000]/20 rounded-lg p-6 flex items-center gap-4 shadow-sm">
            <Package className="h-8 w-8 text-[#800000]" />
            <div>
              <div className="text-2xl font-bold text-[#800000]">
                {totalProductos}
              </div>
              <div className="text-muted-foreground">Productos publicados</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
