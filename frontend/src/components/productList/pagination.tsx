"use client"
import React from "react"
import { Button } from "@/components/ui/button"   // shadcn button
import { cn } from "@/lib/utils"                  // util para clases condicionales

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      {/* Botón anterior */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Anterior
      </Button>

      {/* Números de página */}
      <div className="flex gap-1">
        {pages.map((p) => (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="sm"
            className={cn(
              "w-8 h-8 rounded-full",
              p === page && "bg-[#800000] text-white hover:bg-[#a00000]"
            )}
            onClick={() => onChange(p)}
          >
            {p}
          </Button>
        ))}
      </div>

      {/* Botón siguiente */}
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Siguiente
      </Button>
    </div>
  )
}
