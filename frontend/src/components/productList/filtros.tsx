"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"

interface Categoria {
  id: number
  nombre: string
}

interface Etiqueta {
  id: number
  nombre: string
}

interface Props {
  categoria: string
  etiqueta: string
  onCategoria: (value: string) => void
  onEtiqueta: (value: string) => void
  onClear: () => void
}


export default function Filtros({ categoria, etiqueta, onCategoria, onEtiqueta, onClear }: Props) {
  const [openCat, setOpenCat] = useState(false)
  const [openTag, setOpenTag] = useState(false)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([])
  const [selectedCat, setSelectedCat] = useState<string>("")
  const [selectedTag, setSelectedTag] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCat = await axios.get("/api/categorias")
        const resTag = await axios.get("/api/etiquetas")
        setCategorias(resCat.data || [])
        setEtiquetas(resTag.data || [])
      } catch (err) {
        console.error("Error cargando filtros:", err)
      }
    }
    fetchData()
  }, [])

  const handleCategoria = (cat: string) => {
    setSelectedCat(cat)
    onCategoria(cat)
  }

  const handleEtiqueta = (tag: string) => {
    setSelectedTag(tag)
    onEtiqueta(tag)
  }



  return (
    <div className="bg-white border rounded-md shadow-sm p-4 space-y-4">
      {/* Categorías */}
      <div>
        <button
          type="button"
          onClick={() => setOpenCat(!openCat)}
          className="w-full flex justify-between items-center text-sm font-medium text-gray-700"
        >
          Categorías
          <span className="transition-transform duration-300">{openCat ? "▲" : "▼"}</span>
        </button>
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            openCat ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden space-y-2 pl-2">
            {categorias.map((cat) => (
              <label key={cat.id} className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={categoria === cat.id.toString()}
                  onChange={() => onCategoria(cat.id.toString())}
                />
                {cat.nombre}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Línea divisoria con espacio */}
      <div className="border-t border-gray-200 my-3"></div>

      {/* Etiquetas */}
      <div>
        <button
          type="button"
          onClick={() => setOpenTag(!openTag)}
          className="w-full flex justify-between items-center text-sm font-medium text-gray-700"
        >
          Etiquetas
          <span className="transition-transform duration-300">{openTag ? "▲" : "▼"}</span>
        </button>
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            openTag ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden space-y-2 pl-2">
            {etiquetas.map((tag) => (
              <label key={tag.id} className="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={etiqueta === tag.id.toString()}
                  onChange={() => onEtiqueta(tag.id.toString())}
                />
                {tag.nombre}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Botón borrar filtros */}
      <div className="pt-2">
        <button
          onClick={onClear}
          className="w-full bg-gray-100 text-gray-700 text-sm py-2 rounded-md hover:bg-gray-200 transition"
        >
          Borrar filtros
        </button>
      </div>
    </div>
  )
}
