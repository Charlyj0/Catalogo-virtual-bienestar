"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";

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
      <h1>Frontend con Next.js 🚀</h1>
      <p>Respuesta del backend: {message}</p>
    </main>
  );
}
