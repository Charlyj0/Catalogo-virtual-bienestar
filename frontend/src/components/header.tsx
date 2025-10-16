"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-[#fdf8f6]">
      {/* Barra superior negra */}
      <div className="bg-black text-white text-sm border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          <span>Gobierno de México · Secretaría de Desarrollo Económico</span>
          <span>Soporte: (55) 1234-5678</span>
        </div>
      </div>

      {/* Barra principal institucional */}
      <div className="bg-pink-900 text-white shadow">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo + Título */}
          <div className="flex items-center gap-4">
            <img src="/logo_blanco.svg" alt="Logo" className="h-12 w-auto" />
          </div>

          {/* Buscador */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar artesanías, artesanos..."
                className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000] placeholder:text-gray-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          </div>

          {/* Botón de sesión */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white/90"
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
            <Link href="/login" className="text-sm text-white/90 hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav className="bg-pink-950 text-white border-t border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-6 text-sm font-medium">
          {[
            { label: "Inicio", href: "/" },
            { label: "Categorías", href: "/categories" },
            { label: "Sobre Nosotros", href: "/about-us" },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="relative group">
              <span className="hover:text-[#800000]">{item.label}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#800000] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Separador decorativo institucional */}
      <div className="w-full h-2 bg-gradient-to-r from-[#800000] via-[#cfa18c] to-[#800000]" />
    </header>
  );
}
