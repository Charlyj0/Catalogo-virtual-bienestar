// src/app/nosotros/page.tsx
"use client"

import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { HeartHandshake, Globe, Users } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Carga dinámica del mapa (evita SSR)
const Mapa = dynamic(() => import("@/components/mapa"), { ssr: false })

export default function NosotrosPage() {
  return (
    <>
    <Header />
    <section className="bg-[#fdf8f6] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto bg-white rounded-2xl shadow-lg p-10 space-y-12 animate-fadeIn">
        {/* Encabezado */}
        <div className="text-center space-y-4">
          <Badge className="bg-[#800000] text-white text-sm">Sobre Nosotros</Badge>
          <h1 className="text-4xl font-serif font-bold text-[#800000]">ArtesanosMX</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Somos una plataforma institucional que impulsa el talento artesanal mexicano. Conectamos tradición, innovación y desarrollo económico en cada rincón del país.
          </p>
        </div>

        <Separator className="bg-[#800000]/20" />

        {/* Misión, Visión, Comunidad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <HeartHandshake className="mx-auto h-8 w-8 text-[#800000]" />
            <h3 className="text-xl font-semibold text-[#800000]">Misión</h3>
            <p className="text-sm text-gray-600">
              Empoderar a los artesanos mexicanos mediante herramientas digitales, visibilidad institucional y acceso a mercados dignos.
            </p>
          </div>
          <div className="space-y-3">
            <Globe className="mx-auto h-8 w-8 text-[#800000]" />
            <h3 className="text-xl font-semibold text-[#800000]">Visión</h3>
            <p className="text-sm text-gray-600">
              Ser el referente nacional en innovación artesanal, conectando identidad cultural con desarrollo sostenible.
            </p>
          </div>
          <div className="space-y-3">
            <Users className="mx-auto h-8 w-8 text-[#800000]" />
            <h3 className="text-xl font-semibold text-[#800000]">Comunidad</h3>
            <p className="text-sm text-gray-600">
              Más de 12,000 artesanos registrados, 32 estados representados y cientos de historias que transforman vidas.
            </p>
          </div>
        </div>

        <Separator className="bg-[#800000]/20" />

        {/* Mapa institucional */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[#800000] text-center">Presencia Nacional</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Nuestra red de artesanos se extiende por todo México. Este mapa muestra los puntos de conexión que iremos configurando.
          </p>
          <div className="rounded-xl overflow-hidden shadow-md">
            <Mapa />
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}
