// src/components/HeroSection.tsx
"use client";
export default function HeroSection() {
  return (
    <section className="w-full bg-[#800000] text-white py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Texto principal */}
      <div className="max-w-xl">
        <h2 className="text-sm uppercase tracking-wide text-yellow-300 mb-2">Artesanos</h2>
        <h1 className="text-4xl font-bold mb-4">
          El arte de emprender con identidad
        </h1>
        <p className="text-lg text-white/90 mb-6">
          Esta plataforma celebra y empodera a los artesanos y emprendedores mexicanos, creando un futuro sostenible e inclusivo.
        </p>

        {/* Buscador */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar programas, artesanos..."
            className="w-full px-4 py-2 rounded border-none text-gray-800 text-sm focus:outline-none"
          />
          <select className="px-3 py-2 rounded text-gray-800 text-sm">
            <option>Programas</option>
            <option>Artesanos</option>
            <option>Productos</option>
          </select>
        </div>
      </div>

      {/* Imagen del emprendedor */}
      <div className="flex-shrink-0">
        <img
          src="/emprendedor.png"
          alt="Emprendedor sonriente"
          className="w-72 h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
}
