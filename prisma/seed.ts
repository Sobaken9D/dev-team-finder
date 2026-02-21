import {prisma} from '@/prisma/prisma-client';
import {frameworksSeed, languagesSeed, toolsSeed, usersSeed} from "./seeds";

async function up() {
  // await не замораживает выполнение
  // сreate возвращает промис
  // Promise.all параллельное выполнение промисов

  // Заполняем БД
  await languagesSeed();
  await toolsSeed();
  await frameworksSeed();
  await usersSeed();
}

// очистка данных перед генерацией
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProgrammingLanguage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Framework" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Tool" RESTART IDENTITY CASCADE`;
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