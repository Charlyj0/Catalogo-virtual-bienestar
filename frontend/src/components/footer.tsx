// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-[#800000] text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Plataforma Artesanal</h3>
          <p className="text-white/80">
            Proyecto digital para la promoción, venta y reconocimiento de artesanos mexicanos.
          </p>
        </div>

        {/* Enlaces útiles */}
        <div>
          <h4 className="font-semibold mb-2">Enlaces</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Datos abiertos</a></li>
            <li><a href="#" className="hover:underline">Transparencia</a></li>
            <li><a href="#" className="hover:underline">Denuncias</a></li>
            <li><a href="#" className="hover:underline">Accesibilidad</a></li>
            <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
          </ul>
        </div>

        {/* Sobre la plataforma */}
        <div>
          <h4 className="font-semibold mb-2">¿Qué es esta plataforma?</h4>
          <p className="text-white/80 mb-2">
            Es un espacio digital para conectar a artesanos con compradores, promover la cultura y facilitar el comercio justo.
          </p>
          <a href="#" className="underline hover:text-white">Leer más</a>
        </div>

        {/* Contacto y redes */}
        <div>
          <h4 className="font-semibold mb-2">Contacto</h4>
          <p className="text-white/80 mb-2">Dudas e información: <a href="mailto:contacto@artesanias.mx" className="underline">contacto@artesanias.mx</a></p>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-white">📘</a>
            <a href="#" aria-label="Twitter" className="hover:text-white">🐦</a>
            <a href="#" aria-label="YouTube" className="hover:text-white">📺</a>
            <a href="#" aria-label="Instagram" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="bg-[#6a0000] text-center py-4 text-white/70">
        <p>© 2025 Plataforma Artesanal • Hecho en México</p>
      </div>
    </footer>
  );
}
