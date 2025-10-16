"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"
import type { Artisan } from "@/lib/artisans-data"

interface ArtisanFormProps {
  artisan?: Artisan | null
  onClose: () => void
}

export default function ArtisanForm({ artisan, onClose }: ArtisanFormProps) {
  const [formData, setFormData] = useState({
    name: artisan?.name || "",
    specialty: artisan?.specialty || "",
    location: artisan?.location || "",
    description: artisan?.description || "",
    story: artisan?.story || "",
    phone: artisan?.contactInfo.phone || "",
    email: artisan?.contactInfo.email || "",
    address: artisan?.contactInfo.address || "",
    instagram: artisan?.socialMedia?.instagram || "",
    facebook: artisan?.socialMedia?.facebook || "",
    whatsapp: artisan?.socialMedia?.whatsapp || "",
    verified: artisan?.verified || false,
    featured: artisan?.featured || false,
    yearsExperience: artisan?.yearsExperience || 0,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the save logic
    console.log("Saving artisan:", formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">{artisan ? "Editar Artesano" : "Agregar Nuevo Artesano"}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit} className="p-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Información Básica</TabsTrigger>
                <TabsTrigger value="contact">Contacto y Redes</TabsTrigger>
                <TabsTrigger value="documents">Documentos</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad *</Label>
                    <Input
                      id="specialty"
                      value={formData.specialty}
                      onChange={(e) => handleInputChange("specialty", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Ubicación *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yearsExperience">Años de Experiencia</Label>
                    <Input
                      id="yearsExperience"
                      type="number"
                      value={formData.yearsExperience}
                      onChange={(e) => handleInputChange("yearsExperience", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción Corta</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story">Historia del Artesano</Label>
                  <Textarea
                    id="story"
                    value={formData.story}
                    onChange={(e) => handleInputChange("story", e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verified"
                      checked={formData.verified}
                      onCheckedChange={(checked) => handleInputChange("verified", checked)}
                    />
                    <Label htmlFor="verified">Activo</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked)}
                    />
                    <Label htmlFor="featured">Destacado</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de Contacto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Redes Sociales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                          placeholder="+57 300 123 4567"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {artisan ? "Actualizar" : "Guardar"} Artesano
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
