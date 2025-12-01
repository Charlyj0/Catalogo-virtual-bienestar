import { ProductDetail } from "@/components/ProductDetail"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default async function ProductoPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/productos/${params.id}`, {
    cache: "no-store", // para evitar datos stale en desarrollo
  })

  if (!res.ok) {
    return <div className="p-8 text-center text-gray-500">Producto no encontrado.</div>
  }

  const producto = await res.json()

  return (
    <>
      <Header />
      <main className="pt-[160px]">
      <div className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8 animate-fadeIn">
            <ProductDetail product={producto} />
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </>
  )
}