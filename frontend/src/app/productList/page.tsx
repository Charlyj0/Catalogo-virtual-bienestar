"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import ProductCard from "@/components/productList/ProductCard"
import Filters from "@/components/productList/filtros"
import SearchBar from "@/components/productList/searchBar"
import Pagination from "@/components/productList/pagination"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface Producto {
  id: number
  titulo: string
  precio_aproximado: string
  imagen_destacada: string
  artesano: string
  categorias?: string
  destacado?: number | boolean
}

export default function ProductList() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [categoria, setCategoria] = useState("")
  const [etiqueta, setEtiqueta] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("q") || ""
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [sort, setSort] = useState("newest")
  
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true)
      try {
        const res = await axios.get("/api/productos", {
          params: { q: search, categoria, etiqueta, page, sort }
        })
        setProductos(res.data.productos || [])
        setTotalPages(res.data.totalPages || 1)
      } catch (err) {
        console.error("Error al obtener productos:", err)
        setProductos([])
      } finally {
        setLoading(false)
      }
    }
    fetchProductos()
  }, [search, categoria, etiqueta, page, sort])

    

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen pt-[160px]">
        <section className="max-w-screen-xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
            {/* Filtros */}
            <aside className="space-y-6">
              <SearchBar
                value={search}
                onChange={(val) => { setSearch(val); setPage(1) }}   // reset página al buscar
                sort={sort}
                onSortChange={(val) => { setSort(val); setPage(1) }} // reset página al cambiar orden
              />
              <Filters
                categoria={categoria}
                etiqueta={etiqueta}
                onCategoria={(cat) => { setCategoria(cat); setPage(1) }}
                onEtiqueta={(tag) => { setEtiqueta(tag); setPage(1) }}
                onClear={() => {
                  setCategoria("")
                  setEtiqueta("")
                  setPage(1)
                }}
              />

            </aside>

            {/* Productos */}
            <div className="flex flex-col gap-6">
              {/* Encabezado dinámico */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {initialSearch ? `Resultados de “${initialSearch}”` : "Todos los productos"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {productos.length} {productos.length === 1 ? "resultado" : "resultados"} encontrados
              </p>
            </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                <p className="text-center text-gray-500 col-span-full py-10">Cargando...</p>
                    ) : productos.length > 0 ? (
                    productos.map(p => <ProductCard key={p.id} producto={p} />)
                    ) : (
                <p className="text-center text-gray-500 col-span-full py-10">No se encontraron productos.</p>
                    )}
              </div>

              {/* Paginación */}
              <div className="mt-6 self-center">
                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
