import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // await prisma.user.deleteMany();
  // await prisma.abastecimentos.deleteMany();

  console.log('Seeding...');

  const user1 = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Usuário 1',
      email: 'usuario1@example.com',
      password: 'senha1',
    },
  });
  const user2 = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: 'Usuário 2',
      email: 'usuario2@example.com',
      password: 'senha2',
    },
  });
  const abastecimento1 = await prisma.abastecimentos.upsert({
    where: { id: 1 },
    update: { userId: 1 },
    create: {
      id: 1,
      litros: '1222',
      combustivel: 'Gasolina',
      valorTotal: 44444,
      userId: 2,
      createdAt: '2023-11-09T00:07:46.176Z',
    },
  });
  const abastecimento2 = await prisma.abastecimentos.upsert({
    where: { id: 2 },
    update: { userId: 2 },
    create: {
      id: 2,
      litros: '132',
      combustivel: 'Diesel',
      valorTotal: 300,
      userId: 2,
      createdAt: '2023-11-09T00:07:46.176Z',
    },
  });
  console.log(user1, user2, abastecimento1, abastecimento2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
