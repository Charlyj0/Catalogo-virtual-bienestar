"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, MoreHorizontal, Search } from "lucide-react"
import toast from "react-hot-toast"

interface Producto {
  id: number
  titulo: string
  descripcion: string
  precio_aproximado: string
  publicado: boolean
  destacado: boolean
  creado_en: string
  artesano_id: number
  imagen_destacada?: string | null   // 👈 nuevo campo
}

interface ProductoTableProps {
  onEdit: (producto: Producto) => void
}

export default function ProductoTable({ onEdit }: ProductoTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [productos, setProductos] = useState<Producto[]>([])
  const [filteredProductos, setFilteredProductos] = useState<Producto[]>([])

  useEffect(() => {
    const fetchProductos = async () => {
  try {
    const token = localStorage.getItem("token") // o desde tu hook useAuth
    const res = await axios.get("/api/productos")
    const data: Producto[] = Array.isArray(res.data.productos) ? res.data.productos : []
    setProductos(data)
    setFilteredProductos(data)
  } catch (err) {
    console.error("Error cargando productos:", err)
    toast.error("No se pudieron cargar los productos")
  }
}
    fetchProductos()
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = productos.filter(
      (p) =>
        p.titulo.toLowerCase().includes(term.toLowerCase()) ||
        (p.descripcion || "").toLowerCase().includes(term.toLowerCase())
    )
    setFilteredProductos(filtered)
  }

  const handleDelete = async (producto: Producto) => {
  if (confirm(`¿Estás seguro de eliminar el producto "${producto.titulo}"?`)) {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.error("No hay token en localStorage")
        return
      }

      await axios.delete(`/api/productos/${producto.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 formato correcto
        }
        // quita withCredentials si no usas cookies
      })

      setProductos((prev) => prev.filter((p) => p.id !== producto.id))
      setFilteredProductos((prev) => prev.filter((p) => p.id !== producto.id))
    } catch (err) {
      console.error("Error eliminando producto:", err)
    }
  }
}

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Buscar por título o descripción..."
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
              <TableHead>Producto</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Publicado</TableHead>
              <TableHead>Destacado</TableHead>
              <TableHead>Creado en</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProductos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell className="font-medium">{producto.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={producto.imagen_destacada || "/placeholder.svg"}
                      alt={producto.titulo}
                      className="w-10 h-10 rounded-md object-cover border"
                    />
                    <div>
                      <div className="font-medium">{producto.titulo}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{producto.descripcion}</TableCell>
                <TableCell>{producto.precio_aproximado}</TableCell>
                <TableCell>
                  <Badge variant={producto.publicado ? "default" : "secondary"}>
                    {producto.publicado ? "Publicado" : "No publicado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={producto.destacado ? "default" : "secondary"}>
                    {producto.destacado ? "Destacado" : "Normal"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(producto.creado_en).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(producto)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(producto)} className="text-red-600">
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

      {filteredProductos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron productos que coincidan con la búsqueda.
        </div>
      )}
    </div>
  )
}
