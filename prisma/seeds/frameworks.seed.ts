import {prisma} from "@/prisma/prisma-client";

export async function frameworksSeed() {
  // Получаем все созданные языки
  const languages = await prisma.programmingLanguage.findMany();

  // Создаем объект для быстрого доступа к языкам по имени
  const langMap = Object.fromEntries(
    languages.map(lang => ([lang.name, lang]))
  );

  // СОЗДАЕМ ФРЕЙМВОРКИ с привязкой к языкам
  const frameworksData = [
    {name: 'React', languageName: 'JavaScript'},
    {name: 'Angular', languageName: 'JavaScript'},
    {name: 'NestJS', languageName: 'TypeScript'},
    {name: 'TypeORM', languageName: 'TypeScript'},
    {name: 'Django', languageName: 'Python'},
    {name: 'Flask', languageName: 'Python'},
    {name: 'Spring Boot', languageName: 'Java'},
    {name: 'Hibernate', languageName: 'Java'},
    {name: '.NET Core', languageName: 'C#'},
    {name: 'ASP.NET', languageName: 'C#'},
    {name: 'Laravel', languageName: 'PHP'},
    {name: 'Symfony', languageName: 'PHP'},
    {name: 'Gin', languageName: 'Go'},
    {name: 'Echo', languageName: 'Go'},
    {name: 'Rocket', languageName: 'Rust'},
    {name: 'Actix Web', languageName: 'Rust'},
    {name: 'Vapor', languageName: 'Swift'},
    {name: 'Ktor', languageName: 'Kotlin'},
  ];

  // СОЗДАЕМ КАЖДЫЙ ФРЕЙМВОРК
  for (const framework of frameworksData) {
    const language = langMap[framework.languageName];
    if (language) {
      // upsert - комбинация обновления и изменения
      // если запись есть - изменить
      // если записи нет - создать
      await prisma.framework.upsert({
        where: {name: framework.name},
        update: {
          programmingLanguageId: language.id
        },
        create: {
          name: framework.name,
          programmingLanguageId: language.id,
        },
      });
    }
  }
}