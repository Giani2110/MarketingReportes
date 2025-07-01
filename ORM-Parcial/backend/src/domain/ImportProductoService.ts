import { PrismaProductoRepository } from '../repository/PrismaProductoRepository';
import { CsvImportStrategy } from '../data-import/strategies/CsvImportStrategy';
import { JsonImportStrategy } from '../data-import/strategies/JsonImportStrategy';
import { DataImportContext } from '../data-import/DataImportContext';

export class ImportarProductosService {
  private readonly repo = new PrismaProductoRepository();

  async ejecutar(tipo: 'csv' | 'json', filePath: string): Promise<number> {
    const strategy = tipo === 'csv'
      ? new CsvImportStrategy()
      : new JsonImportStrategy();

    const context = new DataImportContext(strategy);
    const productos = await context.importar(filePath);

    for (const producto of productos) {
      await this.repo.guardar(producto);
    }

    return productos.length;
  }
}
