import { mockProducts } from "@/data/mockproduct"
import { ProductDetail } from "@/components/ProductDetail"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ProductoPage({ params }: { params: { id: string } }) {
  const producto = mockProducts.find(p => p.id.toString() === params.id)

  if (!producto) {
    return <div className="p-8 text-center text-gray-500">Producto no encontrado.</div>
  }

  return (
   <>
        <Header />

      

      {/* Fondo suave y bloque refinado */}
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 animate-fadeIn">
            <ProductDetail product={producto} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
