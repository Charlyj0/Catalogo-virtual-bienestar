"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero";
import Categories from "@/components/categories";
import Footer from "@/components/footer";
import ArtesanosDestacados from "@/components/artesanos";
import ProductCard from "@/components/productList/ProductCard";
import Link from "next/link";
import axios from "axios";

interface Product {
  id: number;
  titulo: string;
  precio_aproximado: string;
  imagen_destacada: string;
  artesano: string;
  etiquetas?: string;
  destacado?: number | boolean;
  creado_en?: string;
}

export default function Home() {
  const [destacados, setDestacados] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDestacados = async () => {
      try {
        const res = await axios.get("/api/productos");
        const productos: Product[] = res.data.productos || [];
        // Filtrar solo los destacados y limitar a 4
        const topDestacados = productos.filter(p => p.destacado === 1).slice(0, 4);
        setDestacados(topDestacados);
      } catch (err) {
        console.error("Error cargando productos destacados:", err);
      }
    };
    fetchDestacados();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-[160px]">
        <div className="px-6 py-8 max-w-screen-xl mx-auto space-y-12">
          <HeroSection />
        </div>

        <Categories />

        <div className="px-6 py-8 max-w-screen-xl mx-auto space-y-12">
          {/* Productos destacados */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Productos destacados
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destacados.length > 0 ? (
                destacados.map(p => <ProductCard key={p.id} producto={p} />)
              ) : (
                <p className="text-center text-gray-500 col-span-full py-10">
                  No hay productos destacados.
                </p>
              )}
            </div>

            {/* Botón ver todos */}
            <div className="flex justify-center mt-8">
              <Link href="/productList">
                <button className="bg-[#800000] text-white text-sm px-6 py-2 rounded-md hover:bg-[#a00000] transition">
                  Ver todos los productos
                </button>
              </Link>
            </div>
          </section>

          <ArtesanosDestacados />
        </div>
        </main>
      <Footer />
    </>
  );
}
