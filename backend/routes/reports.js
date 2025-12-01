import express from "express"
import db from "../db.js"
import ExcelJS from "exceljs"
import PDFDocument from "pdfkit" // 👈 para PDF

const router = express.Router()

router.post("/generate", async (req, res) => {
  const { tipo, fechaInicio, fechaFin, formato } = req.body

  try {
    let query = ""
    if (tipo === "artesanos") {
      query = "SELECT id, nombre_comercial, activo, fecha_registro FROM artesanos"
    } else if (tipo === "productos") {
      query = "SELECT id, titulo, precio_aproximado, fecha_registro FROM productos"
    } else {
      return res.status(400).json({ error: "Tipo de reporte no válido" })
    }

    const [rows] = await db.query(query)

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "No hay datos para generar el reporte" })
    }

    if (formato === "excel") {
      const workbook = new ExcelJS.Workbook()
      const sheet = workbook.addWorksheet("Reporte")

      sheet.columns = Object.keys(rows[0]).map((col) => ({
        header: col,
        key: col,
        width: 20,
      }))
      rows.forEach((row) => sheet.addRow(row))

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      res.setHeader("Content-Disposition", "attachment; filename=reporte.xlsx")

      await workbook.xlsx.write(res)
      res.end()
    } else if (formato === "pdf") {
      const doc = new PDFDocument()
      res.setHeader("Content-Type", "application/pdf")
      res.setHeader("Content-Disposition", "attachment; filename=reporte.pdf")

      doc.pipe(res)
      doc.fontSize(18).text("Reporte", { align: "center" })
      doc.moveDown()
      rows.forEach((row) => {
        doc.fontSize(12).text(JSON.stringify(row))
        doc.moveDown()
      })
      doc.end()
    } else {
      res.status(400).json({ error: "Formato no soportado" })
    }
  } catch (err) {
    console.error("Error generando reporte:", err)
    res.status(500).json({ error: "Error generando reporte" })
  }
})


export default router
