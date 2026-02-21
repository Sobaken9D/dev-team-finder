import {prisma} from "@/prisma/prisma-client";

export async function languagesSeed() {
  await prisma.programmingLanguage.createMany({
    data: [
      {name: 'JavaScript'},
      {name: 'TypeScript'},
      {name: 'Python'},
      {name: 'Java'},
      {name: 'C#'},
      {name: 'PHP'},
      {name: 'Go'},
      {name: 'Rust'},
      {name: 'Swift'},
      {name: 'Kotlin'},
    ]
  })
}