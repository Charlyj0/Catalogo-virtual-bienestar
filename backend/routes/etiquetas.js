import express from "express"
import db from "../db.js"

const router = express.Router()

//jalar all
router.get("/", async (req, res) => {
  const [etiquetas] = await db.query("SELECT id, nombre FROM etiquetas ORDER BY nombre ASC")
  res.json(etiquetas)
})

//añadir
router.post("/", async (req, res) => {
  const { nombre } = req.body
  await db.query("INSERT INTO etiquetas (nombre) VALUES (?)", [nombre])
  res.status(201).json({ success: true })
})

//añadir a un producto
router.post("/productos/:id/etiquetas", async (req, res) => {
  const { id } = req.params
  const { etiquetas } = req.body // array de IDs

  for (const etId of etiquetas) {
    await db.query("INSERT INTO producto_etiqueta (producto_id, etiqueta_id) VALUES (?, ?)", [id, etId])
  }

  res.json({ success: true })
})

//jalar todas las etiquetas de un producto
router.get("/productos/:id/etiquetas", async (req, res) => {
  const { id } = req.params
  const [rows] = await db.query(
    `SELECT e.id, e.nombre FROM etiquetas e
     JOIN producto_etiqueta pe ON e.id = pe.etiqueta_id
     WHERE pe.producto_id = ?`,
    [id]
  )
  res.json(rows)
})

//eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  await db.query("DELETE FROM etiquetas WHERE id = ?", [id])
  res.status(204).json({ success: true })
})

export default router