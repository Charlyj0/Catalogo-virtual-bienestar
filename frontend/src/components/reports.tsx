"use client"
import { useState } from "react"
import axios from "axios"

export default function Reportes({ onClose }: { onClose: () => void }) {
  const [tipo, setTipo] = useState("artesanos")
  const [fechaInicio, setFechaInicio] = useState("")
  const [fechaFin, setFechaFin] = useState("")
  const [formato, setFormato] = useState("excel")

  const handleGenerate = async () => {
    try {
      const res = await axios.post(
        "/api/reports/generate",
        { tipo, fechaInicio, fechaFin, formato },
        { responseType: "blob" }
      )

      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", formato === "excel" ? "reporte.xlsx" : "reporte.pdf")
      document.body.appendChild(link)
      link.click()
    } catch (err) {
      console.error("Error generando reporte:", err)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-[95%] max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Generar Reporte</h2>

        {/* Tipo de reporte */}
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="border p-2 mb-4 w-full">
          <option value="artesanos">Artesanos</option>
          <option value="productos">Productos</option>
        </select>

        {/* Fechas */}
        <div className="flex gap-4 mb-4">
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="border p-2 flex-1" />
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="border p-2 flex-1" />
        </div>

        {/* Formato */}
        <select value={formato} onChange={(e) => setFormato(e.target.value)} className="border p-2 mb-4 w-full">
          <option value="excel">Excel</option>
          <option value="pdf">PDF</option>
        </select>

        {/* Botones */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleGenerate}
            className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#a00000]"
          >
            Descargar
          </button>
        </div>
      </div>
    </div>
  )
}
