import express from "express"
import db from "../db.js"

const router = express.Router()

router.post("/", async (req, res) => {
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
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
      categoria_id,
      contacto,
      redes,
      imagen,
    } = req.body;

    const ubicacionFinal = ubicacion || "Cancún, Q.R.";

    const [result] = await conn.query(
      `INSERT INTO artesanos (
        nombres, primer_apellido, segundo_apellido, nombre_comercial,
        edad, genero, cumpleaños, sm, discapacidad, mobiliario,
        activo, destacado, años_experiencia, especialidad, ubicacion,
        descripcion, historia, fecha_registro, categoria_id, imagen
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)`,
      [
        nombres,
        primer_apellido,
        segundo_apellido,
        nombre_comercial,
        edad,
        genero,
        cumpleaños,
        sm,
        discapacidad,
        mobiliario ? 1 : 0,
        activo ? 1 : 0,
        destacado ? 1 : 0,
        años_experiencia,
        especialidad,
        ubicacionFinal,
        descripcion,
        historia,
        categoria_id,
        imagen
      ]
    );

    const artesanoId = result.insertId;

    if (contacto) {
      await conn.query(
        `INSERT INTO contacto_artesano (artesano_id, celular, correo, direccion)
         VALUES (?, ?, ?, ?)`,
        [artesanoId, contacto.celular, contacto.correo, contacto.direccion]
      );
    }

    if (redes) {
      await conn.query(
        `INSERT INTO redes_artesano (artesano_id, instagram, facebook, whatsapp)
         VALUES (?, ?, ?, ?)`,
        [artesanoId, redes.instagram, redes.facebook, redes.whatsapp]
      );
    }

    await conn.commit();
    res.json({ id: artesanoId, message: "Artesano creado correctamente" });
  } catch (error) {
    await conn.rollback();
    console.error("Error creando artesano:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    conn.release();
  }
});

router.get("/", async (req, res) => {
  const { destacados, limit } = req.query;

  try {
    let sql = `
      SELECT a.id,
             a.nombre_comercial,
             a.especialidad,
             a.descripcion,
             a.imagen,
             (a.activo = 1) AS activo,
             (a.destacado = 1) AS destacado,
             COALESCE(
               (SELECT COUNT(*) 
                FROM productos p 
                WHERE p.artesano_id = a.id AND p.publicado = 1),
               0
             ) AS productos,
             c.celular, c.correo, c.direccion,
             r.instagram, r.facebook, r.whatsapp
      FROM artesanos a
      LEFT JOIN contacto_artesano c ON a.id = c.artesano_id
      LEFT JOIN redes_artesano r ON a.id = r.artesano_id
      WHERE 1=1
    `;
    const params = [];

    if (destacados) {
      sql += " AND a.destacado = 1";
    }

    sql += " ORDER BY a.destacado DESC, a.id DESC";

    if (limit) {
      sql += " LIMIT ?";
      params.push(parseInt(limit));
    }

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (error) {
    console.error("Error al listar artesanos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id,
        a.fecha_registro,
        a.nombres,
        a.primer_apellido,
        a.segundo_apellido,
        a.nombre_comercial,
        a.edad,
        a.genero,
        a.cumpleaños,
        a.sm,
        a.discapacidad,
        a.mobiliario,
        (a.activo = 1) AS activo,
        (a.destacado = 1) AS destacado,
        a.años_experiencia,
        a.especialidad,
        a.ubicacion,
        a.descripcion,
        a.historia,
        a.creado_en,
        a.categoria_id,
        a.imagen,
        COALESCE(
          (SELECT COUNT(*) 
           FROM productos p 
           WHERE p.artesano_id = a.id AND p.publicado = 1),
          0
        ) AS productos,
        c.celular, c.correo, c.direccion,
        r.instagram, r.facebook, r.whatsapp
      FROM artesanos a
      LEFT JOIN contacto_artesano c ON a.id = c.artesano_id
      LEFT JOIN redes_artesano r ON a.id = r.artesano_id
      WHERE a.id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Artesano no encontrado" });
    }

    const row = rows[0];

    // Reestructuramos para devolver objetos completos
    res.json({
      id: row.id,
      fecha_registro: row.fecha_registro,
      nombres: row.nombres,
      primer_apellido: row.primer_apellido,
      segundo_apellido: row.segundo_apellido,
      nombre_comercial: row.nombre_comercial,
      edad: row.edad,
      genero: row.genero,
      cumpleaños: row.cumpleaños,
      sm: row.sm,
      discapacidad: row.discapacidad,
      mobiliario: row.mobiliario,
      activo: row.activo,
      destacado: row.destacado,
      años_experiencia: row.años_experiencia,
      especialidad: row.especialidad,
      ubicacion: row.ubicacion,
      descripcion: row.descripcion,
      historia: row.historia,
      creado_en: row.creado_en,
      categoria_id: row.categoria_id,
      imagen: row.imagen,
      productos: row.productos,
      contacto: {
        celular: row.celular,
        correo: row.correo,
        direccion: row.direccion,
      },
      redes: {
        instagram: row.instagram,
        facebook: row.facebook,
        whatsapp: row.whatsapp,
      },
    });
  } catch (error) {
    console.error("Error al obtener artesano:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
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
      categoria_id,
      contacto,
      redes,
      imagen,
    } = req.body;

    const ubicacionFinal = ubicacion || "Cancún, Q.R.";

    await conn.query(
      `UPDATE artesanos SET
        nombres=?, primer_apellido=?, segundo_apellido=?, nombre_comercial=?,
        edad=?, genero=?, cumpleaños=?, sm=?, discapacidad=?, mobiliario=?,
        activo=?, destacado=?, años_experiencia=?, especialidad=?, ubicacion=?,
        descripcion=?, historia=?, categoria_id=?, imagen=?
      WHERE id=?`,
      [
        nombres,
        primer_apellido,
        segundo_apellido,
        nombre_comercial,
        edad,
        genero,
        cumpleaños,
        sm,
        discapacidad,
        mobiliario ? 1 : 0,
        activo ? 1 : 0,
        destacado ? 1 : 0,
        años_experiencia,
        especialidad,
        ubicacionFinal,
        descripcion,
        historia,
        categoria_id,
        imagen,
        id,
      ]
    );

    if (contacto) {
      await conn.query(
        `REPLACE INTO contacto_artesano (artesano_id, celular, correo, direccion)
         VALUES (?, ?, ?, ?)`,
        [id, contacto.celular, contacto.correo, contacto.direccion]
      );
    }

    if (redes) {
      await conn.query(
        `REPLACE INTO redes_artesano (artesano_id, instagram, facebook, whatsapp)
         VALUES (?, ?, ?, ?)`,
        [id, redes.instagram, redes.facebook, redes.whatsapp]
      );
    }

    await conn.commit();
    res.json({ id, message: "Artesano actualizado correctamente" });
  } catch (error) {
    await conn.rollback();
    console.error("Error actualizando artesano:", error);
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

// Total artesanos y activos
router.get("/stats/artesanos", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        COUNT(*) AS total,
        SUM(activo = 1) AS activos
      FROM artesanos
    `)
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error al obtener estadísticas de artesanos" })
  }
})



export default router
