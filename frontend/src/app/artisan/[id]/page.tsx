import { ArtesanoDetail } from "@/components/artesanoDetail"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default async function ArtesanoPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/artesanos/${params.id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    return <div className="p-8 text-center text-gray-500">Artesano no encontrado.</div>
  }

  const artesano = await res.json()

  return (
    <>
      <Header />
      <main className="pt-[160px]">
        <div className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-md p-8 animate-fadeIn">
              <ArtesanoDetail artesano={artesano} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
