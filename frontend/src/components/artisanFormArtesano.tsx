"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function ArtisanFormArtesano({ formData, handleInputChange }: any) {
  return (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nombres">Nombres *</Label>
          <Input id="nombres" value={formData.nombres} onChange={(e) => handleInputChange("nombres", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="primer_apellido">Primer Apellido *</Label>
          <Input id="primer_apellido" value={formData.primer_apellido} onChange={(e) => handleInputChange("primer_apellido", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
          <Input id="segundo_apellido" value={formData.segundo_apellido} onChange={(e) => handleInputChange("segundo_apellido", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nombre_comercial">Nombre Comercial *</Label>
          <Input id="nombre_comercial" value={formData.nombre_comercial} onChange={(e) => handleInputChange("nombre_comercial", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edad">Edad</Label>
          <Input id="edad" type="number" value={formData.edad} onChange={(e) => handleInputChange("edad", Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genero">Género</Label>
          <Input id="genero" value={formData.genero} onChange={(e) => handleInputChange("genero", e.target.value)} placeholder="masculino/femenino/otro" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cumpleaños">Cumpleaños</Label>
          <Input id="cumpleaños" type="date" value={formData.cumpleaños} onChange={(e) => handleInputChange("cumpleaños", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sm">SM</Label>
          <Input id="sm" value={formData.sm} onChange={(e) => handleInputChange("sm", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="discapacidad">Discapacidad</Label>
          <Input id="discapacidad" value={formData.discapacidad} onChange={(e) => handleInputChange("discapacidad", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mobiliario">Mobiliario</Label>
          <Checkbox id="mobiliario" checked={formData.mobiliario} onCheckedChange={(checked) => handleInputChange("mobiliario", !!checked)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="años_experiencia">Años de Experiencia</Label>
          <Input id="años_experiencia" type="number" value={formData.años_experiencia} onChange={(e) => handleInputChange("años_experiencia", Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="especialidad">Especialidad</Label>
          <Input id="especialidad" value={formData.especialidad} onChange={(e) => handleInputChange("especialidad", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Input id="ubicacion" value={formData.ubicacion} onChange={(e) => handleInputChange("ubicacion", e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea id="descripcion" value={formData.descripcion} onChange={(e) => handleInputChange("descripcion", e.target.value)} rows={3} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="historia">Historia</Label>
        <Textarea id="historia" value={formData.historia} onChange={(e) => handleInputChange("historia", e.target.value)} rows={5} />
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox id="activo" checked={formData.activo} onCheckedChange={(checked) => handleInputChange("activo", !!checked)} />
          <Label htmlFor="activo">Activo</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="destacado" checked={formData.destacado} onCheckedChange={(checked) => handleInputChange("destacado", !!checked)} />
          <Label htmlFor="destacado">Destacado</Label>
        </div>
      </div>
    </div>
  )
}
