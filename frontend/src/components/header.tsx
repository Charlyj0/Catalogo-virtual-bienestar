"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Buscador from "./buscador";

type Usuario = {
  id: number;
  nombre: string;
  rol: string;
};

export default function Header() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      setUsuario(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };
  return (
  <header className="fixed top-0 left-0 w-full z-50 bg-[#F5F5F5]">
  {/* Barra superior institucional */}
  <div className="bg-[#E0E0E0] text-[#333333] text-sm border-b border-[#CCCCCC]">
    <div className="max-w-screen-xl mx-auto px-6 py-2 flex justify-between items-center">
      <span>Gobierno de México · Secretaría de Desarrollo Económico</span>
      <span>Soporte: (55) 1234-5678</span>
    </div>
  </div>

  {/* Barra principal gris clara */}
  <div className="bg-[#F5F5F5] text-[#333333] shadow">
    <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div className="flex items-center gap-4">
        <img src="/home/MunBJQROO.png" alt="Logo" className="h-12 w-auto" />
      </div>

      <Buscador />

      <div className="flex items-center gap-4">
        {usuario ? (
          <>
            <span className="text-sm text-[#333333]">Hola, {usuario.nombre}</span>
            {usuario.rol === "admin" && (
              <Link
                href="/admin-panel"
                className="text-sm bg-[#A61206] text-white px-3 py-1 rounded hover:bg-[#8C1005]"
              >
                Panel Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="text-sm text-[#333333] hover:underline"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#333333]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A4 4 0 0112 14h0a4 4 0 016.879 3.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <Link href="/login" className="text-sm text-[#333333] hover:underline">
              Iniciar Sesión
            </Link>
          </>
        )}
      </div>
    </div>
  </div>

  {/* Menú de navegación */}
  <nav className="bg-[#EAEAEA] text-[#333333] border-t border-[#CCCCCC]">
    <div className="max-w-screen-xl mx-auto px-6 py-3 flex gap-6 text-sm font-medium">
      {[
        { label: "Inicio", href: "/" },
        { label: "Categorías", href: "/categories" },
        { label: "Sobre Nosotros", href: "/about-us" },
      ].map((item) => (
        <Link key={item.href} href={item.href} className="relative group">
          <span className="hover:text-[#A61206]">{item.label}</span>
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#A61206] transition-all group-hover:w-full"></span>
        </Link>
      ))}
    </div>
  </nav>

  {/* Separador decorativo institucional */}
  <div className="w-full h-2 bg-gradient-to-r from-[#CCCCCC] via-[#A61206] to-[#CCCCCC]" />
</header>



  );
}
