// src/lib/artisans-data.ts
export interface Artisan {
  id: number
  name: string
  image?: string
  location: string
  specialty: string
  contactInfo: {
    phone: string
    email: string
  }
  verified: boolean
  totalProducts: number
  rating: number
}

export const artisans: Artisan[] = [
  {
    id: 1,
    name: "Juana Pérez",
    image: "/artisans/juana.jpg",
    location: "Oaxaca",
    specialty: "Textiles tradicionales",
    contactInfo: {
      phone: "555-123-4567",
      email: "juana@artesanomx.mx",
    },
    verified: true,
    totalProducts: 12,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Luisa Rodríguez",
    image: "/artisans/luisa.jpg",
    location: "Puebla",
    specialty: "Maderería artesanal",
    contactInfo: {
      phone: "555-987-6543",
      email: "luisa@artesanomx.mx",
    },
    verified: true,
    totalProducts: 8,
    rating: 4.5,
  },
  {
    id: 3,
    name: "Carlos Martínez",
    image: "/artisans/carlos.jpg",
    location: "CDMX",
    specialty: "Cocina tradicional",
    contactInfo: {
      phone: "555-555-5555",
      email: "carlos@artesanomx.mx",
    },
    verified: false,
    totalProducts: 5,
    rating: 4.2,
  },
  // ...otros artesanos
]
