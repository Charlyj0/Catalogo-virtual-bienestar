import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"

export default function ExtraInfo({ formData, handleInputChange }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="genero">Género</Label>
        <Select value={formData.genero} onValueChange={(v) => handleInputChange("genero", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masculino">Masculino</SelectItem>
            <SelectItem value="femenino">Femenino</SelectItem>
          </SelectContent>
        </Select>
    
        {formData.genero === "otro" && (
          <Input placeholder="Especifica tu género" onChange={(e) => handleInputChange("genero", e.target.value)} />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="discapacidad">Discapacidad</Label>
        <Select
          value={formData.discapacidad} // 👈 aquí
          onValueChange={(value) => handleInputChange("discapacidad", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona discapacidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no">Ninguna</SelectItem>
            <SelectItem value="motriz">Motriz</SelectItem>
            <SelectItem value="visual">Visual</SelectItem>
            <SelectItem value="auditiva">Auditiva</SelectItem>
            <SelectItem value="intelectual">Intelectual</SelectItem>
            <SelectItem value="otra">Otra</SelectItem>
          </SelectContent>
        </Select>
        
        {formData.discapacidad === "otra" && (
          <Input
            placeholder="Especifica discapacidad"
            value={formData.discapacidad} // 👈 asegura que se muestre lo escrito
            onChange={(e) => handleInputChange("discapacidad", e.target.value)}
          />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobiliario">Mobiliario</Label>
        <Select value={formData.mobiliario} onValueChange={(v) => handleInputChange("mobiliario", v)}>
          <SelectTrigger>
            <SelectValue placeholder="¿Tiene mobiliario?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sí">Sí</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>

      </div>

      <div className="space-y-2">
  <Label htmlFor="imagen">Foto del Artesano</Label>
  <Input
    id="imagen"
    type="file"
    accept="image/*"
    onChange={(e) => handleInputChange("imagen", e.target.files?.[0])}
  />

  {/* 👇 Preview dinámico con estilo */}
  {formData.imagen && (
    <div className="mt-3 relative w-40 h-40">
      <img
        src={
          typeof formData.imagen === "string"
            ? formData.imagen
            : URL.createObjectURL(formData.imagen)
        }
        alt="Foto del artesano"
        className="w-full h-full object-cover rounded-lg border-2 border-[#800000] shadow-md"
      />
      {/* Overlay elegante al hover */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition rounded-lg">
        <span className="text-white text-sm font-medium">Cambiar foto</span>
      </div>
    </div>
  )}
</div>


    </div>
  )
}
