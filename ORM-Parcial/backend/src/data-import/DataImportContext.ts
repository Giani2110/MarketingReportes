import { IDataImportStrategy } from './IDataImportStrategy';
import { ProductoDTO } from '../domain/ProductoDTO';

export class DataImportContext {
  constructor(private strategy: IDataImportStrategy) {}

  setStrategy(strategy: IDataImportStrategy) {
    this.strategy = strategy;
  }

  async importar(filePath: string): Promise<ProductoDTO[]> {
    return await this.strategy.importar(filePath);
  }
}
