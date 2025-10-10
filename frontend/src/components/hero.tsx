"use client";

export default function HeroSection() {
  return (
    <section className="pt-6 pb-10 px-4 sm:px-6 lg:px-8">
  <div className="max-w-screen-2xl mx-auto bg-[#800000] text-white rounded-2xl shadow-lg px-10 py-14 flex flex-col md:flex-row items-center gap-16">
    {/* Texto principal */}
    <div className="flex-1 min-w-[280px]">
      <h2 className="text-sm uppercase tracking-widest text-yellow-300 mb-3">Artesanos</h2>
      <h1 className="text-5xl font-bold leading-tight mb-6 font-serif">
        El arte de emprender con identidad
      </h1>
      <p className="text-lg text-white/90 leading-relaxed mb-8">
        Esta plataforma celebra y empodera a los artesanos y emprendedores mexicanos, creando un futuro sostenible e inclusivo.
      </p>

      
    </div>

    {/* Imagen del emprendedor */}
    <div className="flex-shrink-0">
      <div className="relative w-[250px] h-auto">
        <img
          src="/login/sis.png"
          alt="Emprendedor sonriente"
          className=" object-cover w-full"
        />
      </div>
    </div>
  </div>
</section>

  );
}
