"use client"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfo from "./personalInfo"
import ComercialInfo from "./comercialinfo"
import ExtraInfo from "./extraInfo"
import HistoriaInfo from "./historialinfo"
import StatusInfo from "./statusinfo"
import ArtisanFormContacto from "@/components/artisanFormContacto"
import ArtisanFormRedes from "@/components/artisanFormRedes"
import toast from "react-hot-toast"

interface ArtisanFormData {
  [key: string]: any
  nombres: string
  primer_apellido: string
  segundo_apellido: string
  nombre_comercial: string
  edad: string
  genero: string
  cumpleaños: string
  sm: string
  discapacidad: string
  mobiliario: string
  activo: boolean
  destacado: boolean
  años_experiencia: number
  especialidad: string
  ubicacion: string
  descripcion: string
  historia: string
  celular: string
  correo: string
  direccion: string
  instagram: string
  facebook: string
  whatsapp: string
  categoria_id: string | null
  imagen: string | File | null
}

interface ArtisanFormArtesanoProps {
  artisan?: any
  onClose: () => void
  onSaved?: () => void
}

export default function ArtisanFormArtesano({
  onClose,
  artisan,
  onSaved,
}: ArtisanFormArtesanoProps) {
  // Inicializamos todos los campos con valores seguros
  const [formData, setFormData] = useState<ArtisanFormData>({
    nombres: artisan?.nombres || "",
    primer_apellido: artisan?.primer_apellido || "",
    segundo_apellido: artisan?.segundo_apellido || "",
    nombre_comercial: artisan?.nombre_comercial || "",
    edad: artisan?.edad || "",
    genero: artisan?.genero ? artisan.genero.toLowerCase() : "",
    cumpleaños: artisan?.cumpleaños
      ? artisan.cumpleaños.split("T")[0]
      : "",
    sm: artisan?.sm || "",
    discapacidad: artisan?.discapacidad ? artisan.discapacidad.toLowerCase() : "",
    mobiliario: artisan?.mobiliario === 1 ? "sí" : "no",
    activo: artisan?.activo === 1,
    destacado: artisan?.destacado === 1,
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
    imagen: artisan?.imagen || null, // campo para la imagen
    categoria_id: artisan?.categoria_id ? String(artisan.categoria_id) : "",
  })

  // 👇 este useEffect sincroniza formData cuando cambie artisan
useEffect(() => {
  if (artisan) {
    setFormData({
      nombres: artisan.nombres || "",
      primer_apellido: artisan.primer_apellido || "",
      segundo_apellido: artisan.segundo_apellido || "",
      nombre_comercial: artisan.nombre_comercial || "",
      edad: artisan.edad || "",
      genero: artisan.genero ? artisan.genero.toLowerCase() : "",
      cumpleaños: artisan.cumpleaños
        ? artisan.cumpleaños.split("T")[0]
        : "",
      sm: artisan.sm || "",
      discapacidad: artisan.discapacidad ? artisan.discapacidad.toLowerCase() : "",
      mobiliario: artisan.mobiliario === 1 ? "sí" : "no", // 👈 string en vez de boolean
      activo: artisan.activo === 1,
      destacado: artisan.destacado === 1,
      años_experiencia: artisan.años_experiencia || 0,
      especialidad: artisan.especialidad || "",
      ubicacion: artisan.ubicacion || "",
      descripcion: artisan.descripcion || "",
      historia: artisan.historia || "",
      celular: artisan.contacto?.celular || "",
      correo: artisan.contacto?.correo || "",
      direccion: artisan.contacto?.direccion || "",
      instagram: artisan.redes?.instagram || "",
      facebook: artisan.redes?.facebook || "",
      whatsapp: artisan.redes?.whatsapp || "",
      // ⚠️ si viene de BD será string (URL), si el usuario sube será File
      imagen: artisan.imagen || null,
       // ⚠️ asegúrate de que sea número o null
      categoria_id: artisan.categoria_id ? String(artisan.categoria_id) : "",
    })
  }
}, [artisan])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

const [loading, setLoading] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (loading) return // evita múltiples envíos
  setLoading(true)

  try {
    let imageUrl: string | null = null
    console.log("Artisan recibido:", artisan)


    // Si hay archivo seleccionado
    if (formData.imagen instanceof File) {
      const data = new FormData()
      data.append("imagen", formData.imagen)

      const res = await axios.post("/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      imageUrl = res.data.url
    }

    const payload = {
  ...formData,
  imagen: imageUrl ?? (typeof formData.imagen === "string" ? formData.imagen : null),
  activo: formData.activo ? 1 : 0,
  destacado: formData.destacado ? 1 : 0,
  contacto: {
    celular: formData.celular,
    correo: formData.correo,
    direccion: formData.direccion,
  },
  redes: {
    instagram: formData.instagram,
    facebook: formData.facebook,
    whatsapp: formData.whatsapp,
  },
}

    if (artisan?.id) {
      await axios.put(`/api/artesanos/${artisan.id}`, payload)
      toast.success("Artesano actualizado correctamente")
    } else {
      await axios.post("/api/artesanos", payload)
      toast.success("Artesano agregado correctamente")
    }

    onSaved?.() // refresca la lista si existe
    onClose()   // cierra el modal
  } catch (err) {
    console.error("Error guardando artesano:", err)
    toast.error("Hubo un error al guardar el artesano")
  } finally {
    setLoading(false) // libera el flag al terminar
  }
}

  return (
    <div className="relative">
      {/* Botón de cerrar */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Quitamos overflow-y-auto aquí */}
      <form onSubmit={handleSubmit} className="p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Artesano</TabsTrigger>
            <TabsTrigger value="contact">Contacto</TabsTrigger>
            <TabsTrigger value="social">Redes</TabsTrigger>
          </TabsList>

          {/* Sección Artesano */}
          <TabsContent value="basic">
            <PersonalInfo formData={formData} handleInputChange={handleInputChange} />
            <ComercialInfo formData={formData} handleInputChange={handleInputChange} />
            <ExtraInfo formData={formData} handleInputChange={handleInputChange} />
            <HistoriaInfo formData={formData} handleInputChange={handleInputChange} />
            <StatusInfo formData={formData} handleInputChange={handleInputChange} />
          </TabsContent>

          {/* Sección Contacto */}
          <TabsContent value="contact">
            <ArtisanFormContacto formData={formData} handleInputChange={handleInputChange} />
          </TabsContent>

          {/* Sección Redes */}
          <TabsContent value="social">
            <ArtisanFormRedes formData={formData} handleInputChange={handleInputChange} />
          </TabsContent>
        </Tabs>

        {/* Botón de envío */}
        <button
          type="submit"
          className={`mt-6 px-4 py-2 rounded transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Guardando..." : "Guardar Artesano"}
        </button>
      </form>
    </div>
  )
}
