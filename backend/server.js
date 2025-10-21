import express from "express"
import mysql from "mysql2/promise"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cors from "cors"
import artesanosRouter from "./routes/artesanos.js"
import dotenv from "dotenv"
dotenv.config()



const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/artesanos", artesanosRouter)


const SECRET = process.env.JWT_SECRET


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// Endpoint de login
app.post("/api/login", async (req, res) => {
  const { correo, contraseña } = req.body

  try {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE correo = ?", [correo])
    const usuario = rows[0]

    if (!usuario) return res.status(401).json({ error: "Usuario no encontrado" })

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña)
    if (!esValida) return res.status(401).json({ error: "Contraseña incorrecta" })

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol, nombre: usuario.nombre },
      SECRET,
      { expiresIn: "2h" }
    )

    res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error interno del servidor" })
  }
})

app.listen(3001, () => {
  console.log("Servidor backend corriendo en http://localhost:3001")
})
