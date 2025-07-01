import { ProductoDTO } from '../domain/ProductoDTO';

export interface IDataImportStrategy {
  importar(filePath: string): Promise<ProductoDTO[]>;
}