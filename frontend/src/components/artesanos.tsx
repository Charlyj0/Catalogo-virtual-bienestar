// src/components/ArtesanosDestacados.tsx
"use client";

type Artesano = {
  id: number;
  nombre: string;
  imagen: string;
  ubicacion: string;
  descripcion: string;
};

const artesanos: Artesano[] = [
  {
    id: 1,
    nombre: "María López",
    imagen: "/artesanos/maria.jpg",
    ubicacion: "Oaxaca",
    descripcion: "Especialista en textiles tradicionales zapotecos con más de 20 años de experiencia.",
  },
  {
    id: 2,
    nombre: "José Hernández",
    imagen: "/artesanos/jose.jpg",
    ubicacion: "Jalisco",
    descripcion: "Maestro alfarero que trabaja el barro bruñido con técnicas heredadas de generaciones.",
  },
  {
    id: 3,
    nombre: "Ana Torres",
    imagen: "https://preview.redd.it/hwyb-firefly-from-honkai-star-rail-in-pf2e-v0-j0urvj9tcr7d1.png?auto=webp&s=05c2a91ca3ecb1586f07aea0af62f60b6bfd2516",
    ubicacion: "Chiapas",
    descripcion: "Diseñadora de joyería artesanal con enfoque sustentable y materiales reciclados.",
  },
];

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function ArtesanosDestacados() {
  return (
    <section className="w-full px-6 py-12 bg-[#fdfdfd]">
      <h2 className="text-2xl font-semibold text-[#800000] mb-6">Conoce a nuestros artesanos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {artesanos.map((artesano) => (
          <Card
            key={artesano.id}
            className="w-70 max-w-sm mx-auto border border-gray-200 rounded-t-xl rounded-b-md overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col items-center text-center"
          >
            <div className="mt-6 mb-4">
              <Image
                src={artesano.imagen}
                alt={artesano.nombre}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
            <CardContent className="px-5 pb-6">
              <h3 className="text-lg font-semibold text-gray-900">{artesano.nombre}</h3>
              <p className="text-sm text-gray-600 mb-2">{artesano.ubicacion}</p>
              <p className="text-sm text-gray-700">{artesano.descripcion}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
