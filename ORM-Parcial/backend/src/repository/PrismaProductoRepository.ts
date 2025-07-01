import { PrismaClient } from '@prisma/client';
import { ProductoDTO } from '../domain/ProductoDTO';

const prisma = new PrismaClient();

export class PrismaProductoRepository {
  async guardar(producto: ProductoDTO) {
    const { producto_id, ...productoData } = producto;
    await prisma.producto.upsert({
      where: { nombre: producto.nombre },
      update: {
        descripcion: producto.descripcion,
        precio_base: producto.precio_base,
        categoria_id: producto.categoria_id,
        ultima_actualizacion: new Date(),
      },
      create: {
        ...productoData,
        ultima_actualizacion: new Date(),
      },
    });
  }
}
