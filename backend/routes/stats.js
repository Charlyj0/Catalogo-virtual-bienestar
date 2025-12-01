import express from "express"
import db from "../db.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const [artesanos] = await db.query(`
      SELECT COUNT(*) AS total, SUM(activo = 1) AS activos
      FROM artesanos
    `)
    const [productos] = await db.query(`SELECT COUNT(*) AS total FROM productos`)
    const [categorias] = await db.query(`SELECT COUNT(*) AS total FROM categorias`)

    res.json({
      artesanos: artesanos[0].total,
      activos: artesanos[0].activos,
      productos: productos[0].total,
      categorias: categorias[0].total,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error al obtener estadísticas" })
  }
})

export default router   // 👈 aquí exportas como default
