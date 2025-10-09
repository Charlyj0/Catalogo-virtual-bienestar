"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Github, Linkedin } from "lucide-react";
import { Info } from "lucide-react";



export default function FloatingDetails() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante inferior derecha */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
            onClick={() => setOpen(true)}
            className="w-12 h-12 rounded-full bg-[#800000] text-white flex items-center justify-center shadow-lg hover:bg-[#6a0000] transition-colors"
            aria-label="Detalles"
        >
            <Info className="w-5 h-5" />
        </button>

      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="autor" className="mt-4">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="autor">Hecho por</TabsTrigger>
              <TabsTrigger value="proyecto">Proyecto</TabsTrigger>
            </TabsList>

            {/* Tab 1: Créditos */}
            <TabsContent value="autor" className="space-y-4 pt-4">
              <p className="text-sm text-gray-700">
                Esta plataforma fue diseñada con pasión y precisión por <strong>Carlos</strong>, un artesano digital que mezcla cultura, elegancia y tecnología como nadie.
              </p>
              <p className="text-sm text-gray-700">
                Su trabajo honra a los artesanos de México y eleva cada detalle con profesionalismo y visión institucional.
              </p>
              <div className="flex gap-4 pt-2">
                <a href="https://github.com/tuusuario" target="_blank" className="flex items-center gap-1 text-[#800000] hover:underline">
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a href="https://linkedin.com/in/tuusuario" target="_blank" className="flex items-center gap-1 text-[#800000] hover:underline">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </TabsContent>

            {/* Tab 2: Proyecto */}
            <TabsContent value="proyecto" className="space-y-4 pt-4">
              <p className="text-sm text-gray-700">
                <strong>Plataforma de Bienestar</strong> es un espacio digital para visibilizar, dignificar y conectar a artesanos y emprendedores mexicanos.
              </p>
              <p className="text-sm text-gray-700">
                Inspirada en portales institucionales, esta plataforma combina accesibilidad, estética cultural y funcionalidad moderna.
              </p>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
