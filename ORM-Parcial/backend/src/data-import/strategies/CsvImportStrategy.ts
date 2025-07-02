import { IDataImportStrategy } from '../IDataImportStrategy';
import { ProductoDTO } from '../../domain/ProductoDTO';
import fs from 'fs';
import csv from 'csv-parser';
import readline from 'readline';

export class CsvImportStrategy implements IDataImportStrategy {
  async importar(filePath: string): Promise<ProductoDTO[]> {
    const productos: ProductoDTO[] = [];

    const delimiter = await this.detectarDelimitador(filePath);

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv({ separator: delimiter }))
        .on('data', (row) => {
          try {
            productos.push({
              nombre: row.nombre,
              descripcion: row.descripcion,
              precio_base: parseFloat(row.precio_base),
              categoria_id: parseInt(row.categoria_id),
            });
          } catch (error) {
            console.error('Error procesando fila:', row);
          }
        })
        .on('end', () => resolve(productos))
        .on('error', reject);
    });
  }

  private async detectarDelimitador(filePath: string): Promise<string> {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: fileStream });

    const firstLine = await new Promise<string>((resolve) => {
      rl.on('line', (line) => {
        rl.close();
        resolve(line);
      });
    });

    const countComa = (firstLine.match(/,/g) || []).length;
    const countPuntoYComa = (firstLine.match(/;/g) || []).length;

    return countPuntoYComa > countComa ? ';' : ',';
  }
}