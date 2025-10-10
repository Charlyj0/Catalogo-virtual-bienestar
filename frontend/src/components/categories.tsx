"use client";

import { Hammer, Gem, Shirt, Leaf, GlassWater, ScrollText, WalletCards, Palette } from "lucide-react";

const categorias = [
  { nombre: "Cerámica", icono: <Leaf className="w-12 h-12" /> },
  { nombre: "Joyería", icono: <Gem className="w-12 h-12" /> },
  { nombre: "Textil", icono: <Shirt className="w-12 h-12" /> },
  { nombre: "Madera", icono: <Palette className="w-12 h-12" /> },
  { nombre: "Vidrio", icono: <GlassWater className="w-12 h-12" /> },
  { nombre: "Cuero", icono: <WalletCards className="w-12 h-12" /> },
  { nombre: "Papel", icono: <ScrollText className="w-12 h-12" /> },
  { nombre: "Metales", icono: <Hammer className="w-12 h-12" /> },
];

export default function CategoriasMarquee() {
  return (
    <section className="w-full overflow-hidden py-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-[#800000] mb-2">
          Categorías Artesanales
        </h2>
        <p className="text-sm text-gray-600 italic">
          Descubre el talento artesanal que da vida a México
        </p>
      </div>

      <div className="relative w-full">
        <div className="flex animate-marquee gap-6 px-6 whitespace-nowrap">
          {[...categorias, ...categorias].map((cat, index) => (
            <div
              key={index}
              className="min-w-[250px] h-[200px] bg-[#fdf8f6] border-2 border-[#800000] rounded-xl p-8 flex flex-col items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-colors cursor-pointer"
            >
              {cat.icono}
              <span className="mt-4 text-base font-semibold">{cat.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
