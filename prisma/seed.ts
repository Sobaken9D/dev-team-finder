import {prisma} from '@/prisma/prisma-client';
import {hashSync} from "bcrypt";

async function up() {
  await prisma.user.create({
    data: {
      name: 'USER',
      email: 'user@email.com',
    }
  })

  await prisma.user.create({
    data: {
      name: 'ADMIN',
      email: 'admin@email.com',
    }
  })
}

// очистка данных перед генерацией
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });