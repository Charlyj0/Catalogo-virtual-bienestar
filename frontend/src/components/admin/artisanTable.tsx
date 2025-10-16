"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, MoreHorizontal, Search, Phone, Mail } from "lucide-react"
import { artisans } from "@/lib/artisans-data"
import type { Artisan } from "@/lib/artisans-data"

interface ArtisanTableProps {
  onEdit: (artisan: Artisan) => void
}

export default function ArtisanTable({ onEdit }: ArtisanTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredArtisans, setFilteredArtisans] = useState(artisans)
  const [editingArtisan, setEditingArtisan] = useState<Artisan | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = artisans.filter(
      (artisan) =>
        artisan.name.toLowerCase().includes(term.toLowerCase()) ||
        artisan.specialty.toLowerCase().includes(term.toLowerCase()) ||
        artisan.location.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredArtisans(filtered)
  }

  const handleDelete = (artisan: Artisan) => {
    if (confirm(`¿Estás seguro de eliminar a ${artisan.name}?`)) {
      // Here you would implement the delete logic
      console.log("Deleting artisan:", artisan.id)
    }
  }

  const handleEditArtisan = (artisan: Artisan) => {
  setEditingArtisan(artisan)
  setShowForm(true)
}



  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nombre, especialidad o ubicación..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Especialidad</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Calificación</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtisans.map((artisan) => (
              <TableRow key={artisan.id}>
                <TableCell className="font-medium">{artisan.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={artisan.image || "/placeholder.svg"}
                      alt={artisan.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{artisan.name}</div>
                      <div className="text-sm text-gray-500">{artisan.location}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{artisan.specialty}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{artisan.contactInfo.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{artisan.contactInfo.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={artisan.verified ? "default" : "secondary"}>
                    {artisan.verified ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>{artisan.totalProducts}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span>{artisan.rating}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(artisan)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(artisan)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredArtisans.length === 0 && (
        <div className="text-center py-8 text-gray-500">No se encontraron artesanos que coincidan con la búsqueda.</div>
      )}
    </div>
  )
}