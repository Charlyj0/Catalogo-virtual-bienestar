// src/app/admin/page.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Package, Star, Grid3x3 } from "lucide-react"
import ArtisanTable from "@/components/admin/artisanTable"  
import ProductTable from "@/components/admin/productTable"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Artisan, artisans } from "@/lib/artisans-data"
import { Product } from "@/lib/products-data"
import { mockProducts as products } from "@/data/mockproduct"


export default function AdminPage() {
  const [editingArtisan, setEditingArtisan] = useState<Artisan | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)

  const totalArtisans = artisans.length
  const activeArtisans = artisans.filter((a) => a.verified).length
  const avgRating = artisans.reduce((sum, a) => sum + a.rating, 0) / artisans.length
  const totalProducts = products.length
  const categories = [...new Set(products.map((p) => p.category))]
  
    const handleAddArtisan = () => {
    setEditingArtisan(null)
    setShowForm(true)
  }
    const handleEditArtisan = (artisan: Artisan) => {
    setEditingArtisan(artisan)
    setShowForm(true)
  }

   const handleCloseForm = () => {
    setShowForm(false)
    setEditingArtisan(null)
  }
   const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }
    
  return (
    <>  
    <Header />
    <section className="min-h-screen bg-[#fdf8f6] p-6 space-y-8">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#800000]">Panel de Administración</h1>
          <p className="text-gray-600 mt-1">Gestiona artesanos, productos y la plataforma</p>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Artesanos" value={totalArtisans} subtitle={`${activeArtisans} activos`}>
          <Users className="h-4 w-4 text-[#800000]" />
        </StatCard>
        <StatCard title="Productos Total" value={totalProducts} subtitle="En toda la plataforma">
          <Package className="h-4 w-4 text-[#800000]" />
        </StatCard>
        <StatCard title="Calificación Promedio" value={avgRating.toFixed(1)} subtitle="De 5.0 estrellas">
          <Star className="h-4 w-4 text-[#800000]" />
        </StatCard>
        <StatCard title="Categorías Disponibles" value={categories.length} subtitle="Tipos de artesanías">
          <Grid3x3 className="h-4 w-4 text-[#800000]" />
        </StatCard>
      </div>

      {/* Tabs de gestión */}
      <Tabs defaultValue="artisans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="artisans">Gestión de Artesanos</TabsTrigger>
          <TabsTrigger value="products">Gestión de Productos</TabsTrigger>
        </TabsList>

        <TabsContent value="artisans" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gestión de Artesanos</CardTitle>
              <Button onClick={handleAddArtisan} className="bg-[#800000] hover:bg-[#6a0000] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Artesano
              </Button>
            </CardHeader>
            <CardContent>
              <ArtisanTable onEdit={handleEditArtisan} />
            </CardContent>
          </Card>
        </TabsContent> 
        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gestión de Artesanos</CardTitle>
              <Button onClick={handleAddArtisan} className="bg-[#800000] hover:bg-[#6a0000] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Producto
              </Button>
            </CardHeader>
            <CardContent>
              <ProductTable onEdit={handleEditProduct} />
            </CardContent>
          </Card>
        </TabsContent> 
      </Tabs>
    </section>
    <Footer />
    </>
  )
}

// Componente auxiliar para tarjetas
function StatCard({
  title,
  value,
  subtitle,
  children,
}: {
  title: string
  value: string | number
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#800000]">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  )
}
