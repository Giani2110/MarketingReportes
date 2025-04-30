import prisma from "../providers/prisma";

async function main() {
  const clientes = [
    {
      nombre: "Ana Torres",
      email: "ana.torres@example.com",
      telefono: "1133445566",
      direccion: "Calle 1, Buenos Aires",
      fecha_registro: new Date(),
    },
    {
      nombre: "Carlos Giménez",
      email: "carlos.gimenez@example.com",
      telefono: "1122334455",
      direccion: "Calle 2, Rosario",
      fecha_registro: new Date(),
    },
    {
      nombre: "Mariana López",
      email: "mariana.lopez@example.com",
      telefono: "1166778899",
      direccion: "Calle 3, Córdoba",
      fecha_registro: new Date(),
    },
    {
      nombre: "Luciano Rivas",
      email: "luciano.rivas@example.com",
      telefono: "1144556677",
      direccion: "Calle 4, Mendoza",
      fecha_registro: new Date(),
    },
    {
      nombre: "Soledad Díaz",
      email: "soledad.diaz@example.com",
      telefono: "1199887766",
      direccion: "Calle 5, La Plata",
      fecha_registro: new Date(),
    },
  ];

  for (const cliente of clientes) {
    try {
      await prisma.cliente.create({ data: cliente });
      console.log(`Cliente creado: ${cliente.nombre}`);
    } catch (error) {
      console.error(`Error creando cliente ${cliente.email}:`, error);
    }
  }

  await prisma.$disconnect();
}

main();