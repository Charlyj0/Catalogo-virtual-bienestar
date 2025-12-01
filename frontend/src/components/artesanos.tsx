"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaBoxOpen } from "react-icons/fa";
import axios from "axios";

type Artesano = {
  id: number;
  nombre_comercial: string;
  imagen: string | null;
  especialidad: string;
  descripcion: string;
  productos: number;
};

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/de8imj2cr/image/upload/v1762620371/artesanosmx/uluhiri32rzrpbxtpw69.jpg";

export default function ArtesanosDestacados() {
  const [artesanos, setArtesanos] = useState<Artesano[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtesanos = async () => {
      try {
        const res = await axios.get("/api/artesanos", {
        });
        console.log("Respuesta artesanos:", res.data);

        const data = Array.isArray(res.data) ? res.data : [];

        // Adaptar los campos que vienen del back
        const adaptados = data.map((a: any) => ({
          id: a.id,
          nombre_comercial:
            a.nombre_comercial && a.nombre_comercial.trim().length > 0
              ? a.nombre_comercial
              : [a.nombres, a.primer_apellido, a.segundo_apellido]
                  .filter(Boolean)
                  .join(" "),
          imagen: a.imagen || null,
          especialidad: a.especialidad || "",
          descripcion: a.descripcion || "",
          productos: a.productos || 0,
          activo: Number(a.activo) === 1 || false,
          destacado: Number(a.destacado) === 1 || false,
          creado_en: a.creado_en || null, // 👈 asegúrate que el back mande fecha de creación
        }));

        // Filtrar solo los destacados
        const destacados = adaptados.filter((a) => a.destacado);

        // Ordenar por fecha de creación descendente (más recientes primero)
        destacados.sort((a, b) => {
          if (!a.creado_en || !b.creado_en) return 0;
          return new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime();
        });

        // Limitar a 4
        setArtesanos(destacados.slice(0, 4));

        setArtesanos(adaptados);
      } catch (err) {
        console.error("Error cargando artesanos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArtesanos();
  }, []);

  return (
    <section className="w-full px-6 py-16 bg-gradient-to-b from-[#fdf8f6] to-[#fffaf7]">
      <h2 className="text-4xl font-bold text-[#800000] mb-14 text-center tracking-tight">
        Conoce a nuestros artesanos
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando artesanos...</p>
      ) : artesanos.length === 0 ? (
        <p className="text-center text-gray-500">No hay artesanos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {artesanos.map((artesano) => (
            <Card
              key={artesano.id}
              className="bg-white border border-[#e5d4c3] rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 px-6 pt-10 pb-8 text-center"
            >
              <div className="relative w-44 h-44 mx-auto mb-6">
                <Image
                  src={artesano.imagen || DEFAULT_IMAGE}
                  alt={artesano.nombre_comercial}
                  fill
                  className="rounded-full object-cover border-[6px] border-[#fffaf7] shadow-md"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-[#800000] ring-offset-2 ring-offset-[#fffaf7]" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {artesano.nombre_comercial}
              </h3>
              <p className="text-sm text-[#800000] font-medium mb-3">
                {artesano.especialidad}
              </p>
              <p className="text-sm text-gray-700 mb-6">{artesano.descripcion}</p>

              <div className="flex justify-center gap-6 text-sm text-gray-600 mb-6">
                <div className="flex flex-col items-center">
                  <FaBoxOpen className="text-[#800000] mb-1" />
                  <span className="font-semibold text-gray-800">
                    {artesano.productos}
                  </span>
                  <span>productos</span>
                </div>
              </div>

              <Link href={`/artisan/${artesano.id}`}>
                <Button
                  variant="outline"
                  className="text-[#800000] border-[#800000] hover:bg-[#800000] hover:text-white transition-colors duration-200"
                >
                  Ver perfil completo →
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-16 text-center">
        <Link href="/artesanos">
          <Button className="bg-[#800000] text-white hover:bg-[#a00000] px-6 py-2 text-sm font-medium transition-colors duration-200">
            Ver todos los artesanos →
          </Button>
        </Link>
      </div>
    </section>
  );
}
