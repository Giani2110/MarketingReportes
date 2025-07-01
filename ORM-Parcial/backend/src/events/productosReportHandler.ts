import eventBus from './eventBus';
import { ProductoDTO } from '../domain/ProductoDTO';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

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

  const reportDir = path.join(__dirname, '../../Reportes');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir);
  }

  const pathReporte = path.join(reportDir, 'reporte_productos.xlsx');
  await workbook.xlsx.writeFile(pathReporte);

  console.log(`📁 Reporte generado en: ${pathReporte}`);
});
