"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import toast from "react-hot-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// 👉 Interfaces
interface ProductFormData {
  [key: string]: any
  titulo: string
  descripcion: string
  precio_aproximado: string
  publicado: boolean
  destacado: boolean
  artesano_id: number | null
  imagenes: (string | File)[]
  categoria_id: number | null
  etiquetas: number[]
}

interface ProductFormProps {
  producto?: any
  onClose: () => void
  onSaved?: () => void
}



export default function ProductForm({ producto, onClose, onSaved }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    titulo: producto?.titulo || "",
    descripcion: producto?.descripcion || "",
    precio_aproximado: producto?.precio_aproximado || "",
    publicado: producto?.publicado === 1,
    destacado: producto?.destacado === 1,
    artesano_id: producto?.artesano_id || null, 
    imagenes: producto?.imagenes || [],
    categoria_id: producto?.categoria_id || null, // 👈 inicializa con id
    etiquetas: producto?.etiquetas?.map((e: any) => e.id) || [],   // 👈 inicializa con ids
  })

  useEffect(() => {
  const fetchProducto = async () => {
    if (producto?.id) {
      try {
        // Traer producto completo
        const res = await axios.get(`/api/productos/${producto.id}`)
        const productoCompleto = res.data

        console.log("Producto completo recibido:", productoCompleto)

        setFormData({
          titulo: productoCompleto.titulo || "",
          descripcion: productoCompleto.descripcion || "",
          precio_aproximado: productoCompleto.precio_aproximado || "",
          publicado: productoCompleto.publicado === 1,
          destacado: productoCompleto.destacado === 1,
          artesano_id: productoCompleto.artesano_id || null,
          imagenes: productoCompleto.imagenes?.map((img: any) => img.url_imagen) || [],
          categoria_id: productoCompleto.categoria_id || null,
          etiquetas: productoCompleto.etiquetas?.map((e: any) => e.id) || [],
        })
      } catch (err) {
        console.error("Error cargando producto:", err)
      }
    }
  }

  fetchProducto()
}, [producto])


  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const [loading, setLoading] = useState(false)

  // 👉 Estados para listas de artesanos, categorías y etiquetas
  const [categorias, setCategorias] = useState<any[]>([])
  const [etiquetas, setEtiquetas] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          axios.get("/api/categorias"),
          axios.get("/api/etiquetas"),
        ])
        setCategorias(catRes.data)
        setEtiquetas(tagRes.data)
      } catch (err) {
        console.error("Error cargando artesanos/categorias/etiquetas:", err)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (loading) return

  // ✅ Validar imágenes antes de enviar
  if (!formData.imagenes || formData.imagenes.length === 0) {
    toast.error("Debes subir al menos una imagen")
    return
  }

  setLoading(true)

  try {
    let productId = producto?.id
    const token = localStorage.getItem("token")

    if (!productId) {
      const res = await axios.post("/api/productos", {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        precio_aproximado: formData.precio_aproximado,
        publicado: formData.publicado ? 1 : 0,
        destacado: formData.destacado ? 1 : 0,
        artesano_id: formData.artesano_id,
        categoria_id: formData.categoria_id,
        etiquetas: formData.etiquetas,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      productId = res.data.id
    } else {

      await axios.put(`/api/productos/${productId}`, {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        precio_aproximado: formData.precio_aproximado,
        publicado: formData.publicado ? 1 : 0,
        destacado: formData.destacado ? 1 : 0,
        artesano_id: formData.artesano_id,
        categoria_id: formData.categoria_id,
        etiquetas: formData.etiquetas,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
    }

    // ✅ Subir imágenes
    if (formData.imagenes.some((img) => img instanceof File)) {
      const data = new FormData()
      for (const file of formData.imagenes as File[]) {
        if (file instanceof File) data.append("imagenes", file)
      }
      await axios.post(`/api/productos/${productId}/imagenes`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    }

    toast.success(producto?.id ? "Producto actualizado correctamente" : "Producto agregado correctamente")
    onSaved?.()
    onClose()
  } catch (err) {
    console.error("Error guardando producto:", err)
    toast.error("Hubo un error al guardar el producto")
  } finally {
    setLoading(false)
  }
}

  const [artesanos, setArtesanos] = useState<any[]>([])

  useEffect(() => {
  const fetchArtesanos = async () => {
    try {
      const res = await axios.get("/api/artesanos")
      setArtesanos(res.data) // asegúrate que tu GET /api/artesanos devuelva un array
    } catch (err) {
      console.error("Error cargando artesanos:", err)
    }
  }
  fetchArtesanos()
}, [])

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

      {/* Formulario con Tabs */}
      <form onSubmit={handleSubmit} className="p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Producto</TabsTrigger>
            <TabsTrigger value="imagenes">Imágenes</TabsTrigger>
          </TabsList>

          {/* Sección Producto */}
          <TabsContent value="basic">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => handleInputChange("titulo", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => handleInputChange("descripcion", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Precio aproximado</label>
                <input
                  type="text"
                  value={formData.precio_aproximado}
                  onChange={(e) => handleInputChange("precio_aproximado", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.publicado}
                    onChange={(e) => handleInputChange("publicado", e.target.checked)}
                  />
                  Publicado
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.destacado}
                    onChange={(e) => handleInputChange("destacado", e.target.checked)}
                  />
                  Destacado
                </label>
              </div>
              <div className="space-y-2">
  <label className="block text-sm font-medium">Categoría</label>
  <Select
    value={formData.categoria_id ? String(formData.categoria_id) : ""}
    onValueChange={(value) =>
      setFormData((prev) => ({ ...prev, categoria_id: Number(value) }))
    }
  >
    <SelectTrigger>
      <SelectValue placeholder="Selecciona una categoría" />
    </SelectTrigger>
    <SelectContent>
      {categorias.map((c) => (
        <SelectItem key={c.id} value={String(c.id)}>
          {c.nombre}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

<div className="space-y-2">
  <label className="block text-sm font-medium">Etiquetas (máx. 3)</label>
  <div className="flex flex-wrap gap-2">
    {etiquetas.map((e) => (
      <label key={e.id} className="flex items-center gap-2 border rounded px-2 py-1">
        <input
          type="checkbox"
          checked={formData.etiquetas.includes(e.id)}
          onChange={(ev) => {
            if (ev.target.checked) {
              // 👇 Validar máximo 3 etiquetas
              if (formData.etiquetas.length >= 3) {
                toast.error("Solo puedes seleccionar hasta 3 etiquetas")
                return
              }
              setFormData((prev) => ({
                ...prev,
                etiquetas: [...prev.etiquetas, e.id],
              }))
            } else {
              setFormData((prev) => ({
                ...prev,
                etiquetas: prev.etiquetas.filter((id) => id !== e.id),
              }))
            }
          }}
        />
        {e.nombre}
      </label>
    ))}
  </div>
</div>




              <div className="space-y-2">
  <label className="block text-sm font-medium">Artesano</label>
        <Select
  value={formData.artesano_id ? String(formData.artesano_id) : ""}
  onValueChange={(value) =>
    setFormData({ ...formData, artesano_id: Number(value) })
  }
>
  <SelectTrigger>
    <SelectValue placeholder="Selecciona un artesano" />
  </SelectTrigger>
  <SelectContent>
    {artesanos.map((a) => (
      <SelectItem key={a.id} value={String(a.id)}>
        {a.nombre_comercial || `${a.nombres} ${a.primer_apellido}`}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

</div>
            </div>
          </TabsContent>

          {/* Sección Imágenes */}
          <TabsContent value="imagenes">
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-md p-4 mb-6 bg-gray-50">
  <label className="block text-sm font-medium mb-2">Subir imágenes</label>
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={(e) => {
      const files = e.target.files ? Array.from(e.target.files) : []
      setFormData((prev) => ({
        ...prev,
        imagenes: [...prev.imagenes, ...files], // 👈 concatena en vez de reemplazar
      }))
    }}
    className="w-full text-sm"
  />
</div>

{/* Grid de previews */}
{/* Grid de previews */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
  {formData.imagenes.map((img, idx) => (
    <div
      key={idx}
      className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
    >
      <img
        src={img instanceof File ? URL.createObjectURL(img) : img as string}
        alt={`preview-${idx}`}
        className="w-full h-32 object-cover transform group-hover:scale-105 transition duration-300"
      />
      <button
        type="button"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            imagenes: prev.imagenes.filter((_, i) => i !== idx),
          }))
        }
        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ))}
</div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Botón de envío */}
        {/* Footer fijo */}
<div className="sticky bottom-0 bg-white border-t p-4 flex justify-end">
  <button
    type="submit"
    disabled={loading}
    className={`px-6 py-2 rounded-md font-medium ${
      loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"
    }`}
  >
    {loading ? "Guardando..." : producto?.id ? "Actualizar Producto" : "Guardar Producto"}
  </button>
</div>

      </form>
    </div>
  )
}
