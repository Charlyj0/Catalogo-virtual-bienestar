"use client";

import { Hammer, Gem, Shirt, Leaf, GlassWater, ScrollText, WalletCards, Palette } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const categorias = [
  { nombre: "Cerámica", icono: <Leaf className="w-8 h-8" /> },
  { nombre: "Joyería", icono: <Gem className="w-8 h-8" /> },
  { nombre: "Textil", icono: <Shirt className="w-8 h-8" /> },
  { nombre: "Madera", icono: <Palette className="w-8 h-8" /> },
  { nombre: "Vidrio", icono: <GlassWater className="w-8 h-8" /> },
  { nombre: "Cuero", icono: <WalletCards className="w-8 h-8" /> },
  { nombre: "Papel", icono: <ScrollText className="w-8 h-8" /> },
  { nombre: "Metales", icono: <Hammer className="w-8 h-8" /> },
];

export default function CategoriasGrid() {
  return (
    <>
    <Header />
    <section className="w-full px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-[#800000]">
            Categorías Artesanales
        </h2>
        <p className="text-sm text-gray-600 italic mb-2">
            Descubre el talento artesanal que da vida a México
        </p>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {categorias.map((cat, index) => (
          <div
            key={index}
            className=" border-2 border-[#800000] rounded-xl p-6 flex flex-col items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-colors cursor-pointer"
          >
            {cat.icono}
            <span className="mt-3 text-sm font-medium">{cat.nombre}</span>
          </div>
        ))}
      </div>
    </section>
    <Footer />
    </>
  );
}
