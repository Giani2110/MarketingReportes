import { DataImportContext } from '../data-import/DataImportContext';
import { PrismaClient } from '@prisma/client';
import { CsvImportStrategy } from '../data-import/strategies/CsvImportStrategy';
import { JsonImportStrategy } from '../data-import/strategies/JsonImportStrategy';

const prisma = new PrismaClient();

export class ProductoService {
  async importarDesdeArchivo(tipo: 'csv' | 'json', filePath: string) {
    const context = new DataImportContext(
      tipo === 'csv' ? new CsvImportStrategy() : new JsonImportStrategy()
    );

    const productos = await context.importar(filePath);

    for (const p of productos) {
      await prisma.producto.upsert({
        where: { producto_id: p.producto_id ? p.producto_id : 0 },
        update: {
          descripcion: p.descripcion,
          precio_base: p.precio_base,
          categoria_id: p.categoria_id,
        },
        create: {
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio_base: p.precio_base,
          categoria_id: p.categoria_id,
          ultima_actualizacion: new Date(),
        },
      });
    }

    return productos.length;
  }
}