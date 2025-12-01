"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ArtisanFormContacto({ formData, handleInputChange }: any) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Información de Contacto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="celular">Celular</Label>
          <Input id="celular" value={formData.celular} onChange={(e) => handleInputChange("celular", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="correo">Correo</Label>
          <Input id="correo" type="email" value={formData.correo} onChange={(e) => handleInputChange("correo", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="direccion">Dirección</Label>
          <Textarea id="direccion" value={formData.direccion} onChange={(e) => handleInputChange("direccion", e.target.value)} rows={2} />
        </div>
      </CardContent>
    </Card>
  )
}
