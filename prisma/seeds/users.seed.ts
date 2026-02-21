import {prisma} from "@/prisma/prisma-client";
import {hashSync} from "bcrypt";

export async function usersSeed() {
  // Первый пользователь - Junior разработчик
  await prisma.user.create({
    data: {
      fullName: 'Иван Петров',
      email: 'ivan.petrov@example.com',
      password: hashSync('password123', 10),
      role: 'USER',
      verified: new Date(),
      username: 'ivan_dev',
      avatar: 'https://example.com/avatars/ivan.jpg',
      country: 'Россия',
      about: 'Начинающий разработчик, увлекаюсь веб-разработкой',
      englishLevel: 'B1',
      education: 'МГТУ им. Баумана, Факультет Информатики',
      experience: 'JUNIOR',

      // Связи с технологиями
      programmingLanguages: {
        connect: [
          {name: 'Python'},
          {name: 'Go'}
        ]
      },
      frameworks: {
        connect: [
          {name: 'React'},
          {name: 'Angular'}
        ]
      },
      tools: {
        connect: [
          {name: 'Postman'},
          {name: 'Figma'}
        ]
      },

      // Контакты
      telegram: '@ivan_dev',
      github: 'ivan-dev',
      discord: 'ivan_dev#1234',

      provider: 'local',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  });
}