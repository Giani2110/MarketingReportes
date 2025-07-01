import { PrismaProductoRepository } from '../repository/PrismaProductoRepository';
import { CsvImportStrategy } from '../data-import/strategies/CsvImportStrategy';
import { JsonImportStrategy } from '../data-import/strategies/JsonImportStrategy';
import { DataImportContext } from '../data-import/DataImportContext';
import eventBus from '../events/eventBus'; // 👈 nuevo import
import { ProductoDTO } from '../domain/ProductoDTO';

export class ImportarProductosService {
  private readonly repo = new PrismaProductoRepository();

  async ejecutar(tipo: 'csv' | 'json', filePath: string): Promise<number> {
    const strategy = tipo === 'csv'
      ? new CsvImportStrategy()
      : new JsonImportStrategy();

    const context = new DataImportContext(strategy);
    const productos: ProductoDTO[] = await context.importar(filePath);

    for (const producto of productos) {
      await this.repo.guardar(producto);
    }

    // ✅ Emitir evento al finalizar la importación
    eventBus.emit('productosImportados', productos);

    return productos.length;
  }
}