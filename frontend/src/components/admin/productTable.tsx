"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Trash2, MoreHorizontal, Search, AlertTriangle } from "lucide-react"
import { mockProducts } from "@/data/mockproduct"
import type { Product } from "@/lib/products-data"
import { formatCurrency } from "@/lib/utils"

interface ProductTableProps {
  onEdit: (product: Product) => void
}

export default function ProductTable({ onEdit }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  const categories = useMemo(() => ["all", ...new Set(mockProducts.map((p) => p.category))], [])

  useEffect(() => {
    const filtered = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter

      return matchesSearch && matchesCategory
    })

    setFilteredProducts(filtered)
  }, [searchTerm, categoryFilter])

  const handleDelete = async (product: Product) => {
    const confirmed = confirm(`¿Estás seguro de eliminar "${product.name}"?`)
    if (!confirmed) return

    try {
      // Aquí iría la lógica real de eliminación (API call)
      console.log("Deleting product:", product.id)
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre, artesano o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrar por categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category!}>
                {category === "all" ? "Todas las categorías" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabla */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Artesano</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.artisan}</TableCell>
                <TableCell className="font-medium">{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{product.stockQuantity}</span>
                    {product.inStock && product.stockQuantity != null && product.stockQuantity < 5 && (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(product)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(product)} className="text-red-600">
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No se encontraron productos que coincidan con los filtros aplicados.
        </div>
      )}
    </div>
  )
}
