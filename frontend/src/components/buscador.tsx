import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/productList?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex-1 max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
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
    </form>
  )
}
