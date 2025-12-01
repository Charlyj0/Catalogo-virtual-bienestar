"use client";

export default function HeroSection() {
  return (
    <div className="max-w-screen-2xl mx-auto rounded-2xl shadow-lg overflow-hidden border border-[#CCCCCC]">
      {/* Franja superior de acento */}
      <div className="h-2 bg-[#92153f]" />

      {/* Contenido principal con fondo gris institucional */}
      <div className="bg-[#EAEAEA] text-[#333333] px-10 py-14 flex flex-col md:flex-row items-center gap-16">
        {/* Texto principal */}
        <div className="flex-1 min-w-[280px]">
          <h2 className="text-sm uppercase tracking-widest text-[#92153f] mb-3">
            Artesanos
          </h2>
          <h1 className="text-5xl font-bold leading-tight mb-6 font-serif">
            El arte de emprender con identidad
          </h1>
          <p className="text-lg text-[#444444] leading-relaxed">
            Esta plataforma celebra y empodera a los artesanos y emprendedores cancunenses,
            creando un futuro sostenible e inclusivo.
          </p>
        </div>

        {/* Imagen del logo más grande */}
        <div className="flex-shrink-0">
          <div className="relative w-[360px] max-w-full">
            <img
              src="/login/logo.png"
              alt="Logo institucional"
              className="object-contain w-full rounded-xl border border-[#CCCCCC]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
