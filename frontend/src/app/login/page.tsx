"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import FloatingDetails from "@/components/floatingdetails";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // prevenir recarga si viene del formulario
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, contraseña: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      router.push("/");
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <Image
        src="/login/palaciomunicipal.jpg"
        alt="Fondo institucional"
        fill
        className="object-cover object-center z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Imagen institucional izquierda */}
<div className="absolute left-0 top-0 h-full w-full md:w-1/2 flex items-center justify-center z-10 px-6 animate-fadeSlideUp">
  <div className="drop-shadow-lg">
    <Image
      src="/login/padron.png" // ← ruta de tu imagen institucional
      alt="Padrón único de artesanos y emprendedores"
      width={480}
      height={160}
      className="object-contain"
      priority
    />
  </div>
</div>

      {/* Formulario flotante derecha */}
      <div className="absolute inset-y-0 right-[10%] md:w-[440px] flex items-center justify-center px-6 z-10 animate-fadeSlideUp">
        <form
          onSubmit={handleLogin}
          className="w-full backdrop-blur-sm bg-white/20 rounded-xl border border-white/30 shadow-xl p-8"
        >
          <a href="/" className="inline-flex items-center text-sm text-white hover:underline mb-6">
            ← Volver al inicio
          </a>

          <h2 className="text-2xl font-semibold text-white mb-2">Inicia sesión</h2>
          <p className="text-sm text-white/80 mb-6">Ingresa tus datos para acceder</p>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm text-white">Correo o teléfono</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="bg-white/80 text-black"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-white">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/80 text-black"
              />
            </div>

            {error && <p className="text-sm text-red-300">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-[#800000] text-white hover:bg-[#6a0000] transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              Iniciar sesión
            </Button>

            <div className="text-right">
              <a href="#" className="text-sm text-white hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
          </div>
        </form>
      </div>
      <FloatingDetails />
    </section>
  );
}
