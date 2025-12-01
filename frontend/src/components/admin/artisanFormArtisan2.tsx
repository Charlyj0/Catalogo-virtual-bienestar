
"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"
import toast from "react-hot-toast"

// Importa los subcomponentes
import ArtisanFormArtesano from "@/components/artisanFormArtesano"
import ArtisanFormContacto from "@/components/artisanFormContacto"
import ArtisanFormRedes from "@/components/artisanFormRedes"  

interface Artisan {
  id?: number
  nombres?: string
  primer_apellido?: string
  segundo_apellido?: string
  nombre_comercial?: string
  edad?: number
  genero?: string
  cumpleaños?: string
  sm?: string
  discapacidad?: string
  mobiliario?: boolean
  activo?: boolean
  destacado?: boolean
  años_experiencia?: number
  especialidad?: string
  ubicacion?: string
  descripcion?: string
  historia?: string
  contacto?: {
    celular?: string
    correo?: string
    direccion?: string
  }
  redes?: {
    instagram?: string
    facebook?: string
    whatsapp?: string
  }
}

interface ArtisanFormProps {
  artisan?: Artisan | null
  onClose: () => void
  onSaved?: () => void
}

export default function ArtisanForm({ artisan, onClose, onSaved }: ArtisanFormProps) {
  const [formData, setFormData] = useState({
    nombres: artisan?.nombres || "",
    primer_apellido: artisan?.primer_apellido || "",
    segundo_apellido: artisan?.segundo_apellido || "",
    nombre_comercial: artisan?.nombre_comercial || "",
    edad: artisan?.edad || 0,
    genero: artisan?.genero || "",
    cumpleaños: artisan?.cumpleaños || "",
    sm: artisan?.sm || "",
    discapacidad: artisan?.discapacidad || "no",
    mobiliario: artisan?.mobiliario || false,
    activo: artisan?.activo || false,
    destacado: artisan?.destacado || false,
    años_experiencia: artisan?.años_experiencia || 0,
    especialidad: artisan?.especialidad || "",
    ubicacion: artisan?.ubicacion || "",
    descripcion: artisan?.descripcion || "",
    historia: artisan?.historia || "",
    celular: artisan?.contacto?.celular || "",
    correo: artisan?.contacto?.correo || "",
    direccion: artisan?.contacto?.direccion || "",
    instagram: artisan?.redes?.instagram || "",
    facebook: artisan?.redes?.facebook || "",
    whatsapp: artisan?.redes?.whatsapp || "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        activo: formData.activo ? 1 : 0,
        destacado: formData.destacado ? 1 : 0,
      }

      if (artisan?.id) {
        await axios.put(`/api/artesanos/${artisan.id}`, payload)
        toast.success("Artesano actualizado correctamente")
      } else {
        await axios.post("/api/artesanos", payload)
        toast.success("Artesano agregado correctamente")
      }

      if (onSaved) onSaved()   // refresca la lista
    onClose()                // cierra el modal
  } catch (err) {
    console.error("Error guardando artesano:", err)
    toast.error("Hubo un error al guardar el artesano")
  }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="mx-auto my-6 bg-white rounded-lg shadow-lg border w-full max-w-3xl z-40">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold">{artisan ? "Editar Artesano" : "Agregar Nuevo Artesano"}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit} className="p-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Artesano</TabsTrigger>
                  <TabsTrigger value="contact">Contacto</TabsTrigger>
                  <TabsTrigger value="social">Redes</TabsTrigger>
                </TabsList>

                <TabsContent value="basic">
                  <ArtisanFormArtesano formData={formData} handleInputChange={handleInputChange} />
                </TabsContent>

                <TabsContent value="contact">
                  <ArtisanFormContacto formData={formData} handleInputChange={handleInputChange} />
                </TabsContent>

                <TabsContent value="social">
                  <ArtisanFormRedes formData={formData} handleInputChange={handleInputChange} />
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  {artisan ? "Actualizar" : "Guardar"} Artesano
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
