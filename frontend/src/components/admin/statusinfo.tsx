import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function StatusInfo({ formData, handleInputChange }: any) {
  return (
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
  )
}
