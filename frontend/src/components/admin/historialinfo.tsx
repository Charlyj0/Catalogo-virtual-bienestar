import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function HistoriaInfo({ formData, handleInputChange }: any) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Textarea id="descripcion" value={formData.descripcion} onChange={(e) => handleInputChange("descripcion", e.target.value)} rows={3} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="historia">Historia</Label>
        <Textarea id="historia" value={formData.historia} onChange={(e) => handleInputChange("historia", e.target.value)} rows={5} />
      </div>
    </div>
  )
}
