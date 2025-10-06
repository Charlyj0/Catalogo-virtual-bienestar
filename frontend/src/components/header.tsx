// src/components/Header.tsx
"use client";
export default function Header() {
  return (
    <header className="w-full">
      {/* Barra superior negra */}
      <div className="bg-black text-white text-sm px-6 py-2 flex justify-between items-center">
        <span>Gobierno de México · Secretaría de Desarrollo Económico</span>
        <span>Soporte: (55) 1234-5678</span>
      </div>

      {/* Barra principal rosa */}
      <div className="bg-pink-900 text-white px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow">
        {/* Logo + Título */}
        <div className="flex items-center gap-3">
          <img src="/logo_blanco.svg" alt="Logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-xl font-semibold text-white">ArtesanosMX</h1>
            <p className="text-sm text-white/90">Portal Oficial de Artesanías</p>
          </div>
        </div>

        {/* Buscador */}
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Buscar artesanías, artesanos..."
            className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
          />
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
          <a href="/login" className="text-sm text-white/90 hover:underline">
            Iniciar Sesión
          </a>
        </div>
      </div>

      {/* Menú de navegación */}
      <nav className="bg-pink-950 text-white border-t border-white/10 px-6 py-3 flex gap-6 text-sm font-medium">
        <a href="/" className="hover:text-[#800000]">Inicio</a>
        <a href="/categorias" className="hover:text-[#800000]">Categorías</a>
        <a href="/artesanos" className="hover:text-[#800000]">Artesanos</a>
        <a href="/nosotros" className="hover:text-[#800000]">Sobre Nosotros</a>
        <a href="/contacto" className="hover:text-[#800000]">Contacto</a>
      </nav>
    </header>
  );
}
