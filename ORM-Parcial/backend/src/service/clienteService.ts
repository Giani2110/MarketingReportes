import prisma from "../providers/prisma";

interface ClienteFilters {
  nombre?: string;
  email?: string;
  telefono?: string;
}

export class ClienteService {
  private static instance: ClienteService;

  private constructor() {}

  public static getInstance(): ClienteService {
    if (!ClienteService.instance) {
      ClienteService.instance = new ClienteService();
    }
    return ClienteService.instance;
  }

  public async getClientes(filters: ClienteFilters) {
    return await prisma.cliente.findMany({
      where: {
        nombre: filters.nombre ? { contains: filters.nombre, mode: "insensitive" } : undefined,
        email: filters.email ? { contains: filters.email, mode: "insensitive" } : undefined,
        telefono: filters.telefono ? { contains: filters.telefono, mode: "insensitive" } : undefined,
      },
    });
  }
}