import prisma from "../providers/prisma";

interface CategoriaData {
  nombre: string;
  descripcion: string;
}

export class CategoriaService {
  private static instance: CategoriaService;

  private constructor() {}

  public static getInstance(): CategoriaService {
    if (!CategoriaService.instance) {
      CategoriaService.instance = new CategoriaService();
    }
    return CategoriaService.instance;
  }

  public async crearCategoria(data: CategoriaData) {
    return await prisma.categoria.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
      },
    });
  }
}
