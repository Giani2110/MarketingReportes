import eventBus from './eventBus';
import { ProductoDTO } from '../domain/ProductoDTO';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { enviarReportePorEmail } from '../utils/emailService';

eventBus.on('productosImportados', async (productos: ProductoDTO[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Productos Importados');

  worksheet.columns = [
    { header: 'Nombre', key: 'nombre' },
    { header: 'Descripción', key: 'descripcion' },
    { header: 'Precio Base', key: 'precio_base' },
    { header: 'Categoría ID', key: 'categoria_id' },
  ];

  worksheet.addRows(productos);

  // Crear carpeta "Reportes" si no existe
  const reportDir = path.join(__dirname, '../../Reportes');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  // Generar nombre dinámico con fecha/hora
  const timestamp = new Date().toISOString().replace(/[:]/g, '-').split('.')[0];
  const fileName = `reporte_productos_${timestamp}.xlsx`;
  const fullPath = path.join(reportDir, fileName);

  // Guardar el archivo Excel
  await workbook.xlsx.writeFile(fullPath);
  console.log(`📁 Reporte generado en: ${fullPath}`);

  // Enviar por email
  await enviarReportePorEmail(fullPath);
});