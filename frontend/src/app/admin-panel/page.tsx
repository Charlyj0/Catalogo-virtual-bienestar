"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Users, Package, Grid3x3 } from "lucide-react"
import ArtisanTable from "@/components/admin/artisanTable"  
import ProductTable from "@/components/admin/productTable"
import Header from "@/components/header"
import Footer from "@/components/footer"
import useAuth from "../../../hooks/useAuth"
import ArtisanFormArtesano from "@/components/admin/artisanForm"
import ProductForm from "@/components/admin/productForm"
import Reports from "@/components/reports"
import axios from "axios"

export default function AdminPage() {
  const [editingArtisan, setEditingArtisan] = useState<any | null>(null)
  const [editingProduct, setEditingProduct] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  const [stats, setStats] = useState({
    artesanos: 0,
    activos: 0,
    productos: 0,
    categorias: 0,
  })

  const usuario = useAuth("admin")

  // 🔎 Cargar estadísticas desde la BD
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/stats") // 👈 un solo endpoint
        setStats(res.data)
      } catch (err) {
        console.error("Error cargando estadísticas:", err)
      }
    }
    fetchStats()
  }, [])

  // 👇 aquí ya no cortamos antes de los hooks
  if (!usuario) {
    return (
      <main className="pt-[160px]">
        <section className="min-h-screen flex items-center justify-center">
          <p className="text-gray-600">Acceso restringido. Debes iniciar sesión como administrador.</p>
        </section>
      </main>
    )
  }

  const handleAddArtisan = () => {
    setEditingArtisan(null)
    setShowForm(true)
  }

  const handleEditArtisan = async (artisan: any) => {
    try {
      const res = await axios.get(`/api/artesanos/${artisan.id}`)
      setEditingArtisan(res.data)
      setShowForm(true)
    } catch (err) {
      console.error("Error cargando artesano:", err)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingArtisan(null)
    setEditingProduct(null)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  return (
    <>  
      <Header />
      <main className="pt-[160px]">
        <section className="min-h-screen bg-[#fdf8f6] p-6 space-y-8">
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#800000]">Panel de Administración</h1>
              <p className="text-gray-600 mt-1">Gestiona artesanos, productos y la plataforma</p>
            </div>
            {/* Botón de Reportes */}
  <Button
    onClick={() => setShowReportModal(true)}
    className="bg-[#800000] hover:bg-[#6a0000] text-white"
  >
    Generar Reporte
  </Button>
          </div>

          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Artesanos"
              value={stats.artesanos}
              subtitle={`${stats.activos} activos`}
            >
              <Users className="h-4 w-4 text-[#800000]" />
            </StatCard>

            <StatCard
              title="Productos Total"
              value={stats.productos}
              subtitle="En toda la plataforma"
            >
              <Package className="h-4 w-4 text-[#800000]" />
            </StatCard>

            <StatCard
              title="Categorías Disponibles"
              value={stats.categorias}
              subtitle="Tipos de artesanías"
            >
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
                <CardContent className="relative">
                  <ArtisanTable onEdit={handleEditArtisan} />

                  {showForm && (
                    <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
                      <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 min-h-[70vh] max-h-[90vh] overflow-y-auto">
                        <ArtisanFormArtesano onClose={handleCloseForm} artisan={editingArtisan} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent> 

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Gestión de Productos</CardTitle>
                  <Button onClick={handleAddProduct} className="bg-[#800000] hover:bg-[#6a0000] text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Producto
                  </Button>
                </CardHeader>
                <CardContent>
                  <ProductTable onEdit={handleEditProduct} />

                  {showForm && (
                    <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-4xl">
                      <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 min-h-[70vh] max-h-[90vh] overflow-y-auto">
                        <ProductForm onClose={handleCloseForm} producto={editingProduct} />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
      {showReportModal && (
  <Reports onClose={() => setShowReportModal(false)} />
)}
    </>
  )
  

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
}
