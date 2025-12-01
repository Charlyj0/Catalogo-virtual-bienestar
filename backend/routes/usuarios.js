import express from "express"
import db from "../db.js"

const router = express.Router()

//jalar all
router.get("/", async (req, res) => {
  const [usuarios] = await db.query("SELECT id, nombre, correo, rol FROM usuarios ORDER BY nombre ASC")
  res.json(usuarios)
})

//
router.post("/", async (req, res) => {
  const { nombre, correo, contraseña, rol = "artesano" } = req.body
  const hash = await bcrypt.hash(contraseña, 10)

  await db.query(
    "INSERT INTO usuarios (nombre, correo, contraseña, rol) VALUES (?, ?, ?, ?)",
    [nombre, correo, hash, rol]
  )

  res.status(201).json({ success: true })
})

// jalar por id
router.get("/:id", async (req, res) => {
  const { id } = req.params
  const [rows] = await db.query("SELECT id, nombre, correo, rol FROM usuarios WHERE id = ?", [id])
  if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" })
  res.json(rows[0])
})

//eliminar
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  await db.query("DELETE FROM usuarios WHERE id = ?", [id])
  res.status(204).json({ success: true })
})

export default router