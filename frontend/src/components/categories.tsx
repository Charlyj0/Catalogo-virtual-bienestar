// src/components/CategoriasCarousel.tsx
"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";


const categorias = [
  { nombre: "Cerámica", icono: "🪴" },
  { nombre: "Joyería", icono: "💍" },
  { nombre: "Textil", icono: "🧵" },
  { nombre: "Madera", icono: "🪵" },
  { nombre: "Vidrio", icono: "🧿" },
  { nombre: "Cuero", icono: "👞" },
  { nombre: "Papel", icono: "📜" },
  { nombre: "Metales", icono: "⚒️" },
];

export default function CategoriasCarousel() {
  return (
    <section className="w-full px-6 py-8 bg-white">
      <h2 className="text-xl font-semibold text-[#800000] mb-4">Categorías Artesanales</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="gap-4">
          {categorias.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <div className="bg-[#f8f8f8] border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center shadow hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">{cat.icono}</div>
                <span className="text-sm font-medium text-gray-700">{cat.nombre}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
