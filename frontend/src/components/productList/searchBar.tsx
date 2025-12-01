"use client"
import React from "react"
import { Search } from "lucide-react"   // ícono de búsqueda

interface Props {
  value: string
  onChange: (value: string) => void
  sort: string
  onSortChange: (value: string) => void
}

export default function SearchBar({ value, onChange, sort, onSortChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          aria-label="Buscar productos"
          placeholder="Buscar productos..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:ring-2 focus:ring-[#800000] focus:border-[#800000] text-sm"
        />
      </div>

      {/* Filtro de orden por fecha */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Ordenar por
        </label>
        <select
          aria-label="Ordenar productos por fecha"
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm shadow-sm 
                     focus:ring-2 focus:ring-[#800000] focus:border-[#800000]"
        >
          <option value="newest">Más nuevos</option>
          <option value="oldest">Más antiguos</option>
        </select>
      </div>
    </div>
  )
}
