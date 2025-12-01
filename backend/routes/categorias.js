import express from "express"
import db from "../db.js"

const router = express.Router()

router.get("/", async (req, res) => {
  const [categorias] = await db.query("SELECT id, nombre FROM categorias ORDER BY nombre ASC")
  res.json(categorias)
})

router.post("/", async (req, res) => {
  const { nombre } = req.body
  await db.query("INSERT INTO categorias (nombre) VALUES (?)", [nombre])
  res.status(201).json({ success: true })
})

router.post("/productos/:id/categorias", async (req, res) => {
  const { id } = req.params
  const { categorias } = req.body // array de IDs

  for (const catId of categorias) {
    await db.query("INSERT INTO producto_categoria (producto_id, categoria_id) VALUES (?, ?)", [id, catId])
  }

  res.json({ success: true })
})

router.get("/productos/:id/categorias", async (req, res) => {
  const { id } = req.params
  const [rows] = await db.query(
    `SELECT c.id, c.nombre FROM categorias c
     JOIN producto_categoria pc ON c.id = pc.categoria_id
     WHERE pc.producto_id = ?`,
    [id]
  )
  res.json(rows)
})

//eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  await db.query("DELETE FROM categorias WHERE id = ?", [id])
  res.status(204).json({ success: true })
})

// Total categorías
router.get("/stats/categorias", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM categorias
    `)
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error al obtener estadísticas de categorías" })
  }
})

export default router