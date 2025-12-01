import express from "express"
import db from "../db.js"
import { authMiddleware } from "../middleware/auth.js"
import cloudinary from "../cloudinary.js"
import multer from "multer"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() }) // no guarda en carpetas locales

router.post("/", authMiddleware, async (req, res) => {
  const { titulo, descripcion, precio_aproximado, publicado, destacado, artesano_id, categoria_id, etiquetas } = req.body
  const registrado_por = req.usuario.id

  try {
    const [result] = await db.query(
      `INSERT INTO productos (titulo, descripcion, precio_aproximado, publicado, destacado, artesano_id, registrado_por)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [titulo, descripcion, precio_aproximado, publicado, destacado, artesano_id, registrado_por]
    )

    const productoId = result.insertId

     // Guardar categoría (solo una)
    if (categoria_id) {
      await db.query(
        `INSERT INTO producto_categoria (producto_id, categoria_id) VALUES (?, ?)`,
        [productoId, categoria_id]
      )
    }

    // Guardar etiquetas (varias)
    if (etiquetas && etiquetas.length > 0) {
      for (const tagId of etiquetas) {
        await db.query(
          `INSERT INTO producto_etiqueta (producto_id, etiqueta_id) VALUES (?, ?)`,
          [productoId, tagId]
        )
      }
    }

    res.json({ id: productoId })
  } catch (error) {
    console.error("Error al crear producto:", error)
    res.status(500).json({ error: "Error al crear producto" })
  }
})


router.get("/", async (req, res) => {
  const { q, page: rawPage, sort } = req.query

  try {
    let sql = `
      SELECT 
        p.id, p.titulo, p.descripcion, p.precio_aproximado,
        p.destacado, p.publicado, p.creado_en,
        COALESCE(a.nombre_comercial, CONCAT(a.nombres, ' ', a.primer_apellido, ' ', a.segundo_apellido)) AS artesano,
        (SELECT url_imagen FROM imagenes_producto WHERE producto_id = p.id ORDER BY orden ASC LIMIT 1) AS imagen_destacada
      FROM productos p
      JOIN artesanos a ON p.artesano_id = a.id
      WHERE p.publicado = 1
    `
    const params = []

    if (q) {
      sql += " AND (p.titulo LIKE ? OR p.descripcion LIKE ?)"
      params.push(`%${q}%`, `%${q}%`)
    }

    // Orden dinámico
    if (sort === "oldest") {
      sql += " ORDER BY p.destacado DESC, p.creado_en ASC"
    } else {
      sql += " ORDER BY p.destacado DESC, p.creado_en DESC"
    }

    const [rows] = await db.query(sql, params)

    const page = parseInt(rawPage) || 1
    const limit = 12
    const totalPages = Math.max(1, Math.ceil(rows.length / limit))
    const paginados = rows.slice((page - 1) * limit, page * limit)

    res.json({ productos: paginados, totalPages })
  } catch (error) {
    console.error("Error al obtener productos:", error)
    res.status(500).json({ error: "Error al obtener productos" })
  }
})




router.get("/:id", async (req, res) => {
  console.log("Entró a GET /productos/:id con id:", req.params.id)
  const { id } = req.params
  try {
    const [rows] = await db.query(
      `SELECT 
        p.id, 
        p.titulo, 
        p.descripcion, 
        p.precio_aproximado, 
        p.publicado, 
        p.destacado,
        p.creado_en,
        p.artesano_id,
        COALESCE(a.nombre_comercial, CONCAT(a.nombres, ' ', a.primer_apellido, ' ', a.segundo_apellido)) AS artesano,
        c.id AS categoria_id,
        c.nombre AS categoria_nombre
       FROM productos p
       JOIN artesanos a ON p.artesano_id = a.id
       LEFT JOIN producto_categoria pc ON p.id = pc.producto_id
       LEFT JOIN categorias c ON pc.categoria_id = c.id
       WHERE p.id = ?`,
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    const producto = rows[0]

    // 👇 aquí lo convertimos a boolean
    producto.destacado = producto.destacado === 1

    // Traer etiquetas como array de objetos
    const [etiquetas] = await db.query(
      `SELECT e.id, e.nombre
       FROM producto_etiqueta pe
       JOIN etiquetas e ON pe.etiqueta_id = e.id
       WHERE pe.producto_id = ?`,
      [id]
    )

    // Traer imágenes
    const [imagenes] = await db.query(
      `SELECT id, url_imagen, descripcion, orden 
       FROM imagenes_producto 
       WHERE producto_id = ? 
       ORDER BY orden ASC`,
      [id]
    )

    producto.etiquetas = etiquetas        // 👈 array [{id, nombre}]
    producto.imagenes = imagenes          // 👈 array [{id, url_imagen, ...}]

    res.json(producto)
  } catch (error) {
    console.error("Error al obtener producto:", error)
    res.status(500).json({ error: "Error al obtener producto" })
  }
})


router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params
  const { titulo, descripcion, precio_aproximado, publicado, destacado, artesano_id, categoria_id, etiquetas } = req.body

  try {
    await db.query(
      `UPDATE productos 
       SET titulo=?, descripcion=?, precio_aproximado=?, publicado=?, destacado=?, artesano_id=? 
       WHERE id=?`,
      [titulo, descripcion, precio_aproximado, publicado, destacado, artesano_id, id]
    )

    // Actualizar categoría: borra y reinserta
    await db.query(`DELETE FROM producto_categoria WHERE producto_id=?`, [id])
    if (categoria_id) {
      await db.query(
        `INSERT INTO producto_categoria (producto_id, categoria_id) VALUES (?, ?)`,
        [id, categoria_id]
      )
    }

    // Actualizar etiquetas: borra y reinserta
    await db.query(`DELETE FROM producto_etiqueta WHERE producto_id=?`, [id])
    if (etiquetas && etiquetas.length > 0) {
      for (const tagId of etiquetas) {
        await db.query(
          `INSERT INTO producto_etiqueta (producto_id, etiqueta_id) VALUES (?, ?)`,
          [id, tagId]
        )
      }
    }

    res.json({ success: true })
  } catch (error) {
    console.error("Error al actualizar producto:", error)
    res.status(500).json({ error: "Error al actualizar producto" })
  }
})




router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params
  const connection = await db.getConnection() // 👈 obtener conexión para transacción

  try {
    await connection.beginTransaction()

    // Verificar que el producto exista
    const [rows] = await connection.query(`SELECT id FROM productos WHERE id = ?`, [id])
    if (rows.length === 0) {
      await connection.rollback()
      connection.release()
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    // Borrar relaciones primero
    await connection.query(`DELETE FROM imagenes_producto WHERE producto_id = ?`, [id])
    await connection.query(`DELETE FROM producto_categoria WHERE producto_id = ?`, [id])
    await connection.query(`DELETE FROM producto_etiqueta WHERE producto_id = ?`, [id])

    // Finalmente borrar el producto
    await connection.query(`DELETE FROM productos WHERE id = ?`, [id])

    await connection.commit()
    connection.release()

    res.json({ success: true, message: "Producto eliminado correctamente" })
  } catch (error) {
    await connection.rollback()
    connection.release()
    console.error("Error al eliminar producto:", error)
    res.status(500).json({ error: "Error al eliminar producto" })
  }
})







// 👉 Endpoint para subir imágenes
router.post("/:id/imagenes", upload.array("imagenes"), async (req, res) => {
  const { id } = req.params
  const { descripcion } = req.body
  const files = req.files

  try {
    const [producto] = await db.query(`SELECT id FROM productos WHERE id = ?`, [id])
    if (producto.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Debes enviar al menos una imagen" })
    }

    // calcular orden inicial
    const [[{ maxOrden }]] = await db.query(
      `SELECT COALESCE(MAX(orden), 0) AS maxOrden FROM imagenes_producto WHERE producto_id = ?`,
      [id]
    )
    let nextOrden = maxOrden + 1

    const inserted = []
    for (const file of files) {
      // 👉 subir buffer a Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: "productos" },
        async (error, uploadResult) => {
          if (error) throw error

          const [dbResult] = await db.query(
            `INSERT INTO imagenes_producto (producto_id, url_imagen, descripcion, orden)
             VALUES (?, ?, ?, ?)`,
            [id, uploadResult.secure_url, descripcion || null, nextOrden++]
          )

          inserted.push({
            id: dbResult.insertId,
            url_imagen: uploadResult.secure_url,
            descripcion,
            orden: nextOrden - 1,
          })
        }
      )

      // escribir el buffer en el stream
      result.end(file.buffer)
    }

    res.status(201).json({ success: true, imagenes: inserted })
  } catch (error) {
    console.error("Error al guardar imágenes:", error)
    res.status(500).json({ error: "Error al guardar imágenes" })
  }
})


router.get("/:id/imagenes", async (req, res) => {
  const { id } = req.params
  try {
    const [imagenes] = await db.query(
      `SELECT id, url_imagen AS url, descripcion, orden 
       FROM imagenes_producto 
       WHERE producto_id = ? 
       ORDER BY orden ASC`,
      [id]
    )
    res.json(imagenes)
  } catch (error) {
    console.error("Error al obtener imágenes:", error)
    res.status(500).json({ error: "Error al obtener imágenes" })
  }
})


router.delete("/:id/imagenes/:imagenId", async (req, res) => {
  const { id, imagenId } = req.params
  try {
    const [rows] = await db.query(
      `SELECT id FROM imagenes_producto WHERE id = ? AND producto_id = ?`,
      [imagenId, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: "Imagen no encontrada" })
    }

    await db.query(
      `DELETE FROM imagenes_producto WHERE id = ? AND producto_id = ?`,
      [imagenId, id]
    )
    res.json({ success: true, message: "Imagen eliminada correctamente" })
  } catch (error) {
    console.error("Error al eliminar imagen:", error)
    res.status(500).json({ error: "Error al eliminar imagen" })
  }
})


router.put("/:id/imagenes/:imagenId", async (req, res) => {
  const { id, imagenId } = req.params
  const { descripcion, orden } = req.body

  try {
    const [rows] = await db.query(
      `SELECT id FROM imagenes_producto WHERE id = ? AND producto_id = ?`,
      [imagenId, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: "Imagen no encontrada" })
    }

    await db.query(
      `UPDATE imagenes_producto 
       SET descripcion = ?, orden = ? 
       WHERE id = ? AND producto_id = ?`,
      [descripcion || null, orden || 1, imagenId, id]
    )

    res.json({ success: true, message: "Imagen actualizada correctamente" })
  } catch (error) {
    console.error("Error al actualizar imagen:", error)
    res.status(500).json({ error: "Error al actualizar imagen" })
  }
})

// Total productos
router.get("/stats/productos", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM productos
    `)
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error al obtener estadísticas de productos" })
  }
})




export default router