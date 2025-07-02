import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categorias = [
    'Perfumes',
    'Desodorantes',
    'Comida',
    'Bebidas',
    'Ropa',
    'Calzado',
    'Accesorios',
    'Hogar',
    'Electrónica',
    'Muebles',
  ];

  for (const nombre of categorias) {
    const existente = await prisma.categoria.findFirst({
      where: { nombre },
    });
  
    if (!existente) {
      await prisma.categoria.create({
        data: {
          nombre,
          descripcion: `Categoría de ${nombre.toLowerCase()}`,
        },
      });
    }
  }
  console.log('✅ Categorías creadas con éxito');
}

main()
  .catch((e) => {
    console.error('❌ Error al insertar categorías:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });