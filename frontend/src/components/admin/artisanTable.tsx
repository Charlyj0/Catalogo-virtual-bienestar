"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, MoreHorizontal, Search, Phone, Mail } from "lucide-react"

interface Artisan {
  id: number
  nombre_comercial: string
  especialidad: string
  descripcion: string
  imagen: string | null
  celular: string | null
  correo: string | null
  activo: boolean
  productos: number
}

interface ArtisanTableProps {
  onEdit: (artisan: Artisan) => void
}

export default function ArtisanTable({ onEdit }: ArtisanTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [artisans, setArtisans] = useState<Artisan[]>([])
  const [filteredArtisans, setFilteredArtisans] = useState<Artisan[]>([])

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const res = await axios.get("/api/artesanos")
        const data: Artisan[] = res.data || []
        setArtisans(data)
        setFilteredArtisans(data)
      } catch (err) {
        console.error("Error cargando artesanos:", err)
      }
    }
    fetchArtisans()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = artisans.filter(
      (a) =>
        a.nombre_comercial.toLowerCase().includes(term.toLowerCase()) ||
        (a.especialidad || "").toLowerCase().includes(term.toLowerCase())
    )
    setFilteredArtisans(filtered)
  }

  const handleDelete = async (artisan: Artisan) => {
    if (confirm(`¿Estás seguro de eliminar a ${artisan.nombre_comercial}?`)) {
      try {
        await axios.delete(`/api/artesanos/${artisan.id}`)
        setArtisans((prev) => prev.filter((a) => a.id !== artisan.id))
        setFilteredArtisans((prev) => prev.filter((a) => a.id !== artisan.id))
      } catch (err) {
        console.error("Error eliminando artesano:", err)
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por nombre o especialidad..."
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
                      src={artisan.imagen || "/placeholder.svg"}
                      alt={artisan.nombre_comercial}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{artisan.nombre_comercial}</div>
                      <div className="text-sm text-gray-500">{artisan.descripcion}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{artisan.especialidad}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{artisan.celular}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{artisan.correo}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={artisan.activo ? "default" : "secondary"}>
                    {artisan.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell>{artisan.productos}</TableCell>
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
        <div className="text-center py-8 text-gray-500">
          No se encontraron artesanos que coincidan con la búsqueda.
        </div>
      )}
    </div>
  )
}
