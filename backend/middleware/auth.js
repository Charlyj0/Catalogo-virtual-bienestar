import jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"]
  console.log("Authorization header recibido:", req.headers["authorization"])

  if (!authHeader) return res.status(401).json({ error: "Token requerido" })

  const token = authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Token inválido" })

  try {
    const decoded = jwt.verify(token, SECRET)
        console.log("Token decodificado:", decoded) // 👈 aquí ves el contenido del JWT
    req.usuario = decoded // aquí ya tienes { id, rol, nombre }
    next()
  } catch (err) {
      console.error("Error verificando token:", err) // 👈 aquí verás la causa real
    return res.status(401).json({ error: "Token inválido o expirado" })
  }
}
