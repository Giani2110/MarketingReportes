import { IDataImportStrategy } from '../IDataImportStrategy';
import { ProductoDTO } from '../../domain/ProductoDTO';
import fs from 'fs';
import csv from 'csv-parser';

export class CsvImportStrategy implements IDataImportStrategy {
  async importar(filePath: string): Promise<ProductoDTO[]> {
    const productos: ProductoDTO[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          productos.push({
            nombre: row.nombre,
            descripcion: row.descripcion,
            precio_base: parseFloat(row.precio_base),
            categoria_id: parseInt(row.categoria_id),
          });
        })
        .on('end', () => resolve(productos))
        .on('error', reject);
    });
  }
}