import { IDataImportStrategy } from '../IDataImportStrategy';
import { ProductoDTO } from '../../domain/ProductoDTO';
import fs from 'fs/promises';

export class JsonImportStrategy implements IDataImportStrategy {
  async importar(filePath: string): Promise<ProductoDTO[]> {
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);

    return parsed.map((p: any) => ({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio_base: parseFloat(p.precio_base),
      categoria_id: parseInt(p.categoria_id),
    }));
  }
}
