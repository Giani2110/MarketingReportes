import { CsvImportStrategy } from '../data-import/strategies/CsvImportStrategy';
import { JsonImportStrategy } from '../data-import/strategies/JsonImportStrategy';
import { DataImportContext } from '../data-import/DataImportContext';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductoService {
  async importarDesdeArchivo(tipo: 'csv' | 'json', filePath: string) {
    const context = new DataImportContext(
      tipo === 'csv' ? new CsvStrategy() : new JsonStrategy()
    );

    const productos = await context.execute(filePath);

    for (const p of productos) {
      await prisma.producto.upsert({
        where: { producto_id: parseInt(p.producto_id) },
        update: {
          descripcion: p.descripcion,
          precio_base: parseFloat(p.precio_base),
          categoria_id: parseInt(p.categoria_id),
        },
        create: {
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio_base: parseFloat(p.precio_base),
          categoria_id: parseInt(p.categoria_id),
          ultima_actualizacion: new Date(),
        },
      });
    }

    return productos.length;
  }
}