import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { enviarReportePorEmail } from '../../utils/emailService';

const prisma = new PrismaClient();
// Tarea diaria a las 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('⏰ Ejecutando tarea diaria: reporte de productos recientes');

  const desde = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const productos = await prisma.producto.findMany({
    where: {
      ultima_actualizacion: {
        gte: desde,
      },
    },
  });

  if (productos.length === 0) {
    console.log('📭 No hay productos nuevos/actualizados en las últimas 24h');
    return;
  }

  // Crear Excel
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Productos recientes');

  worksheet.columns = [
    { header: 'ID', key: 'producto_id' },
    { header: 'Nombre', key: 'nombre' },
    { header: 'Descripción', key: 'descripcion' },
    { header: 'Precio Base', key: 'precio_base' },
    { header: 'Categoría ID', key: 'categoria_id' },
    { header: 'Actualizado', key: 'ultima_actualizacion' },
  ];

  worksheet.addRows(productos);

  const reportDir = path.join(__dirname, '../../ReportesDiarios');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  const timestamp = new Date().toISOString().replace(/[:]/g, '-').split('.')[0];
  const fileName = `reporte_diario_productos_${timestamp}.xlsx`;
  const fullPath = path.join(reportDir, fileName);

  await workbook.xlsx.writeFile(fullPath);
  console.log(`📁 Reporte diario generado: ${fullPath}`);

  await enviarReportePorEmail(fullPath);
});