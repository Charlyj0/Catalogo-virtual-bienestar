"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function useAuth(requiredRole?: string) {
  const [usuario, setUsuario] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("usuario")

    if (!token || !user) {
      router.push("/login")
      return
    }

    const parsed = JSON.parse(user)
    if (requiredRole && parsed.rol !== requiredRole) {
      router.push("/no-autorizado")
      return
    }

    setUsuario(parsed)
  }, [])

  return usuario
}
