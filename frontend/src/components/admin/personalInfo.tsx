import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PersonalInfo({ formData, handleInputChange }: any) {
  return (
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
        <Label htmlFor="cumpleaños">Cumpleaños</Label>
        <Input id="cumpleaños" type="date" value={formData.cumpleaños} onChange={(e) => handleInputChange("cumpleaños", e.target.value)} />
      </div>
    </div>
  )
}
