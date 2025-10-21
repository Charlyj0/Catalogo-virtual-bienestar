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

router.get("/", async (req, res) => {
  try {
    const [artesanos] = await db.query(`
      SELECT a.*, c.celular, c.correo, c.direccion,
             r.instagram, r.facebook, r.whatsapp
      FROM artesanos a
      LEFT JOIN contacto_artesano c ON a.id = c.artesano_id
      LEFT JOIN redes_artesano r ON a.id = r.artesano_id
    `);
    res.json(artesanos);
  } catch (error) {
    console.error("Error al listar artesanos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT a.*, c.celular, c.correo, c.direccion,
             r.instagram, r.facebook, r.whatsapp
      FROM artesanos a
      LEFT JOIN contacto_artesano c ON a.id = c.artesano_id
      LEFT JOIN redes_artesano r ON a.id = r.artesano_id
      WHERE a.id = ?
    `, [id]);

    if (rows.length === 0) return res.status(404).json({ error: "Artesano no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener artesano:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nombres, primer_apellido, segundo_apellido, nombre_comercial,
    edad, genero, cumpleaños, sm, discapacidad, mobiliario,
    activo, destacado, años_experiencia, especialidad, ubicacion,
    descripcion, historia, fecha_registro, categoria_id,
    contactoInfo, socialMedia
  } = req.body;

  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query(`
      UPDATE artesanos SET
        nombres = ?, primer_apellido = ?, segundo_apellido = ?, nombre_comercial = ?,
        edad = ?, genero = ?, cumpleaños = ?, sm = ?, discapacidad = ?, mobiliario = ?,
        activo = ?, destacado = ?, años_experiencia = ?, especialidad = ?, ubicacion = ?,
        descripcion = ?, historia = ?, fecha_registro = ?, categoria_id = ?
      WHERE id = ?
    `, [
      nombres, primer_apellido, segundo_apellido, nombre_comercial,
      edad, genero, cumpleaños, sm, discapacidad, mobiliario,
      activo, destacado, años_experiencia, especialidad, ubicacion,
      descripcion, historia, fecha_registro, categoria_id, id
    ]);

    await conn.query(`
      UPDATE contacto_artesano SET
        celular = ?, correo = ?, direccion = ?
      WHERE artesano_id = ?
    `, [contactoInfo.phone, contactoInfo.email, contactoInfo.address, id]);

    await conn.query(`
      UPDATE redes_artesano SET
        instagram = ?, facebook = ?, whatsapp = ?
      WHERE artesano_id = ?
    `, [socialMedia.instagram, socialMedia.facebook, socialMedia.whatsapp, id]);

    await conn.commit();
    res.json({ success: true });
  } catch (error) {
    await conn.rollback();
    console.error("Error al editar artesano:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    conn.release();
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query("DELETE FROM artesanos WHERE id = ?", [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Artesano no encontrado" });
    res.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar artesano:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});




export default router
