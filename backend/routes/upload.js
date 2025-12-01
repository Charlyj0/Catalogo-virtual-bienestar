// routes/upload.js
import express from "express"
import multer from "multer"
import cloudinary from "../cloudinary.js"
import { Readable } from "stream"

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const buffer = req.file.buffer
    const stream = cloudinary.uploader.upload_stream(
      { folder: "artesanosmx" },
      (error, result) => {
        if (error) return res.status(500).json({ error: "Error al subir imagen" })
        res.json({ url: result.secure_url })
      }
    )
    Readable.from(buffer).pipe(stream)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error interno del servidor" })
  }
})

export default router
