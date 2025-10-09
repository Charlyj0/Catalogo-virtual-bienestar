"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Hammer, Gem, Shirt, Leaf, GlassWater, ScrollText, WalletCards, Palette } from "lucide-react";
import React from "react";


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

export default function CategoriasCarousel() {
  return (
    <section className="w-full px-6 py-8 bg-white">


      <div className="text-center mb-8">
        
        <h2 className="text-2xl font-semibold text-[#800000] mb-2">
          Categorías Artesanales
        </h2>

        <p className="text-sm text-gray-600 italic ">
          Descubre el talento artesanal que da vida a México
        </p>
      </div>

      <Carousel className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
  Autoplay({
    delay: 1000, // sin pausas
    stopOnInteraction: false,
    stopOnMouseEnter: false,
  }),
]}

        
      >
        <CarouselContent className="gap-4 px-6 scroll-smooth">

          {categorias.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4"

            >
              <div className="bg-white border-2 border-[#800000] rounded-xl p-8 flex flex-col items-center justify-center text-[#800000] hover:bg-[#800000] hover:text-white transition-colors cursor-pointer">
                {React.cloneElement(cat.icono, { className: "w-12 h-12" })}
                <span className="mt-4 text-base font-medium">{cat.nombre}</span>
              </div>

            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
