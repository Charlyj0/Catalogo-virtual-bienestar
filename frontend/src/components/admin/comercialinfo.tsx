import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export default function ComercialInfo({ formData, handleInputChange }: any) {
   const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([])
   
   useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get("/api/categorias")
        setCategorias(res.data)
      } catch (err) {
        console.error("Error cargando categorías:", err)
      }
    }
    fetchCategorias()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Nombre Comercial */}
      <div className="space-y-2">
        <Label htmlFor="nombre_comercial">Nombre Comercial *</Label>
        <Input
          id="nombre_comercial"
          value={formData.nombre_comercial}
          onChange={(e) => handleInputChange("nombre_comercial", e.target.value)}
          required
        />
      </div>

      {/* Edad (rango) */}
      <div className="space-y-2">
        <Label htmlFor="edad">Edad</Label>
        <Select
          value={formData.edad}
          onValueChange={(value) => handleInputChange("edad", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona rango de edad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Menos de 18 años">Menos de 18 años</SelectItem>
            <SelectItem value="18 a 30 años">18 a 30 años</SelectItem>
            <SelectItem value="21 a 40 años">21 a 40 años</SelectItem>
            <SelectItem value="31 a 50 años">31 a 50 años</SelectItem>
            <SelectItem value="Más de 51 años">Más de 51 años</SelectItem>
          </SelectContent>
        </Select>
      </div>


      {/* Especialidad */}
      <div className="space-y-2">
        <Label htmlFor="especialidad">Especialidad *</Label>
        <Input
          id="especialidad"
          value={formData.especialidad}
          onChange={(e) => handleInputChange("especialidad", e.target.value)}
          required
        />
      </div>

      {/* Años de experiencia */}
      <div className="space-y-2">
        <Label htmlFor="años_experiencia">Años de experiencia *</Label>
        <Input
          id="años_experiencia"
          type="number"
          min={0}
          value={formData.años_experiencia}
          onChange={(e) => handleInputChange("años_experiencia", e.target.value)}
          required
        />
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label htmlFor="categoria_id">Categoría</Label>
        <Select value={formData.categoria_id || ""} onValueChange={(v) => handleInputChange("categoria_id", v)}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona categoría" />
      </SelectTrigger>
      <SelectContent>
        {categorias.map(cat => (
          <SelectItem key={cat.id} value={String(cat.id)}>
            {cat.nombre}
          </SelectItem>
        ))}
          </SelectContent>
        </Select>

      </div>

      {/* Supermanzana (SM) */}
      <div className="space-y-2">
        <Label htmlFor="sm">Supermanzana (SM)</Label>
        <Input
          id="sm"
          value={formData.sm}
          onChange={(e) => handleInputChange("sm", e.target.value)}
        />
      </div>
    </div>
  )
}
