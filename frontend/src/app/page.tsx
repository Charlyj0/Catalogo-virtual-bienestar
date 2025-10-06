"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero";
import Categories from "@/components/categories";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then(res => res.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <main>
      <Header />
      <HeroSection />
      <Categories />
      <h1>Frontend con Next.js 🚀</h1>
      <p>Respuesta del backend: {message}</p>
    </main>
  );
}
