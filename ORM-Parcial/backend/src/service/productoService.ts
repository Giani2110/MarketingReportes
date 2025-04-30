import prisma from "../providers/prisma";

export class ProductoService {
    private static instance: ProductoService;
  
    private constructor() {}
  
    public static getInstance(): ProductoService {
      if (!ProductoService.instance) {
        ProductoService.instance = new ProductoService();
      }
      return ProductoService.instance;
    }    

    public async getProductos() {
        return await prisma.producto.findMany();
    }
}