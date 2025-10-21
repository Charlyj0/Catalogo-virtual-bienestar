import express from "express"
import db from "../db.js"

const router = express.Router()

router.post("/", async (req, res) => {
  const {
    nombres,
    primer_apellido,
    segundo_apellido,
    nombre_comercial,
    edad,
    genero,
    cumpleaños,
    sm,
    discapacidad,
    mobiliario,
    activo,
    destacado,
    años_experiencia,
    especialidad,
    ubicacion,
    descripcion,
    historia,
    fecha_registro,
    categoria_id,
    contactoInfo,
    socialMedia,
  } = req.body

  const conn = await db.getConnection()
  await conn.beginTransaction()

  try {
    const [result] = await conn.query(
      `INSERT INTO artesanos (
        nombres, primer_apellido, segundo_apellido, nombre_comercial,
        edad, genero, cumpleaños, sm, discapacidad, mobiliario,
        activo, destacado, años_experiencia, especialidad, ubicacion,
        descripcion, historia, fecha_registro, categoria_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombres, primer_apellido, segundo_apellido, nombre_comercial,
        edad, genero, cumpleaños, sm, discapacidad, mobiliario,
        activo, destacado, años_experiencia, especialidad, ubicacion,
        descripcion, historia, fecha_registro, categoria_id,
      ]
    )

    const artesanoId = result.insertId

    await conn.query(
      `INSERT INTO contacto_artesano (artesano_id, celular, correo, direccion)
       VALUES (?, ?, ?, ?)`,
      [artesanoId, contactoInfo.phone, contactoInfo.email, contactoInfo.address]
    )

    await conn.query(
      `INSERT INTO redes_artesano (artesano_id, instagram, facebook, whatsapp)
       VALUES (?, ?, ?, ?)`,
      [artesanoId, socialMedia.instagram, socialMedia.facebook, socialMedia.whatsapp]
    )

    await conn.commit()
    console.log(`Artesano guardado con ID ${artesanoId}`)
    res.status(201).json({ success: true, id: artesanoId })
  } catch (error) {
    await conn.rollback()
    console.error("Transacción revertida por error:", error)
    res.status(500).json({ success: false, error: "Error interno del servidor" })
  } finally {
    conn.release()
  }
})

export default router
