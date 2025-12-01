"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ArtisanFormRedesProps {
  formData: any
  handleInputChange: (field: string, value: any) => void
}

export default function ArtisanFormRedes({ formData, handleInputChange }: ArtisanFormRedesProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Redes Sociales</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            value={formData.instagram}
            onChange={(e) => handleInputChange("instagram", e.target.value)}
            placeholder="@usuario"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            value={formData.facebook}
            onChange={(e) => handleInputChange("facebook", e.target.value)}
            placeholder="Nombre de página"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange("whatsapp", e.target.value)}
            placeholder="+52 999 123 4567"
          />
        </div>
      </CardContent>
    </Card>
  )
}
