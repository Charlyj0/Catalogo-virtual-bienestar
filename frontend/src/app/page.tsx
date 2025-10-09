"use client";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero";
import Categories from "@/components/categories";
import Producto from "@/components/product";
import Footer from "@/components/footer";
import ArtesanosDestacados from "@/components/artesanos";

export default function Home() {

  return (
    <main>
      <Header />
      <HeroSection />
      <Categories />
      <Producto/>
      <ArtesanosDestacados />
      <Footer />
    </main> 
  );
}
